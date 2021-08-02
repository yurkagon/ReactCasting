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

        // TODO: handle textures in better way
        const percent = ray.hitPercent.x;
        // ray.hitPercent.x > ray.hitPercent.y
        //   ? ray.hitPercent.y
        //   : ray.hitPercent.x;

        const textureMove = percent * ray.stripHeight;

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
            {/* <img
              src={wallTexture}
              style={{
                height: ray.stripHeight,
                width: ray.stripHeight,
                left: -textureMove,
              }}
            /> */}

            <div
              className="texture"
              style={{
                backgroundImage: `url(${wallTexture})`,
                height: ray.stripHeight,
                width: ray.stripHeight,
                backgroundSize: "cover",
                backgroundPositionX: -textureMove,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DivRenderStrategyTextured;
