import Scene, { GameObject } from "../../Scene";
import Settings from "../../Settings";
import { Angle } from "../../utils";
import Grid from "../Grid";
import Raycaster from "../Raycaster";

import Control from "./Control";

class Player extends GameObject {
  public position: Position = {
    rotation: -1.884955592153879,
    x: 372.6884332630978,
    y: 128.58201781700896,
    z: 0,
  };

  public readonly walkSpeed = 44;
  public readonly rotationSpeed = 1.3;

  public readonly radius = 8;

  private readonly control: Control;

  private bouncingState: boolean = true;

  private constructor() {
    super();

    this.control = new Control({ onMouseMove: this.onMouseMove.bind(this) });

    if (Settings.isDevelopment) {
      const positionFromStorage = localStorage.getItem("player-position");

      // if (positionFromStorage) this.position = JSON.parse(positionFromStorage);
    }
  }

  public update() {
    const { rotateLeft, rotateRight, toForward, toBack, toRight, toLeft } =
      this.control.moveState;

    const scene = Scene.getInstance();

    if (rotateLeft || rotateRight) {
      const multiplier = rotateRight ? 1 : -1;

      this.setRotation(
        this.position.rotation +
          this.rotationSpeed * multiplier * scene.deltaTime
      );
    }

    if (toForward || toBack) {
      const multiplier = toForward ? 1 : -1;

      const vector = {
        x:
          Math.cos(this.position.rotation) *
          this.walkSpeed *
          multiplier *
          scene.deltaTime,
        y:
          Math.sin(this.position.rotation) *
          this.walkSpeed *
          multiplier *
          scene.deltaTime,
      };

      this.moveBy(vector);
    }

    if (toRight || toLeft) {
      const multiplier1 = toRight ? 1 : -1;
      const multiplier2 = toRight ? -1 : 1;

      const vector = {
        y:
          Math.cos(this.position.rotation) *
          this.walkSpeed *
          multiplier1 *
          scene.deltaTime,
        x:
          Math.sin(this.position.rotation) *
          this.walkSpeed *
          multiplier2 *
          scene.deltaTime,
      };

      this.moveBy(vector);
    }
  }

  public checkVisibility(target: GameObject): {
    angleBetweenTarget: number;
    fovAngleStart: number;
    fovAngleEnd: number;
  } | null {
    const raycaster = Raycaster.getInstance();

    const angleBetweenTarget = Angle.getAngleBetween(
      this.position,
      target.position
    );

    const fovAngleStart = Angle.normalize(
      this.position.rotation - raycaster.FOV / 2
    );
    const fovAngleEnd = Angle.normalize(
      this.position.rotation + raycaster.FOV / 2
    );

    if (
      !Angle.isAngleBetweenAngles(
        angleBetweenTarget,
        fovAngleStart,
        fovAngleEnd
      )
    ) {
      return null;
    }

    return {
      angleBetweenTarget: angleBetweenTarget,
      fovAngleStart: fovAngleStart,
      fovAngleEnd: fovAngleEnd,
    };
  }

  private moveBy(vector: Position): void {
    const grid = Grid.getInstance();

    const newPosition = {
      ...this.position,
      x: this.position.x + vector.x,
      y: this.position.y + vector.y,
    };

    if (grid.handleCollision(newPosition)) return;

    this.position = newPosition;

    newPosition.z +=
      (this.bouncingState ? 1 : -1) * Scene.getInstance().deltaTime * 0.25;

    const lim = 0.04;
    if (newPosition.z <= -lim) {
      this.bouncingState = true;
      newPosition.z = -lim;
    }
    if (newPosition.z >= lim) {
      this.bouncingState = false;
      newPosition.z = lim;
    }

    if (Settings.isDevelopment) {
      this.savePosition();
    }
  }

  private onMouseMove(value: number) {
    const scene = Scene.getInstance();

    this.setRotation(this.position.rotation + value * scene.deltaTime);
  }

  private setRotation(rotation: number) {
    this.position = {
      ...this.position,
      rotation: Angle.normalize(rotation),
    };
  }

  private savePosition(): void {
    localStorage.setItem("player-position", JSON.stringify(this.position));
  }

  private static instance: Player;
  public static getInstance(): Player {
    if (this.instance) return this.instance;

    this.instance = new Player();

    return this.instance;
  }
}

export default Player;
