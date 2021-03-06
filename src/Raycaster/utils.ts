import { useState, useEffect } from "react";

import Scene from "../Scene";
import Raycaster from "./Raycaster";
import Player from "./Player";
import Ray from "./Ray";

import Wall from "./Grid/Wall";

export const useGrid = () => {
  const [grid, setGrid] = useState<CellGrid>(null);
  const [lightMap, setLightMap] = useState<number[][]>(null);
  const [walls, setWalls] = useState<Wall[][]>(null);
  const [tileSize, setTileSize] = useState<number>(null);

  useEffect(() => {
    const scene = Scene.getInstance();

    const raycaster = Raycaster.getInstance();

    const subscriber = () => {
      setGrid(raycaster.grid.data);
      setWalls(raycaster.grid.wallData);
      setTileSize(raycaster.grid.tileSize);
      setLightMap(raycaster.grid.lightMap);
    };

    scene.subscribe(subscriber);

    return () => scene.unsubscribe(subscriber);
  }, []);

  if (!grid) return null;

  return { data: grid, tileSize, walls, lightMap };
};

export const usePlayer = (): Player => {
  const [_, updateByPlayerPositionUpdate] = useState<Position>(null);

  const player = Player.getInstance();

  useEffect(() => {
    const scene = Scene.getInstance();

    const subscriber = () => {
      updateByPlayerPositionUpdate(player.position);
    };

    scene.subscribe(subscriber);

    return () => scene.unsubscribe(subscriber);
  }, []);

  return player;
};

export const useRays = () => {
  const [rays, setRays] = useState<Ray[]>([]);

  useEffect(() => {
    const scene = Scene.getInstance();

    const raycaster = Raycaster.getInstance();

    const subscriber = () => {
      setRays(raycaster.rays);
    };

    scene.subscribe(subscriber);

    return () => scene.unsubscribe(subscriber);
  }, []);

  return rays;
};

export const getZIndexByDistance = (distance: number): number => {
  const maxIndex = 1000;

  return Math.floor(maxIndex - distance);
};
