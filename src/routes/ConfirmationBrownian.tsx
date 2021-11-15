import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import { DeterministicPrng, RouteProps } from '@/utils';

export default function ConfirmationBrownian(props: RouteProps) {
  const { nextRoute, seed } = props;
  const navigate = useNavigate();

  const g = new DeterministicPrng(seed);
  const brownianSeries = brownian({
    g,
    minX: 20,
    minY: 20,
    maxX: window.innerWidth - 20,
    maxY: window.innerHeight - 20,
    stepSize: 50,
    steps: 3000,
  });
  const xs = brownianSeries.map(({ x }) => x);
  const ys = brownianSeries.map(({ y }) => y);

  return (
    <ConfirmationRoute {...props}>
      <motion.button
        className="fixed top-0 left-0 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-4 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 select-none z-50"
        animate={{
          x: xs,
          y: ys,
          rotate: 360,
        }}
        transition={{
          x: { duration: 300, ease: 'linear', repeat: Infinity },
          y: { duration: 300, ease: 'linear', repeat: Infinity },
          rotate: { duration: 2, ease: 'linear', repeat: Infinity },
        }}
        onClick={() => navigate(nextRoute)}
      >
        Yes
      </motion.button>
    </ConfirmationRoute>
  );
}

function brownian({
  g,
  minX,
  minY,
  maxX,
  maxY,
  stepSize,
  steps,
}: {
  g: DeterministicPrng;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  stepSize: number;
  steps: number;
}): { x: number; y: number }[] {
  const series: { x: number; y: number }[] = [];
  if (steps <= 0) {
    return series;
  }
  let x = g.random(minX * 0.75 + maxX * 0.25, minX * 0.25 + maxX * 0.75);
  let y = g.random(minY * 0.75 + maxY * 0.25, minY * 0.25 + maxY * 0.75);
  series.push({ x, y });
  let i = 1;
  while (i < steps) {
    const angle = g.random(0, 2 * Math.PI);
    const newX = x + stepSize * Math.cos(angle);
    const newY = y + stepSize * Math.sin(angle);
    if (newX < minX || newX > maxX || newY < minY || newY > maxY) {
      continue;
    }
    x = newX;
    y = newY;
    series.push({ x, y });
    i++;
  }
  return series;
}
