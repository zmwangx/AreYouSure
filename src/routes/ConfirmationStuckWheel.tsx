import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import ContinueButton from '@/components/ContinueButton';
import Wheel from '@/components/Wheel';
import { RouteProps } from '@/utils';

export default function ConfirmationStuckWheel(props: RouteProps) {
  const { nextRoute } = props;

  const [rotating, setRotating] = useState(false);
  const start = () => {
    setRotating(true);
  };
  const [passed, setPassed] = useState(false);

  const handRotateDiscreet = useMotionValue(0);
  const handRotate = useSpring(handRotateDiscreet, { stiffness: 400, damping: 100 });
  const targetRotate = useMotionValue(0);

  const timeoutId = useRef(0);
  useEffect(() => {
    if (rotating) {
      // Starting.
      handRotateDiscreet.set(handRotateDiscreet.get() + 5);
      timeoutId.current = setTimeout(() => setRotating(false), 1000);
    } else {
      // Stopping, check whether the hand has stopped in the target region.
      const position = handRotateDiscreet.get() % 360;
      if (position >= 168 && position <= 192) {
        setPassed(true);
      }
    }
    return () => clearTimeout(timeoutId.current);
  }, [rotating]);

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 p-3 flex items-center justify-center relative">
        <Wheel handRotate={handRotate} targetRotate={targetRotate} onClick={start} />
      </div>

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}
