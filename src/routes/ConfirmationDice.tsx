import { useState } from 'react';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import ContinueButton from '@/components/ContinueButton';
import Die from '@/components/Die';
import { DeterministicPrng, DieValue, RouteProps, unfairDiceThrow } from '@/utils';

export default function ConfirmationDice(props: RouteProps) {
  const { nextRoute } = props;

  const [state, setState] = useState<{ values: [DieValue, DieValue]; passed: boolean }>({
    values: [1, 1],
    passed: false,
  });
  const throwDie = () => {
    const g = new DeterministicPrng(Math.random());
    const values: [DieValue, DieValue] = [unfairDiceThrow(g, 1 / 6), unfairDiceThrow(g, 1 / 6)];
    const passed = values[0] === 6 && values[1] === 6;
    setState(prev => {
      return {
        values,
        passed: prev.passed || passed,
      };
    });
  };

  return (
    <ConfirmationRoute {...props}>
      <p className="mt-3 text-base text-gray-900 text-center">
        Throw two simultaneous sixes to continue:
      </p>
      <div className="mt-3 flex items-center justify-center text-blue-600 space-x-4 p-2">
        <Die value={state.values[0]} />
        <Die value={state.values[1]} />
      </div>
      <div className="mt-3 flex items-center justify-center">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          onClick={() => throwDie()}
        >
          Throw
        </button>
      </div>

      <ContinueButton show={state.passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}
