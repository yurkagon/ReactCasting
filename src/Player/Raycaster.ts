import { level1 } from "../levels";

class Map {
  public readonly grid: CellMap;

  public readonly TILE_SIZE = 32;
  public readonly MAP_NUM_ROWS: number;
  public readonly MAP_NUM_COLS: number;

  public constructor(grid: CellMap) {
    this.grid = grid;
    this.MAP_NUM_ROWS = this.grid.length;
    this.MAP_NUM_COLS = this.grid[0].length;
  }

  render() {
    for (var i = 0; i < this.MAP_NUM_ROWS; i++) {
      for (var j = 0; j < this.MAP_NUM_COLS; j++) {
        var tileX = j * this.TILE_SIZE;
        var tileY = i * this.TILE_SIZE;
        var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
      }
    }
  }
}

abstract class Raycaster {
  private map: Map;

  private subscribers: Array<(map: CellMap) => void> = [];

  public setup() {
    this.map = new Map(level1);

    setInterval(() => this.update(), 500);
  }

  private update() {
    this.draw();

    this.notifyUpdateDone();
  }
  private notifyUpdateDone() {
    this.subscribers.forEach((func) => func(this.map.grid));
  }

  private draw() {}

  public subscribe(subscriber: (map: CellMap) => void): void {
    this.subscribers.push(subscriber);
  }
  public unsubscribe(subscriber: (map: CellMap) => void) {
    const index = this.subscribers.findIndex((el) => subscriber === el);

    this.subscribers.splice(index, 1);
  }
}

export default Raycaster;
