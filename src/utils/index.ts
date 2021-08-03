import { useViewport as useViewportCore } from "@toolz/use-viewport";

import Settings from "../Settings";

export { default as Angle } from "./angle";

export const calculateDistance = (p1: Position, p2: Position): number => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

export const getCharByStripHeight = (
  height: number,
  maxHeight: number
): string => {
  const charsSpectre = ",,:;I&&00%$@@#";

  let key = Math.round((height / maxHeight) * charsSpectre.length);
  if (key < 0) key = 0;
  if (key >= charsSpectre.length) key = charsSpectre.length - 1;

  const char = charsSpectre[key];

  return charsSpectre[key];
};

export const useViewport = (): { width: number; height: number } => {
  const viewPort = useViewportCore();

  return {
    width: Math.round(viewPort.width * Settings.viewPortSizeMultiplier),
    height: Math.round(viewPort.height * Settings.viewPortSizeMultiplier),
  };
};

export const limit = (value: number, limit: number): number => {
  if (value > limit) return limit;

  return value;
};
