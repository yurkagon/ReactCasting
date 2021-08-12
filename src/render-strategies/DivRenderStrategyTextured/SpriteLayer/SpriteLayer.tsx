import { Fragment } from "react";
import cn from "classnames";

import { calculateDistance, useViewport, limit, Angle } from "../../../utils";

import Raycaster, { getZIndexByDistance, usePlayer } from "../../../Raycaster";

import { SpriteFactory } from "../../../Sprite";

import "./style.scss";

const SpriteLayer = () => {
  const raycaster = Raycaster.getInstance();
  const player = usePlayer();

  const viewport = useViewport();

  if (!player.position) return null;

  return (
    <Fragment>
      {SpriteFactory.sprites.map((sprite, index) => {
        const visibility = player.checkVisibility(sprite);
        if (!visibility) return null;

        const { angleBetweenTarget, fovAngleStart } = visibility;

        const distance = calculateDistance(sprite.position, player.position);

        const spriteHeight =
          1000 /
          (Math.cos(player.position.rotation - angleBetweenTarget) * distance);

        const renderHeight = spriteHeight * 10;
        const renderWidth = renderHeight * sprite.widthCoefficient;

        const brightness = limit((renderHeight * 2) / viewport.height, 1);

        return (
          <div
            className={cn("sprite", sprite.name)}
            style={{
              width: renderWidth,
              height: renderHeight,
              top:
                (viewport.height - spriteHeight) / 2 -
                spriteHeight * 2 +
                sprite.relative.y * spriteHeight,
              left:
                (viewport.width *
                  Angle.normalize(angleBetweenTarget - fovAngleStart)) /
                raycaster.FOV,
              zIndex: getZIndexByDistance(distance),
            }}
            key={index}
          >
            <img
              src={sprite.texture}
              style={{
                width: renderWidth,
                height: renderHeight,
                filter: `brightness(${brightness})`,
                left: -renderWidth / 2,
              }}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default SpriteLayer;
