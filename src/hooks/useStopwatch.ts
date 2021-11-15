import { MotionValue, useMotionValue } from 'framer-motion';
import { useState } from 'react';

import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export type Stopwatch = {
  totalSeconds: number;
  motionMinutes: MotionValue<number>;
  motionSeconds: MotionValue<number>;
  marks: number[];
  mark: () => void;
  stop: () => void;
  reset: () => void;
};

export function useStopwatch(): Stopwatch {
  const [state, setState] = useState<{ totalSeconds: number; marks: number[] }>({
    totalSeconds: 0,
    marks: [],
  });
  const motionMinutes = useMotionValue(0);
  const motionSeconds = useMotionValue(0);
  const { stop: stopTimer, reset: resetTimer } = useAnimationFrame(elapsedMs => {
    const secs = elapsedMs / 1000;
    setState(prev => ({
      ...prev,
      totalSeconds: secs,
    }));
    motionMinutes.set(Math.floor(secs / 60));
    motionSeconds.set(secs % 60);
  });
  const mark = () => {
    setState(prev => ({
      ...prev,
      marks: [...prev.marks, prev.totalSeconds],
    }));
  };
  const stop = () => {
    stopTimer();
    setState(prev => ({
      ...prev,
      marks: [...prev.marks, prev.totalSeconds],
    }));
  };
  const reset = () => {
    resetTimer();
    setState(prev => ({
      ...prev,
      marks: [],
    }));
  };
  return {
    totalSeconds: state.totalSeconds,
    motionMinutes,
    motionSeconds,
    marks: state.marks,
    mark,
    stop,
    reset,
  };
}
