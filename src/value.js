import * as _ from './utils.js';

var Value = function(_val, _key, obj) {
  var value = _val;
  var key = _key;
  var self = this;

  this._getValue = function() {
    return value;
  };
  this._getKey = function() {
    return key;
  };

  for(var name in obj) {
    if(name === 'key' || name === 'value') {
      continue;
    }
    createExtraValue(name, obj[name]);
  }

  function createExtraValue(name, value) {
    var store = value;
    self['get' + _.firstUpperCase(name)] = function() {
      return store;
    };
  }
  return this;
};

Value.prototype.valueOf = function() {
  return this._getValue();
};

Value.prototype.v =
Value.prototype.getValue = function() {
  return this._getValue();
};

Value.prototype.k =
Value.prototype.getKey = function() {
  return this._getKey();
};

Value.prototype.toString = function() {
  return this._getValue() + '';
};

Value.prototype.eq =
Value.prototype.equals = function(val) {
  return this._getValue() === val;
};


export default Value;
