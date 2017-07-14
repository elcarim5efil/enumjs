(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Enum"] = factory();
	else
		root["Enum"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isFunction; });
/* unused harmony export isUndefined */
/* harmony export (immutable) */ __webpack_exports__["c"] = setUnenumerable;
/* harmony export (immutable) */ __webpack_exports__["f"] = setUnwritable;
/* harmony export (immutable) */ __webpack_exports__["h"] = firstUpperCase;
/* harmony export (immutable) */ __webpack_exports__["d"] = partialApply;



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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__value_js__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = Enum;



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

  if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* isString */](enums)) {
    obj = createEnumFromString(enums, option);
  } else if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* isArray */](enums)) {
    obj = createEnumFromArray(enums, option);
  }

  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'length', obj.list.length );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'find', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](find, obj) );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'forEach', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](forEach, obj) );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'map', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](map, obj) );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'filter', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](filter, obj) );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'keys', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](keys, obj) );

  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'getEnumKey', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](getEnumKey, obj) );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'getEnumKeyName', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](getEnumKeyName, obj) );
  __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* setUnenumerable */]( obj.map, 'getEnum', __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* partialApply */](find, obj) );

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
    if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* isString */](item)) {
      createEnum({
        list: result.list,
        map: result.map,
        key: item,
        val: index + startIndex,
      });
    } else if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* isObject */](item) && item.key) {
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

  __WEBPACK_IMPORTED_MODULE_0__utils_js__["f" /* setUnwritable */](map, key, new __WEBPACK_IMPORTED_MODULE_1__value_js__["a" /* default */](val, key, item));
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
  var match = __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* isFunction */](val) ? val : itemEqualsVal;
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
    if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* isFunction */](callback)){
      res = callback(map[key], key);
    }
    return res;
  });
}

function forEach(enumObj, callback) {
  enumObj.list.forEach(function(key) {
    if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* isFunction */](callback)){
      callback(enumObj.map[key], key);
    }
  });
}

function filter(enumObj, callback) {
  var list = enumObj.list;
  var map = enumObj.map;
  var arr = list.filter(function(key) {
    if(__WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* isFunction */](callback)){
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



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(0);


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
    self['get' + __WEBPACK_IMPORTED_MODULE_0__utils_js__["h" /* firstUpperCase */](name)] = function() {
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


/* harmony default export */ __webpack_exports__["a"] = Value;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_base_enum_js__ = __webpack_require__(1);


var Library = __WEBPACK_IMPORTED_MODULE_0_base_enum_js__["a" /* default */];

/* harmony default export */ __webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0_base_enum_js__["a" /* default */];



/***/ })
/******/ ]);
});