import { useNavigate } from 'react-router';
import classNames from 'classnames';

export default function ContinueButton({ show, nextRoute }: { show: boolean; nextRoute: string }) {
  const navigate = useNavigate();
  return (
    <div className={classNames('mt-3 flex items-center justify-center', show ? null : 'invisible')}>
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm select-none"
        onClick={() => navigate(nextRoute)}
      >
        Continue
      </button>
    </div>
  );
}
