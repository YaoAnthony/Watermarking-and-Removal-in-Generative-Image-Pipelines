export interface TradeoffState {
  robustness: number; // 0-100
  imperceptibility: number; // 0-100
  capacity: number; // 0-100
}

export interface Point {
  x: number;
  y: number;
}

export enum WatermarkConcept {
  ROBUSTNESS = 'Robustness',
  IMPERCEPTIBILITY = 'Imperceptibility',
  CAPACITY = 'Embedded Capacity',
}
