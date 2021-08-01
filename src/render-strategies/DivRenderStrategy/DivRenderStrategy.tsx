import { useViewport } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";

import "./style.scss";

const DivRenderStrategy = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  return (
    <div className="div-render-strategy">
      {rays.map((ray, index) => {
        if (!ray.hit) return null;

        return (
          <div
            className="strip"
            style={{
              width: stripWidth,
              height: ray.stripHeight,
              left: stripWidth * index,
              top: (viewport.height - ray.stripHeight) / 2,
              backgroundColor: `rgba(0, ${
                (300 * ray.stripHeight) / viewport.height
              }, ${500 * (ray.stripHeight / viewport.height)})`,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default DivRenderStrategy;
