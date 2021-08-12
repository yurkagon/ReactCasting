import { GameObject } from "../Scene";

import { SpriteConfig, SpriteSize } from "./types";

class Sprite extends GameObject {
  public readonly name: string;
  public readonly texture: string;

  public readonly widthCoefficient: number;
  public readonly originalSize: SpriteSize;

  constructor(config: SpriteConfig) {
    super(config.position);

    this.name = config.name;
    this.texture = config.texture;
    this.originalSize = config.originalSize;
    this.widthCoefficient =
      config.originalSize.width / config.originalSize.height;
  }

  update() {}
}

export default Sprite;
