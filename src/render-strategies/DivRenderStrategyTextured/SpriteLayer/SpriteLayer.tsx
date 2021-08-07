import { Fragment } from "react";
import cn from "classnames";

import { calculateDistance, useViewport, limit, Angle } from "../../../utils";

import Raycaster, {
  getZIndexByDistance,
  usePlayerPosition,
} from "../../../Raycaster";

import { SpriteFactory } from "../../../Sprite";

import "./style.scss";

const SpriteLayer = () => {
  const raycaster = Raycaster.getInstance();
  const position = usePlayerPosition();

  const viewport = useViewport();

  if (!position) return null;

  return (
    <Fragment>
      {SpriteFactory.sprites.map((sprite, index) => {
        const visibility = raycaster.player.checkVisibility(sprite);
        if (!visibility) return null;

        const { angleBetweenTarget, fovAngleStart } = visibility;

        const distance = calculateDistance(sprite.position, position);

        const spriteHeight =
          1000 / (Math.cos(position.rotation - angleBetweenTarget) * distance);

        const renderHeight = spriteHeight * 10;
        const renderWidth = renderHeight * sprite.widthCoefficient;

        const brightness = limit((renderHeight * 2) / viewport.height, 1);

        return (
          <div
            className={cn("sprite", sprite.name)}
            style={{
              width: renderWidth,
              height: renderHeight,
              top: (viewport.height - spriteHeight) / 2 - spriteHeight * 2,
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
