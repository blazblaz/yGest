class Funbox extends Object3d {
  constructor ({Polygon,
                offset_z=0},

               {bump_slope,
                kickerPad_slope,
                kickerPad_height,
                kickerPad_width,
                kickerPad_length,

                gap_length=0,

                pyramid_slope_horizontal,
                pyramid_slope_downward,
                pyramid_width_a,
                pyramid_width_b,
                pyramid_height_a,
                pyramid_height_b,
                
                ledge_offset_z,
                ledge_height,
                ledge_length,
                ledge_width_a,
                ledge_width_b,
                ledge_slope_downward,
                ledge_slope_wallride}) {

       super();
    let bfr={};

        kickerPad_slope 
     =  calcVectorCoeff(kickerPad_slope);

    var kickerPad_height_0
     =  kickerPad_height
     -  kickerPad_length * kickerPad_slope
     +  polygon_h;

   /////

        bump_slope
     =  calcVectorCoeff(bump_slope);

    var bump_length
     =  kickerPad_height_0 / bump_slope;

   /////

        ledge_slope_downward
     =  calcVectorCoeff(ledge_slope_downward);

        ledge_slope_wallride
     =  calcVectorCoeff(ledge_slope_wallride);

   /////

        pyramid_slope_downward
     =  calcVectorCoeff(pyramid_slope_downward);

        pyramid_slope_horizontal
     =  calcVectorCoeff(pyramid_slope_horizontal);
   
    var pyramid_length
     = (pyramid_height_a
     -  pyramid_height_b) / pyramid_slope_downward;


     ////////////////////////////
    // -----------------------
   //       bump facets
  // -----------------------
    this.bump = {
    face: [
    bfr.start_l
 = [offset_x - kickerPad_width / 2,
    offset_y + 0               + polygon_h, 
    offset_z - bump_length - kickerPad_length],

    bfr.start_r
 = [offset_x + kickerPad_width / 2,
    offset_y + 0               + polygon_h,
    offset_z - bump_length - kickerPad_length],

    bfr.end_r
 = [offset_x + kickerPad_width / 2,
    offset_y + kickerPad_height_0 + polygon_h,
    offset_z - kickerPad_length],

    bfr.end_l
 = [offset_x - kickerPad_width / 2,
    offset_y + kickerPad_height_0 + polygon_h,
    offset_z - kickerPad_length]
   ],

  /////////

    left: [
   [...bfr.start_l],

   [offset_x - kickerPad_width / 2,
    offset_y + 0               + polygon_h,
    offset_z - kickerPad_length],

   [...bfr.end_l  ],

   [offset_x - kickerPad_width / 2,
    offset_y + kickerPad_height_0 + polygon_h,
    offset_z - bump_length - kickerPad_length]
   ],

  /////////

   right: [
   [...bfr.start_r],

   [offset_x + kickerPad_width / 2,
    offset_y + 0               + polygon_h,
    offset_z - kickerPad_length],

   [...bfr.end_r  ],

   [offset_x + kickerPad_width / 2,
    offset_y + kickerPad_height_0 + polygon_h,
    offset_z - bump_length - kickerPad_length]
   ]};



     ////////////////////////////
    // -----------------------
   //    kicker pad facets
  // -----------------------
    this.kickerPad = {
    face: [
    bfr.start_l
 = [offset_x - kickerPad_width / 2,
    offset_y + kickerPad_height_0 + polygon_h,
    offset_z - kickerPad_length],

    bfr.start_r
 = [offset_x + kickerPad_width / 2,
    offset_y + kickerPad_height_0 + polygon_h,
    offset_z - kickerPad_length],
    
    bfr.end_r
 = [offset_x + kickerPad_width / 2,
    offset_y + kickerPad_height + polygon_h,
    offset_z],

    bfr.end_l
 = [offset_x - kickerPad_width / 2,
    offset_y + kickerPad_height + polygon_h,
    offset_z]
   ],

   right: [
  [offset_x + kickerPad_width / 2,
   offset_y                   + polygon_h,
   offset_z - kickerPad_length],

  [...bfr.start_r],
  [...bfr.end_r  ],

  [offset_x + kickerPad_width / 2,
   offset_y +                 + polygon_h,
   offset_z]
  ]};


   left: [
  [offset_x - kickerPad_width / 2,
   offset_y                   + polygon_h,
   offset_z - kickerPad_length],

  [...bfr.end_l  ],
  [...bfr.start_l],

  [offset_x - kickerPad_width / 2,
   offset_y +                 + polygon_h,
   offset_z]
  ],




     ////////////////////////////
    // -----------------------
   //      ledge facets
  // -----------------------
    this.ledge = {
      face: [
      bfr.start_l
   = [offset_x - ledge_width_a - kickerPad_width / 2,
      offset_y + ledge_height  + polygon_h,
      offset_z + ledge_offset_z],

      bfr.start_r
   = [offset_x + ledge_width_a + kickerPad_width / 2,
      offset_y + ledge_height  + polygon_h,
      offset_z + ledge_offset_z],
 
      bfr.end_r
   = [offset_x + ledge_width_b + (pyramid_width_b
                               -  pyramid_width_a)
                               *  ledge_length
                               /  pyramid_length,

      offset_y +  ledge_slope_downward
               * (ledge_height + polygon_h),

      offset_z + ledge_slope_downward
               * ledge_length],
      
      bfr.end_l
   = [offset_x - ledge_width_b - (pyramid_width_b
                               -  pyramid_width_a)
                               *  ledge_length
                               /  pyramid_length,

      offset_y +  ledge_slope_downward
               * (ledge_height + polygon_h),

      offset_z + ledge_slope_downward
               * ledge_length]],

      left: [
     [bfr.start_l[0]
   - (bfr.start_l[1] - polygon_h) * ledge_slope_wallride,
      bfr.start_l[1],
      bfr.start_l[2]],

     [...bfr.start_l],
     [...bfr.end_l  ],
      
     [bfr.end_l[0]
   - (bfr.end_l[1] * ledge_slope_wallride),
      bfr.end_l[1],
      bfr.end_l[2]]
     ],

      right: [
     [bfr.start_r[0]
   + (bfr.start_r[1] - polygon_h) * ledge_slope_wallride,
      bfr.start_r[1],
      bfr.start_r[2]],

     [...bfr.start_r],
     [...bfr.end_r  ],
      
     [bfr.end_r[0]
   - (bfr.end_r[1] * ledge_slope_wallride),
      bfr.end_r[1],
      bfr.end_r[2]]
     ]};


     ////////////////////////////
    // -----------------------
   //     pyramid facets
  // -----------------------
  if (0 > pyramid_height_b 
        - pyramid_height_b * pyramid_slope_horizontal) {}




  }
}