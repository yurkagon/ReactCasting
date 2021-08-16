import maxBy from "lodash/maxBy";
import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";

import Wall from "./Wall";

import { Collision, Side } from "../types";
import { GridConfig } from "./types";

class Grid {
  public data: CellGrid = null;
  public wallData: Wall[][] = null;
  public pointLightMap: number[][] = null;
  public lightMap: number[][] = null;

  public readonly tileSize: number = 32;

  private lightScattering: number = 0.2;

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

    this.lightMap = cloneDeep(this.pointLightMap);

    // @ts-ignore
    window.wallData = this.wallData;

    this.calculateLightMap();
    this.calculateWallLights();
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
  public getBrightness(position: Position): number {
    const gridPosition = this.convertPositionToGridPosition(position);

    const x = Math.floor(gridPosition.x);
    const y = Math.floor(gridPosition.y);

    return this.lightMap?.[y]?.[x] || 0;
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

  private calculateLightFromPoint(point: Position, intensity: number) {
    if (intensity <= 0) return;

    const pushLight = (direction: Position) => {
      let i = 1;

      while (true) {
        const nextPoint = {
          y: point.y + i * direction.y,
          x: point.x + i * direction.x,
        };

        const space = this.wallData?.[nextPoint.y]?.[nextPoint.x];
        if (space !== null) break;

        const nextIntensity = intensity - this.lightScattering * (i - 1);
        if (nextIntensity <= 0) break;

        if (this.lightMap[nextPoint.y][nextPoint.x] < nextIntensity) {
          this.lightMap[nextPoint.y][nextPoint.x] = nextIntensity;
        }

        this.calculateLightFromPoint(
          nextPoint,
          nextIntensity - this.lightScattering
        );

        i++;
      }
    };

    pushLight({ y: -1, x: 0 });
    pushLight({ y: 1, x: 0 });
    pushLight({ y: 0, x: 1 });
    pushLight({ y: 0, x: -1 });
  }

  private calculateWallLights() {
    this.lightMap.forEach((row, y) =>
      row.map((intensity, x) => {
        if (!intensity) return;

        const topWall = this.wallData?.[y - 1]?.[x];
        if (topWall) topWall.addSideLight("top", intensity);
        const bottomWall = this.wallData?.[y + 1]?.[x];
        if (bottomWall) bottomWall.addSideLight("bottom", intensity);

        const leftWall = this.wallData?.[y]?.[x - 1];
        if (leftWall) leftWall.addSideLight("left", intensity);
        const rightWall = this.wallData?.[y]?.[x + 1];
        if (rightWall) rightWall.addSideLight("right", intensity);
      })
    );
  }

  private calculateLightFromPointLegacy(
    point: Position,
    intensity: number,
    calculatedPoints: Position[] = [],
    specifiedWay?: Side
  ) {
    if (intensity <= 0) return;
    calculatedPoints.push(point);

    const pushLight = (direction: Position, wallSideToHit: Side) => {
      let i = 1;

      while (true) {
        const nextPoint = {
          y: point.y + i * direction.y,
          x: point.x + i * direction.x,
        };
        if (find(calculatedPoints, nextPoint)) break;

        const wall = this.wallData?.[nextPoint.y]?.[nextPoint.x];

        const nextIntensity = intensity - this.lightScattering * (i - 1);
        if (nextIntensity <= 0) break;

        if (wall) {
          wall.addSideLight(wallSideToHit, nextIntensity);

          break;
        }

        calculatedPoints.push(nextPoint);

        this.calculateLightFromPoint(
          nextPoint,
          nextIntensity - this.lightScattering
        );

        i++;
      }
    };

    if (specifiedWay !== "top") pushLight({ y: -1, x: 0 }, "top");
    if (specifiedWay !== "bottom") pushLight({ y: 1, x: 0 }, "bottom");
    if (specifiedWay !== "right") pushLight({ y: 0, x: 1 }, "right");
    if (specifiedWay !== "left") pushLight({ y: 0, x: -1 }, "left");
  }

  private static instance: Grid;
  public static getInstance(): Grid {
    if (this.instance) return this.instance;

    this.instance = new Grid();

    return this.instance;
  }
}

export default Grid;