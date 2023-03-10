import DivRenderStrategy from "./render-strategies/DivRenderStrategy";
import DivRenderStrategyTextured from "./render-strategies/DivRenderStrategyTextured";
import TextRenderStrategy from "./render-strategies/TextRenderStrategy";
import ConsoleRenderStrategy from "./render-strategies/ConsoleRenderStrategy";
import ConsoleColoredRenderStrategy from "./render-strategies/ConsoleColoredRenderStrategy";

class Settings {
  public static readonly isProduction: boolean =
    process.env.NODE_ENV === "production";
  public static readonly isDevelopment: boolean =
    process.env.NODE_ENV === "development";

  public static allowMouse: boolean = !(process.env.NODE_ENV === "development");

  public static readonly viewPortSizeMultiplier: number = 0.85;
  public static readonly miniMapSizeMultiplier: number = 0.5;
  public static readonly dimension = 16 / 9;

  public static readonly textRenderCharSpectre: string = ",,:;I&&00%$@@#";
  public static readonly viewportWidthToCharsScaleCoefficient = 0.33;
  public static readonly viewportHeightToCharsScaleCoefficient = 0.166;

  public static readonly consoleRaysCount: number = 110;
  public static readonly consoleHeight: number = 45;

  public static readonly mouseSensitivity: number = 0.1;

  public static readonly renderingStrategies: RenderStrategy[] = [
    {
      name: "HTML <div> Textured",
      key: "div-textured",
      component: DivRenderStrategyTextured,
      raysCountChangeAvailable: true,
      skybox: { default: false },
    },
    {
      name: "HTML <div> Shaded",
      key: "div-shaded",
      component: DivRenderStrategy,
      raysCountChangeAvailable: true,
    },
    { name: "HTML <textarea> (Only chrome)", component: TextRenderStrategy, key: "textarea" },
    {
      name: "Console in your Chrome",
      component: ConsoleRenderStrategy,
      key: "console",
    },
    {
      name: "Colored Console in your Chrome",
      component: ConsoleColoredRenderStrategy,
      key: "console-colored",
    },
  ];

  private constructor() {}
}

export default Settings;
