class Polygon extends Object3d {
	constructor ({n=10, r=500, h=100,
                center_x=0,
                center_y=0,
                center_z=0,  tiles}) {
    super();
    let bfr={};

    var corners = [];

    var surface = [];
    var  tiles  = [];

    var  sides  = [];
    var  coord,
        _coord;

    var  angle  = 360 / n; 

        corners.push(
        _coord  = calcRadialPoint(r, 0));
    for (let i=1; i<n; i++) {
        corners.push(
         coord  = calcRadialPoint(r, angle*i));

        surface.push(
              [ center_x, center_y, center_z,
                _coord[0],    h,    _coord[1],
                 coord[0],    h,     coord[1] ]);

          sides.push(
              [_coord[0],    h,    _coord[1],
               _coord[0],    0,    _coord[1],
                coord[0],    0,     coord[1],
                coord[0],    h,     coord[1] ]);

        _coord = coord;
    }

    Object.assign(this,
                 { corners, height: h, n, r,
                   surface, center_x,
                    tiles,  center_y,
                    sides,  center_z });
  }
}
