import Raycaster, { useRays } from "../../Raycaster";

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

        const height = windowHeight / ray.hitDistance;

        return (
          <div
            className="strip"
            style={{
              width: stripWidth,
              height,
              left: stripWidth * index,
              top: (windowHeight - height) / 2,
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default HTMLRenderStrategy;
