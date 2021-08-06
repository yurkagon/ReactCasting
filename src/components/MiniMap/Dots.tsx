import { Fragment } from "react";

import { useSceneUpdate } from "../../utils";

import { SpriteFactory } from "../../Sprite";

const RayHits = () => {
  useSceneUpdate();

  return (
    <Fragment>
      {SpriteFactory.sprites.map((sprite, j) => (
        <div
          key={j}
          style={{
            position: "absolute",
            top: sprite.position.y / 2,
            left: sprite.position.x / 2,
            width: 3,
            height: 3,
            backgroundColor: "green",
            borderRadius: 10,
          }}
        />
      ))}
    </Fragment>
  );
};

export default RayHits;
