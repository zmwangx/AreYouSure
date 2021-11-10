import colors from 'tailwindcss/colors';

export type RouteProps = {
  index: number;
  total: number;
  nextRoute: string;
};

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

export function random(floor: number, ceil: number): number {
  return Math.random() * (ceil - floor) + floor;
}

export function shuffled<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pick<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function multipick<T>(array: T[], n: number): T[] {
  const arr = shuffled(array);
  return arr.slice(0, n);
}

export function unfairDiceThrow(prob6: number): DieValue {
  // const threshold1 = 0;
  const threshold2 = (1 - prob6) / 5;
  const threshold3 = threshold2 * 2;
  const threshold4 = threshold2 * 3;
  const threshold5 = threshold2 * 4;
  const threshold6 = 1 - prob6; // === threshold2 * 5
  const r = Math.random();
  if (r >= threshold6) return 6;
  if (r >= threshold5) return 5;
  if (r >= threshold4) return 4;
  if (r >= threshold3) return 3;
  if (r >= threshold2) return 2;
  return 1;
}
