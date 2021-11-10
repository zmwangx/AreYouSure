import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { VolumeUpIcon, VolumeOffIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { useWindowSize } from 'rooks';
import copyTextToClipboard from 'copy-text-to-clipboard';

import CountdownTimer from '@/components/CountdownTimer';
import Rick from '@/components/Rick';
import { primaryColorPalette } from '@/utils';

import './Flag.css';

const FLAG_TEXT = 'n3v3r 60nn4 61v3 y0u up.';
const selfDestructSeconds = 60;

export default function Flag() {
  const audio = useRef<HTMLAudioElement>(null);
  const [revealed, setRevealed] = useState(false);
  const reveal = () => {
    setRevealed(true);
    copyTextToClipboard(FLAG_TEXT);
    audio.current?.play();
  };
  const navigate = useNavigate();
  const destructTimeoutId = useRef(0);
  useEffect(() => {
    if (revealed) {
      destructTimeoutId.current = setTimeout(() => navigate('/'), selfDestructSeconds * 1000);
    }
    return () => clearTimeout(destructTimeoutId.current);
  }, [revealed]);

  const [muted, setMuted] = useState(false);
  const VolumeIcon = muted ? VolumeOffIcon : VolumeUpIcon;
  const toggleAudio = () => {
    if (audio.current) {
      audio.current.muted = !audio.current.muted;
    }
    setMuted(prev => !prev);
  };

  const { innerWidth: windowWidth } = useWindowSize();

  return (
    <div className="flex-1 p-6">
      <AnimatePresence exitBeforeEnter>
        {!revealed ? (
          <motion.div
            key="beforeReveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-2xl font-medium leading-loose text-rose-500">
              Guess you really are sure.
            </p>
            <button
              className="mt-4 mx-auto h-24 w-24 flex items-center justify-center rounded-2xl border border-transparent shadow-sm bg-rose-600 text-xl font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 select-none"
              onClick={reveal}
            >
              Reveal
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="afterReveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="Flag-flag-text"
              animate={{ backgroundPosition: ['100%', '-100%'] }}
              transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
            >
              {FLAG_TEXT}
            </motion.p>

            <div>
              <ArrowUpIcon className="h-4 w-4 text-gray-700 mx-auto" />
              <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-medium text-gray-700 text-center">
                Report this secret message back to whoever sent you here.{' '}
                <span className="whitespace-nowrap">It is already on your clipboard.</span>
              </p>
            </div>

            <motion.div
              className="flex items-center justify-center my-4"
              animate={{ color: primaryColorPalette }}
              transition={{ duration: 60 }}
            >
              <Rick maxWidth={(windowWidth || window.innerWidth) - 48} />
            </motion.div>

            <div className="mt-3">
              <p className="text-sm sm:text-base font-medium text-gray-700 text-center">
                This page self-destructs in:
              </p>
              <div className="mt-1 flex items-center justify-center">
                <CountdownTimer seconds={selfDestructSeconds} />
              </div>
            </div>

            <button className="fixed bottom-3 right-3">
              <VolumeIcon className="h-7 w-7 p-1 text-gray-700" onClick={toggleAudio} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audio} hidden>
        <source src="/rick.60s.opus" type="audio/ogg; codecs=opus" />
        <source src="/rick.60s.m4a" type="audio/mp4" />
      </audio>
    </div>
  );
}
