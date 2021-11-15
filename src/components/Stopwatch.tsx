import { Fragment } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import colors from 'tailwindcss/colors';

import { Stopwatch as StopwatchProps } from '@/hooks/useStopwatch';
import { primaryColorPalette } from '@/utils';

export default function Stopwatch({
  stopwatch,
  color = colors.gray[500],
}: {
  stopwatch: StopwatchProps;
  color?: string;
}) {
  const minutesRotate = useTransform(stopwatch.motionMinutes, x => x * 6);
  const secondsRotate = useTransform(stopwatch.motionSeconds, x => x * 6);
  return (
    <Menu as="div">
      {({ open }) => (
        <>
          <Menu.Button
            as="div"
            className={classNames(
              'flex items-center justify-center p-1.5 rounded-full shadow space-x-1.5 text-white select-none cursor-pointer hover:opacity-100',
              open ? 'opacity-100' : 'opacity-50'
            )}
            style={{ backgroundColor: color }}
          >
            <svg className="h-5 w-5" viewBox="-100 -100 200 200">
              <circle cx="0" cy="0" r="100" fill="white" />
              <motion.rect
                x="-10"
                y="-50"
                width="20"
                height="60"
                rx="10"
                fill={color}
                style={{ originX: '0', originY: '0', rotate: minutesRotate }}
              />
              <motion.rect
                x="-10"
                y="-90"
                width="20"
                height="100"
                rx="10"
                fill={color}
                style={{ originX: '0', originY: '0', rotate: secondsRotate }}
              />
            </svg>
            <span className="text-sm tabular-nums pr-1">{formatTime(stopwatch.totalSeconds)}</span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-left absolute left-0 mt-2 flex rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 tabular-nums">
                {stopwatch.marks.map((mark, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={classNames(
                          'px-4 py-0.5 text-sm whitespace-nowrap',
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        )}
                      >
                        <span style={{ color: primaryColorPalette[i] }}>#{zeropad(i + 1, 2)}:</span>{' '}
                        {formatTime(mark)} (+{formatTime(mark - (stopwatch.marks[i - 1] ?? 0))})
                      </div>
                    )}
                  </Menu.Item>
                ))}
                {stopwatch.marks.length === 0 && (
                  <Menu.Item>
                    <div className="px-4 py-0.5 text-sm text-gray-700 whitespace-nowrap">
                      Timing details will be displayed here.
                    </div>
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

function formatTime(secs: number): string {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}:${zeropad(seconds.toFixed(2), 5)}`;
}

function zeropad(x: number | string, length: number): string {
  return x.toString().padStart(length, '0');
}
