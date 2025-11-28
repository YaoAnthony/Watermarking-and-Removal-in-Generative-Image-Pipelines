export type SubbandType = 'LL' | 'HL' | 'LH' | 'HH';

export interface DWTResult {
  width: number;
  height: number;
  ll: Float32Array;
  hl: Float32Array;
  lh: Float32Array;
  hh: Float32Array;
}

export interface ProcessingResult {
  originalPreview: string;
  watermarkPreview: string;
  dwtVisualization: string;
  watermarkedImage: string;
  differenceImage: string;
}
