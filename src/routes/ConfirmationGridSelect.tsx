import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import CountdownTimer from '@/components/CountdownTimer';
import ContinueButton from '@/components/ContinueButton';
import { DeterministicPrng, RouteProps } from '@/utils';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const initialRefreshSeconds = 3;
const minRefreshSeconds = 3;
const maxRefreshSeconds = 12;

export default function ConfirmationGridSelect(props: RouteProps) {
  const { nextRoute, seed } = props;

  const [state, setState] = useState<{
    chars: string[];
    selected: number[];
    timerSeconds: number;
    timerKey: number;
  }>({
    chars: generateRandomGrid(new DeterministicPrng(seed)),
    selected: [],
    timerSeconds: initialRefreshSeconds,
    timerKey: Date.now(),
  });
  const selectChar = (index: number) => {
    setState(s => {
      return s.selected.length < 3 && !s.selected.includes(index)
        ? {
            ...s,
            selected: [...s.selected, index],
          }
        : s;
    });
  };
  const passed =
    state.chars[state.selected[0]] === 'Y' &&
    state.chars[state.selected[1]] === 'E' &&
    state.chars[state.selected[2]] === 'S';
  const passedRef = useRef(passed);
  passedRef.current = passed;

  // Refresh the grid every couple of seconds.
  const refreshTimeoutId = useRef(0);
  useEffect(() => {
    const refresh = () => {
      const refreshSeed = Date.now();
      setState(s => {
        if (passedRef.current) {
          return s;
        }
        const g = new DeterministicPrng(refreshSeed);
        const refreshSeconds = Math.round(g.random(minRefreshSeconds, maxRefreshSeconds));
        clearTimeout(refreshTimeoutId.current);
        refreshTimeoutId.current = setTimeout(refresh, refreshSeconds * 1000);
        return {
          ...s,
          chars: generateRandomGrid(g),
          selected: [],
          timerSeconds: refreshSeconds,
          timerKey: Date.now(),
        };
      });
    };

    refreshTimeoutId.current = setTimeout(refresh, initialRefreshSeconds * 1000);
    return () => clearTimeout(refreshTimeoutId.current);
  }, []);

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {state.chars.map((ch, i) => (
          <div
            key={i}
            className={classNames(
              'aspect-w-1 aspect-h-1 shadow-inner',
              state.selected.includes(i)
                ? 'bg-green-500'
                : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
            )}
            onClick={() => selectChar(i)}
          >
            <div className="flex items-center justify-center select-none">{ch}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center">
        <CountdownTimer key={state.timerKey} seconds={state.timerSeconds} />
      </div>

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}

function generateRandomGrid(g: DeterministicPrng): string[] {
  const chars = ['Y', 'E', 'S'];
  for (let i = 0; i < 46; i++) {
    chars.push(g.pick(alphabet));
  }
  return g.shuffled(chars);
}
