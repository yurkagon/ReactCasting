import { useEffect, useState } from "react";

import { useViewport, Angle } from "./utils";

import Settings from "./Settings";

import Scene from "./Scene";
import Raycaster from "./Raycaster";

import MiniMap from "./components/MiniMap";
import PlayerDebugger from "./components/PlayerDebugger";

const App = () => {
  const raycaster = Raycaster.getInstance();

  const [fov, setFov] = useState<number>(raycaster.FOV);
  const [rays, setRays] = useState<number>(raycaster.raysCount);

  const [renderStrategy, setRenderStrategy] = useState<RenderStrategy>(
    Settings.renderingStrategies[0]
  );

  const [allowMouse, setAllowMouse] = useState<boolean>(Settings.allowMouse);
  const [allowMinimap, setAllowMinimap] = useState<boolean>(true);
  const [allowSkybox, setAllowSkybox] = useState<boolean>(
    Settings.renderingStrategies[0].skybox.default
  );

  useEffect(() => {
    const scene = Scene.getInstance();

    scene.init();
  }, []);
  useEffect(() => {
    raycaster.FOV = fov;
  }, [fov]);
  useEffect(() => {
    Settings.allowMouse = allowMouse;
  }, [allowMouse]);
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
        {<renderStrategy.component skyboxEnabled={allowSkybox} />}

        {allowMinimap && <MiniMap />}
      </div>

      <div className="settings">
        <div className="settings-block">
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

        <div className="settings-block">
          <div>
            <input
              checked={allowMouse}
              onChange={(e) => setAllowMouse(e.target.checked)}
              type="checkbox"
              id="allow-mouse"
            />
            <label htmlFor="allow-mouse">Allow mouse</label>
          </div>

          <div>
            <input
              checked={allowMinimap}
              onChange={(e) => setAllowMinimap(e.target.checked)}
              type="checkbox"
              id="allow-minimap"
            />
            <label htmlFor="allow-minimap">Allow minimap</label>
          </div>

          {renderStrategy.skybox && (
            <div>
              <input
                checked={allowSkybox}
                onChange={(e) => setAllowSkybox(e.target.checked)}
                type="checkbox"
                id="allow-skybox"
              />
              <label htmlFor="allow-skybox">Skybox</label>
            </div>
          )}
        </div>

        <div className="settings-block">
          <div>WASD - to move</div>
          <div>Q and E - to rotate</div>
        </div>

        <div className="settings-block">
          <PlayerDebugger />
        </div>
      </div>
    </div>
  );
};

export default App;
