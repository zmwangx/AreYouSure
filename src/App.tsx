import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';

import ConfirmationRegular from '@/routes/ConfirmationRegular';
import ConfirmationSwapped from '@/routes/ConfirmationSwapped';
import ConfirmationEditable from '@/routes/ConfirmationEditable';
import ConfirmationBrownian from '@/routes/ConfirmationBrownian';
import ConfirmationSelect from '@/routes/ConfirmationSelect';
import ConfirmationSelectFlag from '@/routes/ConfirmationSelectFlag';
import ConfirmationGridSelect from '@/routes/ConfirmationGridSelect';
import ConfirmationMinesweeper from '@/routes/ConfirmationMinesweeper';
import ConfirmationSevenSegment from '@/routes/ConfirmationSevenSegment';
import ConfirmationDie from '@/routes/ConfirmationDie';
import ConfirmationDice from '@/routes/ConfirmationDice';
import ConfirmationWheel from '@/routes/ConfirmationWheel';
import ConfirmationStuckWheel from '@/routes/ConfirmationStuckWheel';
import ConfirmationVideo from '@/routes/ConfirmationVideo';
import ConfirmationPhysics from '@/routes/ConfirmationPhysics';
import ConfirmationScroll from '@/routes/ConfirmationScroll';
import Flag from '@/routes/Flag';
import Stopwatch from '@/components/Stopwatch';
import {
  colors,
  DeterministicPrng,
  getLocalStorage,
  primaryColorPalette,
  setLocalStorage,
} from '@/utils';
import { useStopwatch } from '@/hooks/useStopwatch';

const COMPLETED_AT_LOCALSTORAGE_KEY = 'completedAt';

export default function App({ seed }: { seed: number }) {
  const [completed, setCompleted] = useState(
    getLocalStorage(COMPLETED_AT_LOCALSTORAGE_KEY) !== undefined
  );

  const Confirmations = [
    ConfirmationRegular,
    ConfirmationSwapped,
    ConfirmationEditable,
    ConfirmationBrownian,
    ConfirmationSelect,
    ConfirmationSelectFlag,
    ConfirmationGridSelect,
    ConfirmationMinesweeper,
    ConfirmationSevenSegment,
    ConfirmationDie,
    ConfirmationDice,
    ConfirmationWheel,
    ConfirmationStuckWheel,
    ConfirmationVideo,
    ConfirmationPhysics,
    ConfirmationScroll,
  ];
  const confirmationPaths = Confirmations.map((_, i) => `/${i + 1}`);
  const g = new DeterministicPrng(seed);
  const [seeds, setSeeds] = useState(Confirmations.map(() => g.random()));
  const isLast = (i: number) => i === Confirmations.length - 1;

  const stopwatch = useStopwatch();
  const [stopwatchColor, setStopwatchColor] = useState<string>();
  const location = useLocation();
  useEffect(() => {
    const route = location.pathname;
    if (confirmationPaths.includes(route)) {
      if (route === '/1') {
        stopwatch.reset();
      } else {
        stopwatch.mark();
      }
      setStopwatchColor(primaryColorPalette[confirmationPaths.indexOf(route)]);
    } else if (location.pathname === '/flag') {
      stopwatch.stop();
      setStopwatchColor(colors.rose[500]);

      setCompleted(true);
      setLocalStorage(COMPLETED_AT_LOCALSTORAGE_KEY, Date.now());

      // Reset all seeds so that subsequent runs don't have the same initial state.
      const g = new DeterministicPrng(Date.now());
      setSeeds(Confirmations.map(() => g.random()));
    }
  }, [location]);

  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Navigate to="/1" />} />
            {Confirmations.map((Confirmation, i) => (
              <Route
                key={i}
                path={`/${i + 1}`}
                element={
                  <Confirmation
                    index={i}
                    total={Confirmations.length}
                    nextRoute={isLast(i) ? '/flag' : `/${i + 2}`}
                    seed={seeds[i]}
                  />
                }
              />
            ))}
            <Route path="/flag" element={<Flag />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>

      {completed && (
        <div className="fixed top-2 left-2">
          <Stopwatch stopwatch={stopwatch} color={stopwatchColor} />
        </div>
      )}
    </>
  );
}
