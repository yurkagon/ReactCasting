import DivRenderStrategy from "./render-strategies/DivRenderStrategy";
import DivRenderStrategyTextured from "./render-strategies/DivRenderStrategyTextured";
import TextRenderStrategy from "./render-strategies/TextRenderStrategy";

class Settings {
  public static readonly viewPortSizeMultiplier: number = 0.9;
  public static readonly uiMapSizeMultiplier: number = 0.5;

  public static readonly textRenderCharSpectre: string = ",,:;I&&00%$@@#";
  public static readonly viewportWidthToCharsScaleCoefficient = 0.33;
  public static readonly viewportHeightToCharsScaleCoefficient = 0.166;

  public static readonly renderingStrategies: RenderStrategy[] = [
    { name: "HTML <div> Shaded", component: DivRenderStrategy },
    {
      name: "HTML <div> Textured (works ugly)",
      component: DivRenderStrategyTextured,
    },
    { name: "HTML <textarea> (Why not)", component: TextRenderStrategy },
  ];

  private constructor() {}
}

export default Settings;
