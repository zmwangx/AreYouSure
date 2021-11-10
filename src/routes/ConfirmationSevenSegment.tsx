import { useState } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import ContinueButton from '@/components/ContinueButton';
import { pick, RouteProps } from '@/utils';

export default function ConfirmationSevenSegment(props: RouteProps) {
  const { nextRoute } = props;

  const [selected, setSelected] = useState<number[][]>([[], [], []]);
  const select = (charIdx: number, segmentIdx: number) => {
    setSelected(prev => {
      const clone = cloneDeep(prev);
      // 50% probability of one random existing segment unselected automatically.
      if (Math.random() < 0.5) {
        const subscripts = clone.map((sub, i) => [...sub.keys()].map(j => [i, j])).flat();
        if (subscripts.length > 0) {
          const [i, j] = pick(subscripts);
          clone[i].splice(j, 1);
        }
      }
      clone[charIdx].push(segmentIdx);
      return clone;
    });
  };
  const passed = selected[0].length === 5 && selected[1].length === 5 && selected[2].length === 5;

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 flex items-center justify-center space-x-3 sm:space-x-4">
        <SevenSegment
          enabled={[1, 2, 3, 5, 6]}
          selected={selected[0]}
          onSelect={segmentIdx => select(0, segmentIdx)}
        />
        <SevenSegment
          enabled={[0, 1, 3, 4, 6]}
          selected={selected[1]}
          onSelect={segmentIdx => select(1, segmentIdx)}
        />
        <SevenSegment
          enabled={[0, 1, 3, 5, 6]}
          selected={selected[2]}
          onSelect={segmentIdx => select(2, segmentIdx)}
        />
      </div>

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}

function SevenSegment({
  enabled,
  selected,
  onSelect,
}: {
  enabled: number[];
  selected: number[];
  onSelect: (segmentIdx: number) => void;
}) {
  // Based on https://upload.wikimedia.org/wikipedia/commons/3/3b/Seven-segment_8.svg.
  // Segment indices:
  // -- 0 --
  // 1     2
  // -- 3 --
  // 4     5
  // -- 6 --
  const paths = [
    'M18 3.52 15.395 6l-8.967-.014L4 3.493 6.415 1h9.035L18 3.52z',
    'M3.52 5 6 7.605l-.014 8.967L3.493 19 1 16.585V7.55L3.52 5z',
    'M18.52 5 21 7.605l-.014 8.967L18.493 19 16 16.585V7.55L18.52 5z',
    'M18 20.52 15.395 23l-8.967-.014L4 20.493 6.415 18h9.035L18 20.52z',
    'M3.52 22 6 24.605l-.014 8.967L3.493 36 1 33.585V24.55L3.52 22z',
    'M18.52 22 21 24.605l-.014 8.967L18.493 36 16 33.585V24.55L18.52 22z',
    'M18 37.52 15.395 40l-8.967-.014L4 37.493 6.415 35h9.035L18 37.52z',
  ];
  return (
    <svg className="w-20 sm:w-24" viewBox="0 0 22 41">
      <g>
        {paths.map((d, i) => (
          <path
            key={i}
            className={classNames(
              enabled.includes(i)
                ? selected.includes(i)
                  ? 'text-green-600'
                  : 'text-gray-300 cursor-pointer'
                : 'text-gray-100'
            )}
            fill="currentColor"
            d={d}
            onClick={() => {
              if (enabled.includes(i) && !selected.includes(i)) {
                onSelect(i);
              }
            }}
          />
        ))}
      </g>
    </svg>
  );
}
