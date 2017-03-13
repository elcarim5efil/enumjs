
'use strict';

function isType(type) {
    return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]";
    };
}

export var isObject = isType("Object");
export var isString = isType("String");
export var isArray = Array.isArray || isType("Array");
export var isFunction = isType("Function");
export var isUndefined = isType("Undefined");

export function setUnenumerable(obj, key, val) {
    var option = {
        enumerable: false,
    };
    if(val != undefined){
        option.value = val;
    }
    Object.defineProperty(obj, key, option);
}

export function setUnwritable(obj, key, val) {
    var option = {
        writable: false,
        configurable: false,
    };
    if(val != undefined){
        option.value = val;
    }
    Object.defineProperty(obj, key, option);
}

export function firstUpperCase(str) {
    return str.replace(/^\S/, function(s){
        return s.toUpperCase();
    });
}

export function partialApply(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var finalArgs = Array.prototype.slice.call(arguments, 0);
        args = args.concat(finalArgs);
        return fn.apply(null, args);
    }
}
