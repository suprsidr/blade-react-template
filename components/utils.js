const util = {
  /**
   ^
   *
   *
   */
  getPropInObject(obj, prop) {
    return prop.split('.').reduce(function(prev, next) {
      if(prev[next] === 'undefined') {
        return prev;
      }
      return prev[next];
    }, obj);
  },
  obj = {},  // global object

  set(path, value) {
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}

//set('mongo.db.user', 'root');
  /*const getPropInObject = (n,e) => e.split(".").reduce((n,e) => "undefined"===n[e]?n:n[e],n);*/
}

export default util;
