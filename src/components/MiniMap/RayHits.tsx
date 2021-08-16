import { Fragment } from "react";
import { useRays, usePlayer } from "../../Raycaster";

import Line from "./Line";

const RayHits = () => {
  const rays = useRays();
  const player = usePlayer();

  if (!player.position) return null;

  return (
    <Fragment>
      {rays.map((ray, index) => {
        if (!ray.collision) return null;

        if (index % 20 !== 0) return null;

        return (
          <Line
            key={index}
            from={{
              x: player.position.x / 2,
              z: player.position.z / 2,
            }}
            to={{
              x: ray.collision.point.x / 2,
              z: ray.collision.point.z / 2,
            }}
          />
        );
      })}
    </Fragment>
  );
};

export default RayHits;
