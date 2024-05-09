class RampPipe extends Object3d{
  constructor ({Ramp, RampWalls}) {
    super();

    let {z_pipe_corner, twelve, scale,
         x_pipe_corner, inner_left,
                        inner_right  } = Ramp;

    this.PipeSlope = {
         left: {},
        right: {}
    }

   ///// rescale ramp prototype slope
    for (let [x,y] of twelve.entries()) {

    }


          0: [
          twelve[0][0] * coeff - pipeSlope_length / 2,
          twelve[0][1] * coeff + root_h,
          0,

          twelve[1][0] * coeff - inner_width / 2,
          twelve[0][1] * coeff + root_h,
          0
         }
          
         ],
    };

  }
}