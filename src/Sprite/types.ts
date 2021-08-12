export type SpriteName = "guard" | "cage";

export interface SpriteSize {
  width: number;
  height: number;
}

export interface SpriteConfig {
  name: SpriteName;
  texture: string;

  position: Position;
  originalSize: SpriteSize;
}

export type SpriteData = {
  [key in SpriteName]: Omit<SpriteConfig, "position" | "name"> & {
    position?: Partial<Position>;
  };
};
