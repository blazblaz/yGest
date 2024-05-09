class DoubleSetBank extends Object3d {
  constructor ({Polygon,
                angle_a,
                angle_b, width,

                   offset_x=0,
                   offset_y=0,
                   offset_z=0},

               {top_stair_count=3,
                stair_height=14.3,
                stair_length=24},

               {seat_length=40,
                bank_slope=20}) {
      
         super();
      let bfr={};

      var r = Polygon.r;
      var h = Polygon.height;

      if (!width)
      if (angle_a > angle_b) {
          let bfr = angle_b;
          angle_b = angle_a;
          angle_a = bfr;
      }

      this.tribune_top  = {};
      this.tribune_seat = {};
      this.tribune_bank = {};

         bfr.seat_height
      =  h - top_stair_count 
           * stair_length;

         bank_slope
      =  calcVectorCoeff(bank_slope);


     ////////////////////////////
    // -----------------------
   //     bank one facets
  // -----------------------
         bfr.start_a
      =  calcRadialPoint(r, angle_a);

         bfr.start_b
      =  calcRadialPoint(r, angle_b);

         bfr.end_b
      =  calcRadialPoint(
                r +     stair_length
                  * top_stair_count, angle_b);

         bfr.end_a
      =  calcRadialPoint(
                r +     stair_length
                  * top_stair_count, angle_a);

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

    this.tribune_top.face =
      [offset_x + bfr.start_a[0],
       offset_y + polygon_h,
       offset_z + bfr.start_a[1],

       offset_x + bfr.start_b[0],
       offset_y + polygon_h,
       offset_z + bfr.start_b[1],

       offset_x + bfr.end_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_b[1],

       offset_x + bfr.end_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_a[1]];

  /////////

    this.tribune_top.left =
      [offset_x + bfr.start_a[0],
       offset_y + polygon_h,
       offset_z + bfr.start_a[1],

       offset_x + bfr.end_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_a[1],

       offset_x + bfr.end_a[0],
       offset_y + 0,
       offset_z + bfr.end_a[1],

       offset_x + bfr.start_a[0],
       offset_x + 0,
       offset_z + bfr.start_a[1]];

  /////////

    this.tribune_top.right =
      [offset_x + bfr.start_b[0],
       offset_y + polygon_h,
       offset_z + bfr.start_b[1],

       offset_x + bfr.end_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_b[1],

       offset_x + bfr.end_b[0],
       offset_y + 0,
       offset_z + bfr.end_b[1],

       offset_x + bfr.start_b[0],
       offset_x + 0,
       offset_z + bfr.start_b[1]];


     ////////////////////////////
    // -----------------------
   //   tribune seat facets
  // -----------------------
         bfr.start_a
      =  calcRadialPoint(
                r +     stair_length
                  * top_stair_count, angle_a);

         bfr.start_b
      =  calcRadialPoint(r,
                r +     stair_length
                  * top_stair_count, angle_b);

         bfr.end_b
      =  calcRadialPoint(
                r +      seat_length
                  +     stair_length
                  * top_stair_count, angle_b);

         bfr.end_a
      =  calcRadialPoint(
                r +      seat_length
                  +     stair_length
                  * top_stair_count, angle_a);

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

    this.tribune_seat.face =
      [offset_x + bfr.start_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_b[1],

       offset_x + bfr.start_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_b[1],

       offset_x + bfr.end_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_b[1],

       offset_x + bfr.end_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_a[1]];

    this.tribune_seat.left =
      [offset_x + bfr.start_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_a[0],

       offset_x + bfr.end_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_a[1],

       offset_x + bfr.end_a[0],
       offset_y + 0,
       offset_z + bfr.end_a[1],

       offset_x + bfr.start_a[0],
       offset_y + 0,
       offset_z + bfr.start_a[1]];

    this.tribune_seat.right =
      [offset_x + bfr.start_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_b[0],

       offset_x + bfr.end_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.end_b[1],

       offset_x + bfr.end_b[0],
       offset_y + 0,
       offset_z + bfr.end_b[1],

       offset_x + bfr.start_b[0],
       offset_y + 0,
       offset_z + bfr.start_b[1]];

     ////////////////////////////
    // -----------------------
   //     bank two facets
  // -----------------------
    let bank_start
     =  r
     +  seat_length
     +  stair_length
     *  stair_height;

    let bank_length
     =      bank_start
     +  bfr.seat_height / bank_slope;

        bfr.start_a
     =  calcRadialPoint(bank_start, angle_a);

        bfr.start_b
     =  calcRadialPoint(bank_start, angle_b);

        bfr.end_b
     =  calcRadialPoint(bank_start
                      + bank_length , angle_b);

        bfr.end_a
     =  calcRadialPoint(bank_start
                      + bank_length, angle_a);

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

    this.tribune_bank.face =
      [offset_x + bfr.start_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_a[1],

       offset_x + bfr.end_a[0],
       offset_y + 0,
       offset_z + bfr.end_a[1],

       offset_x + bfr.end_b[0],
       offset_y + 0,
       offset_z + bfr.end_b[1],

       offset_x + bfr.start_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_b[1]];

    this.tribune_bank.left =
      [offset_x + bfr.start_a[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_a[1],

       offset_x + bfr.end_a[0],
       offset_y + 0,
       offset_z + bfr.end_a[1],

       offset_x + bfr.start_a[0],
       offset_y + 0,
       offset_z + bfr.start_a[1]];

    this.tribune_bank.right =
      [offset_x + bfr.start_b[0],
       offset_y + bfr.seat_height,
       offset_z + bfr.start_b[1],

       offset_x + bfr.end_b[0],
       offset_y + 0,
       offset_z + bfr.end_b[1],

       offset_x + bfr.start_b[0],
       offset_y + 0,
       offset_z + bfr.start_b[1]];
  }
}