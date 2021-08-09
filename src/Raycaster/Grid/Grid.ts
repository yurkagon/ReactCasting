import maxBy from "lodash/maxBy";

import Wall from "./Wall";

import { Collision, Side } from "../types";
import { GridConfig } from "./types";

class Grid {
  public data: CellGrid = null;
  public wallData: Wall[][] = null;
  private pointLightMap: number[][] = null;
  private lightMap: number[][] = null;

  public readonly tileSize: number = 32;

  private constructor() {}

  public setData(config: GridConfig): void {
    this.data = config.grid;
    this.pointLightMap = config.pointLightMap;

    this.wallData = this.data.map((row, i) =>
      row.map((wallChar, j) => {
        if (wallChar !== " ") {
          return new Wall({ char: wallChar });
        }

        return null;
      })
    );
  }

  public handleCollision(position: Position): Collision | null {
    const gridPosition = this.convertPositionToGridPosition(position);

    const x = Math.floor(gridPosition.x);
    const y = Math.floor(gridPosition.y);

    const cell = this.data?.[y]?.[x];

    const collisionExist = cell !== " ";
    if (!collisionExist) return null;

    const floatPart = { x: gridPosition.x % 1, y: gridPosition.y % 1 };

    const distanceTop = floatPart.y;
    const distanceBottom = 1 - distanceTop;
    const distanceLeft = floatPart.x;
    const distanceRight = 1 - distanceLeft;

    const distanceData: { side: Side; value: number }[] = [
      { side: "top", value: distanceTop },
      { side: "bottom", value: distanceBottom },
      { side: "left", value: distanceLeft },
      { side: "right", value: distanceRight },
    ];

    const { side } = maxBy(distanceData, "value");

    return {
      point: position,
      gridPosition,
      floatPart,
      cell,
      wall: this.wallData?.[y]?.[x],
      collisionSide: side,
    };
  }

  private convertPositionToGridPosition(position: Position): Position {
    return {
      x: position.x / this.tileSize,
      y: position.y / this.tileSize,
    };
  }

  private static instance: Grid;
  public static getInstance(): Grid {
    if (this.instance) return this.instance;

    this.instance = new Grid();

    return this.instance;
  }
}

export default Grid;
