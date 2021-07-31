import DivRenderStrategy from "./render-strategies/DivRenderStrategy";
import DivRenderStrategyTextured from "./render-strategies/DivRenderStrategyTextured";

class Settings {
  public static readonly viewPortSizeMultiplier: number = 0.8;
  public static readonly uiMapSizeMultiplier: number = 0.5;

  public static readonly renderingStrategies: RenderStrategy[] = [
    { name: "HTML <div>", component: DivRenderStrategy },
    {
      name: "HTML <div> Textured (works ugly)",
      component: DivRenderStrategyTextured,
    },
  ];

  private constructor() {}
}

export default Settings;
