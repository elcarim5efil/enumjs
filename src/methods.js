import * as ut from './utils';

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
    var match = ut.isFunction(val) ? val : _.itemEqualsVal;
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
      var res;
      if(ut.isFunction(callback)){
        res = callback(map[key], key);
      }
      return res;
    });
  },

  forEach(enumObj, callback) {
    enumObj.list.forEach(function(key) {
      if(ut.isFunction(callback)){
        callback(enumObj.map[key], key);
      }
    });
  },

  filter(enumObj, callback) {
    var list = enumObj.list;
    var map = enumObj.map;
    var arr = list.filter(function(key) {
      if(ut.isFunction(callback)){
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
      return enumObj.map[key].v();
    });
  }
};

_.getEnum = _.find;

export default _;
