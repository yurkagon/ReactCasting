import GameObject from "./GameObject";

import { Subscriber } from "./types";

class Scene {
  private subscribers: Subscriber[] = [];

  private previousCall: number;
  private deltaTimeValue: number = 0;

  public init() {
    setInterval(() => this.update(), 10);
  }

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }
  public unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.findIndex((el) => subscriber === el);

    this.subscribers.splice(index, 1);
  }

  public get deltaTime(): number {
    return this.deltaTimeValue;
  }

  private update(): void {
    this.subscribers.forEach((subscriber) => {
      if (subscriber instanceof GameObject) {
        if (!subscriber.isStarted()) subscriber.start();

        subscriber.update();
      } else {
        subscriber();
      }
    });

    this.trackDeltaTime();
  }

  private trackDeltaTime(): void {
    const currentCall = Date.now();
    if (this.previousCall) {
      this.deltaTimeValue = (currentCall - this.previousCall) / 1000;
    }

    this.previousCall = currentCall;
  }

  private static instance: Scene;
  public static getInstance(): Scene {
    if (this.instance) return this.instance;

    this.instance = new Scene();

    return this.instance;
  }
}

export default Scene;
