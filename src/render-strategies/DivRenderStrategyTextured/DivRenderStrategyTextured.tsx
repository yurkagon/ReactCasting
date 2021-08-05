import { FC } from "react";
import cn from "classnames";

import { useViewport } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";

import wallData from "./wallData";

import { Props } from "./types";

import "./style.scss";

const DivRenderStrategyTextured: FC<Props> = ({ skyboxEnabled }) => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  return (
    <div
      className={cn(
        "div-render-strategy-textured",
        skyboxEnabled ? "skybox" : "gradient"
      )}
      style={
        skyboxEnabled
          ? {
              backgroundPositionX:
                -raycaster.player.position.rotation * viewport.width,
            }
          : undefined
      }
    >
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
