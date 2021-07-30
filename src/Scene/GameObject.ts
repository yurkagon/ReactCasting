import Scene from "./Scene";

abstract class GameObject {
  private started: boolean = false;

  constructor() {
    const scene = Scene.getInstance();

    scene.subscribe(this);
  }

  public start(): void {
    this.started = true;
  }

  public isStarted() {
    return this.started;
  }

  public abstract update(): void;
}

export default GameObject;
