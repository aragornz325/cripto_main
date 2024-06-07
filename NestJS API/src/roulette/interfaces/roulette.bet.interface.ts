export interface RouletteBet {
  number?: number;
  quarter?: any[];
  double?: any[];
  isOdd?: boolean;
  color?: string;
  row?: number;
  column?: number;
  doubleColumns?: any[];
  lessThanEighteen?: boolean;
  dozen?: number;
  bet: number;
  type: string;
  won?: boolean;
  winMultiplier?: number;
}
