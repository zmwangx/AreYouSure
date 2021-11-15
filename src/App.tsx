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
import { colors, DeterministicPrng, primaryColorPalette } from '@/utils';
import { useStopwatch } from '@/hooks/useStopwatch';

export default function App({ seed }: { seed: number }) {
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
  const seeds = Confirmations.map(() => g.random());
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

      <div className="fixed top-2 left-2">
        <Stopwatch stopwatch={stopwatch} color={stopwatchColor} />
      </div>
    </>
  );
}
