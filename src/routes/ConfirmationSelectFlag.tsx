import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

// Three countries for YES, plus 17 other most populous countries.
import YE from 'flag-icon-css/flags/4x3/ye.svg'; // Yemen
import ET from 'flag-icon-css/flags/4x3/et.svg'; // Ethiopia
import ZA from 'flag-icon-css/flags/4x3/za.svg'; // South Africa
import CN from 'flag-icon-css/flags/4x3/cn.svg'; // China
import IN from 'flag-icon-css/flags/4x3/in.svg'; // India
import US from 'flag-icon-css/flags/4x3/us.svg'; // United States
import ID from 'flag-icon-css/flags/4x3/id.svg'; // Indonesia
import PK from 'flag-icon-css/flags/4x3/pk.svg'; // Pakistan
import BR from 'flag-icon-css/flags/4x3/br.svg'; // Brazil
import NG from 'flag-icon-css/flags/4x3/ng.svg'; // Nigeria
import BD from 'flag-icon-css/flags/4x3/bd.svg'; // Bangladesh
import RU from 'flag-icon-css/flags/4x3/ru.svg'; // Russia
import MX from 'flag-icon-css/flags/4x3/mx.svg'; // Mexico
import JP from 'flag-icon-css/flags/4x3/jp.svg'; // Japan
import PH from 'flag-icon-css/flags/4x3/ph.svg'; // Philippines
import EG from 'flag-icon-css/flags/4x3/eg.svg'; // Egypt
import VN from 'flag-icon-css/flags/4x3/vn.svg'; // Vietnam
import CD from 'flag-icon-css/flags/4x3/cd.svg'; // DR Congo
import IR from 'flag-icon-css/flags/4x3/ir.svg'; // Iran
import TR from 'flag-icon-css/flags/4x3/tr.svg'; // Turkey

const flags = [YE, ET, ZA, CN, IN, US, ID, PK, BR, NG, BD, RU, MX, JP, PH, EG, VN, CD, IR, TR];

import ConfirmationRoute from '@/components/ConfirmationRoute';
import { DeterministicPrng, RouteProps } from '@/utils';
import ContinueButton from '@/components/ContinueButton';

export default function ConfirmationSelectFlag(props: RouteProps) {
  const { nextRoute, seed } = props;

  const g = new DeterministicPrng(seed);
  const selectIndices = [0, 1, 2].map(() => g.shuffled([...flags.keys()]));

  const [selected, setSelected] = useState([-1, -1, -1]);
  const select = (index: number, value: number) => {
    setSelected(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  const passed = selected[0] === 0 && selected[1] === 1 && selected[2] === 2;

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 flex items-center justify-center">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <Flag src={YE} />
            <span className="text-sm font-medium text-gray-700">Y = Yemen</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flag src={ET} />
            <span className="text-sm font-medium text-gray-700">E = Ethiopia</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flag src={ZA} />
            <span className="text-sm font-medium text-gray-700">S = South Africa</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-row items-center justify-center space-x-2">
        {[0, 1, 2].map(i => (
          <FlagSelect key={i} indices={selectIndices[i]} onChange={val => select(i, val)} />
        ))}
      </div>

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}

function FlagSelect({ indices, onChange }: { indices: number[]; onChange: (idx: number) => void }) {
  const [selected, setSelected] = useState(indices[0]);
  useEffect(() => onChange(selected), [selected]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
            <span className="flex items-center">
              <Flag src={flags[selected]} grayscale={true} />
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {indices.map(index => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-green-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={index}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <Flag src={flags[index]} grayscale={true} />
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-green-600',
                            'absolute inset-y-0 right-0 flex items-center pr-2'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

function Flag({ src, grayscale }: { src: string; grayscale?: boolean }) {
  return (
    <img
      src={src}
      alt=""
      className={classNames('flex-shrink-0 h-6 w-8 border border-gray-200 shadow-sm', {
        'filter grayscale': grayscale,
      })}
    />
  );
}
