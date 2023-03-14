import { calculateDistance, Angle, getViewport } from "../utils";

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
  public isVerticalCast: boolean = false;
  public isHorizontalCast: boolean = false;
  public stripHeight: number = 0;
  public stripHeight_CONSOLE: number = 0;

  public readonly maxDistance: number = 300;

  private readonly grid: Grid = Grid.getInstance();
  private readonly player: Player = Player.getInstance();

  constructor(point: Position, angle: number) {
    this.angle = Angle.normalize(angle);
    this.point = point;

    this.isRayFacingDown = this.angle > 0 && this.angle < Math.PI;
    this.isRayFacingUp = !this.isRayFacingDown;

    this.isRayFacingRight =
      this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI;
    this.isRayFacingLeft = !this.isRayFacingRight;
  }

  public cast(): void {
    const horizontalCollision = this.castHorizontal();
    const verticalCollision = this.castVertical();

    if (!horizontalCollision && !verticalCollision) return;

    const horizontalDistance = horizontalCollision
      ? calculateDistance(this.player.position, horizontalCollision.point)
      : Number.MAX_VALUE;
    const verticalDistance = verticalCollision
      ? calculateDistance(this.player.position, verticalCollision.point)
      : Number.MAX_VALUE;

    if (horizontalDistance < verticalDistance) {
      this.collision = horizontalCollision;
      this.hitDistance = horizontalDistance;
      this.isHorizontalCast = true;
    } else if (verticalDistance <= horizontalDistance) {
      this.collision = verticalCollision;
      this.hitDistance = verticalDistance;
      this.isVerticalCast = true;
    }

    const viewport = getViewport();

    const wallCoefficient = 21.2418300654;
    this.stripHeight =
      (wallCoefficient * viewport.height) /
      (Math.cos(Player.getInstance().position.rotation - this.angle) *
        this.hitDistance);

    const consoleHeightMultiplier = 220;
    this.stripHeight_CONSOLE = this.stripHeight / viewport.height * consoleHeightMultiplier;
  }

  private castHorizontal(): Collision {
    let yIntercept: number, xIntercept: number, yStep: number, xStep: number;

    yIntercept =
      Math.floor(this.player.position.z / this.grid.tileSize) *
      this.grid.tileSize;
    yIntercept += this.isRayFacingDown ? this.grid.tileSize : 0;

    xIntercept =
      this.player.position.x +
      (yIntercept - this.player.position.z) / Math.tan(this.angle);

    yStep = this.grid.tileSize;
    yStep *= this.isRayFacingUp ? -1 : 1;

    xStep = this.grid.tileSize / Math.tan(this.angle);
    xStep *= this.isRayFacingLeft && xStep > 0 ? -1 : 1;
    xStep *= this.isRayFacingRight && xStep < 0 ? -1 : 1;

    let nextHorizontalTouchX = xIntercept;
    let nextHorizontalTouchY = yIntercept;

    while (
      nextHorizontalTouchX >= 0 &&
      nextHorizontalTouchX <= 2000 &&
      nextHorizontalTouchY >= 0 &&
      nextHorizontalTouchY <= 2000
    ) {
      const collision = this.grid.handleCollision(
        {
          x: nextHorizontalTouchX,
          z: nextHorizontalTouchY - (this.isRayFacingUp ? 1 : 0),
        },
        "horizontal"
      );

      if (collision) return collision;

      nextHorizontalTouchX += xStep;
      nextHorizontalTouchY += yStep;
    }
  }

  private castVertical(): Collision {
    let yIntercept: number, xIntercept: number, yStep: number, xStep: number;

    xIntercept =
      Math.floor(this.player.position.x / this.grid.tileSize) *
      this.grid.tileSize;
    xIntercept += this.isRayFacingRight ? this.grid.tileSize : 0;

    yIntercept =
      this.player.position.z +
      (xIntercept - this.player.position.x) * Math.tan(this.angle);

    xStep = this.grid.tileSize;
    xStep *= this.isRayFacingLeft ? -1 : 1;

    yStep = this.grid.tileSize * Math.tan(this.angle);
    yStep *= this.isRayFacingUp && yStep > 0 ? -1 : 1;
    yStep *= this.isRayFacingDown && yStep < 0 ? -1 : 1;

    let nextVerticalTouchX = xIntercept;
    let nextVerticalTouchY = yIntercept;

    while (
      nextVerticalTouchX >= 0 &&
      nextVerticalTouchX <= 2000 &&
      nextVerticalTouchY >= 0 &&
      nextVerticalTouchY <= 2000
    ) {
      const collision = this.grid.handleCollision(
        {
          x: nextVerticalTouchX - (this.isRayFacingLeft ? 1 : 0),
          z: nextVerticalTouchY,
        },
        "vertical"
      );

      if (collision) return collision;

      nextVerticalTouchX += xStep;
      nextVerticalTouchY += yStep;
    }
  }

  /*
    Old variant with "brute force" like ray hit checking
  */
  private castLegacy() {
    const checkingDistance = 1 / 2;

    let distance = 0;

    while (distance < this.maxDistance) {
      const vector: Position = {
        x: Math.cos(this.angle) * distance,
        z: Math.sin(this.angle) * distance,
      };

      const rayPoint: Position = {
        x: this.point.x + vector.x,
        z: this.point.z + vector.z,
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

      distance += checkingDistance;
    }
  }
}

export default Ray;
