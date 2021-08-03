import { useViewport } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";

import wallData from "./wallData";

import "./style.scss";

const DivRenderStrategyTextured = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  return (
    <div className="div-render-strategy-textured">
      {rays.map((ray, index) => {
        if (!ray.collision) return null;

        const float =
          ray.collision.collisionSide === "left" ||
          ray.collision.collisionSide === "right"
            ? ray.collision.floatPart.y
            : ray.collision.floatPart.x;

        const textureMove = +float * ray.stripHeight;

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
                backgroundImage: `url(${wallData[ray.collision.cell]})`,
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
