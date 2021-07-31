import { Fragment } from "react";
import cn from "classnames";

import { useGrid } from "../../Raycaster";

import PlayerMarker from "./PlayerMarker";
import RayHits from "./RayHits";

import "./style.scss";

const UiMap = () => {
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
        <PlayerMarker />

        {grid.data.map((row, i) => (
          <Fragment key={i}>
            {row.map((cellType: Cell, j) => {
              if (cellType === 0) return null;
              // TODO: fix styles
              return (
                <div
                  className={cn("cell", { wall: cellType === 1 })}
                  style={{
                    top: i * tilesSize,
                    left: j * tilesSize,
                    width: tilesSize,
                    height: tilesSize,
                  }}
                  key={j}
                />
              );
            })}

            <RayHits />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default UiMap;
