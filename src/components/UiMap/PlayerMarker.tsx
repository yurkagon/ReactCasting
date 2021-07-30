import Raycaster, { usePlayerPosition } from "../../Raycaster";

const PlayerMarker = () => {
  const position = usePlayerPosition();
  if (!position) return null;

  const raycaster = Raycaster.getInstance();
  const size = raycaster.player.radius * 2;

  return (
    <div
      className="player-marker"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div
        className="marker-body"
        style={{
          height: size,
          width: size,
          top: -raycaster.player.radius,
          left: -raycaster.player.radius,
          transform: `rotate(${position.rotation}rad)`,
        }}
      />
    </div>
  );
};

export default PlayerMarker;
