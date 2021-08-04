import { useEffect, useState } from "react";

import { useViewport, Angle } from "./utils";

import Settings from "./Settings";

import Scene from "./Scene";
import Raycaster from "./Raycaster";

import UiMap from "./components/UiMap";

const App = () => {
  const raycaster = Raycaster.getInstance();

  const [fov, setFov] = useState<number>(raycaster.FOV);
  const [rays, setRays] = useState<number>(raycaster.raysCount);

  const [renderStrategy, setRenderStrategy] = useState<RenderStrategy>(
    Settings.renderingStrategies[0]
  );

  useEffect(() => {
    const scene = Scene.getInstance();

    scene.init();
  }, []);
  useEffect(() => {
    raycaster.FOV = fov;
  }, [fov]);
  useEffect(() => {
    raycaster.raysCount = rays;
  }, [rays]);
  useEffect(() => {
    setRays(raycaster.raysCount);
  }, [renderStrategy, raycaster]);

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
        <div>
          FOV:{"  "}
          <input
            type="range"
            min="20"
            max="360"
            value={Angle.toDeg(fov)}
            step="10"
            onChange={(e) => setFov(Angle.toRad(Number(e.target.value)))}
          />
          Value: {Math.round(Angle.toDeg(fov))}° (default: 60°)
        </div>
        {renderStrategy.raysCountChangeAvailable && (
          <div>
            RAYS:
            <input
              type="range"
              min="10"
              max="500"
              value={rays}
              step="10"
              onChange={(e) => setRays(Number(e.target.value))}
            />
            Value: {rays} (default: 160)
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
