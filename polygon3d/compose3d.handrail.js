class Handrail extends Object3d {
	constructor ({Polygon, angle,
               offset_x,
               offset_y,
               offset_z},

               {height, slope, thickness, length}) {
       super();
    let bfr={};

    let r = Polygon.r;
    let h = Polygon.height;

    this.rail = {};

    var height_0 =  Polygon.height + height;
    var height_1 = 
        height_0 - (Polygon.height + height)
                 * calcVectorCoeff(slope);

    bfr.start = calcRadialPoint(r,          angle);
    bfr.end   = calcRadialPoint(r + length, angle);
    
    this.rail.handle = {
      top:
     [offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     + thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     + thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1   + thickness / 2,
      offset_z + bfr.end[0] + thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1   + thickness / 2,
      offset_z + bfr.end[0] + thickness / 2,
     ],

      left:
     [offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     + thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1   + thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + height     - thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,
    ],
      
      bottom:
     [offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1   - thickness / 2,
      offset_z + bfr.end[0] + thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1   - thickness / 2,
      offset_z + bfr.end[0] + thickness / 2,
     ],
      
      right:
     [offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     + thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1   + thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1   - thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     + thickness / 2,
      offset_z + bfr.start[1] - thickness / 2]
    };

    this.rail.stand_top = {
      back:
     [offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] - thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] - thickness / 2
     ],
      
      left:
     [offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] - thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] - thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] - thickness / 2,
     ],
      
      front:
     [offset_x + bfr.start[0] - thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] - thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] + thickness / 2
     ],
      
      right:
     [offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] - thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + height_0     - thickness / 2,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] + thickness / 2,

      offset_x + bfr.start[0] + thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.start[1] - thickness / 2]
    };


    this.rail.stand_top = {
      back:
     [offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] - thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] - thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] - thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + polygon_h,
      offset_z + bfr.end[1] - thickness / 2
     ],
      
      left:
     [offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] - thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] - thickness / 2,
     ],
      
      front:
     [offset_x + bfr.end[0] - thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] - thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] + thickness / 2
     ],
      
      right:
     [offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] - thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + height_1     - thickness / 2,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] + thickness / 2,

      offset_x + bfr.end[0] + thickness / 2,
      offset_y + 0,
      offset_z + bfr.end[1] - thickness / 2]
    };
  }
}