var bfr = [];
class Object3d {
  static list={ };
  static boundaries  = [    ];
  static  inMotion   = [    ];
  static   static    = [    ];
  static   opaque    = [    ];
  static translucent = [    ];

  static bfr;

    plane = [ ,,,
             ,,, ];
  isStatic;
  isOpaque;
  boundaries;
  boundingBox;

  orientation;
  width;
  height;
  length;

  render () {
    Object3d.bfr = [this.constructor.name];

    Object.entries(this).forEach(([key, val]) => {
      if  (typeof (val) === "object"
      &&          (val).constructor === Object)  {
          bfr.push(key);

    Object.entries(val).forEach(([key, val]) => {
      if  (typeof (val) !== "object") 
           return;

      if  (Array  === val.constructor)
           return createShape(key, val);
      if  (Object === val.constructor) {
           bfr.push(key);

    Object.entries(val).forEach(([key, val]) => {
      if  (Array === val.constructor)
           return createShape(key, val);
    });    bfr.pop();
    }})    bfr.pop();   }});

    function createShape (key, shape) {
      const geometry
        =   new THREE.BufferGeometry();
            vertices
        =   new Float32Array(shape);

            geometry.setAttribute(   'position',
            new THREE.BufferAttribute(vertices, 3));

      const material
        =   new THREE.MeshBasicMaterial(
          { color: shape.color || 0xff0000 });

      const mesh
        =   new THREE.Mesh(geometry, material);

            Object3d.list[
            Object3d.bfr.concat([key])] = (mesh);
    }
  }

  getProps (object) {
   normalizeAccessor(object,
         "isStatic", [true],
         dictionaryMatrix("(is)_static"));

   if (object.isStatic) Object3d.static
                                .push(object);

                   else Object3d.inMotion
                                .push(object);

 /////
   normalizeAccessor(object,
        "boundaries", [[isVertex, 6]],
         dictionaryMatrix("(has|is)_bound(s|ary|aries)"));

 /////
   normalizeAccessor(object,
        "isOpaque", [true, false],
         dictionaryMatrix("(is)_opaque"));

   normalizeAccessor(object,
        "isTranslucent", [true, false],
         dictionaryMatrix("(is)_trans(lucent|parent)"));

   if (object.isTranslucent !== undefined) 
       object.isOpaque = !object.isTranslucent, 
                          Object3d.opaque
                                  .push(object);

                     else Object3d.translucent
                                  .push(object);

 /////
   normalizeAccessor(object,
         "plane",   [[isVertex, 6,6]],
         dictionaryMatrix("(is)_plane-s"));

 /////
   normalizeAccessor(object,
         "orientation", [[isVertex, 3,3]],
         dictionaryMatrix("(orientation|angle|rotation|rotated|rotate)"));
  }

  boundingBox (object) {
     var appendNew =  (this
                  ===  true),
      i,   bounds  =  [ 0,0,0,
                       0,0,0,
                      0,0,0,
                     0,0,0,
                    0,0,0,
                   0,0,0,
                  0,0,0,
                 0,0,0, ];
  
     for (v of object) {
      //  right-up-above corner
      if (v[0] > bounds[0]
      &&  v[1] > bounds[1]
      &&  v[2] > bounds[2])
         {       bounds[0] = v[0];
                 bounds[1] = v[1];
                 bounds[2] = v[2];
         }
      else
      //  right-up-bottom corner
      if (v[0] > bounds[3]
      &&  v[1] < bounds[4]
      &&  v[2] > bounds[5])
         {       bounds[3] = v[0];
                 bounds[4] = v[1];
                 bounds[5] = v[2];
         }
      else
      //  right-down-above corner
      if (v[0] > bounds[6]
      &&  v[1] > bounds[7]
      &&  v[2] < bounds[8])
         {       bounds[6] = v[0];
                 bounds[7] = v[1];
                 bounds[8] = v[2];
         }
      else
      //  right-down-bottom corner
      if (v[0] > bounds[9 ]
      &&  v[1] < bounds[10]
      &&  v[2] < bounds[11])
         {       bounds[9 ] = v[0];
                 bounds[10] = v[1];
                 bounds[11] = v[2];
         }
      else
      //  left-down-above corner
      if (v[0] < bounds[12]
      &&  v[1] > bounds[13]
      &&  v[2] < bounds[14])
         {       bounds[12] = v[0];
                 bounds[13] = v[1];
                 bounds[14] = v[2];
         }
      else
      //  left-down-bottom corner
      if (v[0] < bounds[15]
      &&  v[1] < bounds[16]
      &&  v[2] < bounds[17])
         {       bounds[15] = v[0];
                 bounds[16] = v[1];
                 bounds[17] = v[2];
         }
      else
      //  left-up-above corner
      if (v[0] < bounds[18]
      &&  v[1] > bounds[19]
      &&  v[2] > bounds[20])
         {       bounds[18] = v[0];
                 bounds[19] = v[1];
                 bounds[20] = v[2];
         }
      else
      //  left-up-bottom corner
      if (v[0] < bounds[21]
      &&  v[1] > bounds[22]
      &&  v[2] < bounds[23])
         {       bounds[21] = v[0];
                 bounds[22] = v[1];
                 bounds[23] = v[2];
         }
    }
    return bounds;
  }
}

