class Vector {
  public static add(vector1?: VectorType, vector2?: VectorType): VectorType {
    vector1 = vector1 || { x: 0, y: 0, z: 0 };
    vector2 = vector2 || { x: 0, y: 0, z: 0 };

    return {
      x: (vector1.x || 0) + (vector2.x || 0),
      z: (vector1.z || 0) + (vector2.z || 0),
      y: (vector1.y || 0) + (vector2.y || 0),
    };
  }
}

export default Vector;
