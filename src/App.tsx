import { useEffect } from "react";

import { useViewport } from "./utils";

import Scene from "./Scene";

import UiMap from "./components/UiMap";

import DivRenderStrategy from "./render-strategies/DivRenderStrategy";

const App = () => {
  useEffect(() => {
    const scene = Scene.getInstance();

    scene.init();
  }, []);

  const { height, width } = useViewport();

  return (
    <div className="App">
      <div className="game-view-port" style={{ width, height }}>
        <DivRenderStrategy />

        <UiMap />
      </div>
    </div>
  );
};

export default App;
