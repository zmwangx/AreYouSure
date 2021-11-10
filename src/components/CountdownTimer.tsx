import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import colors from 'tailwindcss/colors';

export default function CountdownTimer({ seconds }: { seconds: number }) {
  const secondsRemaining = useMotionValue(seconds);
  const [countdown, setCountdown] = useState(Math.ceil(seconds));
  const percentage = useTransform(secondsRemaining, [seconds, 0], [1, 0]);
  const color = useTransform(
    secondsRemaining,
    [seconds, seconds / 2, 0],
    [colors.green[500], colors.yellow[500], colors.red[500]]
  );

  const intervalId = useRef(0);
  useEffect(() => {
    const deadline = Date.now() + seconds * 1000;
    const update = () => {
      const remaining = (deadline - Date.now()) / 1000;
      if (remaining <= 0) {
        clearInterval(intervalId.current);
        secondsRemaining.set(0);
        setCountdown(0);
      } else {
        secondsRemaining.set(remaining);
        setCountdown(Math.ceil(remaining));
      }
    };

    intervalId.current = setInterval(update, 16);
    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-20 w-20 text-blue-500">
      <motion.div className="text-xl font-medium tabular-nums" style={{ color }}>
        {countdown}
      </motion.div>
      <svg className="absolute top-0 right-0 h-full w-full" viewBox="-10 -10 60 60">
        <path
          className="text-gray-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength: percentage,
            color,
            rotate: 90,
            scaleX: -1, // Reverse direction of line animation
          }}
        />
      </svg>
    </div>
  );
}
