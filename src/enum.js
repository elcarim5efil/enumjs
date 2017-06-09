import * as _ from './utils.js';
import Value from './value.js';

export default function Enum(enums, startIndex) {
    var startIndex = parseInt(startIndex || 0) || 0;
    var enumObj = initEnums(enums, {
        startIndex: startIndex,
    });

    return enumObj.map;
}

function initEnums(enums, option) {
    var res = {
        map: {},
        list: [],
    };

    if(_.isString(enums)) {
        res = createEnumFromString(enums, option);
    } else if(_.isArray(enums)) {
        res = createEnumFromArray(enums, option);
    }

    _.setUnenumerable( res.map, 'length', res.list.length );
    _.setUnenumerable( res.map, 'getEnumKey', _.partialApply(getEnumKey, res) );
    _.setUnenumerable( res.map, 'getEnumKeyName', _.partialApply(getEnumKeyName, res) );
    _.setUnenumerable( res.map, 'getEnum', _.partialApply(getEnum, res) );
    _.setUnenumerable( res.map, 'forEach', _.partialApply(forEach, res) );
    _.setUnenumerable( res.map, 'map', _.partialApply(map, res) );
    _.setUnenumerable( res.map, 'filter', _.partialApply(filter, res) );

    return res;
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
                val: (item.value || index) + startIndex,
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
    return getEnum(enumObj, val).getKey();
}

function getEnumKeyName(enumObj, val) {
    return getEnumKey(enumObj, val);
}

function getEnum(enumObj, val) {
    var list = enumObj.list;
    var map = enumObj.map;
    var res = {};
    var match = _.isFunction(val) ? val : itemEqualsVal;
    list.some(function(key, index) {
        if(match(map[key], val)) {
            res = map[key];
            return true;
        };
        return false;
    })
    return res;
}

function itemEqualsVal(item, val) {
    return item.equals(val);
}

function map(enumObj, callback) {
    var list = enumObj.list;
    var map = enumObj.map;
    return list.map(function(key, index) {
        var res = {};
        if(_.isFunction(callback)){
            res = callback(map[key], key);
        }
        return res;
    });
}

function forEach(enumObj, callback) {
    enumObj.list.forEach(function(key, index) {
        if(_.isFunction(callback)){
            callback(enumObj.map[key], key);
        }
    });
}

function filter(enumObj, callback) {
    var list = enumObj.list;
    var map = enumObj.map;
    var arr = list.filter(function(key, index) {
        if(_.isFunction(callback)){
            return callback(map[key], key);
        }
        return true;
    });

    return arr.map(function(key) {
        return map[key];
    });
}