function distance (p1, p2) {
     var result=0;
     for (let i=0; i<Math.min(p1.length,
                              p2.length); i++)
         result += (p2[i] - p1[i]) ** 2;
  return result ** .5;
}

function facetNormalVector (facet) {
  var [x1, y1, z1] = facet[0],
      [x2, y2, z2] = facet[1];
      
  var v,
    i=1,  w=unitVector([x2-x1, y2-y1, z2-z1]),
    isEqual=Math.abs(
            dotProduct(w)
                          );
       /********///////*//
  do  {
      [x1, y1, z1] = facet[i++],
      [x2, y2, z2] = facet[i  ];
     v=unitVector([x2-x1, y2-y1, z2-z1]);
     
  }  while  (isEqual == Math.abs(dotProduct(v)
                     &&
    v.every((xyz, i) => Math.abs( xyz )
                     == Math.abs(w[i]))     ));

  return crossProduct(v, w);
}

function triangleArea (a, b, c) {
       let s=0.5 * (a + b + c);
       
  return ((a - s) *
          (b - s) *
          (c - s)) ** 0.5;
}

function unitVector (v) {
    var norm=0;
         v.forEach((xyz) => norm += xyz ** 2);
                            norm ** .5;
  return v.map((xyz) => xyz/norm);
}

function dotProduct (v, w) {
     var result=0;
     for (let i=0; i<Math.min(v.length,
                              w.length); i++)
         result += v[i] * w[i];
  return result;
}

function crossProduct (v, w) {
  // 3d: (v₂w₃ - v₃w₂, v₃w₁ - v₁w₃, v₁w₂ - v₂w₁)
  return [v[1]*w[2] - v[2]*w[1],
          v[2]*w[0] - v[0]*w[2],
          v[0]*w[1] - v[1]*w[1]];
}


function intersection3d (object, plane) {
  for (let vertex of object) {
    
  }
}

function calcRadialPoint (r, degs, offset_x=0, 
                                   offset_z=0) {
  let quadrant
   =  Math.floor(degs / 180) * 180;

  var x, z;
      degs
   = (degs%360 * Math.PI / 180);
 
  switch (quadrant) {
   case   0: x = -Math.sin(degs) * r;
             z =  Math.cos(degs) * r;
                               break;
  /*
   * fix it up
   */

   case 180: x =  Math.sin(degs) * r;
             z = -Math.cos(degs) * r;
                               break;
  }

  return [x + offset_x,
          z + offset_z];
}

function calcDistance (x2, x1, y2, y1) {
     var d;
  return d = Math.sqrt((x2 − x1)**2 
                     + (y2 − y1)**2);
}

function calcVectorCoeff (degs) {
  var k;

      degs
   = (degs%360 * Math.PI / 180);

  return Math.cos(degs);
}

 // import {normalizeAccessor,
//          dictionaryMatrix} from "./objectRefs.js";

// outer edges and facets are found for objects
// bounding box is calculated for objects
// `plane` normal is calculated for outer facets

 //////////////////////////////////////////////// 
/* 
  
  a plane can be defined by its normal & a point
  n = (A, B, C), Pb = (Xb, Yb, Zb)

  any point on a plane satisfies criterium:
  A x + B y + C z + D = 0

  determining D by substituting in a point
  D = -(A Px + B Py + C Pz)

  determining vertex to a side of the plane
  side(Q) = A Qx + B Qy + C Qz + D
  ... positive or negative

  determining if edge intersects the plane
  P = P0 + u(P1 - P0)  ...  0<=u<=1

  u = -side(P0) / (side(P1) - side(P0))

 */
/*

   minimum distance between a point and a plane

   Pa = (Xa, Ya, Za)
    0 = A x + B y + C z + D

  |(A*Xa + B*Ya + C*Za)/(A^2 + B^2 + C^2)**2|
  
 */
function calcDistanceFacets () {

}
 
 ///////////////////////////////////////////////
/* calculate regular polygon area

    Area 
 = (number of sides    ×
    length of one side × apothem)/2

    Apothem (radius)
 = [(length of one side)
 / 2(tan(180/number of sides))]

 */
function calcMaterialTiles (object, center,
                            length, width) {

}

let v,w, i,_objects, b;

function loopVertex
            (vertex, ix) {
if (isVertex(vertex)) v=(vertex);  else
if (isNaN( ix ) || isNaN(vertex)) return v=null;
   {                  v=[vertex];
do {                  b=(i.next().value);
if (isNaN(b[0]) || isNaN(b[ 1 ])) return v=null;
                  v.push(b[ 1 ]);
   }  while  (v.length <= 3)
   }
}