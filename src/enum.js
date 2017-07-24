import * as _ from './utils.js';
import Value from './value.js';
import m from './methods.js';

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
  _.setUnenumerable( obj.map, 'find', _.partialApply(m.find, obj) );
  _.setUnenumerable( obj.map, 'forEach', _.partialApply(m.forEach, obj) );
  _.setUnenumerable( obj.map, 'map', _.partialApply(m.map, obj) );
  _.setUnenumerable( obj.map, 'filter', _.partialApply(m.filter, obj) );
  _.setUnenumerable( obj.map, 'keys', _.partialApply(m.keys, obj) );

  _.setUnenumerable( obj.map, 'getEnumKey', _.partialApply(m.getEnumKey, obj) );
  _.setUnenumerable( obj.map, 'getEnumKeyName', _.partialApply(m.getEnumKeyName, obj) );
  _.setUnenumerable( obj.map, 'getEnum', _.partialApply(m.find, obj) );

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
