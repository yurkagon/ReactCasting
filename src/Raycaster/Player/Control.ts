class Control {
  public readonly MOUSE_SENSITIVITY = 1.5;
  public readonly ROTATION_SPEED = 2;

  public moveState = {
    toForward: false,
    toBack: false,
    toRight: false,
    toLeft: false,
    rotateLeft: false,
    rotateRight: false,
  };

  public constructor() {
    this.attachKeyDown();
    this.attachKeyUp();
  }

  private attachKeyDown(): void {
    document.body.addEventListener("keydown", (event) => {
      const { code } = event;

      console.log(code);

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
}

export default Control;
