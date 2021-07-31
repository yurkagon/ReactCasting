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

        const distance =
          Math.cos(raycaster.player.position.rotation - ray.angle) *
          ray.hitDistance;

        const height = 10000 / distance;

        return (
          <div
            className="strip"
            style={{
              width: stripWidth,
              height,
              left: stripWidth * index,
              top: (viewport.height - height) / 2,
              backgroundColor: `rgba(0, ${(300 * height) / viewport.height}, ${
                500 * (height / viewport.height)
              })`,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default DivRenderStrategy;
