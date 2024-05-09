class Ramp extends Object3d {
  constructor ({Polygon},
               {height=130,
                length=575,

                stand_len=140,
                stand_min=40,}) {
    super();

    Object.assign(this, arguments[0],
                        arguments[1]);
    Object.assign(this, { twelve:
    [[0,100],
       [,,],
         [,,],
           [,,],
             [,,],
                [,,],
                    [,,],
                        [,,],
                             [,,],
                                  [,,],
                                       [,,],
                                            [,,]]
    });

    this.scale   = [height
                 / (this.twelve[ 0.][0]
                 -  this.twelve[11.][0])];

    this.concave =  this.scale *
                   (this.twelve[ 0.][1]
                 -  this.twelve[11.][1]);
  }

  RampWalls ({height=120, thickness=4}) {
    let Polygon   = this.Polygon;
    let Ramp      = this;
    let stand_len = this.stand_len;
    
    this.RampWalls
      =  new RampWalls({Polygon, Ramp},
                        {height, thickness,
                                 stand_len});

    let {i_, _i, wall_front,
                 wall_right,
                 wall_back,
                 wall_left} = this.RampWalls;

     ///////////////////////////////////////////
    //   wall end sections by polygon index
    this.i_left  = i_;
    this.i_right = _i;

     ///////////////////////////////////////////
    //   stand and ramp coords (outer, inner)
    this.coords_right      = wall_right;
    this.coords_left       = wall_left;
    this.coords_back_wall  = wall_back;

    return this.RampWalls;
  }

  RampCorners ({cornerSides=4}) {
    let Polygon   = this.Polygon;

     ///////////////////////////////////////////
    //   ramp inner coordinates   
    this.RampCorners
      =  new RampCorners({Ramp, Polygon},
                          {cornerSides});

  }

  RampPipe () {

  }
}
