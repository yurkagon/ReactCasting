import { Fragment } from "react";
import cn from "classnames";

import {
  calculateDistance,
  useViewport,
  limit,
  Angle,
  minimum,
} from "../../../utils";

import Raycaster, {
  getZIndexByDistance,
  useGrid,
  usePlayer,
} from "../../../Raycaster";

import { SpriteFactory } from "../../../Sprite";

import "./style.scss";

const SpriteLayer = () => {
  const grid = useGrid();
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

        const heightCoefficient = 1.6339869281;
        const spriteHeight =
          (viewport.height * heightCoefficient) /
          (Math.cos(player.position.rotation - angleBetweenTarget) * distance);

        const renderHeight = spriteHeight * 10 * sprite.transform.height;
        const renderWidth =
          renderHeight * sprite.widthCoefficient * sprite.transform.width;

        const brightness = minimum(
          raycaster.grid.getBrightness(sprite.position),
          0.1
        );

        return (
          <div
            className={cn("sprite", sprite.name)}
            style={{
              width: renderWidth,
              height: renderHeight,
              top:
                (viewport.height - spriteHeight) / 2 -
                spriteHeight * 2 -
                sprite.position.y * spriteHeight +
                renderHeight * raycaster.player.position.y,
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
