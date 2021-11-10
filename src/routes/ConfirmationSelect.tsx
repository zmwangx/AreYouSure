import { useEffect, useState } from 'react';

import ConfirmationRoute from '@/components/ConfirmationRoute';
import ContinueButton from '@/components/ContinueButton';
import { RouteProps, shuffled } from '@/utils';

// Use homographs for YES so that they can't be easily selected through typing:
// U+03A5: Υ, GREEK CAPITAL LETTER UPSILON
// U+0395: Ε, GREEK CAPITAL LETTER EPSILON
// U+0405: Ѕ, CYRILLIC CAPITAL LETTER DZE
const Y = '\u03A5';
const E = '\u0395';
const S = '\u0405';
const alphabet = `ABCD${E}FGHIJKLMNOPQR${S}TUVWX${Y}Z`.split('');

export default function ConfirmationSelect(props: RouteProps) {
  const { nextRoute } = props;

  const [selected, setSelected] = useState(['', '', '']);
  const select = (index: number, value: string) => {
    setSelected(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  const passed = selected[0] === Y && selected[1] === E && selected[2] === S;

  return (
    <ConfirmationRoute {...props}>
      <div className="mt-3 flex flex-row items-center justify-center space-x-2">
        <CharacterSelect onChange={ch => select(0, ch)} />
        <CharacterSelect onChange={ch => select(1, ch)} />
        <CharacterSelect onChange={ch => select(2, ch)} />
      </div>

      <ContinueButton show={passed} nextRoute={nextRoute} />
    </ConfirmationRoute>
  );
}

function CharacterSelect({ onChange }: { onChange: (ch: string) => void }) {
  const chars = shuffled(alphabet);
  useEffect(() => {
    // Report initial state.
    onChange(chars[0]);
  }, []);
  return (
    <select
      id="location"
      name="location"
      className="mt-1 block min-w-0 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
      onChange={e => onChange(e.target.value)}
    >
      {chars.map(ch => (
        <option key={ch}>{ch}</option>
      ))}
    </select>
  );
}
