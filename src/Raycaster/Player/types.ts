export type MouseMoveCallback = (value: number) => void;

export interface ControlConfig {
  onMouseMove: MouseMoveCallback;
}
