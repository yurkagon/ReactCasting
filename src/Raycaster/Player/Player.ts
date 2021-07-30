import { GameObject } from "../../Scene";

import Control from "./Control";

class Player extends GameObject {
  public position: Position = {
    x: 100,
    y: 50,
    rotation: Math.PI / 2,
  };

  public readonly walkSpeed = 1;
  public readonly rotationSpeed = 2 * (Math.PI / 180);

  public radius = 8;

  private control = new Control();

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

      this.position = {
        ...this.position,
        x:
          this.position.x +
          Math.cos(this.position.rotation) * this.walkSpeed * multiplier,
        y:
          this.position.y +
          Math.sin(this.position.rotation) * this.walkSpeed * multiplier,
      };
    }
  }
}

export default Player;
