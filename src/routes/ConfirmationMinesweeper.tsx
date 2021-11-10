import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import ContinueButton from '@/components/ContinueButton';
import { multipick, RouteProps } from '@/utils';

type Tile = {
  index: number;
  x: number;
  y: number;
  hasMine: boolean;
  flag: string | null;
  numNeighboringMines: number;
  revealed: boolean;
};

type Board = Tile[];

const boardSize = 9;
const numMines = 10;
const resetTimeoutSeconds = 3;
const deltas = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export default function ConfirmationMinesweeper(props: RouteProps) {
  const { nextRoute } = props;

  const [state, setState] = useState<{
    board: Board;
    flagsCaptured: number;
    exploded: boolean;
    passed: boolean;
  }>({
    board: generateRandomBoard(),
    flagsCaptured: 0,
    exploded: false,
    passed: false,
  });

  const clickTile = (tile: Tile) => {
    setState(prev => {
      if (prev.exploded) {
        return prev;
      }
      if (prev.board[tile.index].revealed) {
        return prev;
      }
      let flagsCaptured = prev.flagsCaptured;
      let exploded = false;
      const board = cloneDeep(prev.board);
      board[tile.index].revealed = true;
      if (tile.flag) {
        flagsCaptured++;
      }
      if (tile.hasMine) {
        exploded = true;
        for (const t of board) {
          t.revealed = true;
        }
      } else if (tile.numNeighboringMines === 0) {
        // Recursively reveal.
        const queue = [tile];
        while (queue.length > 0) {
          const { x, y } = queue.shift() as Tile;
          for (const [dx, dy] of deltas) {
            const xx = x + dx;
            const yy = y + dy;
            if (!inBound(xx, yy)) {
              continue;
            }
            const t = board[boardIndex(xx, yy)];
            if (!t.revealed) {
              t.revealed = true;
              if (t.flag) {
                flagsCaptured++;
              }
              if (t.numNeighboringMines === 0) {
                queue.push(t);
              }
            }
          }
        }
      }
      return {
        ...prev,
        board,
        flagsCaptured,
        exploded,
        passed: prev.passed || flagsCaptured === 3,
      };
    });
  };

  const resetTimeoutId = useRef(0);
  useEffect(() => {
    if (state.exploded) {
      clearTimeout(resetTimeoutId.current);
      resetTimeoutId.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          board: generateRandomBoard(),
          flagsCaptured: 0,
          exploded: false,
        }));
      }, resetTimeoutSeconds * 1000);
    }
    return () => clearInterval(resetTimeoutId.current);
  }, [state]);

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 grid grid-cols-9 gap-1 sm:gap-1.5">
        {state.board.map((tile, i) => (
          <div
            key={i}
            className={classNames(
              'aspect-w-1 aspect-h-1 shadow-inner text-lg font-bold',
              !tile.revealed
                ? 'bg-gray-400 cursor-pointer'
                : tile.flag
                ? 'bg-green-500 text-white'
                : tile.hasMine
                ? 'bg-red-500'
                : 'bg-gray-200'
            )}
            onClick={() => clickTile(tile)}
          >
            {tile.revealed && (
              <div className="flex items-center justify-center select-none tabular-nums">
                {tile.flag ? (
                  tile.flag
                ) : tile.hasMine ? (
                  <Mine />
                ) : tile.numNeighboringMines > 0 ? (
                  <NeighboringMineCounter count={tile.numNeighboringMines} />
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      <ContinueButton show={state.passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}

function Mine() {
  return <FontAwesomeIcon icon={faBomb} />;
}

function NeighboringMineCounter({ count }: { count: number }) {
  switch (count) {
    case 1:
      return <span className="text-blue-500">1</span>;
    case 2:
      return <span className="text-green-500">2</span>;
    case 3:
      return <span className="text-red-500">3</span>;
    case 4:
      return <span className="text-indigo-700">4</span>;
    case 5:
      return <span className="text-red-700">5</span>;
    case 6:
      return <span className="text-teal-500">6</span>;
    case 7:
      return <span className="text-black">7</span>;
    case 8:
      return <span className="text-warmGray-400">8</span>;
    default:
      return <span>{count}</span>;
  }
}

function generateRandomBoard(): Board {
  const board: Board = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      board.push({
        index: boardIndex(x, y),
        x,
        y,
        hasMine: false,
        flag: null,
        numNeighboringMines: 0,
        revealed: false,
      });
    }
  }

  // Pick 3 + n special tiles, the first three for three flags 'Y', 'E' and 'S',
  // the rest for mines.
  const indices = multipick([...board.keys()], 3 + numMines);
  board[indices[0]].flag = 'Y';
  board[indices[1]].flag = 'E';
  board[indices[2]].flag = 'S';
  for (let i = 3; i < 3 + numMines; i++) {
    board[indices[i]].hasMine = true;
  }

  for (const tile of board) {
    const { x, y } = tile;
    for (const [dx, dy] of deltas) {
      const xx = x + dx;
      const yy = y + dy;
      if (!inBound(xx, yy)) {
        continue;
      }
      if (board[boardIndex(xx, yy)].hasMine) {
        tile.numNeighboringMines++;
      }
    }
  }

  return board;
}

function boardIndex(x: number, y: number): number {
  return x * boardSize + y;
}

function inBound(x: number, y: number): boolean {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}
