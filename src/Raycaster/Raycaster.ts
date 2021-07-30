import { Angle } from "../utils";

import { GameObject } from "../Scene";

import Player from "./Player";
import Grid from "./Grid";
import Ray from "./Ray";

import { level1 } from "../levels";

class Raycaster extends GameObject {
  private FOV: number = Angle.toRad(60);
  public raysCount: number = 320;

  public player = new Player();
  public grid: Grid = Grid.getInstance();

  public rays: Ray[] = [];

  public start() {
    super.start();

    this.grid.setData(level1);
  }

  public update() {
    this.rays = [];

    const anglePerRay = this.FOV / this.raysCount;

    const startAngle = this.player.position.rotation - this.FOV / 2;

    for (let columnId = 0; columnId < this.raysCount; columnId++) {
      const angle = startAngle + anglePerRay * columnId;

      this.rays.push(new Ray(this.player.position, angle));
    }
  }

  private static instance: Raycaster;
  public static getInstance(): Raycaster {
    if (this.instance) return this.instance;

    this.instance = new Raycaster();

    return this.instance;
  }
}

export default Raycaster;
