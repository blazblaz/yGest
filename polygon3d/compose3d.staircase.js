class Staircase extends Object3d {
  constructor ({Polygon,
                angle_a,
                angle_b, width,

                offset_x=0,
                offset_y=0,
                offset_z=0},

               {stair_count=7,
                stair_height=14.3,
                stair_length=24}) {
       super();
    let bfr={};

    var r = Polygon.r;

    if (!isNaN(angle_a)
    &&  !isNaN(angle_b) 
    &&         angle_a > angle_b) {
        let bfr = angle_b;
        angle_b = angle_a;
        angle_a = bfr;
    }

    this.staircase = {};

    for (let i=1; i<stair_count; i++) {

         bfr.start_a
      =  calcRadialPoint(
                r + stair_length*i, angle_a);

         bfr.start_b
      =  calcRadialPoint(
                r + stair_length*i, angle_b);

         bfr.end_b
      =  calcRadialPoint(
                r + stair_length*(i+1), angle_b);

         bfr.end_a
      =  calcRadialPoint(
                r + stair_length*(i+1), angle_a);

    if  (typeof width === "number") {
   /////
    var k = bfr.end_a[0] - bfr.start_a[0]
          / bfr.end_a[1] - bfr.start_a[1];

    if  (width > 0)
             bfr_end_a[0]
           = bfr_start_a[0] + width * k; 
    else
    if  (width < 0)
             bfr_start_a[0]
           = bfr_end_a[0] + width * k;
 
   /////
    var k = bfr.end_b[0] - bfr.start_a[0]
          / bfr.end_b[1] - bfr.start_a[1];

    if  (width > 0)
             bfr_end_b[0]
           = bfr_start_b[0] + width * k; 
    else
    if  (width < 0)
             bfr_start_b[0]
           = bfr_end_b[0] + width * k;
    }

         bfr.top
      =  stair_height*(i);

    this.staircase.face =
        [offset_x + bfr.start_a[0],
         offset_y + bfr.top,
         offset_z + bfr.start_a[1],

         offset_x + bfr.end_a[0],
         offset_y + bfr.top,
         offset_z + bfr.end_a[1],

         offset_x + bfr.end_b[0],
         offset_y + bfr.top,
         offset_z + bfr.end_b[1],

         offset_x + bfr.start_b[0],
         offset_y + bfr.top,
         offset_z + bfr.start_b[1]];

  /////////

    this.staircase.left =
        [offset_x + bfr.start_a[0],
         offset_y + bfr.top,
         offset_z + bfr.start_a[1],

         offset_x + bfr.start_a[0],
         offset_y + 0,
         offset_z + bfr.start_a[1],

         offset_x + bfr.end_a[0],
         offset_y + 0,
         offset_z + bfr.end_a[1],

         offset_x + bfr.end_a[0],
         offset_y + bfr.top,
         offset_z + bfr.end_a[1]];

  /////////

    this.staircase.right =
        [offset_x + bfr.start_b[0],
         offset_y + bfr.top,
         offset_z + bfr.start_b[1],

         offset_x + bfr.start_b[0],
         offset_y + 0,
         offset_z + bfr.start_b[1],

         offset_x + bfr.end_b[0],
         offset_y + 0,
         offset_z + bfr.end_b[1],

         offset_x + bfr.end_b[0],
         offset_y + bfr.top,
         offset_z + bfr.end_b[1]];
    }
  }
}