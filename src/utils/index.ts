export { default as Angle } from "./angle";

export const calculateDistance = (p1: Position, p2: Position): number => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};
