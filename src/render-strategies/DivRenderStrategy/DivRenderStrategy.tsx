import { useViewport, limit } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";

import "./style.scss";

const DivRenderStrategy = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  return (
    <div className="div-render-strategy">
      {rays.map((ray, index) => {
        if (!ray.collision) return null;

        const rgbMax = 170;
        const colorValue = limit(
          (rgbMax * ray.stripHeight) / viewport.height,
          rgbMax
        );

        const backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;

        return (
          <div
            className="strip"
            style={{
              width: stripWidth,
              height: ray.stripHeight,
              left: stripWidth * index,
              top: (viewport.height - ray.stripHeight) / 2,
              backgroundColor,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default DivRenderStrategy;
