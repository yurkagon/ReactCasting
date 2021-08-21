import { FC, useEffect } from "react";
import cn from "classnames";

import { range, useViewport } from "../../utils";

import Raycaster, { getZIndexByDistance, useRays } from "../../Raycaster";

import SpriteLayer from "./SpriteLayer";
import Weapon from "./Weapon";

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
            ? ray.collision.floatPart.z
            : ray.collision.floatPart.x;

        const textureSizeValue = 2;
        const textureMove = float * ray.stripHeight * textureSizeValue;

        const lightLevel = range(
          ray.collision.wall.sidesLight[ray.collision.collisionSide],
          0.1,
          0.8
        );

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
              top:
                (viewport.height - ray.stripHeight) / 2 +
                ray.stripHeight * raycaster.player.position.y,
              zIndex: getZIndexByDistance(ray.hitDistance),
            }}
            key={index}
          >
            <div
              className="texture"
              style={{
                backgroundImage: `url(${ray.collision.wall.texture})`,
                height: ray.stripHeight,
                width: ray.stripHeight,
                backgroundSize: "cover",
                backgroundPositionX: -textureMove,
                opacity: lightLevel,
              }}
            />
          </div>
        );
      })}

      <SpriteLayer />

      <Weapon />
    </div>
  );
};

export default DivRenderStrategyTextured;
