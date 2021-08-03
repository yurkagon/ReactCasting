import { Collision } from "./types";

class Grid {
  public data: CellGrid = null;
  public readonly tileSize: number = 32;

  private constructor() {}

  public setData(grid: CellGrid): void {
    this.data = grid;
  }

  public handleCollision(position: Position): Collision | null {
    const gridPosition = this.convertPositionToGridPosition(position);

    const cell =
      this.data?.[Math.floor(gridPosition.y)]?.[Math.floor(gridPosition.x)];

    const collisionExist = cell !== 0;
    if (!collisionExist) return null;

    return {
      point: position,
      gridPosition,
      floatPart: { x: gridPosition.x % 1, y: gridPosition.y % 1 },
      cell,
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
