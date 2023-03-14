import { useEffect, useState } from "react";
import { colord } from "colord";
import { rotate } from "2d-array-rotation";

import { useViewport, range } from "../../utils";

import Settings from "../../Settings";

import Raycaster, { useRays } from "../../Raycaster";

import devtoolsImg from "./devtools.png";

import "./style.scss";

const ConsoleColoredRenderStrategy = () => {
  const [renderedData, setRenderedData] = useState<string[][]>(null);

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

      const isShadedSide =
        ray.collision.collisionSide === "top" ||
        ray.collision.collisionSide === "right";

      const charArray = Array.from({ length: normalizedCharHeight }).fill(
        generateColorWithShade(ray.collision.wall.color, charHeight, {
          max: isShadedSide ? 0.7 : 0.9,
        })
      );

      const emptyCellsCount = Settings.consoleHeight - normalizedCharHeight;

      const topEmptyCellsCount = Math.ceil(emptyCellsCount / 2);
      const bottomEmptyCellsCount = emptyCellsCount - topEmptyCellsCount;

      for (let i = 0; i < topEmptyCellsCount; i++) {
        charArray.push("#212121");
      }

      for (let i = 0; i < bottomEmptyCellsCount; i++) {
        charArray.unshift("#110d1a");
      }

      return charArray;
    });

    const rotatedCharArray: string[][] = rotate(charArray, 270);

    setRenderedData(rotatedCharArray);
  }, [rays]);

  useEffect(() => {
    if (!renderedData) return;

    const consoleStyles = [];

    const renderedString = renderedData
      .map((arr) => {
        return arr
          .map((color, i, arr) => {
            const isPreviousColorSame = arr[i - 1] === color;
            if (isPreviousColorSame) return " ";

            consoleStyles.push(`background: ${color}`);

            return `%c `;
          })
          .join("");
      })
      .join("\n");

    console.log(
      `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n` + renderedString,
      ...consoleStyles
    );
  }, [renderedData]);

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

const generateColorWithShade = (
  color: string,
  charHeight: number,
  { min = 0.1, max = 0.9, addition = 0.3 } = {}
) => {
  const lightLevel =
    1 - range(charHeight / Settings.consoleHeight + addition, min, max);

  return colord(color).mix("black", +lightLevel.toFixed(1)).toHex();
};

export default ConsoleColoredRenderStrategy;
