import { Angle } from "../utils";

import { GameObject } from "../Scene";

import Player from "./Player";
import Grid from "./Grid";
import Ray from "./Ray";

import { level1 } from "../levels";
import { SpriteFactory } from "../Sprite";

class Raycaster extends GameObject {
  public fov: number = Angle.toRad(60);
  public raysCount: number = 160;

  public player: Player = Player.getInstance();
  public grid: Grid = Grid.getInstance();

  public rays: Ray[] = [];

  public start() {
    super.start();

    const { sprites, ...levelData } = level1;

    sprites.forEach((spriteConfig) =>
      SpriteFactory.create(spriteConfig.name, spriteConfig.position)
    );

    this.grid.setData(levelData);
  }

  public update() {
    this.rays = [];

    const anglePerRay = this.fov / this.raysCount;

    const startAngle = this.player.position.rotation - this.fov / 2;

    for (let columnId = 0; columnId < this.raysCount; columnId++) {
      const angle = startAngle + anglePerRay * columnId;

      const ray = new Ray(this.player.position, angle);

      ray.cast();

      this.rays.push(ray);
    }
  }

  public setRaysCount(count: number) {
    this.raysCount = count;
  }

  private static instance: Raycaster;
  public static getInstance(): Raycaster {
    if (this.instance) return this.instance;

    this.instance = new Raycaster();

    return this.instance;
  }
}

export default Raycaster;
