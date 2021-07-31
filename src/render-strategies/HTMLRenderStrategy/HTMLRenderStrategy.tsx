import Raycaster, { useRays, usePlayerPosition } from "../../Raycaster";

import "./style.scss";

const HTMLRenderStrategy = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const windowWidth = 640;
  const windowHeight = 480;
  const stripWidth = windowWidth / raycaster.raysCount;

  return (
    <div
      className="html-render"
      style={{ height: windowHeight, width: windowWidth }}
    >
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
              top: (windowHeight - height) / 2,
              backgroundColor: `rgba(0, 0, ${500 * (height / windowHeight)})`,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default HTMLRenderStrategy;
