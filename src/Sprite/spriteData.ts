import guardSprite from "./assets/guard.png";
import cageSprite from "./assets/cage.png";
import lampSprite from "./assets/lamp.png";
import armorSprite from "./assets/armor.png";
import plantSprite from "./assets/plant.png";
import tableSprite from "./assets/table.png";
import columnSprite from "./assets/column.png";

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
    },
    position: {
      y: 3,
    },
  },
  plant: {
    texture: plantSprite,
    originalSize: {
      width: 64,
      height: 64,
    },
    transform: {
      height: 1.3,
    },
    position: {
      y: 3.3,
    },
  },

  table: {
    texture: tableSprite,
    originalSize: {
      width: 64,
      height: 64,
    },
    transform: {
      height: 1.2,
      width: 1.2,
    },
    position: {
      y: 3,
    },
  },
  column: {
    texture: columnSprite,
    originalSize: {
      width: 48,
      height: 70,
    },
    transform: {
      height: 1.7,
      width: 1,
    },
    position: {
      y: 7,
    },
  },
};

export default spriteData;
