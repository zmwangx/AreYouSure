import { motion, MotionValue } from 'framer-motion';

export default function Wheel({
  handRotate,
  targetRotate,
  onClick,
}: {
  handRotate: MotionValue<number>;
  targetRotate: MotionValue<number>;
  onClick: () => void;
}) {
  return (
    <svg className="h-full w-full cursor-pointer" viewBox="-100 -100 200 200" onClick={onClick}>
      <circle className="fill-current text-red-300" cx="0" cy="0" r="100" />
      {/* Disk sector spanning from 258 degrees to 282 degrees, accounting for 1/15 of the disk. */}
      <motion.g style={{ originX: '0', originY: '0', rotate: targetRotate }}>
        <motion.path
          className="fill-current text-green-300"
          d="M-20.582 97.815a99.984 99.984 0 0 0 41.582 0L.209 0l-20.791 97.815z"
        />
        <text
          className="fill-current text-green-700 text-xs select-none"
          x="0"
          y="90"
          textAnchor="middle"
        >
          Yes
        </text>
      </motion.g>
      {/* Hand */}
      <motion.path
        className="fill-current text-white"
        d="M2.549-94.981A2.52 2.52 0 0 0 .031-97.5H.019A2.52 2.52 0 0 0-2.5-94.981V-.019A2.52 2.52 0 0 0 .019 2.5h.012A2.52 2.52 0 0 0 2.549-.019v-94.962Z"
        style={{ originX: '0', originY: '0', rotate: handRotate }}
      />
    </svg>
  );
}
