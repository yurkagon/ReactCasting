import Scene from "./Scene";

abstract class GameObject {
  private started: boolean = false;

  public position?: Position;

  constructor(position?: Position) {
    this.position = position;

    const scene = Scene.getInstance();

    scene.subscribe(this);
  }

  public start(): void {
    this.started = true;
  }

  public abstract update(): void;

  public isStarted() {
    return this.started;
  }

  public destroy() {
    const scene = Scene.getInstance();

    scene.unsubscribe(this);
  }
}

export default GameObject;
