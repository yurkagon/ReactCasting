import { Angle } from "../../utils";

import { GameObject } from "../../Scene";
import Grid from "../Grid";

import Control from "./Control";

class Player extends GameObject {
  // public position: Position = {
  //   x: 150,
  //   y: 150,
  //   rotation: Math.PI / 2,
  // };

  public position: Position = {
    x: 155.15374267341303,
    y: 141.63397544881818,
    rotation: -1.8500490071139923,
  };

  public readonly walkSpeed = 1;
  public readonly rotationSpeed = Angle.toRad(2);

  public readonly radius = 8;

  private readonly control = new Control();

  public update() {
    const { rotateLeft, rotateRight, toForward, toBack } =
      this.control.moveState;

    if (rotateLeft || rotateRight) {
      const multiplier = rotateRight ? 1 : -1;

      this.position = {
        ...this.position,
        rotation: this.position.rotation + this.rotationSpeed * multiplier,
      };
    }

    if (toForward || toBack) {
      const multiplier = toForward ? 1 : -1;

      const vector = {
        x: Math.cos(this.position.rotation) * this.walkSpeed * multiplier,
        y: Math.sin(this.position.rotation) * this.walkSpeed * multiplier,
      };

      this.moveBy(vector);
    }
  }

  public moveBy(vector: Position): void {
    const grid = Grid.getInstance();

    const newPosition = {
      ...this.position,
      x: this.position.x + vector.x,
      y: this.position.y + vector.y,
    };

    if (grid.isCollision(newPosition)) return;

    this.position = newPosition;
  }

  private static instance: Player;
  public static getInstance(): Player {
    if (this.instance) return this.instance;

    this.instance = new Player();

    return this.instance;
  }
}

export default Player;
