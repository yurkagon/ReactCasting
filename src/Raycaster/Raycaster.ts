import { GameObject } from "../Scene";

import Player from "./Player";

import { level1 } from "../levels";

class Raycaster extends GameObject {
  public player = new Player();
  public grid: CellGrid = null;

  public start() {
    super.start();

    this.grid = level1;
  }

  public update() {
    this.draw();
  }

  private draw() {}

  private static instance: Raycaster;

  public static getInstance(): Raycaster {
    if (this.instance) return this.instance;

    this.instance = new Raycaster();

    return this.instance;
  }
}

export default Raycaster;
