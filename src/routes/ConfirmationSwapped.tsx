import { useNavigate } from 'react-router';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import { RouteProps } from '@/utils';

export default function ConfirmationSwapped(props: RouteProps) {
  const { nextRoute } = props;
  const navigate = useNavigate();

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
        >
          No
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => navigate(nextRoute)}
        >
          Yes
        </button>
      </div>
    </ConfirmationRoute>
  );
}
