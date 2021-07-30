class Grid {
  public data: CellGrid = null;
  public readonly tileSize: number = 32;

  private constructor() {}

  public setData(grid: CellGrid): void {
    this.data = grid;
  }

  public isCollision(position: Position): Boolean {
    const gridPosition = this.convertPositionToGridPosition(position);

    const cell = this.data?.[gridPosition.y]?.[gridPosition.x];

    return !(cell === 0);
  }

  private convertPositionToGridPosition(position: Position): Position {
    return {
      x: Math.floor(position.x / this.tileSize),
      y: Math.floor(position.y / this.tileSize),
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
