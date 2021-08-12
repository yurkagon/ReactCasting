import guardSprite from "./assets/guard.png";
import cageSprite from "./assets/cage.png";

import { SpriteData } from "./types";

const spriteData: SpriteData = {
  guard: {
    texture: guardSprite,
    originalSize: {
      width: 96,
      height: 146,
    },
  },
  cage: {
    texture: cageSprite,
    originalSize: {
      width: 64,
      height: 64,
    },
    position: {
      z: 3.5,
    },
  },
};

export default spriteData;
