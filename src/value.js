import * as _ from './utils';

class Value {
  constructor(option) {
    const store = {};
    const value = option.value;
    const key = option.key;
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

    for(var name in option) {
      store[name] = option[name];
      if(name === 'key' || name === 'value') {
        continue;
      }
      createExtraValue(name, option[name]);
    }

    function createExtraValue(name, value) {
      self['get' + _.firstUpperCase(name)] = function() {
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
    const dest = {};
    if(_.isArray(props)) {
      props.forEach((prop) => {
        dest[prop] = store[prop];
      });
    }
    return dest;
  }

  pickAs(props) {
    const store = this._getStore();
    const dest = {};
    if(_.isObject(props)) {
      for(let key in props) {
        dest[props[key]] = store[key];
      }
    }
    return dest;
  }
}

export default Value;
