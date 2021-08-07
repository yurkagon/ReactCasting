import { Angle } from "../../utils";
import { usePlayer } from "../../Raycaster";

const PlayerDebugger = () => {
  const player = usePlayer();

  return (
    <div>
      <div>x: {Math.floor(player?.position.x)}</div>
      <div>y: {Math.floor(player?.position.y)}</div>
      <div>angle: {Math.floor(Angle.toDeg(player?.position.rotation))}</div>
    </div>
  );
};

export default PlayerDebugger;
