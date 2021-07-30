import { level1 } from "../levels";

import { Subscriber } from "./types";

class Raycaster {
  private grid: CellGrid;

  private subscribers: Array<Subscriber> = [];

  public setup() {
    this.grid = level1;

    setInterval(() => this.update(), 500);
  }

  private update() {
    this.draw();

    this.notifyUpdateDone();
  }
  private notifyUpdateDone() {
    this.subscribers.forEach((func) => func({ grid: this.grid }));
  }

  private draw() {}

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }
  public unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.findIndex((el) => subscriber === el);

    this.subscribers.splice(index, 1);
  }

  private static instance: Raycaster;

  public static getInstance(): Raycaster {
    if (this.instance) return this.instance;

    this.instance = new Raycaster();

    return this.instance;
  }
}

export default Raycaster;
