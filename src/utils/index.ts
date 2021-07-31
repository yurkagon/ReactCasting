import { useViewport as useViewportCore } from "@toolz/use-viewport";

import Settings from "../Settings";

export { default as Angle } from "./angle";

export const calculateDistance = (p1: Position, p2: Position): number => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

export const useViewport = (): { width: number; height: number } => {
  const viewPort = useViewportCore();

  return {
    width: viewPort.width * Settings.viewPortSizeMultiplier,
    height: viewPort.height * Settings.viewPortSizeMultiplier,
  };
};
