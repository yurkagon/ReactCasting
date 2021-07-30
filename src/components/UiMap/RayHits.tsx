import { Fragment, Component } from "react";
import { useRays, usePlayerPosition } from "../../Raycaster";

import Line from "./Line";

const RayHits = () => {
  const rays = useRays();
  const position = usePlayerPosition();

  if (!position) return null;

  return (
    <Fragment>
      {rays.map((ray, index) => {
        if (!ray.hit) return null;

        if (index % 20 !== 0) return null;

        return <Line key={index} from={position} to={ray.hit} />;
      })}
    </Fragment>
  );
};

export default RayHits;
