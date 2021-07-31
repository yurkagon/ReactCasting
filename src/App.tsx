import { Component } from "react";
import Settings from "./Settings";
import Scene from "./Scene";

import UiMap from "./components/UiMap";

import DivRenderStrategy from "./render-strategies/DivRenderStrategy";

class App extends Component {
  componentDidMount() {
    const scene = Scene.getInstance();

    scene.init();
  }

  render() {
    return (
      <div className="App">
        <div
          className="game-view-port"
          style={{ width: Settings.windowWidth, height: Settings.windowHeight }}
        >
          <DivRenderStrategy />

          <UiMap />
        </div>
      </div>
    );
  }
}

export default App;
