class Control {
  public readonly MOUSE_SENSITIVITY = 1.5;
  public readonly ROTATION_SPEED = 2;

  public moveState = {
    toForward: false,
    toBack: false,
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

      if (code === "ArrowUp" || code === "KeyW")
        this.moveState.toForward = true;
      if (code === "ArrowDown" || code === "KeyS") this.moveState.toBack = true;
      if (code === "ArrowLeft" || code === "KeyA")
        this.moveState.rotateLeft = true;
      if (code === "ArrowRight" || code === "KeyD")
        this.moveState.rotateRight = true;
    });
  }

  private attachKeyUp(): void {
    document.body.addEventListener("keyup", (event) => {
      const { code } = event;

      if (code === "ArrowUp" || code === "KeyW")
        this.moveState.toForward = false;
      if (code === "ArrowDown" || code === "KeyS")
        this.moveState.toBack = false;
      if (code === "ArrowLeft" || code === "KeyA")
        this.moveState.rotateLeft = false;
      if (code === "ArrowRight" || code === "KeyD")
        this.moveState.rotateRight = false;
    });
  }
}

export default Control;
