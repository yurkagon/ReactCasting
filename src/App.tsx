import { Component } from "react";
import Player from "./Player";

import UiMap from "./components/UiMap";

class App extends Component {
  componentDidMount() {
    const player = Player.getInstance();

    player.setup();
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
