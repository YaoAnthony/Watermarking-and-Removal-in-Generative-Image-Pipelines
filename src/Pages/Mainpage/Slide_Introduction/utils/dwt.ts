import { DWTResult } from '../types';

/**
 * Performs a 1D Haar Wavelet Transform on a single row/col.
 * In-place modification is possible, but we use new arrays for clarity.
 */
const haar1d = (data: Float32Array): { avg: Float32Array; diff: Float32Array } => {
  const len = data.length;
  const half = len / 2;
  const avg = new Float32Array(half);
  const diff = new Float32Array(half);

  for (let i = 0; i < half; i++) {
    const a = data[2 * i];
    const b = data[2 * i + 1];
    avg[i] = (a + b) / 2;
    diff[i] = (a - b) / 2;
  }
  return { avg, diff };
};

/**
 * Performs Inverse 1D Haar Wavelet Transform.
 */
const ihaar1d = (avg: Float32Array, diff: Float32Array): Float32Array => {
  const half = avg.length;
  const len = half * 2;
  const data = new Float32Array(len);

  for (let i = 0; i < half; i++) {
    const a = avg[i] + diff[i];
    const b = avg[i] - diff[i];
    data[2 * i] = a;
    data[2 * i + 1] = b;
  }
  return data;
};

/**
 * Performs 2D Haar DWT.
 * Assumes square image with dimensions power of 2 for simplicity, 
 * but this implementation works for any even dimension.
 */
export const dwt2d = (pixels: Float32Array, width: number, height: number): DWTResult => {
  const halfW = width / 2;
  const halfH = height / 2;

  // Intermediate buffers
  const rowL = new Float32Array(width * height / 2); // Low freq (horizontal)
  const rowH = new Float32Array(width * height / 2); // High freq (horizontal)

  // 1. Process Rows
  for (let y = 0; y < height; y++) {
    const row = pixels.slice(y * width, (y + 1) * width);
    const { avg, diff } = haar1d(row);
    // Copy into intermediate buffers
    for (let x = 0; x < halfW; x++) {
      rowL[y * halfW + x] = avg[x];
      rowH[y * halfW + x] = diff[x];
    }
  }

  // 2. Process Cols (on both L and H results from step 1)
  const ll = new Float32Array(halfW * halfH);
  const lh = new Float32Array(halfW * halfH);
  const hl = new Float32Array(halfW * halfH);
  const hh = new Float32Array(halfW * halfH);

  // Helper to process columns of a flattened array
  const processCols = (source: Float32Array, destL: Float32Array, destH: Float32Array) => {
    for (let x = 0; x < halfW; x++) {
      const col = new Float32Array(height);
      for (let y = 0; y < height; y++) {
        col[y] = source[y * halfW + x];
      }
      const { avg, diff } = haar1d(col);
      for (let y = 0; y < halfH; y++) {
        destL[y * halfW + x] = avg[y];
        destH[y * halfW + x] = diff[y];
      }
    }
  };

  processCols(rowL, ll, lh); // LL (Low-Low) and LH (Low-High) -> Note: standard naming usually puts vertical decomposition second
  processCols(rowH, hl, hh); // HL (High-Low) and HH (High-High)

  return { width: halfW, height: halfH, ll, lh, hl, hh };
};

/**
 * Performs 2D Inverse Haar DWT.
 */
export const idwt2d = (dwt: DWTResult): Float32Array => {
  const { width: halfW, height: halfH, ll, lh, hl, hh } = dwt;
  const fullW = halfW * 2;
  const fullH = halfH * 2;

  const rowL = new Float32Array(fullH * halfW);
  const rowH = new Float32Array(fullH * halfW);

  // 1. Inverse Cols
  const processColsInv = (srcL: Float32Array, srcH: Float32Array, dest: Float32Array) => {
    for (let x = 0; x < halfW; x++) {
      const colL = new Float32Array(halfH);
      const colH = new Float32Array(halfH);
      for (let y = 0; y < halfH; y++) {
        colL[y] = srcL[y * halfW + x];
        colH[y] = srcH[y * halfW + x];
      }
      const reconstructedCol = ihaar1d(colL, colH);
      for (let y = 0; y < fullH; y++) {
        dest[y * halfW + x] = reconstructedCol[y];
      }
    }
  };

  processColsInv(ll, lh, rowL);
  processColsInv(hl, hh, rowH);

  // 2. Inverse Rows
  const output = new Float32Array(fullW * fullH);
  for (let y = 0; y < fullH; y++) {
    const rL = new Float32Array(halfW);
    const rH = new Float32Array(halfW);
    for (let x = 0; x < halfW; x++) {
      rL[x] = rowL[y * halfW + x];
      rH[x] = rowH[y * halfW + x];
    }
    const row = ihaar1d(rL, rH);
    for (let x = 0; x < fullW; x++) {
      output[y * fullW + x] = row[x];
    }
  }

  return output;
};

/**
 * Creates a visual representation of the Frequency Domain.
 * We normalize high-frequency bands to make them visible.
 */
export const visualizeDWT = (dwt: DWTResult): Float32Array => {
  const { width, height, ll, lh, hl, hh } = dwt;
  const fullW = width * 2;
  const fullH = height * 2;
  const output = new Float32Array(fullW * fullH);

  // Copy LL (Direct copy, roughly 0-255)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      output[y * fullW + x] = ll[y * width + x];
    }
  }

  // Helper to normalize and copy coefficients
  // High freq coeffs are usually small (near 0) and can be negative. 
  // We shift by +128 and scale to make them visible.
  const copyBand = (band: Float32Array, offsetX: number, offsetY: number) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Logarithmic scaling for better visibility or just linear shift
        let val = band[y * width + x];
        val = Math.abs(val) * 2; // Boost contrast
        output[(y + offsetY) * fullW + (x + offsetX)] = val;
      }
    }
  };

  copyBand(hl, width, 0);      // Top Right
  copyBand(lh, 0, height);     // Bottom Left
  copyBand(hh, width, height); // Bottom Right

  return output;
};
