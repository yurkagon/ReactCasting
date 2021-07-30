class Angle {
  public static toRad = (degrees: number) => (degrees * Math.PI) / 180;

  public static toDeg = (radians: number) => (radians * 180) / Math.PI;
}

export default Angle;
