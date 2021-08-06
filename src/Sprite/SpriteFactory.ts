import Sprite from "./Sprite";
import spriteData from "./spriteData";

import { SpriteName } from "./types";

class SpriteFactory {
  public static sprites: Sprite[] = [];

  private constructor() {}

  public static create(name: SpriteName, position: Position): Sprite {
    const config = spriteData[name];

    const sprite = new Sprite({ ...config, position, name });

    this.sprites.push(sprite);

    return sprite;
  }

  public static removeAll() {
    this.sprites.forEach((sprite) => sprite.destroy());
  }
}

export default SpriteFactory;
