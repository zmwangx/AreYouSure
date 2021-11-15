import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (elapsedMs: number) => void) {
  const requestId = useRef(0);
  const initialTimestamp = useRef(-1);
  const animate = (timestamp: number) => {
    if (initialTimestamp.current < 0) {
      initialTimestamp.current = timestamp;
    }
    callback(timestamp - initialTimestamp.current);
    requestId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId.current);
  }, []);

  const stop = () => cancelAnimationFrame(requestId.current);
  const reset = () => {
    stop();
    initialTimestamp.current = -1;
    requestId.current = requestAnimationFrame(animate);
  };

  return {
    stop,
    reset,
  };
}
