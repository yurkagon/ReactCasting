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

  public static isAngleBetweenAngles(
    angle: number,
    start: number,
    end: number
  ): boolean {
    const formattedEnd =
      end - start < 0 ? end - start + 2 * Math.PI : end - start;
    const formattedMid =
      angle - start < 0 ? angle - start + 2 * Math.PI : angle - start;

    return formattedMid < formattedEnd;
  }

  public static getAngleBetween(pos1: Position, pos2: Position) {
    const dx = pos1.x - pos2.x;
    const dz = pos2.z - pos1.z;

    const angle = Math.atan2(dz, dx);

    return this.normalize(Math.PI - angle);
  }

  public static log(rad: number): void {
    console.log(this.toDeg(rad));
  }
}

export default Angle;
