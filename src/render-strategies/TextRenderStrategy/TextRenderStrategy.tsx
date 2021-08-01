import { useEffect } from "react";
import { rotate } from "2d-array-rotation";

import { useViewport, getCharByStripHeight } from "../../utils";

import Settings from "../../Settings";

import Raycaster, { useRays } from "../../Raycaster";

import "./style.scss";

const TextRenderStrategy = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  useEffect(() => {
    raycaster.setRaysCount(
      Math.floor(viewport.width * Settings.viewportWidthToCharsScaleCoefficient)
    );
  }, [viewport.width]);

  if (!rays.length) return null;

  const height = Math.floor(
    viewport.height * Settings.viewportHeightToCharsScaleCoefficient
  );

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

  return (
    <div className="text-render-strategy">
      <textarea value={str} rows={height} readOnly />
    </div>
  );
};

export default TextRenderStrategy;
