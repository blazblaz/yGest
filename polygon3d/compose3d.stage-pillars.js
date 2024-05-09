class StagePillars extends Object3d {
  constructor ({Polygon, RampWalls},
               {width=20, section_height=35, 
                            total_height=350, 
                               thickness=2}) {
    super();

    let n      = Polygon.corners.length;
    let center = Polygon.corners[0];

    let side_a = RampWalls.side_a;
    let side_b = RampWalls.side_b;
    let length = RampWalls.length;

    var w = thickness;

     ////////////////////////////
    // -----------------------
   //      side pillars
  // -----------------------
    var sections_count
               =    total_height 
               /  section_height;
    if (          section_height 
    !== Math.ceil(section_height))
        section_height 
               =    total_height
               /   (Math.ceil(sections_count)
                            = sections_count);

    this.back_coords = [center[0] - width/2,
                        center[0] + width/2,
                        center[1],
                        center[1] - width];

    this.side_l_coords = [side_a[0] - width,
                          side_a[0],
                          side_a[1] - width,
                          side_a[1]];

    this.side_r_coords = [side_b[0] - width,
                          side_b[0],
                          side_b[1] - width,
                          side_b[1]];

    this.back   = generatePillar.apply(null,
                       this.back_coords);

    this.side_l = generatePillar.apply(null,
                       this.side_l_coords);

    this.side_r = generatePillar.apply(null,
                       this.side_r_coords);

    function generatePillar (x0, x1, z0, z1) {
      var h = 0;
      var result = {};
      for (let i=0; i<sections_count; i++) {
          result[i] 
              = { };
          result[i].left_a = {
             front:
            [x0,   h+section_height, z0,
             x0+w, h+section_height, z0,
             x0+w, h,                z0,
             x0,   h,                z0],

             back:
            [x0,   h+section_height, z0+w,
             x0+w, h+section_height, z0+w,
             x0+w, h,                z0+w,
             x0,   h,                z0+w],

             left:
            [x0, h+section_height, z0,
             x0, h+section_height, z0+w,
             x0, h,                z0+w,
             x0, h,                z0],

             right:
            [x0, h+section_height, z0,
             x0, h+section_height, z0+w,
             x0, h,                z0+w,
             x0, h,                z0],
          };

          result[i].right_a = {
             front:
            [x1,   h+section_height, z0,
             x1-w, h+section_height, z0,
             x1-w, h,                z0,
             x1,   h,                z0],

             back:
            [x1,   h+section_height, z0+w,
             x1-w, h+section_height, z0+w,
             x1-w, h,                z0+w,
             x1,   h,                z0+w],

             left:
            [x1, h+section_height, z0,
             x1, h+section_height, z0+w,
             x1, h,                z0+w,
             x1, h,                z0],

             right:
            [x1, h+section_height, z0,
             x1, h+section_height, z0-w,
             x1, h,                z0-w,
             x1, h,                z0],
          };

          result[i].left_b = {
             front:
            [x0,   h+section_height, z1,
             x0+w, h+section_height, z1,
             x0+w, h,                z1,
             x0,   h,                z1],

             back:
            [x0,   h+section_height, z1-w,
             x0+w, h+section_height, z1-w,
             x0+w, h,                z1-w,
             x0,   h,                z1-w],

             left:
            [x0, h+section_height, z1,
             x0, h+section_height, z1-w,
             x0, h,                z1-w,
             x0, h,                z1],

             right:
            [x0, h+section_height, z1,
             x0, h+section_height, z1-w,
             x0, h,                z1-w,
             x0, h,                z1],
          };

          result[i].right_b = {
             front:
            [x1,   h+section_height, z1,
             x1-w, h+section_height, z1,
             x1-w, h,                z1,
             x1,   h,                z1],

             back:
            [x1,   h+section_height, z1-w,
             x1-w, h+section_height, z1-w,
             x1-w, h,                z1-w,
             x1,   h,                z1-w],

             left:
            [x1, h+section_height, z1,
             x1, h+section_height, z1-w,
             x1, h,                z1-w,
             x1, h,                z1],

             right:
            [x1, h+section_height, z1,
             x1, h+section_height, z1-w,
             x1, h,                z1-w,
             x1, h,                z1],
          };

          h = h + section_height;
      }
      return result;
    }

     ////////////////////////////
    // -----------------------
   //     front stage bar
  // -----------------------
    var total_length = side_a[0]
                     - side_b[0];
    var section_length 
     =  section_height;

    var sections_count
               =    total_length
               /  section_length;
    if (          section_length
    !== Math.ceil(section_length))
        section_length
               =    total_length
               /   (Math.ceil(sections_count)
                            = sections_count);

    this.stage_bar = generateStageBar(side_a[0],
                                      side_b[1]);


    function generateStageBar (x0, z) {
      var x=x0;
      var result = {};
 
      for (let i=0; i<sections_count; i++) {
          result[i] 
              = { };
          result[i].above_front = {
          above: [],
          below: [],
           left: [],
          right: [],
          };

          result[i].below_front = {
          above: [],
          below: [],
           left: [],
          right: [],
          };

          result[i].above_rear = {
          above: [],
          below: [],
           left: [],
          right: [],
          };

          result[i].below_rear = {
          above: [],
          below: [],
           left: [],
          right: [],
          };
      }
    }
  }
}

