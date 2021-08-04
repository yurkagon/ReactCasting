import { useViewport, limit } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";

import wallData from "./wallData";

import "./style.scss";

const DivRenderStrategyTextured = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  console.log(raycaster.player.position);

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

        const textureMove = float * ray.stripHeight;

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
              src={wallData[ray.collision.cell]}
              style={{
                height: ray.stripHeight,
                width: ray.stripHeight,
                left: -textureMove,
                opacity: (ray.stripHeight * 2) / viewport.height,
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
                opacity: (ray.stripHeight * 2) / viewport.height,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DivRenderStrategyTextured;
