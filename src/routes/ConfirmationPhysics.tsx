import { useEffect, useState } from 'react';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import CountdownTimer from '@/components/CountdownTimer';
import EntryGate from '@/components/EntryGate';
import { RouteProps } from '@/utils';

// @/src/assets/ball.svg gets translated to /@fs/src/src/assets/ball.svg in the
// development server, and fails to render. Therefore we have to use a relative
// path here.
import questionSvg from '../assets/ball.svg';

const acceptableAnswers = ['20.2', '20,2'];
const secondsBeforeAnswerReveal = 60;

export default function ConfirmationPhysics(props: RouteProps) {
  const { nextRoute } = props;

  const [state, setState] = useState<{ answerRevealAvailable: boolean; answerRevealed: boolean }>({
    answerRevealAvailable: false,
    answerRevealed: false,
  });
  useEffect(() => {
    // Show escape hatch after a while.
    const timeoutId = setTimeout(() => {
      setState(prev => ({
        ...prev,
        answerRevealAvailable: true,
      }));
    }, secondsBeforeAnswerReveal * 1000);
    return () => clearTimeout(timeoutId);
  });
  const revealAnswer = () => {
    setState(prev => ({
      ...prev,
      answerRevealed: true,
    }));
  };

  return (
    <ConfirmationRoute {...props} wide>
      <div className="mt-3">
        <div className="text-base text-gray-900 leading-tight space-y-2">
          <p>If you&rsquo;re sure, answer the following question.</p>
          <p>
            A ball is released 30m from ground with a horizontal initial velocity. In order to hit
            the point marked &ldquo;YES&rdquo; on the ground 50m ahead, what should the initial
            velocity be? Use <span className="whitespace-nowrap">m/s</span> as unit and round to one
            decimal place.
          </p>
        </div>

        <div className="mt-3 p-1 border border-gray-200">
          <div className="aspect-w-3 aspect-h-2">
            <img src={questionSvg} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <EntryGate
            acceptableAnswers={acceptableAnswers}
            placeholder="Format: 69.1"
            preset={state.answerRevealed ? acceptableAnswers[0] : ''}
            nextRoute={nextRoute}
          />
        </div>

        <div className="mt-3 flex items-center justify-center space-x-1">
          <CountdownTimer seconds={secondsBeforeAnswerReveal} />
          {state.answerRevealAvailable &&
            (!state.answerRevealed ? (
              <span
                className="text-sm text-blue-500 underline cursor-pointer"
                onClick={revealAnswer}
              >
                I don&rsquo;t know the first thing about physics.
              </span>
            ) : (
              <span className="text-sm text-gray-900">That&rsquo;s a shame.</span>
            ))}
        </div>
      </div>
    </ConfirmationRoute>
  );
}
