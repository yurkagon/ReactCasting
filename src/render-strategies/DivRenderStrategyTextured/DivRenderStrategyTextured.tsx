import { FC, useEffect } from "react";
import cn from "classnames";

import { range, useViewport } from "../../utils";

import Raycaster, { getZIndexByDistance, useRays } from "../../Raycaster";

import { SpriteFactory } from "../../Sprite";

import SpriteLayer from "./SpriteLayer";
import Weapon from "./Weapon";

import { Props } from "./types";

import "./style.scss";

const DivRenderStrategyTextured: FC<Props> = ({ skyboxEnabled }) => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  useEffect(() => {
    SpriteFactory.create("guard", { x: 45, y: 50 });
    SpriteFactory.create("guard", { x: 45, y: 60 });

    SpriteFactory.create("guard", { x: 55, y: 60 });
    SpriteFactory.create("guard", { x: 65, y: 50 });

    SpriteFactory.create("cage", { x: 430, y: 45 });
    SpriteFactory.create("cage", { x: 430, y: 65 });

    SpriteFactory.create("lamp", { x: 144, y: 241 });
    SpriteFactory.create("lamp", { x: 303, y: 177 });
    SpriteFactory.create("lamp", { x: 303, y: 81 });
    SpriteFactory.create("lamp", { x: 48, y: 109 });
    SpriteFactory.create("lamp", { x: 48, y: 46 });
    SpriteFactory.create("lamp", { x: 48, y: 78 });

    return () => SpriteFactory.removeAll();
  }, []);

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
              width: stripWidth,
              height: ray.stripHeight,
              left: stripWidth * index,
              top:
                (viewport.height - ray.stripHeight) / 2 +
                ray.stripHeight * raycaster.player.position.z,
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
                // opacity: (ray.stripHeight * 2) / viewport.height,
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
