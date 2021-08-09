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

  private lightScattering: number = 0.1;

  private constructor() {}

  public setData(config: GridConfig): void {
    this.data = config.grid;
    this.pointLightMap = config.pointLightMap;

    this.wallData = this.data.map((row) =>
      row.map((wallChar) => {
        if (wallChar !== " ") {
          return new Wall({ char: wallChar });
        }

        return null;
      })
    );

    this.calculateLightMap();
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

  private calculateLightMap() {
    this.pointLightMap.forEach((row, y) =>
      row.forEach((intensity, x) => {
        if (!intensity) return;

        this.calculateLightFromPoint({ x, y }, intensity);
      })
    );
  }

  private calculateLightFromPoint(
    point: Position,
    intensity: number,
    calculatedPoints: Position[] = []
  ) {
    if (intensity <= 0) return;
    calculatedPoints.push(point);

    const handleLightToTop = () => {
      let i = 1;

      while (true) {
        const nextPoint = {
          y: point.y - i,
          x: point.x,
        };

        const wall = this.wallData?.[nextPoint.y]?.[nextPoint.x];

        const newIntensity = intensity - this.lightScattering * i;

        if (wall) {
          wall.addSideLight("top", newIntensity);

          break;
        }

        i++;
      }
    };

    const handleLightToBottom = () => {
      let i = 1;

      while (true) {
        const nextPoint = {
          y: point.y + i,
          x: point.x,
        };

        const wall = this.wallData?.[nextPoint.y]?.[nextPoint.x];

        const newIntensity = intensity - this.lightScattering * i;

        if (wall) {
          wall.addSideLight("bottom", newIntensity);

          break;
        }

        i++;
      }
    };

    const handleLightToRight = () => {
      let i = 1;

      while (true) {
        const nextPoint = {
          y: point.y,
          x: point.x + i,
        };

        const wall = this.wallData?.[nextPoint.y]?.[nextPoint.x];

        const newIntensity = intensity - this.lightScattering * i;

        if (wall) {
          wall.addSideLight("right", newIntensity);

          break;
        }

        i++;
      }
    };

    const handleLightToLeft = () => {
      let i = 1;

      while (true) {
        const nextPoint = {
          y: point.y,
          x: point.x - i,
        };

        const wall = this.wallData?.[nextPoint.y]?.[nextPoint.x];

        const newIntensity = intensity - this.lightScattering * i;

        if (wall) {
          wall.addSideLight("left", newIntensity);

          break;
        }

        i++;
      }
    };

    handleLightToTop();
    handleLightToBottom();
    handleLightToRight();
    handleLightToLeft();
  }

  private static instance: Grid;
  public static getInstance(): Grid {
    if (this.instance) return this.instance;

    this.instance = new Grid();

    return this.instance;
  }
}

export default Grid;
