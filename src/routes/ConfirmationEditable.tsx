import { useNavigate } from 'react-router';
import { useState } from 'react';
import classNames from 'classnames';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import { RouteProps } from '@/utils';

export default function ConfirmationEditable(props: RouteProps) {
  const { nextRoute } = props;
  const navigate = useNavigate();

  const [label, setLabel] = useState('No');
  const labelIsYes = label.trim().toLowerCase() === 'yes';

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3">
        <button
          type="button"
          className={classNames(
            'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
            labelIsYes
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
          )}
          onClick={() => {
            if (labelIsYes) {
              navigate(nextRoute);
            }
          }}
        >
          <input
            type="text"
            name="name"
            id="name"
            className="block border-0 border-b border-transparent bg-transparent focus:border-white focus:ring-0 text-base sm:text-sm text-center leading-none py-0"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </button>
      </div>
    </ConfirmationRoute>
  );
}
