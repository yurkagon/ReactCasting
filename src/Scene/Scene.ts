import GameObject from "./GameObject";

import { Subscriber } from "./types";

class Scene {
  private subscribers: Subscriber[] = [];

  public init() {
    setInterval(() => this.update(), 10);
  }

  public update() {
    this.subscribers.forEach((subscriber) => {
      if (subscriber instanceof GameObject) {
        if (!subscriber.isStarted()) subscriber.start();

        subscriber.update();
      } else {
        subscriber();
      }
    });
  }

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }
  public unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.findIndex((el) => subscriber === el);

    this.subscribers.splice(index, 1);
  }

  private static instance: Scene;

  public static getInstance(): Scene {
    if (this.instance) return this.instance;

    this.instance = new Scene();

    return this.instance;
  }
}

export default Scene;
