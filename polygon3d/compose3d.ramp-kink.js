class CornerRamp extends Object3d{
  constructor ({Polygon, RampWalls},

                {total_width=575,
                      height=130,
                inner_length=600,
           
                 kink_slope=0,
                 min_height=0}) {
    super();

    this.kink_l   = {};
    this.kink_r   = {};
  }
}