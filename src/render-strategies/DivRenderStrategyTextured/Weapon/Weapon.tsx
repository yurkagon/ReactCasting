import texture from "./weapon-texture.png";

import "./style.scss";
import Raycaster, { usePlayer } from "../../../Raycaster";
import { minimum } from "../../../utils";

const Weapon = () => {
  const player = usePlayer();

  const raycaster = Raycaster.getInstance();

  const brightness = minimum(
    raycaster.grid.getBrightness(player.position),
    0.1
  );

  return (
    <div className="weapon">
      <img
        src={texture}
        className="texture"
        style={{
          filter: `brightness(${brightness})`,
          top: (player.position.y + player.stepAmount) * 1000,
        }}
      />
    </div>
  );
};

export default Weapon;
