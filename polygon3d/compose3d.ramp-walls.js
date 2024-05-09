class RampWalls extends Object3d {
	constructor ({Polygon, Ramp}, 
                {height, thickness,
                         stand_len}) {
    super();
    this.walls  = {};

    let  length =
    this.length = Ramp.length;

    var height_0 = 0;
    var height_1 = Polygon.height;
    var height_2 = Polygon.height
                 +         height;


     ////////////////////////////
    // -----------------------
   //    calc wall bounds
  // -----------------------
    var z_max, total,
        z_min;

    var coord,
       _coord;

    for (coord of Polygon.corners) {
     if (coord[1] < z_min
     ||            !z_min) z_min = coord[1];
         else
     if (coord[1] > z_max
     ||            !z_max) z_max = coord[1];
    }

    var total 
     =  z_max - z_min;

    var i, i_, _i;
    var diff_min_0,
        diff_min_1;

    for (i=0; i<Polygon.corners.length; i++) {
     if (      !Polygon.corners[i+1]       ) break;
     if (z_min + length < Polygon.corners[i  ][1]
     &&  z_min + length > Polygon.corners[i+1][1])
         i_ = i;
    else
     if (z_min + length > Polygon.corners[i  ][1]
     &&  z_min + length < Polygon.corners[i+1][1])
        _i = i + 1;
    }+

    /////////////////////////////
   //  store polygon indexes
      this.i_ = i_;
      this._i = _i;

      this.side_front = null;
      this.side_right = null;
      this.side_back = null;
      this.side_left = null;


     ////////////////////////////
    // -----------------------
   //    wall bound final A
  // -----------------------
    var [x1, z1] = Polygon.corners[i_   ];
    var [x0, z0] = Polygon.corners[i_ + 1];
    var k
     = (x1 > x0) ? (z1 - z0)
                 / (x1 - x0)
                 :  0;

    var x = k*(length - z_min) + z0;

    this.wall_left = [x, x + stand_len];
    this.walls[i_]  = [
        x,
        height_0,
        length + z_min,

        x,
        height_2,
        length + z_min,

        x0,
        height_2,
        z0,

        x0,
        height_0,
        z0,
    ];

    this.walls.side_left = [
        x,
        height_1,
        length + z_min,

        x + stand_len,
        height_1,
        length + z_min,

        x + stand_len,
        height_2,
        length + z_min,

        x,
        height_2,
        length + z_min,
    ];

     ////////////////////////////
    // -----------------------
   //    wall bound final B
  // -----------------------
    var [x1, z1] = Polygon.corners[_i - 1];
    var [x0, z0] = Polygon.corners[_i    ];
    var k
     = (x1 > x0) ? (z1 - z0)
                 / (x1 - x0)
                 :  0;

    var x = k*(length - z_min) + z0;

    this.wall_right = [x, x - stand_len];
    this.walls.[_i] = [
        x,
        height_0,
        length + z_min,

        x,
        height_2,
        length + z_min,

        x0,
        height_2,
        z0,

        x0,
        height_0,
        z0,
    ];

    this.walls.side_right = [
        x,
        height_1,
        length + z_min,

        x - stand_len,
        height_1,
        length + z_min,

        x - stand_len,
        height_2,
        length + z_min,

        x,
        height_2,
        length + z_min,
    ];


     ////////////////////////////
    // -----------------------
   //  wall bounds in-between
  // -----------------------
    var bfr;
    for (i=i_+1; i<_i; i++) {
        coord = Polygon.corners[i    ];
       _coord = Polygon.corners[i + 1];

        this.walls[i] = [
            coord[0],
            0,
            coord[1],

            coord[0],
            height,
            coord[1],

           _coord[0],
            height,
           _coord[1],

           _coord[0],
            0,
           _coord[1],
        ];
    }

     ////////////////////////////
    // -----------------------
   //   inner wall at center 
  // -----------------------
    var height_0 = CornerRamp.height
                 +    Polygon.height;
    var height_1 = 
        height_0 + RampWalls.height;

    var center = Polygon.corners[
                    Math.floor(n / 2)];

    let z = center[2]
          + 0.5*width / ( Math.tan((n - 2)
                        * Math.PI / n));

    this.wall_back = [0, z];
    this.perpendicularRampWall = {
      wall:
     [width/2,
      height_0,
      z,

     -width/2,
      height_0,
      z,

     -width/2,
      height_1,
      z,

      width/2,
      height_1,
      z],

      top:
     [center[0],
      height_1,
      center[1],

      width/2,
      height_1,
      z,

      width/2,
      height_1,
      z]
    };

  }
}