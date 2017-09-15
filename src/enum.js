import * as _ from './utils';
import Value from './Value';
import methods from './methods';

class EnumMap {
  constructor(src, option) {
    const enums = this.formatEnums(src, option);

    this.map = this.createEnumMap(enums);
    this.list = this.createEnumList(enums);

    _.setUnenumerable(this.map, 'length', this.list.length);

    this.mixin(methods);

    return this;
  }

  mixin(methods) {
    for(let key in methods) {
      _.setUnenumerable(this.map, key, _.partialApply(methods[key], this));
    }
  }

  formatEnums(src, option) {
    if(_.isString(src)) {
      return this.formatEnumString(src, option);
    } else if(_.isArray(src)) {
      return this.formatEnumArray(src, option);
    }
    return [];
  }

  formatEnumString(str, option) {
    var spliter = /\s|,|;|:/;
    var list = str.split(spliter)
      .filter(key => key)
      .map((key) => ({
        key
      }));
    return this.formatEnumArray(list, option);
  }

  formatEnumArray(arr, option) {
    var startIndex = option.startIndex || 0;
    return arr.map((item, index) => {
      if (_.isString(item)) {
        return {
          key: item,
          value: startIndex + index
        };
      } else if (_.isObject(item)) {
        item.value = item.value === undefined ? (index + startIndex) : item.value;
        return item;
      }
    }).filter(item => item && item.key);
  }

  createEnumMap(arr) {
    return arr.reduce((dest, item) => {
      return this.createEnum(dest, item);
    }, {});
  }

  createEnumList(arr) {
    return arr.filter(item => item && item.key).map(item => item.key);
  }

  createEnum(host, option) {
    var key = option.key;
    key = key.trim();

    _.setUnwritable(host, key, new Value(option));
    return host;
  }
}

export default EnumMap;
