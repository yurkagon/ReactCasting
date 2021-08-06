import { GameObject } from "../Scene";

import { SpiteConfig } from "./types";

class Sprite extends GameObject {
  public static sprites: Sprite[] = [];

  public readonly name: string;

  constructor({ position, name }: SpiteConfig) {
    super(position);

    this.name = name;

    Sprite.sprites.push(this);
  }

  update() {}

  public static removeAll() {
    this.sprites.forEach((sprite) => sprite.destroy());
  }
}

export default Sprite;
