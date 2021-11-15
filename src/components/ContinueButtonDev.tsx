import { useNavigate } from 'react-router';
import { ArrowRightIcon } from '@heroicons/react/solid';

export default function ContinueButtonDev({ nextRoute }: { nextRoute: string }) {
  const navigate = useNavigate();
  return (
    <div className="fixed top-2 right-2 text-sm text-gray-500">
      <button onClick={() => navigate(nextRoute)}>
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
