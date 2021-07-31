import { Component } from "react";
import Scene from "./Scene";

import UiMap from "./components/UiMap";

import HTMLRenderStrategy from "./render-strategies/HTMLRenderStrategy";

class App extends Component {
  componentDidMount() {
    const scene = Scene.getInstance();

    scene.init();
  }

  render() {
    return (
      <div className="App">
        <UiMap />

        <HTMLRenderStrategy />
      </div>
    );
  }
}

export default App;
