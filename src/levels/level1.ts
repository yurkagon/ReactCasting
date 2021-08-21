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
    position: { x: 65, z: 50 },
  },
  {
    name: "guard",
    position: { x: 266, z: 68 },
  },
  {
    name: "guard",
    position: { x: 399, z: 70 },
  },
  {
    name: "guard",
    position: { x: 326, z: 216 },
  },
  {
    name: "guard",
    position: { x: 135, z: 238 },
  },
  {
    name: "guard",
    position: { x: 432, z: 276 },
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

  // plants
  {
    name: "plant",
    position: { x: 280, z: 195 },
  },
  {
    name: "plant",
    position: { x: 280, z: 93 },
  },

  {
    name: "plant",
    position: { x: 328, z: 195 },
  },
  {
    name: "plant",
    position: { x: 328, z: 93 },
  },

  {
    name: "plant",
    position: { x: 208, z: 93 },
  },
  {
    name: "plant",
    position: { x: 208, z: 67 },
  },

  {
    name: "plant",
    position: { x: 67, z: 196 },
  },
  {
    name: "plant",
    position: { x: 67, z: 285 },
  },
  {
    name: "plant",
    position: { x: 445, z: 285 },
  },

  {
    name: "plant",
    position: { x: 92, z: 37 },
  },
  {
    name: "plant",
    position: { x: 92, z: 124 },
  },

  {
    name: "plant",
    position: { x: 35, z: 124 },
  },
  {
    name: "plant",
    position: { x: 35, z: 34 },
  },

  // tables
  {
    name: "table",
    position: { x: 63, z: 117 },
  },
  {
    name: "table",
    position: { x: 50, z: 80 },
  },

  // columns
  {
    name: "column",
    position: { x: 37, z: 95 },
  },
  {
    name: "column",
    position: { x: 37, z: 65 },
  },
  {
    name: "column",
    position: { x: 287, z: 67 },
  },
  {
    name: "column",
    position: { x: 320, z: 67 },
  },

  {
    name: "column",
    position: { x: 292, z: 159 },
  },
  {
    name: "column",
    position: { x: 316, z: 159 },
  },

  {
    name: "column",
    position: { x: 219, z: 284 },
  },
  {
    name: "column",
    position: { x: 219, z: 258 },
  },

  {
    name: "column",
    position: { x: 219, z: 284 },
  },
  {
    name: "column",
    position: { x: 219, z: 258 },
  },

  {
    name: "column",
    position: { x: 359, z: 284 },
  },
  {
    name: "column",
    position: { x: 359, z: 258 },
  },

  {
    name: "column",
    position: { x: 120, z: 284 },
  },
  {
    name: "column",
    position: { x: 120, z: 258 },
  },

  {
    name: "column",
    position: { x: 219, z: 196 },
  },
  {
    name: "column",
    position: { x: 219, z: 221 },
  },

  {
    name: "column",
    position: { x: 359, z: 196 },
  },
  {
    name: "column",
    position: { x: 359, z: 221 },
  },

  {
    name: "column",
    position: { x: 120, z: 196 },
  },
  {
    name: "column",
    position: { x: 120, z: 221 },
  },
];

export default {
  grid,
  pointLightMap,
  sprites,
};
