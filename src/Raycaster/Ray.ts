import { calculateDistance } from "../utils";

import Grid from "./Grid";
import Player from "./Player";

class Ray {
  private readonly point: Position;
  public readonly angle: number;

  public hit?: Position;
  public hitDistance?: number;

  private readonly checkingDistance: number = 1 / 2;
  public readonly maxDistance: number = 300;

  private readonly grid: Grid = Grid.getInstance();

  constructor(point: Position, angle: number) {
    this.angle = angle;
    this.point = point;

    this.cast();
  }

  private cast() {
    let distance = 0;

    while (distance < this.maxDistance) {
      const vector: Position = {
        x: Math.cos(this.angle) * distance,
        y: Math.sin(this.angle) * distance,
      };

      const rayPoint: Position = {
        x: this.point.x + vector.x,
        y: this.point.y + vector.y,
      };

      if (this.grid.isCollision(rayPoint)) {
        const player = Player.getInstance();
        this.hit = rayPoint;

        this.hitDistance = calculateDistance(this.point, rayPoint);

        break;
      }

      distance += this.checkingDistance;
    }
  }
}

export default Ray;
