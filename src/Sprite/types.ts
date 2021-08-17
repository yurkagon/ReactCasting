export type SpriteName =
  | "guard"
  | "cage"
  | "lamp"
  | "armor"
  | "plant"
  | "table";

export interface SpriteSize {
  width: number;
  height: number;
}

export interface SpriteConfig {
  name: SpriteName;
  texture: string;

  position: Position;
  originalSize: SpriteSize;

  transform?: {
    width?: number;
    height?: number;
  };
}

export type SpriteData = {
  [key in SpriteName]: Omit<SpriteConfig, "position" | "name"> & {
    position?: Partial<Position>;
  };
};
