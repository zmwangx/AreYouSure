import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, useAnimation } from 'framer-motion';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import { RouteProps } from '@/utils';

const frustrationRevealThreshold = 20;
const secondsBeforeHintReveal = 40;

export default function ConfirmationScroll(props: RouteProps) {
  const { nextRoute } = props;
  const navigate = useNavigate();

  const controls = useAnimation();
  const showHint = () => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 2,
      },
    });
  };
  const [frustrationCounter, setFrustrationCounter] = useState(0);
  const clickNo = () => {
    setFrustrationCounter(prev => prev + 1);
  };
  useEffect(() => {
    // Show hint after clicking the wrong button too many times.
    if (frustrationCounter === frustrationRevealThreshold) {
      showHint();
    }
  }, [frustrationCounter]);
  useEffect(() => {
    // Show hint after a while.
    const timeoutId = setTimeout(showHint, secondsBeforeHintReveal * 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 h-12 space-y-3 overflow-y-scroll px-2 hide-scrollbar">
        <button
          type="button"
          className="w-full h-10 flex item-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          onClick={clickNo}
        >
          No
        </button>
        <button
          type="button"
          className="w-full h-10 flex item-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
          onClick={() => navigate(nextRoute)}
        >
          Yes
        </button>
      </div>

      <motion.div
        className="mt-1 text-sm text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        Hint: scrollable regions can hide stuff.
      </motion.div>
    </ConfirmationRoute>
  );
}
