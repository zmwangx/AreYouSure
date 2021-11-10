import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from '@fortawesome/free-solid-svg-icons';

import { DieValue } from '@/utils';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

export default function Die({ value, size = '5x' }: { value: DieValue; size?: SizeProp }) {
  const icon = (val: DieValue) => {
    switch (val) {
      case 1:
        return faDiceOne;
      case 2:
        return faDiceTwo;
      case 3:
        return faDiceThree;
      case 4:
        return faDiceFour;
      case 5:
        return faDiceFive;
      case 6:
        return faDiceSix;
    }
  };
  return <FontAwesomeIcon icon={icon(value)} size={size} />;
}
