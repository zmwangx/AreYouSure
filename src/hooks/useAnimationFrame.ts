import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (elapsedMs: number) => void) {
  const requestId = useRef(0);
  const initialTimestamp = useRef(-1);
  const stopped = useRef(false);
  const animate = (timestamp: number) => {
    if (initialTimestamp.current < 0) {
      initialTimestamp.current = timestamp;
    }
    callback(timestamp - initialTimestamp.current);
    if (!stopped.current) {
      requestId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId.current);
  }, []);

  const stop = () => {
    stopped.current = true;
    cancelAnimationFrame(requestId.current);
  };
  const reset = () => {
    stop();
    initialTimestamp.current = -1;
    stopped.current = false;
    requestId.current = requestAnimationFrame(animate);
  };

  return {
    stop,
    reset,
  };
}
