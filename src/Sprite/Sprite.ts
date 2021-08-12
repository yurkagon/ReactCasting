import { GameObject } from "../Scene";

import { SpriteConfig, SpriteSize } from "./types";

class Sprite extends GameObject {
  public readonly name: string;
  public readonly texture: string;

  public readonly widthCoefficient: number;
  public readonly originalSize: SpriteSize;

  public readonly relative?: { x?: number; y?: number } = {
    x: 0,
    y: 0,
  };

  constructor(config: SpriteConfig) {
    super(config.position);

    this.name = config.name;
    this.texture = config.texture;
    this.originalSize = config.originalSize;
    this.widthCoefficient =
      config.originalSize.width / config.originalSize.height;

    if (config.relative) {
      this.relative = config.relative;
    }
  }

  update() {}
}

export default Sprite;
