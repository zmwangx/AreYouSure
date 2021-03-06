import { useState } from 'react';
import { memoize } from 'lodash';

import frames from '@/assets/rick-frames.json';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

// Never Gonna Give You Up music video, in ASCII animation form.
export default function Rick({ maxWidth }: { maxWidth?: number }) {
  const [frameIndex, setFrameIndex] = useState(0);
  useAnimationFrame(elapsedMs => {
    setFrameIndex(Math.min(Math.floor(elapsedMs / 80), frames.length - 1));
  });
  const scale = maxWidth ? Math.min(maxWidth / (measureDefaultWidth() || 1), 1) : 1;
  const fontSize = 16 * scale;
  return (
    <pre className="block font-mono font-normal" style={{ fontSize }}>
      {frames[frameIndex]}
    </pre>
  );
}

// Measure width of the pre block without scaling, so that we can decide the
// necessary scaling factor for narrow viewports.
const measureDefaultWidth = memoize(() => {
  const pre = document.createElement('pre');
  pre.className = 'block font-mono font-normal text-transparent';
  pre.style.position = 'absolute';
  pre.style.left = '-9999px';
  pre.style.top = '-9999px';
  pre.style.fontSize = '16px';
  pre.innerText = frames[0];
  document.body.appendChild(pre);
  const width = pre.clientWidth;
  document.body.removeChild(pre);
  return width;
});
