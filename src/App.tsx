import { Navigate, Route, Routes } from 'react-router';
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

export default function App() {
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
  const isLast = (i: number) => i === Confirmations.length - 1;
  return (
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
                />
              }
            />
          ))}
          <Route path="/flag" element={<Flag />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
