import { SpriteName } from "../Sprite/types";

// prettier-ignore
const grid: CellGrid = [
  ["w","w2","w2", "w", "s", "s", "s", "s", "s", "s", "s", "s", "g", "g2","g"],
  ["w", " ", " ", "w", "w", " ", "w", " ", "w", "w2","w", " ", "g3"," ","g2"],
  ["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "g"],
  ["w", " ", " ", "w", "w", " ", "w", " ", "w", " ", "w", " ", "g3"," ","g3"],
  ["w","w2","w2", "w", "s", "s", "s", "s", "s", " ", "s", "s", "s", " ", "s"],
  ["s", "b", "b", "b", "b", "b", "b", "b","b2", " ","b2", "b","b2", " ","b2"],
  ["s","b2", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "b"],
  ["s", " ", " ","b3", " ", "b3","b3","b3","b3"," ","b3","b3","b3", " ", "b"],
  ["s","b2", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ","b2"],
  ["s", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b","b2", "b"],
  ["s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s"],
];

// prettier-ignore
const pointLightMap: number[][] = [
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,    0,  0],
  [ 0, 0.8,  0,   0,   0,   0,   0,   0,   0, 0.7,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0, 0.8,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [ 0,   0, 0.1 ,0,    0.5, 0,   0,   0,   0,   0,   0,   0,   0,   0.4, 0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  [ 0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
];

const sprites: { name: SpriteName; position: Position }[] = [
  // guards
  {
    name: "guard",
    position: { x: 45, z: 50 },
  },
  {
    name: "guard",
    position: { x: 45, z: 60 },
  },
  {
    name: "guard",
    position: { x: 55, z: 60 },
  },
  {
    name: "guard",
    position: { x: 65, z: 50 },
  },

  // cages
  {
    name: "cage",
    position: { x: 430, z: 45 },
  },
  {
    name: "cage",
    position: { x: 430, z: 65 },
  },

  // lamps
  {
    name: "lamp",
    position: { x: 144, z: 241 },
  },
  {
    name: "lamp",
    position: { x: 303, z: 177 },
  },
  {
    name: "lamp",
    position: { x: 303, z: 81 },
  },
  {
    name: "lamp",
    position: { x: 48, z: 109 },
  },
  {
    name: "lamp",
    position: { x: 48, z: 46 },
  },
  {
    name: "lamp",
    position: { x: 48, z: 78 },
  },
  {
    name: "lamp",
    position: { x: 420, z: 240 },
  },

  // armors
  {
    name: "armor",
    position: { x: 238, z: 51 },
  },
  {
    name: "armor",
    position: { x: 238, z: 111 },
  },

  {
    name: "armor",
    position: { x: 176, z: 51 },
  },
  {
    name: "armor",
    position: { x: 176, z: 111 },
  },

  {
    name: "armor",
    position: { x: 367, z: 51 },
  },
  {
    name: "armor",
    position: { x: 367, z: 111 },
  },

  {
    name: "armor",
    position: { x: 51, z: 238 },
  },
];

export default {
  grid,
  pointLightMap,
  sprites,
};
