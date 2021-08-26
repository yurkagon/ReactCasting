import { Fragment, useMemo } from "react";

import { useGrid } from "../../Raycaster";
import Wall from "../../Raycaster/Grid/Wall";

import PlayerMarker from "./PlayerMarker";
import RayHits from "./RayHits";

import "./style.scss";

const MiniMap = () => {
  const grid = useGrid();
  const formattedWalls = useMemo(
    () =>
      grid?.walls?.reduce((acc: Wall[][], row, z) => {
        if (z % 2 === 0) return acc;

        const filteredRow = row.filter((wall, x) => x % 2 !== 0);

        return [...acc, filteredRow];
      }, []),
    [grid]
  );

  if (!grid) return null;

  const tilesSize = grid.tileSize;
  const rows = grid.data.length;
  const cols = grid.data[0].length;

  const width = (cols * tilesSize) / 2;
  const height = (rows * tilesSize) / 2;

  return (
    <div className="ui-map">
      <div className="cell-wrapper" style={{ width, height }}>
        <RayHits />

        {formattedWalls?.map((row, i) => (
          <Fragment key={i}>
            {row.map((wall, j) => {
              const lightValue = grid.lightMap?.[i * 2]?.[j * 2] * 255;

              const backgroundData = wall
                ? { backgroundImage: `url(${wall.texture})` }
                : {
                    backgroundColor: `rgb(${lightValue},${lightValue},${lightValue})`,
                  };

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
