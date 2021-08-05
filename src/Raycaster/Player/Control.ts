import Settings from "../../Settings";

import { ControlConfig, MouseMoveCallback } from "./types";

class Control {
  public moveState = {
    toForward: false,
    toBack: false,
    toRight: false,
    toLeft: false,
    rotateLeft: false,
    rotateRight: false,
  };

  private mouseMoveCallback: MouseMoveCallback;

  public constructor({ onMouseMove }: ControlConfig) {
    this.attachKeyDown();
    this.attachKeyUp();

    this.mouseMoveCallback = onMouseMove;
    this.attachMouseMove();
  }

  private attachKeyDown(): void {
    document.body.addEventListener("keydown", (event) => {
      const { code } = event;

      if (code === "KeyW") this.moveState.toForward = true;
      if (code === "KeyS") this.moveState.toBack = true;
      if (code === "KeyA") this.moveState.toLeft = true;
      if (code === "KeyD") this.moveState.toRight = true;

      if (code === "KeyQ") this.moveState.rotateLeft = true;
      if (code === "KeyE") this.moveState.rotateRight = true;
    });
  }

  private attachKeyUp(): void {
    document.body.addEventListener("keyup", (event) => {
      const { code } = event;

      if (code === "KeyW") this.moveState.toForward = false;
      if (code === "KeyS") this.moveState.toBack = false;
      if (code === "KeyA") this.moveState.toLeft = false;
      if (code === "KeyD") this.moveState.toRight = false;

      if (code === "KeyQ") this.moveState.rotateLeft = false;
      if (code === "KeyE") this.moveState.rotateRight = false;
    });
  }

  private attachMouseMove(): void {
    document.addEventListener("mousemove", (event) => {
      const valueToRotate = event.movementX * Settings.mouseSensitivity;

      this.mouseMoveCallback(valueToRotate);
    });
  }
}

export default Control;
