import { useState, useEffect, Fragment } from "react";
import cn from "classnames";

import Player from "../../Player";

import "./style.scss";

const UiMap = () => {
  const [mapData, setMapData] = useState<CellMap>(null);

  useEffect(() => {
    const player = Player.getInstance();

    const subscriber = (map: CellMap) => {
      setMapData(map);
    };

    player.subscribe(subscriber);

    return () => player.unsubscribe(subscriber);
  }, []);

  if (!mapData) return null;

  const tilesSize = 32;
  const rows = mapData.length;
  const cols = mapData[0].length;

  return (
    <div className="ui-map">
      <div
        className="cell-wrapper"
        style={{ width: cols * tilesSize, height: rows * tilesSize }}
      >
        {mapData.map((row, i) => (
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
