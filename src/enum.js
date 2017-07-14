import * as _ from './utils.js';
import Value from './value.js';

export default function Enum(enums, startIndex) {
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

  if(_.isString(enums)) {
    obj = createEnumFromString(enums, option);
  } else if(_.isArray(enums)) {
    obj = createEnumFromArray(enums, option);
  }

  _.setUnenumerable( obj.map, 'length', obj.list.length );
  _.setUnenumerable( obj.map, 'find', _.partialApply(find, obj) );
  _.setUnenumerable( obj.map, 'forEach', _.partialApply(forEach, obj) );
  _.setUnenumerable( obj.map, 'map', _.partialApply(map, obj) );
  _.setUnenumerable( obj.map, 'filter', _.partialApply(filter, obj) );
  _.setUnenumerable( obj.map, 'keys', _.partialApply(keys, obj) );

  _.setUnenumerable( obj.map, 'getEnumKey', _.partialApply(getEnumKey, obj) );
  _.setUnenumerable( obj.map, 'getEnumKeyName', _.partialApply(getEnumKeyName, obj) );
  _.setUnenumerable( obj.map, 'getEnum', _.partialApply(find, obj) );

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
    if(_.isString(item)) {
      createEnum({
        list: result.list,
        map: result.map,
        key: item,
        val: index + startIndex,
      });
    } else if(_.isObject(item) && item.key) {
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

  _.setUnwritable(map, key, new Value(val, key, item));
}

function getEnumKey(enumObj, val) {
  return find(enumObj, val).getKey();
}

function getEnumKeyName(enumObj, val) {
  return getEnumKey(enumObj, val);
}

function find(enumObj, val) {
  var list = enumObj.list;
  var map = enumObj.map;
  var res = null;
  var match = _.isFunction(val) ? val : itemEqualsVal;
  list.some(function(key) {
    if(match(map[key], val)) {
      res = map[key];
      return true;
    }
    return false;
  });
  return res;
}

function itemEqualsVal(item, val) {
  return item.equals(val);
}

function map(enumObj, callback) {
  var list = enumObj.list;
  var map = enumObj.map;
  return list.map(function(key) {
    var res = {};
    if(_.isFunction(callback)){
      res = callback(map[key], key);
    }
    return res;
  });
}

function forEach(enumObj, callback) {
  enumObj.list.forEach(function(key) {
    if(_.isFunction(callback)){
      callback(enumObj.map[key], key);
    }
  });
}

function filter(enumObj, callback) {
  var list = enumObj.list;
  var map = enumObj.map;
  var arr = list.filter(function(key) {
    if(_.isFunction(callback)){
      return callback(map[key], key);
    }
    return true;
  });

  return arr.map(function(key) {
    return map[key];
  });
}

function keys(enumObj) {
  return enumObj.list.map(function(key) {
    return key;
  });
}

