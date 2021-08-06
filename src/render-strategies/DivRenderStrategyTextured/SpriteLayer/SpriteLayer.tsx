import { Fragment } from "react";
import cn from "classnames";

import { calculateDistance, useViewport } from "../../../utils";

import Raycaster, {
  getZIndexByDistance,
  usePlayerPosition,
} from "../../../Raycaster";

import Sprite from "../../../Sprite";

import "./style.scss";

const SpriteLayer = () => {
  const raycaster = Raycaster.getInstance();
  const position = usePlayerPosition();

  const viewport = useViewport();

  return (
    <Fragment>
      {Sprite.sprites.map((sprite, index) => {
        const visibility = raycaster.player.checkVisibilityByPlayer(sprite);
        if (!visibility) return null;

        const { angleBetweenTarget, fovAngleStart } = visibility;

        const distance = calculateDistance(sprite.position, position);

        const spriteHeight =
          1000 / (Math.cos(position.rotation - angleBetweenTarget) * distance);

        return (
          <div
            className={cn("sprite", sprite.name)}
            style={{
              width: spriteHeight * 10,
              height: spriteHeight * 10,
              top: (viewport.height - spriteHeight) / 2 + spriteHeight,
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
