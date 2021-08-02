import { useEffect, useState } from "react";

import { useViewport } from "./utils";

import Settings from "./Settings";

import Scene from "./Scene";

import UiMap from "./components/UiMap";

const App = () => {
  const [renderStrategy, setRenderStrategy] = useState<RenderStrategy>(
    Settings.renderingStrategies[0]
  );

  useEffect(() => {
    const scene = Scene.getInstance();

    scene.init();
  }, []);

  const { height, width } = useViewport();

  return (
    <div className="App">
      <div className="game-view-port" style={{ width, height }}>
        {<renderStrategy.component />}

        <UiMap />
      </div>

      <div>
        <div>
          Rendering strategy:{" "}
          <select
            onChange={(event) => {
              const strategy = Settings.renderingStrategies.find(
                (strategy) => strategy.name === event.target.value
              );
              setRenderStrategy(strategy);
            }}
            value={renderStrategy.name}
            autoFocus={false}
          >
            {Settings.renderingStrategies.map((strategy) => (
              <option value={strategy.name} key={strategy.name}>
                {strategy.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
