import texturesData from "./texturesData";

import { WallConfig } from "../types";
import { Side } from "../../types";

class Wall {
  public readonly texture: string;

  public sidesLight: Record<Side, number> = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  public constructor(config: WallConfig) {
    this.texture = texturesData[config.char];
  }

  public setSideLight(side: Side, intensity: number) {
    this.sidesLight[side] = intensity;
  }

  public addSideLight(side: Side, intensity: number) {
    console.log(intensity);
    this.sidesLight[side] += intensity;
  }
}

export default Wall;
