import { useViewport } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";
import wallTexture from "./wall.jpg";

import "./style.scss";

const DivRenderStrategyTextured = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  return (
    <div className="div-render-strategy-textured">
      {rays.map((ray, index) => {
        if (!ray.hit) return null;

        return (
          <div
            className="strip"
            style={{
              width: stripWidth,
              height: ray.stripHeight,
              left: stripWidth * index,
              top: (viewport.height - ray.stripHeight) / 2,
            }}
            key={index}
          >
            <img
              src={wallTexture}
              style={{
                height: ray.stripHeight,
                width: ray.stripHeight,
                left: -(ray.hitPercent.x * ray.stripHeight),
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DivRenderStrategyTextured;
