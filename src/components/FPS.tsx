import { useState, useEffect } from "react";
import { useSceneUpdate } from "../utils";

const FPS = () => {
  const [fps, setFps] = useState(null);

  const { deltaTime, updateCount } = useSceneUpdate();

  useEffect(() => {
    if (!deltaTime) return;

    const calculatedFps = Math.round(1 / deltaTime);
    setFps(calculatedFps);
  }, [updateCount % 10 === 0]);

  return <div>{fps}</div>;
};

export default FPS;
