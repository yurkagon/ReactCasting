import Scene, { GameObject } from "../../Scene";
import Settings from "../../Settings";
import { Angle, Vector } from "../../utils";
import Grid from "../Grid";
import Raycaster from "../Raycaster";

import Control from "./Control";

class Player extends GameObject {
  public position: Position = {
    rotation: Angle.toRad(183),
    x: 367,
    z: 270,
    y: 0,
  };

  public readonly walkSpeed = 44;
  public readonly rotationSpeed = 1.3;

  public readonly radius = 8;

  private readonly control: Control;

  private bouncingState: boolean = true;
  public readonly stepAmount: number = 0.03;

  private constructor() {
    super();

    this.control = new Control({ onMouseMove: this.onMouseMove.bind(this) });

    if (Settings.isDevelopment) {
      const positionFromStorage = localStorage.getItem("player-position");

      if (positionFromStorage) this.position = JSON.parse(positionFromStorage);
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

    let vectorToMove: Position = null;

    if (toForward || toBack) {
      const multiplier = toForward ? 1 : -1;

      const walkSpeedMultiplier = toRight || toLeft ? 0.8 : 1;

      vectorToMove = Vector.add(vectorToMove, {
        x:
          Math.cos(this.position.rotation) *
          this.walkSpeed *
          walkSpeedMultiplier *
          multiplier *
          scene.deltaTime,
        z:
          Math.sin(this.position.rotation) *
          this.walkSpeed *
          walkSpeedMultiplier *
          multiplier *
          scene.deltaTime,
      });
    }

    if (toRight || toLeft) {
      const multiplier1 = toRight ? 1 : -1;
      const multiplier2 = toRight ? -1 : 1;

      const walkSpeedMultiplier = toForward || toBack ? 0.8 : 1;

      vectorToMove = Vector.add(vectorToMove, {
        z:
          Math.cos(this.position.rotation) *
          this.walkSpeed *
          walkSpeedMultiplier *
          multiplier1 *
          scene.deltaTime,
        x:
          Math.sin(this.position.rotation) *
          this.walkSpeed *
          walkSpeedMultiplier *
          multiplier2 *
          scene.deltaTime,
      });
    }

    if (vectorToMove) this.moveBy(vectorToMove);
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
      this.position.rotation - raycaster.fov / 2
    );
    const fovAngleEnd = Angle.normalize(
      this.position.rotation + raycaster.fov / 2
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

    const newPosition: Position = {
      ...this.position,
      x: this.position.x + vector.x,
      z: this.position.z + vector.z,
    };

    if (grid.handleCollision(newPosition)) return;

    this.position = newPosition;

    newPosition.y +=
      (this.bouncingState ? 1 : -1) * Scene.getInstance().deltaTime * 0.2;

    if (newPosition.y <= -this.stepAmount) {
      this.bouncingState = true;
      newPosition.y = -this.stepAmount;
    }
    if (newPosition.y >= this.stepAmount) {
      this.bouncingState = false;
      newPosition.y = this.stepAmount;
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
