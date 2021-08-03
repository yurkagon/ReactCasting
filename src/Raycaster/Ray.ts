import { calculateDistance } from "../utils";

import Grid from "./Grid";
import Player from "./Player";

import { Collision } from "./types";

class Ray {
  private readonly point: Position;
  public readonly angle: number;

  public isRayFacingDown: boolean;
  public isRayFacingUp: boolean;
  public isRayFacingRight: boolean;
  public isRayFacingLeft: boolean;

  public collision?: Collision;
  public hitDistance?: number;

  public stripHeight: number = 0;

  private readonly checkingDistance: number = 1 / 2;
  public readonly maxDistance: number = 300;

  private readonly grid: Grid = Grid.getInstance();

  constructor(point: Position, angle: number) {
    this.angle = angle;
    this.point = point;

    this.isRayFacingDown = this.angle > 0 && this.angle < Math.PI;
    this.isRayFacingUp = !this.isRayFacingDown;

    this.isRayFacingRight =
      this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI;
    this.isRayFacingLeft = !this.isRayFacingRight;

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

      const collision = this.grid.handleCollision(rayPoint);

      if (collision) {
        this.collision = collision;
        this.hitDistance = calculateDistance(this.point, rayPoint);

        this.stripHeight =
          10000 /
          (Math.cos(Player.getInstance().position.rotation - this.angle) *
            this.hitDistance);

        break;
      }

      distance += this.checkingDistance;
    }
  }
}

export default Ray;
