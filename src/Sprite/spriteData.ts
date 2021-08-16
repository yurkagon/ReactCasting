import guardSprite from "./assets/guard.png";
import cageSprite from "./assets/cage.png";
import lampSprite from "./assets/lamp.png";
import armorSprite from "./assets/armor.png";

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
      y: 3.5,
    },
  },
  lamp: {
    texture: lampSprite,
    originalSize: {
      width: 64,
      height: 127,
    },
    transform: {
      height: 1.7,
      width: 1.5,
    },
    position: {
      y: 6,
    },
  },
  armor: {
    texture: armorSprite,
    originalSize: {
      width: 64,
      height: 64,
    },
    transform: {
      height: 1.3,
      // width: 1.5,
    },
    position: {
      y: 3,
    },
  },
};

export default spriteData;
