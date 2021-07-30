class Player {
  public readonly walkSpeed = 3;
  public readonly rotationSpeed = 2 * (Math.PI / 180);

  public position: Position = {
    x: 5,
    y: 5,
    rotation: Math.PI / 2,
  };

  public radius = 3;

  public turnDirection = 0;
  public walkDirection = 0;
}

export default Player;
