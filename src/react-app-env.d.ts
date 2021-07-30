/// <reference types="react-scripts" />

declare type Cell = 1 | 0;

declare type CellGrid = Cell[][];

declare type Position = {
  x: number;
  y: number;
  rotation?: number;
};
