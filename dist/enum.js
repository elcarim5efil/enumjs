(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Enum = factory());
}(this, (function () { 'use strict';

function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == '[object ' + type + ']';
  };
}

var isObject = isType('Object');
var isString = isType('String');
var isArray = Array.isArray || isType('Array');
var isFunction = isType('Function');
var isUndefined = isType('Undefined');

function setUnenumerable(obj, key, val) {
  var option = {
    enumerable: false,
  };
  if(val != undefined){
    option.value = val;
  }
  Object.defineProperty(obj, key, option);
}

function setUnwritable(obj, key, val) {
  var option = {
    writable: false,
    configurable: false,
  };
  if(val != undefined){
    option.value = val;
  }
  Object.defineProperty(obj, key, option);
}

function firstUpperCase(str) {
  return str.replace(/^\S/, function(s){
    return s.toUpperCase();
  });
}

function partialApply(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments, 0);
    var finalArgs = args.concat(newArgs);
    return fn.apply(null, finalArgs);
  };
}

class Value {
  constructor(_val, _key, obj) {
    const store = {};
    const value = _val;
    const key = _key;
    const self = this;

    this._getValue = function() {
      return value;
    };
    this._getKey = function() {
      return key;
    };
    this._getStore = function() {
      return store;
    };

    for(var name in obj) {
      store[name] = obj[name];
      if(name === 'key' || name === 'value') {
        continue;
      }
      createExtraValue(name, obj[name]);
    }

    function createExtraValue(name, value) {
      self['get' + firstUpperCase(name)] = function() {
        return value;
      };
    }
    return this;
  }

  getValue() {
    return this._getValue();
  }

  v() {
    return this._getValue();
  }

  getKey() {
    return this._getKey();
  }

  k() {
    return this._getKey();
  }


  eq(val) {
    return this._getValue() === val;
  }

  equals(val) {
    return this._getValue() === val;
  }

  valueOf() {
    return this._getValue();
  }

  toString() {
    return this._getValue() + '';
  }

  pick(props) {
    const store = this._getStore();
    const result = {};
    if(isArray(props)) {
      props.forEach((prop) => {
        result[prop] = store[prop];
      });
    }
    return result;
  }

  pickAs(props) {
    const store = this._getStore();
    if(isObject(props)) {
      
    }
  }
}

var _ = {
  getEnumKey(enumObj, val) {
    return _.find(enumObj, val).getKey();
  },

  getEnumKeyName(enumObj, val) {
    return _.getEnumKey(enumObj, val);
  },

  find(enumObj, val) {
    var list = enumObj.list;
    var map = enumObj.map;
    var res = null;
    var match = isFunction(val) ? val : _.itemEqualsVal;
    list.some(function(key) {
      if(match(map[key], val)) {
        res = map[key];
        return true;
      }
      return false;
    });
    return res;
  },

  itemEqualsVal(item, val) {
    return item.equals(val);
  },

  map(enumObj, callback) {
    var list = enumObj.list;
    var map = enumObj.map;
    return list.map(function(key) {
      var res = {};
      if(isFunction(callback)){
        res = callback(map[key], key);
      }
      return res;
    });
  },

  forEach(enumObj, callback) {
    enumObj.list.forEach(function(key) {
      if(isFunction(callback)){
        callback(enumObj.map[key], key);
      }
    });
  },

  filter(enumObj, callback) {
    var list = enumObj.list;
    var map = enumObj.map;
    var arr = list.filter(function(key) {
      if(isFunction(callback)){
        return callback(map[key], key);
      }
      return true;
    });

    return arr.map(function(key) {
      return map[key];
    });
  },

  keys(enumObj) {
    return enumObj.list.map(function(key) {
      return key;
    });
  },

  values(enumObj) {
    return enumObj.list.map(function(key) {
      return enumObj[key].value;
    });
  }
};

function Enum(enums, startIndex) {
  startIndex = parseInt(startIndex || 0) || 0;
  var enumObj = initEnums(enums, {
    startIndex: startIndex
  });

  return enumObj.map;
}

function initEnums(enums, option) {
  var obj = {
    map: {},
    list: [],
  };

  if(isString(enums)) {
    obj = createEnumFromString(enums, option);
  } else if(isArray(enums)) {
    obj = createEnumFromArray(enums, option);
  }

  setUnenumerable( obj.map, 'length', obj.list.length );
  setUnenumerable( obj.map, 'find', partialApply(_.find, obj) );
  setUnenumerable( obj.map, 'forEach', partialApply(_.forEach, obj) );
  setUnenumerable( obj.map, 'map', partialApply(_.map, obj) );
  setUnenumerable( obj.map, 'filter', partialApply(_.filter, obj) );
  setUnenumerable( obj.map, 'keys', partialApply(_.keys, obj) );

  setUnenumerable( obj.map, 'getEnumKey', partialApply(_.getEnumKey, obj) );
  setUnenumerable( obj.map, 'getEnumKeyName', partialApply(_.getEnumKeyName, obj) );
  setUnenumerable( obj.map, 'getEnum', partialApply(_.find, obj) );

  return obj;
}


function createEnumFromString(str, option) {
  var spliter = /\s|,|;|:/;
  var list = str.split(spliter);
  return createEnumFromArray(list, option);
}

function createEnumFromArray(list, option) {
  var result = {
    list: [],
    map: {},
  };
  var startIndex = option.startIndex || 0;
  list.forEach(function(item, index){
    if(isString(item)) {
      createEnum({
        list: result.list,
        map: result.map,
        key: item,
        val: index + startIndex,
      });
    } else if(isObject(item) && item.key) {
      createEnum({
        list: result.list,
        map: result.map,
        key: item.key,
        val: (item.value === undefined ? (index  + startIndex): item.value),
        item: item,
      });
    }
  });
  return result;
}

function createEnum(option) {
  var key = option.key || '';
  if(key === '') {
    return;
  }
  key = key.trim();

  var map = option.map;
  var list = option.list;
  var val = option.val;
  var item = option.item;

  list.push(key);

  setUnwritable(map, key, new Value(val, key, item));
}

return Enum;

})));
