import { useEffect, useState } from "react";
import { rotate } from "2d-array-rotation";

import { useViewport, getCharByStripHeight } from "../../utils";

import Settings from "../../Settings";

import Raycaster, { useRays } from "../../Raycaster";

import devtoolsImg from "./devtools.jpeg";

import "./style.scss";

const ConsoleRenderStrategy = () => {
  const [renderedString, setRenderedString] = useState<string>(null);

  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  useEffect(() => {
    const previousRaysCount = raycaster.raysCount;

    raycaster.setRaysCount(Settings.consoleRaysCount);

    return () => raycaster.setRaysCount(previousRaysCount);
  }, []);

  useEffect(() => {
    if (!rays.length) return null;

    const charArray = rays.map((ray) => {
      const stripHeightCoefficient = 200;

      const charHeight = Math.round(
        (ray.stripHeight_CONSOLE / stripHeightCoefficient) *
          Settings.consoleHeight
      );
      const normalizedCharHeight =
        charHeight > Settings.consoleHeight
          ? Settings.consoleHeight
          : charHeight;

      const charArray = Array.from({ length: normalizedCharHeight }).fill(
        getCharByStripHeight(normalizedCharHeight, Settings.consoleHeight)
      );

      const emptyCellsCount = Settings.consoleHeight - normalizedCharHeight;

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

    const rotatedCharArray: string[][] = rotate(charArray, 270);

    const str = rotatedCharArray.map((el) => el.join("")).join("\n");

    setRenderedString(str);
  }, [rays]);

  useEffect(() => {
    if (renderedString)
      console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n` + renderedString);
  }, [renderedString]);

  useEffect(() => {
    return () => console.clear();
  }, []);

  return (
    <div className="console-render-strategy">
      <div className="description">
        <h3>Open browser console</h3>
        <img src={devtoolsImg} width={viewport.width} />
      </div>
    </div>
  );
};

export default ConsoleRenderStrategy;
