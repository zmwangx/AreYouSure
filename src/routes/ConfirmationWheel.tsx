import { useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import Wheel from '@/components/Wheel';
import ContinueButton from '@/components/ContinueButton';
import { RouteProps } from '@/utils';

const intervalMs = 16;
const handRotationDegreesPerSecond = 720;
const handRotationDegreesPerSecondReduced = 240;
const targetRotationDegreesPerSecond = 180;
const targetRotationDegreesPerSecondReduced = 60;
const numAttemptsBeforeReducingSpeed = 20;

export default function ConfirmationWheel(props: RouteProps) {
  const { nextRoute } = props;

  const [rotating, setRotating] = useState(false);
  const toggle = () => {
    setRotating(prev => !prev);
  };
  const [reducedSpeed, setReducedSpeed] = useState(false);
  const reducedSpeedRef = useRef(false);
  reducedSpeedRef.current = reducedSpeed;
  const [passed, setPassed] = useState(false);
  const passedRef = useRef(false);
  passedRef.current = passed;

  const handRotate = useMotionValue(0);
  const targetRotate = useMotionValue(0);
  const intervalId = useRef(0);
  const numAttempts = useRef(0);
  useEffect(() => {
    if (rotating) {
      // Starting.
      numAttempts.current++;
      if (numAttempts.current === numAttemptsBeforeReducingSpeed + 1 && !passedRef.current) {
        setReducedSpeed(true);
      }
      intervalId.current = setInterval(() => {
        const handDps = reducedSpeedRef.current
          ? handRotationDegreesPerSecondReduced
          : handRotationDegreesPerSecond;
        const targetDps = reducedSpeedRef.current
          ? targetRotationDegreesPerSecondReduced
          : targetRotationDegreesPerSecond;
        handRotate.set((handRotate.get() + (intervalMs / 1000) * handDps) % 360);
        targetRotate.set((targetRotate.get() + (intervalMs / 1000) * targetDps) % 360);
      }, intervalMs);
    } else {
      // Stopping.
      clearInterval(intervalId.current);
      const handPosition = handRotate.get() % 360;
      const targetPosition = (180 + targetRotate.get()) % 360;
      if (
        between(handPosition, targetPosition - 372, targetPosition - 348) ||
        between(handPosition, targetPosition - 12, targetPosition + 12) ||
        between(handPosition, targetPosition + 348, targetPosition + 372)
      ) {
        setPassed(true);
      }
    }
    return () => clearInterval(intervalId.current);
  }, [rotating]);

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 p-3 flex items-center justify-center relative">
        <Wheel handRotate={handRotate} targetRotate={targetRotate} onClick={toggle} />
        {!passed && reducedSpeed && (
          <p
            className="absolute left-0 w-full text-sm text-gray-700 text-center"
            style={{ bottom: '-1rem' }}
          >
            Speed reduced because you suck.
          </p>
        )}
      </div>

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}

function between(x: number, low: number, high: number): boolean {
  return x >= low && x <= high;
}
