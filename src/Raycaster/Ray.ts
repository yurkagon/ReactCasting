import Grid from "./Grid";

class Ray {
  private readonly point: Position;
  private readonly angle: number;

  public hit?: Position;
  public hitDistance?: number;

  private readonly checkingDistance: number = 5;
  private readonly maxDistance: number = 300;

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
        this.hit = rayPoint;

        break;
      }

      distance += this.checkingDistance;
    }
  }
}

export default Ray;
