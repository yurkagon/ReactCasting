class Grid {
  public data: CellGrid = null;
  public readonly tileSize: number = 32;

  private constructor() {}

  public setData(grid: CellGrid): void {
    this.data = grid;
  }

  public isCollision(position: Position): null | Position {
    const gridPosition = this.convertPositionToGridPosition(position);

    const cell =
      this.data?.[Math.floor(gridPosition.y)]?.[Math.floor(gridPosition.x)];

    const isCollisionExist = cell !== 0;
    if (!isCollisionExist) return null;

    return gridPosition;
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
