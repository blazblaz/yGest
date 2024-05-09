class RampCorners extends Object3d {
  constructor ({Ramp, Polygon},
               {cornerSides=4}) {
    super();

    this.corner_l = {};
    this.corner_r = {};

    let {twelve, concave, stand_min, height,

                 coords_left,
                 coords_right,
                 coords_back_wall} = Ramp;
    let           {corners}        = Polygon;

    let x_pipe_corner
     =  coords_left[1] + concave;

    var z_pipe_corner
     =  coords_back_wall[1] + stand_min
                            + concave;

    var z_ramp_back
     =  coords_back_wall[1] + stand_min;

     ////////////////////////////
    // -----------------------
   //  ramp placement & width
  // -----------------------
    var isStandMin = -1;
    var angle_step = 90 / cornerSides;
    do  {
    var angle = 180;
    for (let i=0;  i<cornerSides; i++) {
         let [x,z]=calcRadialPoint(concave, angle,
                                    x_pipe_corner,
                                    z_pipe_corner);

     if (corners.find(([_x,_z]) =>
            stand_min >
            Math.sqrt(Math.abs( x-_x )**2
                    + Math.abs( z-_z )**2))) {
         isStandMin = -1;
        z_ramp_back =   z_ramp_back + 10;
      z_pipe_corner = z_pipe_corner + 10;
              break;
    }
              angle =
              angle + angle_step;
    }}
    while (!isStandMin++)

    /////////////////////////////
   //  store derived values
    this.coords_pipe_corner_left
      = [x_pipe_corner, z_pipe_corner];

    this.coords_pipe_corner_right
      = [-x_pipe_corner, z_pipe_corner];


     ////////////////////////////
    // -----------------------
   //  calc left corner [to-do]
  // -----------------------

   // calc ramp corner slope sections
      var angle = 270,
       _corners = corners.entries();

   //  calc walls by proximity
      var min_dist, x_dist, x_wall, x_wall_prev,
         prev_wall, z_dist, z_wall, z_wall_prev;

    for (let i=0;  i<cornerSides; i++) {
    for (var [j,[x,z]] of twelve)      {
         var    [x,z]
          =  calcRadialPoint(concave - x, angle,
                                x_pipe_corner,
                                z_pipe_corner);
    
   ///// calc walls by proximity
    for (let [j,wall] of _corners) {
     if (!prev_corner) {
          prev_corner = wall;
          continue;
     }

     let dist
      =  calcIntercept(wall[0], prev_wall[0],
                       wall[1], prev_wall[1],

                          x_pipe_corner, x,
                          z_pipe_corner, z);

     if  (!min_dist
     ||    min_dist > dist) {
           min_dist = dist;

             x_wall = x_dist;
             z_wall = z_dist;
    }
    else
     if   (min_dist) {
     if  (x_wall_prev)
          this.corner_l[i] = [];

          x_wall_prev = x_wall;
          z_wall_prev = z_wall;

          break;
    }}

   ///// calc ramp corner slope

             angle =
             angle + angle_step;
    }


     ////////////////////////////
    // -----------------------
   //  calc right corner [to-do]
  // -----------------------
         var angle = 0;
    for (let i=0;  i<cornerSides; i++) {
    for (var [j,[x,z]] of twelve)      {
         var    [x,z]
          =  calcRadialPoint(concave - x, angle,
                                x_pipe_corner,
                                z_pipe_corner);
    for (let [j,wall] of corners) {
     if (!prev_corner) {
          prev_corner = wall;
          continue;
     }

     let dist
      =  calcIntercept(wall[0], prev_wall[0],
                       wall[1], prev_wall[1],
 
                          x_pipe_corner, x,
                          z_pipe_corner, z);
 
     if  (!min_dist
     ||    min_dist > dist) {
           min_dist = dist;

        x_wall_prev = x_wall;
        z_wall_prev = z_wall;
    }
    else
     if   (min_dist) {
     if  (x_wall_prev)
          this.corner_l[i] = [];
    }

             angle =
             angle + angle_step;
    }

    function calcIntercept (wall_x, prev_wall_x,
                            wall_z, prev_wall_z,
                                  x_pipe_corner, x,
                                  z_pipe_corner, z) {
  /*

     z = k_wall * x + n_wall
     z = k_ramp * x + n_ramp

   */

     let k_wall = (wall_x - prev_wall_x)
                / (wall_z - prev_wall_z);
     let k_ramp = (x_pipe_corner - x)
                / (z_pipe_corner - z);

     let n_wall = - k_wall*wall_x + wall_x;
     let n_ramp = - k_ramp*x       + z;

  /*

     z = k_wall * x + n_wall
     z = k_ramp * x + n_ramp
    
         k_wall * x + n_wall
       = k_ramp * x + n_ramp

         k_wall * x
       - k_ramp * x
       =             n_wall
                   - n_ramp     
   */
         x_wall = (n_wall - n_ramp)
                / (k_wall - k_ramp);
         z_wall = (k_ramp * x_dist) + n_ramp;

         return calcDistance(x_wall, z_wall,
                             x,      z);
    }
  }
}