/// <reference types="react-scripts" />

declare type Cell = 0 | 1 | 2;

declare type CellGrid = Cell[][];

declare type Position = {
  x: number;
  y: number;
  rotation?: number;
};

declare interface RenderStrategy {
  name: string;
  component: React.ComponentType<any>;
  raysCountChangeAvailable?: boolean;
}
