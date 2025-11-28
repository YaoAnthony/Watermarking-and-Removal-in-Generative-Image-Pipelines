export interface DiffusionState {
  step: number;
  totalSteps: number;
  isPlaying: boolean;
  direction: 'forward' | 'backward';
}

export interface ExplanationResponse {
  title: string;
  explanation: string;
  keyTakeaway: string;
}

export enum ProcessType {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD'
}
