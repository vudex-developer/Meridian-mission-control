export type PreviewTarget = "flip" | "iphone" | "desktop";

export type PreviewFrame = {
  target: PreviewTarget;
  label: string;
  width: number;
  height: number;
  scaleBaseWidth: number;
};

export const previewFrames: Record<PreviewTarget, PreviewFrame> = {
  flip: {
    target: "flip",
    label: "Galaxy Flip",
    width: 1080,
    height: 2640,
    scaleBaseWidth: 360,
  },
  iphone: {
    target: "iphone",
    label: "Apple iPhone",
    width: 1290,
    height: 2796,
    scaleBaseWidth: 430,
  },
  desktop: {
    target: "desktop",
    label: "PC Desktop",
    width: 2880,
    height: 1620,
    scaleBaseWidth: 1440,
  },
};
