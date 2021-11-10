import { useState } from 'react';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import ContinueButton from '@/components/ContinueButton';
import Die from '@/components/Die';
import { DieValue, RouteProps, unfairDiceThrow } from '@/utils';

export default function ConfirmationDie(props: RouteProps) {
  const { nextRoute } = props;

  const [value, setValue] = useState<DieValue>(1);
  const passed = value === 6;
  const throwDie = () => {
    setValue(unfairDiceThrow(0.08));
  };

  return (
    <ConfirmationRoute {...props}>
      <p className="mt-3 text-base text-gray-900 text-center">Throw a six to continue:</p>
      <div className="mt-3 flex items-center justify-center text-blue-600 p-2">
        <Die value={value} />
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

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}
