import { useViewport } from "../../utils";

import Raycaster, { useRays } from "../../Raycaster";
// import wallTexture from "./wall.jpg";

import "./style.scss";

const DivRenderStrategy = () => {
  const rays = useRays();
  const raycaster = Raycaster.getInstance();

  const viewport = useViewport();

  const stripWidth = viewport.width / raycaster.raysCount;

  return (
    <div
      className="html-render"
      style={{ height: viewport.height, width: viewport.width }}
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
              top: (viewport.height - height) / 2,
              backgroundColor: `rgba(0, 0, ${
                500 * (height / viewport.height)
              })`,
            }}
            key={index}
          >
            {/* <img
              src={wallTexture}
              style={{
                height,
                width: height,
                left: -(ray.hitPercent.x * height),
              }}
            /> */}
          </div>
        );
      })}
    </div>
  );
};

export default DivRenderStrategy;
