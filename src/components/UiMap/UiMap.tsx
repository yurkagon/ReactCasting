import { useState, useEffect, Fragment } from "react";
import cn from "classnames";

import Raycaster, { Subscriber } from "../../Raycaster";

import "./style.scss";

const UiMap = () => {
  const [grid, setMapData] = useState<CellGrid>(null);

  useEffect(() => {
    const raycaster = Raycaster.getInstance();

    const subscriber: Subscriber = ({ grid }) => {
      setMapData(grid);
    };

    raycaster.subscribe(subscriber);

    return () => raycaster.unsubscribe(subscriber);
  }, []);

  if (!grid) return null;

  const tilesSize = 32;
  const rows = grid.length;
  const cols = grid[0].length;

  const width = cols * tilesSize;
  const height = rows * tilesSize;

  return (
    <div className="ui-map">
      <div className="cell-wrapper" style={{ width, height }}>
        {grid.map((row, i) => (
          <Fragment key={i}>
            {row.map((cellType: Cell, j) => (
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
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default UiMap;
