import Sprite from "./Sprite";
import spriteData from "./spriteData";

import { SpriteName } from "./types";

class SpriteFactory {
  public static sprites: Sprite[] = [];

  private constructor() {}

  public static create(name: SpriteName, position: Position): Sprite {
    const config = spriteData[name];

    const updatedPosition = {
      ...position,
      z: position?.z || config.position?.z || 0,
    };

    const sprite = new Sprite({ ...config, position: updatedPosition, name });

    this.sprites.push(sprite);

    return sprite;
  }

  public static removeAll() {
    this.sprites.forEach((sprite) => sprite.destroy());

    this.sprites = [];
  }
}

export default SpriteFactory;
