import { Component } from "react";
import Scene from "./Scene";

import UiMap from "./components/UiMap";

class App extends Component {
  componentDidMount() {
    const scene = Scene.getInstance();

    scene.init();
  }

  render() {
    return (
      <div className="App">
        <UiMap />
      </div>
    );
  }
}

export default App;
