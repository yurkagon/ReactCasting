import Raycaster from "./Raycaster";

class Player extends Raycaster {
  private static instance: Player;

  public static getInstance(): Player {
    if (this.instance) return this.instance;

    this.instance = new Player();

    return this.instance;
  }
}

export default Player;
