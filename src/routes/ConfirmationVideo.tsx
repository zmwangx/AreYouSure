import ConfirmationRoute from '@/components/ConfirmationRoute';
import EntryGate from '@/components/EntryGate';
import { RouteProps } from '@/utils';

const acceptableAnswers = ['1:09', '1:10', '01:09', '01:10'];

export default function ConfirmationVideo(props: RouteProps) {
  const { nextRoute } = props;

  return (
    <ConfirmationRoute {...props} wide>
      <div className="mt-3">
        <p className="text-base text-gray-900">
          If you&rsquo;re sure, find the first occurrence of the word &ldquo;yeah&rdquo; in the
          following video and type in the timestamp.
        </p>
        <div className="py-2">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dElRVQFqj-k"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center">
          <EntryGate
            acceptableAnswers={acceptableAnswers}
            placeholder="Format: 3:05"
            nextRoute={nextRoute}
          />
        </div>
      </div>
    </ConfirmationRoute>
  );
}
