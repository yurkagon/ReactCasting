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
    if (this.control.moveState.rotateLeft)
      this.position = {
        ...this.position,
        rotation: this.position.rotation - this.rotationSpeed,
      };

    if (this.control.moveState.rotateRight)
      this.position = {
        ...this.position,
        rotation: this.position.rotation + this.rotationSpeed,
      };

    if (this.control.moveState.toForward)
      this.position = {
        ...this.position,
        x: this.position.x + Math.cos(this.position.rotation) * this.walkSpeed,
        y: this.position.y + Math.sin(this.position.rotation) * this.walkSpeed,
      };

    if (this.control.moveState.toBack)
      this.position = {
        ...this.position,
        x: this.position.x - Math.cos(this.position.rotation) * this.walkSpeed,
        y: this.position.y - Math.sin(this.position.rotation) * this.walkSpeed,
      };
  }
}

export default Player;
