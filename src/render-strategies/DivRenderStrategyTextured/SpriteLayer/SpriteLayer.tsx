import { Fragment } from "react";
import cn from "classnames";

import { calculateDistance, useViewport } from "../../../utils";

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
        const visibility = raycaster.player.checkVisibilityByPlayer(sprite);
        if (!visibility) return null;

        const { angleBetweenTarget, fovAngleStart } = visibility;
        console.log(sprite.position, position);

        const distance = calculateDistance(sprite.position, position);

        const spriteHeight =
          1000 / (Math.cos(position.rotation - angleBetweenTarget) * distance);

        const renderHeight = spriteHeight * 10;
        const renderWidth = renderHeight * sprite.widthCoefficient;

        return (
          <img
            src={sprite.texture}
            className={cn("sprite", sprite.name)}
            style={{
              width: renderWidth,
              height: renderHeight,
              top: (viewport.height - spriteHeight) / 2 - spriteHeight * 2,
              left:
                (viewport.width * (angleBetweenTarget - fovAngleStart)) /
                raycaster.FOV,
              zIndex: getZIndexByDistance(distance),
            }}
            key={index}
          />
        );
      })}
    </Fragment>
  );
};

export default SpriteLayer;
