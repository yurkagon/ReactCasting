import { FC } from "react";

const Line: FC<{ from: Position; to: Position }> = (props) => {
  let from = props.from;
  let to = props.to;
  if (to.x < from.x) {
    from = props.to;
    to = props.from;
  }

  const len = Math.sqrt(
    Math.pow(from.x - to.x, 2) + Math.pow(from.z - to.z, 2)
  );
  const angle = Math.atan((to.z - from.z) / (to.x - from.x));

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${
          from.x - 0.5 * len * (1 - Math.cos(angle))
        }px, ${from.z + 0.5 * len * Math.sin(angle)}px) rotate(${angle}rad)`,
        width: `${len}px`,
        height: `${0}px`,
        borderBottom: "2px solid yellow",
      }}
    />
  );
};

export default Line;
