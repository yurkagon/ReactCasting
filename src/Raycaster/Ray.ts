import { calculateDistance, Angle } from "../utils";

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
  private readonly player: Player = Player.getInstance();

  constructor(point: Position, angle: number) {
    this.angle = Angle.normalize(angle);
    this.point = point;

    this.isRayFacingDown = this.angle > 0 && this.angle < Math.PI;
    this.isRayFacingUp = !this.isRayFacingDown;

    this.isRayFacingRight =
      this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI;
    this.isRayFacingLeft = !this.isRayFacingRight;

    this.cast();
  }

  private cast() {
    let xintercept, yintercept;
    let xstep, ystep;

    ///////////////////////////////////////////
    // HORIZONTAL RAY-GRID INTERSECTION CODE
    ///////////////////////////////////////////
    let foundHorzWallHit = false;
    let horzWallHitX = 0;
    let horzWallHitY = 0;

    // Find the y-coordinate of the closest horizontal grid intersenction
    yintercept =
      Math.floor(this.player.position.y / this.grid.tileSize) *
      this.grid.tileSize;
    yintercept += this.isRayFacingDown ? this.grid.tileSize : 0;

    // Find the x-coordinate of the closest horizontal grid intersection
    xintercept =
      this.player.position.x +
      (yintercept - this.player.position.y) / Math.tan(this.angle);

    // Calculate the increment xstep and ystep
    ystep = this.grid.tileSize;
    ystep *= this.isRayFacingUp ? -1 : 1;

    xstep = this.grid.tileSize / Math.tan(this.angle);
    xstep *= this.isRayFacingLeft && xstep > 0 ? -1 : 1;
    xstep *= this.isRayFacingRight && xstep < 0 ? -1 : 1;

    let nextHorzTouchX = xintercept;
    let nextHorzTouchY = yintercept;

    let horizontalCollision;

    // Increment xstep and ystep until we find a wall
    while (
      nextHorzTouchX >= 0 &&
      nextHorzTouchX <= 2000 &&
      nextHorzTouchY >= 0 &&
      nextHorzTouchY <= 2000
    ) {
      const collision = this.grid.handleCollision({
        x: nextHorzTouchX,
        y: nextHorzTouchY - (this.isRayFacingUp ? 1 : 0),
      });

      if (collision) {
        horizontalCollision = collision;

        foundHorzWallHit = true;
        horzWallHitX = nextHorzTouchX;
        horzWallHitY = nextHorzTouchY;
        break;
      } else {
        nextHorzTouchX += xstep;
        nextHorzTouchY += ystep;
      }
    }

    /////////////////////////////////////////
    // VERTICAL RAY-GRID INTERSECTION CODE
    /////////////////////////////////////////
    let foundVertWallHit = false;
    let vertWallHitX = 0;
    let vertWallHitY = 0;

    // Find the x-coordinate of the closest vertical grid intersenction
    xintercept =
      Math.floor(this.player.position.x / this.grid.tileSize) *
      this.grid.tileSize;
    xintercept += this.isRayFacingRight ? this.grid.tileSize : 0;

    // Find the y-coordinate of the closest vertical grid intersection
    yintercept =
      this.player.position.y +
      (xintercept - this.player.position.x) * Math.tan(this.angle);

    // Calculate the increment xstep and ystep
    xstep = this.grid.tileSize;
    xstep *= this.isRayFacingLeft ? -1 : 1;

    ystep = this.grid.tileSize * Math.tan(this.angle);
    ystep *= this.isRayFacingUp && ystep > 0 ? -1 : 1;
    ystep *= this.isRayFacingDown && ystep < 0 ? -1 : 1;

    let nextVertTouchX = xintercept;
    let nextVertTouchY = yintercept;

    let verCollision;

    // Increment xstep and ystep until we find a wall
    while (
      nextVertTouchX >= 0 &&
      nextVertTouchX <= 2000 &&
      nextVertTouchY >= 0 &&
      nextVertTouchY <= 2000
    ) {
      const collision = this.grid.handleCollision({
        x: nextVertTouchX - (this.isRayFacingLeft ? 1 : 0),
        y: nextVertTouchY,
      });

      if (collision) {
        verCollision = collision;
        foundVertWallHit = true;
        vertWallHitX = nextVertTouchX;
        vertWallHitY = nextVertTouchY;
        break;
      } else {
        nextVertTouchX += xstep;
        nextVertTouchY += ystep;
      }
    }

    // Calculate both horizontal and vertical distances and choose the smallest value
    let horzHitDistance = foundHorzWallHit
      ? calculateDistance(this.player.position, {
          x: horzWallHitX,
          y: horzWallHitY,
        })
      : Number.MAX_VALUE;
    let vertHitDistance = foundVertWallHit
      ? calculateDistance(this.player.position, {
          x: vertWallHitX,
          y: vertWallHitY,
        })
      : Number.MAX_VALUE;

    if (horzHitDistance < vertHitDistance) {
      this.collision = horizontalCollision;

      this.hitDistance = horzHitDistance;

      this.stripHeight =
        10000 /
        (Math.cos(Player.getInstance().position.rotation - this.angle) *
          this.hitDistance);
    } else if (vertHitDistance <= horzHitDistance) {
      this.collision = verCollision;
      this.hitDistance = vertHitDistance;

      this.stripHeight =
        10000 /
        (Math.cos(Player.getInstance().position.rotation - this.angle) *
          this.hitDistance);
    }

    // only store the smallest of the distances
    // const wallHitX =
    //   horzHitDistance < vertHitDistance ? horzWallHitX : vertWallHitX;
    // const wallHitY =
    //   horzHitDistance < vertHitDistance ? horzWallHitY : vertWallHitY;
    // const distance =
    //   horzHitDistance < vertHitDistance ? horzHitDistance : vertHitDistance;
    // const wasHitVertical = vertHitDistance < horzHitDistance;
  }

  /*
    Old variant with "brute force" like ray hit checking
  */
  private castLegacy() {
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
