/// <reference types="react-scripts" />

declare type Cell =
  | " "
  | "s"
  | "w"
  | "w2"
  | "g"
  | "g2"
  | "g3"
  | "b"
  | "b2"
  | "b3";

declare type CellGrid = Cell[][];

declare type Position = {
  x: number;
  z: number;
  y?: number;
  rotation?: number;
};

declare interface RenderStrategy {
  name: string;
  component: React.ComponentType<any>;
  raysCountChangeAvailable?: boolean;
  skybox?: { default: boolean };
}

declare interface Viewport {
  width: number;
  height: number;
}
