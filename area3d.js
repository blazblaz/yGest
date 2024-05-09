function isVertex (array) {
  var i,
  slice;
  
  if  ( typeof (array)  ==  "object" )
  for ( i=0; i<=array.length; i=i+3  )
      { slice = array.slice(i, (i+3) )
   if (!slice.every(v =>
             !isNaN(v))){   break;  }}
  
  return (i) || (false);
}

var objBoundaryIndex=[   ], v,w, i,_objects, b;
function indexBounds (...objects) {
     var appendNew =  (this 
                  ===  true),
      i,   bounds  =  [ ,,,
                       ,,, ];
                      ////
  
  objects.forEach(object => {
 (                  i=
  object[`entries`] ||
  Object[`entries`]
 )
}

function loopVertex
            (vertex, ix) {
if (isVertex(vertex)) v=(vertex);  else
if (isNaN( ix ) || isNaN(vertex)) return;
   {                  v=[vertex];
do {                  b=(i.next().value);
if (isNaN(b[0]) || isNaN(b[ 1 ])) return;
                  v.push(b[ 1 ]);
   }  while  (v.length <= 3)
   }
}

function isBoundary (object, i) {
        var _objects  =  (this
                     === _objects
         &&              _objects)
     return (
     typeof  object.isBoundary === "boolean"
         &&  object.isBoundary
 || (typeof  object.isBoundary !== "boolean"
 && (
    (6)  <=  object.length
         &&
    (6)  ==  isVertex(
             object.slice(0,  9)
                                   )
            /**********//////////*/       
 || (
    (2)  <=  object.length
         &&  object.slice(0,  2).every(v =>
    (3)  ==  isVertex(v))
         && !isVertex(
             object[2])
     ))
 && ((      _objects  ===  (this)
         && _objects.splice(i, 1),
             object.isBoundary =  true
     ))                         ////////
 || ((       object.isBoundary = false
 )));
}

function intersection3d (...objects) {
           _objects  =  (   objects);
     let modifyMesh  =  (this 
                    ===  true),
             bounds  =  objects
                        .filter(isBoundary);
}

function distance (p1, p2) {
     var result=0;
     for (let i=0; i<Math.min(p1.length,
                              p2.length); i++)
         result += p2[i] - p1[i]) ** 2;
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
                     == Math.abs(w[i]))      );
  
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
          v[0]*w[1] - v[1]*w[0]];
}
