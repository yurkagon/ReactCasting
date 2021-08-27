import { Fragment } from "react";

import { useGrid } from "../../Raycaster";
import Wall from "../../Raycaster/Grid/Wall";

import PlayerMarker from "./PlayerMarker";
import RayHits from "./RayHits";

import "./style.scss";

const MiniMap = () => {
  const grid = useGrid();
  if (!grid) return null;

  const tilesSize = grid.tileSize / 2;
  const rows = grid.data.length;
  const cols = grid.data[0].length;

  const width = cols * tilesSize;
  const height = rows * tilesSize;

  const getBackgroundData = (wall: Wall, lightValue: number) => {
    if (!wall) {
      return {
        backgroundColor: `rgb(${lightValue},${lightValue},${lightValue})`,
      };
    }

    if (wall.minimapColor) {
      return {
        backgroundColor: wall.minimapColor,
      };
    }

    return { backgroundImage: `url(${wall.texture})` };
  };

  return (
    <div className="ui-map">
      <div className="cell-wrapper" style={{ width, height }}>
        <RayHits />

        {grid.walls?.map((row, i) => (
          <Fragment key={i}>
            {row.map((wall, j) => {
              const lightValue = grid.lightMap?.[i]?.[j] * 255;

              const backgroundData = getBackgroundData(wall, lightValue);

              return (
                <div
                  className="cell"
                  style={{
                    top: i * tilesSize,
                    left: j * tilesSize,
                    width: tilesSize,
                    height: tilesSize,
                    ...backgroundData,
                  }}
                  key={j}
                />
              );
            })}

            <PlayerMarker />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MiniMap;
