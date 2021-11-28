import Wall from "./Grid/Wall";

export type Subscriber = ({ grid: CellGrid }) => void;

export type Side = "top" | "bottom" | "left" | "right";
export type CollisionType = "vertical" | "horizontal";

export interface Collision {
  point: Position;
  cell: Cell;

  gridPosition: Position;
  floatPart: Position;
  collisionSide: Side;

  wall: Wall;
  collisionType?: CollisionType;
}
