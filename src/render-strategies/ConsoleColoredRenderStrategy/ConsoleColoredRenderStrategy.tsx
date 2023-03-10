import { useEffect, useState } from "react";
import { rotate } from "2d-array-rotation";
import Color from "color";

import { useViewport, range, limit } from "../../utils";

import Settings from "../../Settings";

import Raycaster, { useRays } from "../../Raycaster";

import devtoolsImg from "./devtools.jpeg";

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

  const height = Math.floor(Settings.consoleHeight);

  useEffect(() => {
    if (!rays.length) return null;

    const charArray = rays.map((ray) => {
      const stripHeightCoefficient = 200;

      const charHeight = Math.round(
        (ray.stripHeight / stripHeightCoefficient) * height
      );
      const normalizedCharHeight = charHeight > height ? height : charHeight;

      const isShadedSide =
        ray.collision.collisionSide === "top" ||
        ray.collision.collisionSide === "right";

      const charArray = Array.from({ length: normalizedCharHeight }).fill(
        colorDarkness(ray.collision.wall.color, charHeight, {
          max: isShadedSide ? 0.8 : 0.9,
        })
      );

      const emptyCellsCount = height - normalizedCharHeight;

      const topEmptyCellsCount = Math.ceil(emptyCellsCount / 2);
      const bottomEmptyCellsCount = emptyCellsCount - topEmptyCellsCount;

      for (let i = 0; i < topEmptyCellsCount; i++) {
        charArray.push("lightblue");
      }

      for (let i = 0; i < bottomEmptyCellsCount; i++) {
        charArray.unshift("green");
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

const colorDarkness = (
  color: string,
  charHeight: number,
  { min = 0.3, max = 0.9 } = {}
) => {
  const lightLevel =
    1 - range((charHeight / Settings.consoleHeight) * 2, min, max);

  return Color(color).darken(+lightLevel.toFixed(2)).string();
};

export default ConsoleColoredRenderStrategy;
