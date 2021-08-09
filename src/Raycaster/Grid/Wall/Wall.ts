import texturesData from "./texturesData";

import { WallConfig } from "../types";

class Wall {
  public readonly texture: string;

  public constructor(config: WallConfig) {
    this.texture = texturesData[config.char];
  }
}

export default Wall;
