import { usePlayer } from "../../Raycaster";

const PlayerMarker = () => {
  const player = usePlayer();
  if (!player.position) return null;

  const size = player.radius * 2;

  return (
    <div
      className="player-marker"
      style={{
        top: player.position.y / 2,
        left: player.position.x / 2,
      }}
    >
      <div
        className="marker-body"
        style={{
          height: size,
          width: size,
          top: -player.radius,
          left: -player.radius,
          transform: `rotate(${player.position.rotation}rad)`,
        }}
      />
    </div>
  );
};

export default PlayerMarker;
