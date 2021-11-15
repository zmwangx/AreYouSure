import seedrandom, { prng } from 'seedrandom';
import colors from 'tailwindcss/colors';

export type RouteProps = {
  index: number;
  total: number;
  nextRoute: string;
  seed: number;
};

export { colors };
export const primaryColorPalette = [
  colors.red[500],
  colors.orange[500],
  colors.amber[500],
  colors.yellow[500],
  colors.lime[500],
  colors.green[500],
  colors.emerald[500],
  colors.teal[500],
  colors.cyan[500],
  colors.sky[500],
  colors.blue[500],
  colors.indigo[500],
  colors.violet[500],
  colors.purple[500],
  colors.fuchsia[500],
  colors.pink[500],
  colors.rose[500],
  colors.red[500],
];

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;

export class DeterministicPrng {
  g: prng.Prng;

  constructor(seed: number) {
    this.g = seedrandom(seed);
  }

  public random(): number;
  public random(floor: number, ceil: number): number;
  public random(floor?: number, ceil?: number): number {
    floor = floor ?? 0;
    ceil = ceil ?? 1;
    return this.g() * (ceil - floor) + floor;
  }

  public shuffled<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.g() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  public pick<T>(array: T[]): T {
    return array[Math.floor(this.g() * array.length)];
  }

  public multipick<T>(array: T[], n: number): T[] {
    const arr = this.shuffled(array);
    return arr.slice(0, n);
  }
}

export function unfairDiceThrow(g: DeterministicPrng, prob6: number): DieValue {
  // const threshold1 = 0;
  const threshold2 = (1 - prob6) / 5;
  const threshold3 = threshold2 * 2;
  const threshold4 = threshold2 * 3;
  const threshold5 = threshold2 * 4;
  const threshold6 = 1 - prob6; // === threshold2 * 5
  const r = g.random();
  if (r >= threshold6) return 6;
  if (r >= threshold5) return 5;
  if (r >= threshold4) return 4;
  if (r >= threshold3) return 3;
  if (r >= threshold2) return 2;
  return 1;
}
