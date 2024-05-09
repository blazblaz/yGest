class SternPanel extends Object3d {
  constructor ({Polygon, RampWalls},
              
         {width, height, thickness}) {
    let n = Polygon.corners.length;
    let height_0 = CornerRamp.height
                 +    Polygon.height;
    let height_1 = 
        height_0 + RampWalls.height;

    let height_2 =
        height_1 + height;

    let center = Polygon.corners[
                    Math.floor(n / 2)];

    let z = center[2]
          + 0.5*width / ( Math.tan((n - 2)
                        * Math.PI / n));

    let bfr = {};

    this.stagePanel = {
      front:
     [center[0],
      height_2,
      z,

      width/2,
      height_1,
      z,

      width/2,
      height_1,
      z],

      back:
     [center[0],
      height_2,
      z - thickness,

     -width/2,
      height_1,
      z - thickness,

       width/2,
      height_1,
      z - thickness],


      left:
     [ center[0],
      height_2,
      z,

      center[0],
      height_2,
      z - thickness,

     -width/2,
      height_1,
      z - thickness,

     -width/2,
      height_1,
      z],

      left:
     [center[0],
      height_2,
      z,

      center[0],
      height_2,
      z - thickness,

      width/2,
      height_1,
      z - thickness,

      width/2,
      height_1,
      z]
    }
  }
}