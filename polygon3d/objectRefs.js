function assignObjectRef (object, key, alias) {
  try {
       Object.defineProperty(object, key,
     { get: ( ) => object[ alias ],
       set: (v) => object[ alias ] = (v)})
  }   catch (e){   throw(    e    )}
        /*///////*/
  return (object);
}
  
  ///////////////////////////////////////////////
 //  unify various paths by dictionary matrix
/*   bound     bounds     boundary     boundaries
    _bound    _bounds    _boundary    _boundaries
  is_bound  is_bounds  is_boundary  is_Boundaries
   isBound   isBounds   isBoundary   isBoundaries
///                                            */
function normalizeAccessor (object, key, match, 
                             dictionaryMatrix) {
  if (typeof object !== "object"
  ||  typeof match  !== "object"
  ||        !match.length)
      return;

  if (validateValue(key))
      return object;

  for (let [i,term] of dictionaryMatrix.entries()) {
   if (validateValue(term)) {

  //// uprate position of viable path 
       dictionaryMatrix.unshift(
       dictionaryMatrix.splice(i,1));

       return assignObjectRef(object, key, term);
  }}   return;

  function validateValue (key, val, Type) {
    if ((val = object[key]) === undefined)
           return false;

    for   (Type of match) {
    switch (typeof Type)  {
     case  "boolean":
     case  "string":
     case  "number":
      if  (Type === val)
    return true;

     case  "object"
      if  (Type    instanceof Array
      &&   Type[0] instanceof Function)
     try  {
     val = Type[0](val);

      if  (val     === undefined) return false;

      if  (Type[1] !== undefined
      &&   Type[1] >=  val)       return false;

      if  (Type[2] !== undefined
      &&   Type[2] <=  val)       return false;             
    
    } catch (e) {                 return false;
    }
                         default: return true;
}}}

  ///////////////////////////////////////////////
 //  dictionary matrix syntax utility
//   … (is)_bound(s|ary|aries)
function dictionaryMatrix (def) {
  if (typeof def !== "string"
  ||        !def){    return;   }
                    ///////////

  const rx = Object.assign(
             /(-)|(_)|(\()|(\))|([/|])/g, {
              
              "-": 1, "_": 2,
              "(": 3, ")": 4,
              "/": 5
  });

  
  var results = [], 
    alternate = [], implyLowerCase = [];

  var str, op, i, len;
{ let prefixes, strings, suffixes } 

  while (str = next())
 {
  switch (true) {
   case   op[ rx["_"] ]: matrix(str, "_");
          break;

   case   op[ rx["("] ]:
          alternate.length = 0;
    do    alternate.push(next()) 
  while (!op[ rx[")"] ])
         
          matrix(alternate);
          break;

   case   op[  rx["-"]  ]: 
     if  (str.length)         subparts.push(str);
                             subparts.push("-");
  }}

  function next () {
    match = rx.exec(def);
    return def.substring(match.index,
                        rx.lastIndex);
  }

  function matrix (val, op) {
    len = (results.length);

    if (op   ===   "_") {
    if (!results.length)
         results.push("_");
         results.push( "");
    else results
       = results.concat(
         results.map(op => `${op}_`));
    }

    if  (typeof val === "object"
    ||  (typeof val === "string" && (val=[val]))) {
    for (str of val)
     if (implyLowerCase
     ||  results[0]
     &&  results[0].length === 0) {
         implyLowerCase 
                = (null)
        results = results.concat(
                  results.slice(0, len)
                         .map(str_ =>
                     str_  +  str[0].toLowerCase() 
                           +  str.substring(1)));

      } results = results.concat(
                  results.slice(0, len)
                         .map(str_ =>
                     str_  +  str[0].toUpperCase() 
                           +  str.substring(1)));
    }
  }
}