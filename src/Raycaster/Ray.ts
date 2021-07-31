import { calculateDistance } from "../utils";

import Grid from "./Grid";

class Ray {
  private readonly point: Position;
  public readonly angle: number;

  public hit?: Position;
  public hitDistance?: number;
  public hitPercent?: Position;

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

      const collision = this.grid.isCollision(rayPoint);

      if (collision) {
        this.hit = rayPoint;
        this.hitPercent = { x: collision.x % 1, y: collision.y % 1 };

        this.hitDistance = calculateDistance(this.point, rayPoint);

        break;
      }

      distance += this.checkingDistance;
    }
  }
}

export default Ray;
