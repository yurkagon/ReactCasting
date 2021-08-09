import { Fragment } from "react";

import { useGrid } from "../../Raycaster";
// import wallData from "../../Raycaster/Grid/Wall/wallData";

// wallData

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

  return (
    <div className="ui-map">
      <div className="cell-wrapper" style={{ width, height }}>
        <RayHits />

        {grid.walls?.map((row, i) => (
          <Fragment key={i}>
            {row.map((wall, j) => {
              if (!wall) return null;

              return (
                <div
                  className="cell"
                  style={{
                    top: i * tilesSize,
                    left: j * tilesSize,
                    width: tilesSize,
                    height: tilesSize,
                    backgroundImage: `url(${wall.texture})`,
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
