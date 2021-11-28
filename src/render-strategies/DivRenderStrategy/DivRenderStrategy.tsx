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

        const isShadedSide =
          ray.collision.collisionSide === "top" ||
          ray.collision.collisionSide === "right";

        const rgbMax = isShadedSide ? 170 : 100;
        const colorValue = limit(
          (rgbMax * ray.stripHeight) / viewport.height,
          rgbMax
        );

        const backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;

        return (
          <div
            className="strip"
            style={{
              /*
                HOTFIX: Adding 0.1 fixes transparent lines on the viewport
              */
              width: stripWidth + 0.1,
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
