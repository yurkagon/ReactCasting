import { Component } from "react";
import Raycaster from "./Raycaster";

import UiMap from "./components/UiMap";

class App extends Component {
  componentDidMount() {
    const raycaster = Raycaster.getInstance();

    raycaster.setup();
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
