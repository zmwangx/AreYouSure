import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowSmRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

export default function EntryGate({
  acceptableAnswers,
  placeholder,
  // Update preset to overwrite with the specified value.
  preset = '',
  nextRoute,
}: {
  acceptableAnswers: string[];
  placeholder: string;
  preset?: string;
  nextRoute: string;
}) {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState('');
  const passed = acceptableAnswers.includes(answer.trim());

  useEffect(() => {
    setAnswer(preset);
  }, [preset]);

  return (
    <div className="w-full sm:max-w-xs flex rounded-md shadow-sm">
      <div className="relative flex items-stretch flex-grow focus-within:z-10">
        <input
          type="text"
          className="focus:ring-green-500 focus:border-green-500 block w-full rounded-none rounded-l-md pl-3 sm:text-sm border-gray-300"
          placeholder={placeholder}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
      </div>
      <button
        type="button"
        className={classNames(
          '-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 focus:outline-none ',
          passed
            ? 'bg-green-500 hover:bg-green-600 focus:ring-1 focus:ring-green-500 focus:border-green-500'
            : 'cursor-not-allowed bg-gray-200'
        )}
        onClick={() => {
          if (passed) {
            navigate(nextRoute);
          }
        }}
      >
        <ArrowSmRightIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
