/**
 * Loads an image from a source URL and returns it as an HTMLImageElement.
 */
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

/**
 * Resizes an image to specific dimensions and returns the ImageData (RGBA).
 */
export const getImageData = (img: HTMLImageElement, width: number, height: number): ImageData => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Could not get canvas context");
  
  // Fill white first to handle transparency
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
};

/**
 * Converts ImageData back to a base64 string for display.
 */
export const imageDataToBase64 = (imageData: ImageData): string => {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
};

/**
 * Converts RGBA ImageData to a single channel Grayscale Float32Array.
 * Range: 0-255
 */
export const rgbaToGrayscale = (imageData: ImageData): Float32Array => {
  const { width, height, data } = imageData;
  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    // Standard luminance formula
    gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }
  return gray;
};

/**
 * Converts a Grayscale Float32Array back to RGBA ImageData.
 */
export const grayscaleToRgba = (gray: Float32Array, width: number, height: number): ImageData => {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const val = Math.max(0, Math.min(255, gray[i])); // Clamp
    data[i * 4] = val;     // R
    data[i * 4 + 1] = val; // G
    data[i * 4 + 2] = val; // B
    data[i * 4 + 3] = 255; // Alpha
  }
  return new ImageData(data, width, height);
};
