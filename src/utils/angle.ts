class Angle {
  public static toRad = (degrees: number) => (degrees * Math.PI) / 180;

  public static toDeg = (radians: number) => (radians * 180) / Math.PI;

  public static normalize(angle: number): number {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
      angle = 2 * Math.PI + angle;
    }
    return angle;
  }
}

export default Angle;
