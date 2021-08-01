import { useEffect, useState } from "react";
import { rotate } from "2d-array-rotation";

import { getCharByStripHeight } from "../../utils";

import Settings from "../../Settings";

import Raycaster, { useRays } from "../../Raycaster";

import "./style.scss";

const TextRenderStrategy = () => {
  const [previousRaysCount, setPreviousRaysCount] = useState<number>(null);
  const [renderedString, setRenderedString] = useState<string>(null);

  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  useEffect(() => {
    setPreviousRaysCount(raycaster.raysCount);

    raycaster.setRaysCount(Settings.consoleRaysCount);

    return () => raycaster.setRaysCount(previousRaysCount);
  }, []);

  const height = Math.floor(Settings.consoleHeight);

  useEffect(() => {
    if (!rays.length) return null;

    const charArray = rays.map((ray) => {
      const stripHeightCoefficient = 480;

      const charHeight = Math.round(
        (ray.stripHeight / stripHeightCoefficient) * height
      );
      const normalizedCharHeight = charHeight > height ? height : charHeight;

      const charArray = Array.from({ length: normalizedCharHeight }).fill(
        getCharByStripHeight(normalizedCharHeight, height)
      );

      const emptyCellsCount = height - normalizedCharHeight;

      const topEmptyCellsCount = Math.ceil(emptyCellsCount / 2);
      const bottomEmptyCellsCount = emptyCellsCount - topEmptyCellsCount;

      for (let i = 0; i < topEmptyCellsCount; i++) {
        charArray.push(" ");
      }
      for (let i = 0; i < bottomEmptyCellsCount; i++) {
        charArray.unshift("_");
      }

      return charArray;
    });

    const rotatedCharArray = rotate(charArray, 270);

    const str = rotatedCharArray.map((el) => el.join("")).join("\n");

    setRenderedString(str);
  }, [rays]);

  useEffect(() => {
    console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
    console.log(renderedString);
  }, [renderedString]);

  return null;
};

export default TextRenderStrategy;
