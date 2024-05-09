  ///////////////////////////////////////////////
 // scalable: skateable dancepad / rural stage
/*   
   [to-do]: modify the ramp model
 - `twelve` ramp model in `compose3d.ramp.js`
 -  implement in calc corner of
   `compose3d.ramp-corners.js`
 -  implement in drop-in in
   `compose3d.ramp-dropin.js`  

   [to-do]: implement render method
 - `area3d.js` implements an outline of
   `THREE.js/ShapeGeometry`

 */

function compose3d () {

var decagon =
new Polygon({n: 10, r: 500, h: 100,
             tiles: [30.5, 30.5, 1]});

var miniramp =
new Ramp({Polygon: decagon}
          {height: 130,
           length: 575,
           
           stand_len: 140,
           stand_min:  40});

var rampWalls =
    miniramp.RampWalls({height: 120});

var rampCorners =
    miniramp.RampCorners({cornerSides=4});

var rampPipe =
new RampPipe({RampWalls: rampWall, 
                Polygon: decagon},
                
                {height: 130});

/*
var sternPanel =
new SternPanel({Polygon: decagon,
             CornerRamp: miniramp,
              RampWalls: rampWall});
 */

var stagePillars =
new StagePillars({Polygon: decagon, 
                RampWalls: rampWall},
                
                {width: 20, total_height: 350, 
                          section_height: 35});

var funbox =
new Funbox({Polygon: decagon,
           offset_z: 430},

           {bump_slope: 25,
            kickerPad_slope: 25,
            kickerPad_height: 60,
            kickerPad_width: 100,
            kickerPad_length: 100,
            
            gap_length: 0,

            pyramid_slope_horizontal: 20,
            pyramid_slope_downward:   30,
            pyramid_width_a: 150,
            pyramid_width_b: 250,

            ledge_offset_z: 50,
            ledge_height: 25,
            ledge_length: 200,
            ledge_width_a: 40,
            ledge_width_b: 30,
            ledge_slope_downward: 15,
            ledge_slope_wallride: 90});

var staircase_l =
new Staircase({Polygon: decagon,
               angle_a: 0,
               angle_b: -36},

              {stair_count: 7,
               stair_height: 14.3,
               stair_length: 24});

var staircase_r =
new Staircase({Polygon: decagon,
               angle_a: 0,
               angle_b: 36},

              {stair_count: 7,
               stair_height: 14.3,
               stair_length: 24});

var doublesetbank_r_1 =
new DoubleSetBank({Polygon: decagon,
                   angle_a: 36,
                   angle_b: 72},

                  {top_stair_count: 3,
                   stair_height: 14.3,
                   stair_length: 24},

                 {seat_length: 40,
                  bank_slope:  20});

var doublesetbank_r_2 =
new DoubleSetBank({Polygon: decagon,
                   angle_a: 72,
                   angle_b: 108},

                  {top_stair_count: 3,
                   stair_height: 14.3,
                   stair_length: 24},

                 {seat_length: 40,
                  bank_slope:  20});

var doublesetbank_l_1 =
new DoubleSetBank({Polygon: decagon,
                   angle_a: -36,
                   angle_b: -72},

                  {top_stair_count: 3,
                   stair_height: 14.3,
                   stair_length: 24},

                 {seat_length: 40,
                  bank_slope:  20});

var doublesetbank_l_2 =
new DoubleSetBank({Polygon: decagon,
                   angle_a: -72,
                   angle_b: -108},

                  {top_stair_count: 3,
                   stair_height: 14.3,
                   stair_length: 24},

                 {seat_length: 40,
                  bank_slope:  20});

var handrail_l =
new Handrail({Polygon: decagon,
                angle: -36},

              {height: 35,
                slope: 20,
               length: 150});

var handrail_r =
new Handrail({Polygon: decagon,
                angle: 36},
             
             {height: 35,
               slope: 20,
              length: 150});
}