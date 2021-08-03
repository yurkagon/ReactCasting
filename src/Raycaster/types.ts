export type Subscriber = ({ grid: CellGrid }) => void;

export interface Collision {
  point: Position;
  cell: Cell;

  gridPosition: Position;
  floatPart: Position;
}
