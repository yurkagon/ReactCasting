import { useState, useEffect } from "react";
import { useViewport as useViewportCore } from "@toolz/use-viewport";
import memoize from "lodash/memoize";

import Settings from "../Settings";

import Scene from "../Scene";

export { default as Angle } from "./angle";

export const calculateDistance = (p1: Position, p2: Position): number => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.z - p1.z) ** 2);
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

const calculateViewport = memoize((width: number): Viewport => {
  const viewportWidth = Math.round(width * Settings.viewPortSizeMultiplier);
  const viewportHeight = Math.round(viewportWidth * (1 / Settings.dimension));

  return { width: viewportWidth, height: viewportHeight };
});

export const getViewport = (): Viewport => {
  return calculateViewport(window.innerWidth);
};

export const useViewport = (): Viewport => {
  const viewPort = useViewportCore();

  return calculateViewport(viewPort.width);
};

export const limit = (value: number, limit: number): number => {
  if (value > limit) return limit;

  return value;
};

export const minimum = (value: number, min: number): number => {
  if (value < min) return min;

  return value;
};

export const range = (value: number, min: number, max: number): number => {
  return limit(minimum(value, min), max);
};

export const useSceneUpdate = () => {
  const [updateCount, setUpdateCount] = useState(0);
  const [deltaTime, setDeltaTime] = useState(0);

  const scene = Scene.getInstance();

  useEffect(() => {
    const subscriber = () => {
      setUpdateCount((prev) => prev + 1);

      setDeltaTime(scene.deltaTime);
    };
    scene.subscribe(subscriber);

    return () => {
      scene.unsubscribe(subscriber);
    };
  }, [scene]);

  return { updateCount, deltaTime };
};
