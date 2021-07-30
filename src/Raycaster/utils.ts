import { useState, useEffect } from "react";

import Scene from "../Scene";
import Raycaster from "./Raycaster";

export const useGrid = () => {
  const [grid, setGridData] = useState<CellGrid>(null);

  useEffect(() => {
    const scene = Scene.getInstance();

    const raycaster = Raycaster.getInstance();

    const subscriber = () => {
      setGridData(raycaster.grid);
    };

    scene.subscribe(subscriber);

    return () => scene.unsubscribe(subscriber);
  }, []);

  return grid;
};

export const usePlayerPosition = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>(null);

  useEffect(() => {
    const scene = Scene.getInstance();

    const raycaster = Raycaster.getInstance();

    const subscriber = () => {
      setPlayerPosition(raycaster.player.position);
    };

    scene.subscribe(subscriber);

    return () => scene.unsubscribe(subscriber);
  }, []);

  return playerPosition;
};
