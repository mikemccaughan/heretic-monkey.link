function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = commonjsGlobal.Symbol;


var hasSymbols = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return shams();
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

var implementation = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var functionBind = Function.prototype.bind || implementation;

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined$1;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols$1 = hasSymbols();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto
var generatorFunction =  undefined$1;
var asyncFunction =  undefined$1;
var asyncGenFunction =  undefined$1;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols$1 ? getProto([][Symbol.iterator]()) : undefined$1,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%':  undefined$1,
	'%AsyncGenerator%':  undefined$1,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%':  undefined$1,
	'%AsyncIteratorPrototype%':  undefined$1,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined$1 : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%':  undefined$1,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%':  undefined$1,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined$1 : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$1 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined$1 : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined$1 : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined$1 : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined$1 : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined$1 : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$1 ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
	'%SymbolPrototype%': hasSymbols$1 ? Symbol.prototype : undefined$1,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined$1,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet.prototype
};


var $replace = functionBind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

var callBind = function callBind() {
	return functionBind.apply($call, arguments);
};

var apply = function applyBind() {
	return functionBind.apply($apply, arguments);
};
callBind.apply = apply;

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

var callBound = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var $test = GetIntrinsic('RegExp.prototype.test');



var regexTester = function regexTester(regex) {
	return callBind($test, regex);
};

var isPrimitive = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var isPrimitive$1 = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$1 = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isCallable = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr$1.call(value);
	return strClass === fnClass || strClass === genClass;
};

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr$2 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isDateObject = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag$1 ? tryDateObject(value) : toStr$2.call(value) === dateClass;
};

var isSymbol = createCommonjsModule(function (module) {

var toStr = Object.prototype.toString;
var hasSymbols$1 = hasSymbols();

if (hasSymbols$1) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false ;
	};
}
});

var hasSymbols$2 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';






var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive$1(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
	return void 0;
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
var es2015 = function ToPrimitive(input) {
	if (isPrimitive$1(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (arguments[1] === String) {
			hint = 'string';
		} else if (arguments[1] === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols$2) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive$1(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDateObject(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return es2015(input, arguments[1]);
	}
	return es2015(input);
};

var $TypeError$1 = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');





var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace$1 = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace$1(value, trimRegex, '');
};



// https://www.ecma-international.org/ecma-262/6.0/#sec-tonumber

var ToNumber = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError$1('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

// https://www.ecma-international.org/ecma-262/5.1/#sec-8

var Type = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

var Type$1 = function Type$1(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return Type(x);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

var AbstractEqualityComparison = function AbstractEqualityComparison(x, y) {
	var xType = Type$1(x);
	var yType = Type$1(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

var _isNaN = Number.isNaN || function isNaN(a) {
	return a !== a;
};

var $isNaN = Number.isNaN || function (a) { return a !== a; };

var _isFinite = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

var $strSlice$1 = callBound('String.prototype.slice');

var isPrefixOf = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice$1(string, 0, prefix.length) === prefix;
};

var $Number$1 = GetIntrinsic('%Number%');
var $TypeError$2 = GetIntrinsic('%TypeError%');









// https://www.ecma-international.org/ecma-262/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
var AbstractRelationalComparison = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type$1(LeftFirst) !== 'Boolean') {
		throw new $TypeError$2('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number$1);
		py = ToPrimitive(y, $Number$1);
	} else {
		py = ToPrimitive(y, $Number$1);
		px = ToPrimitive(x, $Number$1);
	}
	var bothStrings = Type$1(px) === 'String' && Type$1(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if (_isNaN(nx) || _isNaN(ny)) {
			return undefined;
		}
		if (_isFinite(nx) && _isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === 0 && ny === 0) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

// https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6

var StrictEqualityComparison = function StrictEqualityComparison(x, y) {
	var xType = Type$1(x);
	var yType = Type$1(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

function inspect(obj) {
    if (!obj || 'object' !== typeof obj) return String(obj);
    if ('length' in obj && 'push' in obj && 'join' in obj) return String(obj);
    var res = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push([ prop, String(obj[prop]) ].join(':'));
        }
    }
    return '{ ' + res.join(', ') + ' }';
}

var util = /*#__PURE__*/Object.freeze({
  __proto__: null,
  inspect: inspect
});

var require$$0 = getCjsExportFromNamespace(util);

var util_inspect = require$$0.inspect;

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = util_inspect.custom;
var inspectSymbol = inspectCustom && isSymbol$1(inspectCustom) ? inspectCustom : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') { // eslint-disable-line valid-typeof
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return '[Object]';
    }

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    if (isSymbol$1(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object') {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var xs = arrObjKeys(obj, inspect);
        if (xs.length === 0) { return '{}'; }
        return '{ ' + xs.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr$3(obj) === '[object Array]'; }
function isDate(obj) { return toStr$3(obj) === '[object Date]'; }
function isRegExp(obj) { return toStr$3(obj) === '[object RegExp]'; }
function isError(obj) { return toStr$3(obj) === '[object Error]'; }
function isSymbol$1(obj) { return toStr$3(obj) === '[object Symbol]'; }
function isString(obj) { return toStr$3(obj) === '[object String]'; }
function isNumber(obj) { return toStr$3(obj) === '[object Number]'; }
function isBigInt(obj) { return toStr$3(obj) === '[object BigInt]'; }
function isBoolean(obj) { return toStr$3(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr$3(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(f, /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries) {
    return type + ' (' + size + ') {' + entries.join(', ') + '}';
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.11

var IsCallable = isCallable;

var $TypeError$3 = GetIntrinsic('%TypeError%');





// https://www.ecma-international.org/ecma-262/6.0/#sec-call

var Call = function Call(F, V) {
	var args = arguments.length > 2 ? arguments[2] : [];
	if (!IsCallable(F)) {
		throw new $TypeError$3(objectInspect(F) + ' is not a function');
	}
	return F.apply(V, args);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

var $TypeError$4 = GetIntrinsic('%TypeError%');






/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

var Get = function Get(O, P) {
	// 7.3.1.1
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$4('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError$4('Assertion failed: IsPropertyKey(P) is not true, got ' + objectInspect(P));
	}
	// 7.3.1.3
	return O[P];
};

var hasSymbols$3 = hasSymbols();



var $iterator = GetIntrinsic('%Symbol.iterator%', true);
var $stringSlice = callBound('String.prototype.slice');

var getIteratorMethod = function getIteratorMethod(ES, iterable) {
	var usingIterator;
	if (hasSymbols$3) {
		usingIterator = ES.GetMethod(iterable, $iterator);
	} else if (ES.IsArray(iterable)) {
		usingIterator = function () {
			var i = -1;
			var arr = this; // eslint-disable-line no-invalid-this
			return {
				next: function () {
					i += 1;
					return {
						done: i >= arr.length,
						value: arr[i]
					};
				}
			};
		};
	} else if (ES.Type(iterable) === 'String') {
		usingIterator = function () {
			var i = 0;
			return {
				next: function () {
					var nextIndex = ES.AdvanceStringIndex(iterable, i, true);
					var value = $stringSlice(iterable, i, nextIndex);
					i = nextIndex;
					return {
						done: nextIndex > iterable.length,
						value: value
					};
				}
			};
		};
	}
	return usingIterator;
};

var $Math = GetIntrinsic('%Math%');

var $floor = $Math.floor;
var $abs = $Math.abs;




// https://www.ecma-international.org/ecma-262/6.0/#sec-isinteger

var IsInteger = function IsInteger(argument) {
	if (typeof argument !== 'number' || _isNaN(argument) || !_isFinite(argument)) {
		return false;
	}
	var abs = $abs(argument);
	return $floor(abs) === abs;
};

var $Math$1 = GetIntrinsic('%Math%');
var $Number$2 = GetIntrinsic('%Number%');

var maxSafeInteger = $Number$2.MAX_SAFE_INTEGER || $Math$1.pow(2, 53) - 1;

var $TypeError$5 = GetIntrinsic('%TypeError%');

var $charCodeAt = callBound('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

var AdvanceStringIndex = function AdvanceStringIndex(S, index, unicode) {
	if (Type$1(S) !== 'String') {
		throw new $TypeError$5('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > maxSafeInteger) {
		throw new $TypeError$5('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type$1(unicode) !== 'Boolean') {
		throw new $TypeError$5('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (first < 0xD800 || first > 0xDBFF) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (second < 0xDC00 || second > 0xDFFF) {
		return index + 1;
	}

	return index + 2;
};

var $TypeError$6 = GetIntrinsic('%TypeError%');

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.10

var CheckObjectCoercible = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError$6(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

var RequireObjectCoercible = CheckObjectCoercible;

var $Object = GetIntrinsic('%Object%');



// https://www.ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

var $TypeError$7 = GetIntrinsic('%TypeError%');




/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

var GetV = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError$7('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

var $TypeError$8 = GetIntrinsic('%TypeError%');





/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

var GetMethod$1 = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError$8('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError$8(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr$4 = !$Array.isArray && callBound('Object.prototype.toString');

// https://www.ecma-international.org/ecma-262/6.0/#sec-isarray

var IsArray = $Array.isArray || function IsArray(argument) {
	return toStr$4(argument) === '[object Array]';
};

var $TypeError$9 = GetIntrinsic('%TypeError%');








// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

var GetIterator = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod$1,
				IsArray: IsArray,
				Type: Type$1
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type$1(iterator) !== 'Object') {
		throw new $TypeError$9('iterator must return an object');
	}

	return iterator;
};

var $TypeError$a = GetIntrinsic('%TypeError%');






// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

var IteratorClose = function IteratorClose(iterator, completion) {
	if (Type$1(iterator) !== 'Object') {
		throw new $TypeError$a('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError$a('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod$1(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type$1(innerResult) !== 'Object') {
		throw new $TypeError$a('iterator .return must return an object');
	}

	return completionRecord;
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.2

var ToBoolean = function ToBoolean(value) { return !!value; };

var $TypeError$b = GetIntrinsic('%TypeError%');





// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

var IteratorComplete = function IteratorComplete(iterResult) {
	if (Type$1(iterResult) !== 'Object') {
		throw new $TypeError$b('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

var $TypeError$c = GetIntrinsic('%TypeError%');

var $arraySlice = callBound('Array.prototype.slice');





// https://ecma-international.org/ecma-262/6.0/#sec-invoke

var Invoke = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError$c('P must be a Property Key');
	}
	var argumentsList = $arraySlice(arguments, 2);
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

var $TypeError$d = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

var IteratorNext = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type$1(result) !== 'Object') {
		throw new $TypeError$d('iterator next must return an object');
	}
	return result;
};

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

var IteratorStep = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};

var $TypeError$e = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

var IteratorValue = function IteratorValue(iterResult) {
	if (Type$1(iterResult) !== 'Object') {
		throw new $TypeError$e('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};

var $TypeError$f = GetIntrinsic('%TypeError%');










// https://tc39.es/ecma262/#sec-add-entries-from-iterable

var AddEntriesFromIterable = function AddEntriesFromIterable(target, iterable, adder) {
	if (!IsCallable(adder)) {
		throw new $TypeError$f('Assertion failed: `adder` is not callable');
	}
	if (iterable == null) {
		throw new $TypeError$f('Assertion failed: `iterable` is present, and not nullish');
	}
	var iteratorRecord = GetIterator(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = IteratorStep(iteratorRecord);
		if (!next) {
			return target;
		}
		var nextItem = IteratorValue(next);
		if (Type$1(nextItem) !== 'Object') {
			var error = new $TypeError$f('iterator next must return an Object, got ' + objectInspect(nextItem));
			return IteratorClose(
				iteratorRecord,
				function () { throw error; } // eslint-disable-line no-loop-func
			);
		}
		try {
			var k = Get(nextItem, '0');
			var v = Get(nextItem, '1');
			Call(adder, target, [k, v]);
		} catch (e) {
			return IteratorClose(
				iteratorRecord,
				function () { throw e; }
			);
		}
	}
};

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError$g = GetIntrinsic('%TypeError%');



var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://www.ecma-international.org/ecma-262/6.0/#sec-arraycreate

var ArrayCreate = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError$g('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

var toStr$5 = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr$5.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr$5.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has$1 = Object.prototype.hasOwnProperty;
	var toStr$6 = Object.prototype.toString;
	var isArgs = isArguments; // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has$1.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr$6.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr$6.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has$1.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has$1.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has$1.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
var implementation$1 = keysShim;

var slice$1 = Array.prototype.slice;


var origKeys = Object.keys;
var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation$1;

var originalKeys = Object.keys;

keysShim$1.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArguments(object)) {
					return originalKeys(slice$1.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim$1;
	}
	return Object.keys || keysShim$1;
};

var objectKeys = keysShim$1;

var hasSymbols$4 = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr$7 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr$7.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = objectKeys(map);
	if (hasSymbols$4) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var defineProperties_1 = defineProperties;

// modified from https://github.com/es-shims/es6-shim


var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols$5 = shams();
var toObject = Object;
var push = functionBind.call(Function.call, Array.prototype.push);
var propIsEnumerable = functionBind.call(Function.call, Object.prototype.propertyIsEnumerable);
var originalGetSymbols = hasSymbols$5 ? Object.getOwnPropertySymbols : null;

var implementation$2 = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = toObject(target);
	var s, source, i, props, syms, value, key;
	for (s = 1; s < arguments.length; ++s) {
		source = toObject(arguments[s]);
		props = objectKeys(source);
		var getSymbols = hasSymbols$5 && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			syms = getSymbols(source);
			for (i = 0; i < syms.length; ++i) {
				key = syms[i];
				if (propIsEnumerable(source, key)) {
					push(props, key);
				}
			}
		}
		for (i = 0; i < props.length; ++i) {
			key = props[i];
			value = source[key];
			if (propIsEnumerable(source, key)) {
				objTarget[key] = value;
			}
		}
	}
	return objTarget;
};

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	// v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	// note: this does not detect the bug unless there's 20 characters
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	// which is 72% slower than our shim, and Firefox 40's native implementation.
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

var polyfill = function getPolyfill() {
	if (!Object.assign) {
		return implementation$2;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation$2;
	}
	if (assignHasPendingExceptions()) {
		return implementation$2;
	}
	return Object.assign;
};

var shim = function shimAssign() {
	var polyfill$1 = polyfill();
	defineProperties_1(
		Object,
		{ assign: polyfill$1 },
		{ assign: function () { return Object.assign !== polyfill$1; } }
	);
	return polyfill$1;
};

var polyfill$1 = polyfill();

defineProperties_1(polyfill$1, {
	getPolyfill: polyfill,
	implementation: implementation$2,
	shim: shim
});

var object_assign = polyfill$1;

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

var $TypeError$h = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

    for (var key in Desc) { // eslint-disable-line
		if (src(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError$h('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

var $TypeError$i = GetIntrinsic('%TypeError%');
var $SyntaxError$1 = GetIntrinsic('%SyntaxError%');



var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (src(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = src(Desc, '[[Value]]');
		var IsAccessor = src(Desc, '[[Get]]') || src(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError$i('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

var assertRecord = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError$1('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError$i(argumentName + ' must be a ' + recordType);
	}
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

var IsAccessorDescriptor = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	if (!src(Desc, '[[Get]]') && !src(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

var IsDataDescriptor = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	if (!src(Desc, '[[Value]]') && !src(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

var $gOPD$1 = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD$1) {
	try {
		$gOPD$1([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD$1 = null;
	}
}

var getOwnPropertyDescriptor = $gOPD$1;

var $Object$1 = GetIntrinsic('%Object%');



var $preventExtensions = $Object$1.preventExtensions;
var $isExtensible = $Object$1.isExtensible;

// https://www.ecma-international.org/ecma-262/6.0/#sec-isextensible-o

var IsExtensible = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

var $TypeError$j = GetIntrinsic('%TypeError%');





// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5

var ToPropertyDescriptor = function ToPropertyDescriptor(Obj) {
	if (Type$1(Obj) !== 'Object') {
		throw new $TypeError$j('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (src(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (src(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (src(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (src(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (src(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (src(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError$j('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((src(desc, '[[Get]]') || src(desc, '[[Set]]')) && (src(desc, '[[Value]]') || src(desc, '[[Writable]]'))) {
		throw new $TypeError$j('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.12

var SameValue = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return _isNaN(x) && _isNaN(y);
};

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}



var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

// eslint-disable-next-line max-params
var DefineOwnProperty = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
	if (!$defineProperty) {
		if (!IsDataDescriptor(desc)) {
			// ES3 does not support getters/setters
			return false;
		}
		if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
			return false;
		}

		// fallback for ES3
		if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
			// a non-enumerable existing property
			return false;
		}

		// property does not exist at all, or exists but is enumerable
		var V = desc['[[Value]]'];
		// eslint-disable-next-line no-param-reassign
		O[P] = V; // will use [[Define]]
		return SameValue(O[P], V);
	}
	$defineProperty(O, P, FromPropertyDescriptor(desc));
	return true;
};

var every = function every(array, predicate) {
	for (var i = 0; i < array.length; i += 1) {
		if (!predicate(array[i], i, array)) {
			return false;
		}
	}
	return true;
};

var isSamePropertyDescriptor = function isSamePropertyDescriptor(ES, D1, D2) {
	var fields = [
		'[[Configurable]]',
		'[[Enumerable]]',
		'[[Get]]',
		'[[Set]]',
		'[[Value]]',
		'[[Writable]]'
	];
	return every(fields, function (field) {
		if ((field in D1) !== (field in D2)) {
			return false;
		}
		return ES.SameValue(D1[field], D2[field]);
	});
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

var FromPropertyDescriptor = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

var IsGenericDescriptor = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

var $TypeError$k = GetIntrinsic('%TypeError%');













// https://www.ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://www.ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
var ValidateAndApplyPropertyDescriptor = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type$1(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError$k('Assertion failed: O must be undefined or an Object');
	}
	if (Type$1(extensible) !== 'Boolean') {
		throw new $TypeError$k('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type$1,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError$k('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type$1(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type$1,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError$k('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError$k('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type$1(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError$k('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) ; else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError$k('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

var $SyntaxError$2 = GetIntrinsic('%SyntaxError%');
var $TypeError$l = GetIntrinsic('%TypeError%');












// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

var OrdinaryDefineOwnProperty = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$l('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$l('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type$1,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError$l('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!getOwnPropertyDescriptor) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError$2('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError$2('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = getOwnPropertyDescriptor(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0; // eslint-disable-line no-param-reassign

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex; // eslint-disable-line no-param-reassign
	}
};
var toStr$8 = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isRegex = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag$2) {
		return toStr$8.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && src(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};

var $match = GetIntrinsic('%Symbol.match%', true);





// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

var IsRegExp = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return isRegex(argument);
};

var $TypeError$m = GetIntrinsic('%TypeError%');



var $isEnumerable$1 = callBound('Object.prototype.propertyIsEnumerable');









// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

var OrdinaryGetOwnProperty = function OrdinaryGetOwnProperty(O, P) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$m('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$m('Assertion failed: P must be a Property Key');
	}
	if (!src(O, P)) {
		return void 0;
	}
	if (!getOwnPropertyDescriptor) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable$1(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor(getOwnPropertyDescriptor(O, P));
};

var $String = GetIntrinsic('%String%');
var $TypeError$n = GetIntrinsic('%TypeError%');

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$n('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.6

var ToUint32 = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

var $RangeError$1 = GetIntrinsic('%RangeError%');
var $TypeError$o = GetIntrinsic('%TypeError%');















// https://www.ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
var ArraySetLength = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError$o('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type$1,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError$o('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = object_assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError$1('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError$o('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-isconstructor

var IsConstructor = function IsConstructor(argument) {
	return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
};

var $Array$1 = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError$p = GetIntrinsic('%TypeError%');







// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

var ArraySpeciesCreate = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError$p('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type$1(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array$1(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError$p('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};

var $TypeError$q = GetIntrinsic('%TypeError%');






// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

var CanonicalNumericIndexString = function CanonicalNumericIndexString(argument) {
	if (Type$1(argument) !== 'String') {
		throw new $TypeError$q('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

var CompletePropertyDescriptor = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type$1, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!src(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!src(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!src(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!src(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!src(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!src(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

var forEach = function forEach(array, callback) {
	for (var i = 0; i < array.length; i += 1) {
		callback(array[i], i, array); // eslint-disable-line callback-return
	}
};

var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%', true);
var $gOPS = $SymbolValueOf ? GetIntrinsic('%Object.getOwnPropertySymbols%') : null;



var OwnPropertyKeys = function OwnPropertyKeys(source) {
	var ownKeys = ($gOPN || objectKeys)(source);
	if ($gOPS) {
		$pushApply(ownKeys, $gOPS(source));
	}
	return ownKeys;
};

var $isEnumerable$2 = callBound('Object.prototype.propertyIsEnumerable');





// https://www.ecma-international.org/ecma-262/9.0/#sec-copydataproperties

var CopyDataProperties = function CopyDataProperties(target, source, excludedItems) {
	if (Type$1(target) !== 'Object') {
		throw new TypeError('Assertion failed: "target" must be an Object');
	}

	if (!IsArray(excludedItems)) {
		throw new TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
	}
	for (var i = 0; i < excludedItems.length; i += 1) {
		if (!IsPropertyKey(excludedItems[i])) {
			throw new TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
		}
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var ES = this;

	var fromObj = ES.ToObject(source);

	var sourceKeys = OwnPropertyKeys(fromObj);
	forEach(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach(excludedItems, function (e) {
			if (ES.SameValue(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable$2(fromObj, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && ES.IsInteger(ES.ToNumber(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = ES.Get(fromObj, nextKey);
			ES.CreateDataProperty(target, nextKey, propValue);
		}
	});

	return target;
};

var $TypeError$r = GetIntrinsic('%TypeError%');











// https://www.ecma-international.org/ecma-262/6.0/#sec-createdataproperty

var CreateDataProperty = function CreateDataProperty(O, P, V) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$r('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$r('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

var $TypeError$s = GetIntrinsic('%TypeError%');





// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$s('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$s('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError$s('unable to create data property');
	}
	return success;
};

var $TypeError$t = GetIntrinsic('%TypeError%');



var $replace$2 = callBound('String.prototype.replace');





// https://www.ecma-international.org/ecma-262/6.0/#sec-createhtml

var CreateHTML = function CreateHTML(string, tag, attribute, value) {
	if (Type$1(tag) !== 'String' || Type$1(attribute) !== 'String') {
		throw new $TypeError$t('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace$2(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

var $TypeError$u = GetIntrinsic('%TypeError%');



// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

var CreateIterResultObject = function CreateIterResultObject(value, done) {
	if (Type$1(done) !== 'Boolean') {
		throw new $TypeError$u('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.3

var ToNumber$1 = function ToNumber(value) {
	return +value; // eslint-disable-line no-implicit-coercion
};

var sign = function sign(number) {
	return number >= 0 ? 1 : -1;
};

var $Math$2 = GetIntrinsic('%Math%');






var $floor$1 = $Math$2.floor;
var $abs$1 = $Math$2.abs;

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.4

var ToInteger = function ToInteger(value) {
	var number = ToNumber$1(value);
	if (_isNaN(number)) { return 0; }
	if (number === 0 || !_isFinite(number)) { return number; }
	return sign(number) * $floor$1($abs$1(number));
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-tointeger

var ToInteger$1 = function ToInteger$1(value) {
	var number = ToNumber(value);
	return ToInteger(number);
};

var ToLength = function ToLength(argument) {
	var len = ToInteger$1(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > maxSafeInteger) { return maxSafeInteger; }
	return len;
};

var $TypeError$v = GetIntrinsic('%TypeError%');
var $indexOf$1 = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');







// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
var CreateListFromArrayLike = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type$1(obj) !== 'Object') {
		throw new $TypeError$v('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError$v('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength(Get(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type$1(next);
		if ($indexOf$1(elementTypes, nextType) < 0) {
			throw new $TypeError$v('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

var $TypeError$w = GetIntrinsic('%TypeError%');









// https://www.ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

var CreateMethodProperty = function CreateMethodProperty(O, P, V) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$w('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError$w('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

var timeConstants = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

var $floor$2 = GetIntrinsic('%Math.floor%');

var msPerDay$1 = timeConstants.msPerDay;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2

var Day = function Day(t) {
	return $floor$2(t / msPerDay$1);
};

var $floor$3 = GetIntrinsic('%Math.floor%');

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3

var DayFromYear = function DayFromYear(y) {
	return (365 * (y - 1970)) + $floor$3((y - 1969) / 4) - $floor$3((y - 1901) / 100) + $floor$3((y - 1601) / 400);
};

var $Date = GetIntrinsic('%Date%');



var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3

var YearFromTime = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4

var DayWithinYear = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

var mod = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3

var DaysInYear = function DaysInYear(y) {
	if (mod(y, 4) !== 0) {
		return 365;
	}
	if (mod(y, 100) !== 0) {
		return 366;
	}
	if (mod(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

var $EvalError = GetIntrinsic('%EvalError%');




// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3

var InLeapYear = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.4

var MonthFromTime = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

var $EvalError$1 = GetIntrinsic('%EvalError%');





// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.5

var DateFromTime = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError$1('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

var $strSlice$2 = callBound('String.prototype.slice');

var padTimeComponent = function padTimeComponent(c, count) {
	return $strSlice$2('00' + c, -(count || 2));
};

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.6

var WeekDay = function WeekDay(t) {
	return mod(Day(t) + 4, 7);
};

var $TypeError$x = GetIntrinsic('%TypeError%');

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];










// https://www.ecma-international.org/ecma-262/9.0/#sec-datestring

var DateString = function DateString(tv) {
	if (Type$1(tv) !== 'Number' || _isNaN(tv)) {
		throw new $TypeError$x('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays[WeekDay(tv)];
	var month = months[MonthFromTime(tv)];
	var day = padTimeComponent(DateFromTime(tv));
	var year = padTimeComponent(YearFromTime(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

var $TypeError$y = GetIntrinsic('%TypeError%');












// https://www.ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

var DefinePropertyOrThrow = function DefinePropertyOrThrow(O, P, desc) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$y('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError$y('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type$1,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type$1,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError$y('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

var $TypeError$z = GetIntrinsic('%TypeError%');




// https://www.ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

var DeletePropertyOrThrow = function DeletePropertyOrThrow(O, P) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$z('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError$z('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError$z('Attempt to delete property failed.');
	}
	return success;
};

var $TypeError$A = GetIntrinsic('%TypeError%');







var $isEnumerable$3 = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply$1 = callBind.apply(GetIntrinsic('%Array.prototype.push%'));





// https://www.ecma-international.org/ecma-262/8.0/#sec-enumerableownproperties

var EnumerableOwnPropertyNames = function EnumerableOwnProperties(O, kind) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$A('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach(keys, function (key) {
			if ($isEnumerable$3(O, key)) {
				$pushApply$1(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError$A('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

var $TypeError$B = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

var HasProperty = function HasProperty(O, P) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$B('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$B('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

var $TypeError$C = GetIntrinsic('%TypeError%');











// https://ecma-international.org/ecma-262/10.0/#sec-flattenintoarray

// eslint-disable-next-line max-params, max-statements
var FlattenIntoArray = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}

	var targetIndex = start;
	var sourceIndex = 0;
	while (sourceIndex < sourceLen) {
		var P = ToString(sourceIndex);
		var exists = HasProperty(source, P);
		if (exists === true) {
			var element = Get(source, P);
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new $TypeError$C('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = IsArray(element);
			}
			if (shouldFlatten) {
				var elementLen = ToLength(Get(element, 'length'));
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= maxSafeInteger) {
					throw new $TypeError$C('index too large');
				}
				CreateDataPropertyOrThrow(target, ToString(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

var hasSymbols$6 = hasSymbols();

var $TypeError$D = GetIntrinsic('%TypeError%');

var $gOPN$1 = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS$1 = hasSymbols$6 && GetIntrinsic('%Object.getOwnPropertySymbols%');




// https://www.ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

var GetOwnPropertyKeys = function GetOwnPropertyKeys(O, Type) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$D('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS$1 ? $gOPS$1(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN$1) {
			return objectKeys(O);
		}
		return $gOPN$1(O);
	}
	throw new $TypeError$D('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

var $Function$1 = GetIntrinsic('%Function%');
var $TypeError$E = GetIntrinsic('%TypeError%');





// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

var GetPrototypeFromConstructor = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError$E('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type$1(proto) !== 'Object') {
		if (!(constructor instanceof $Function$1)) {
			// ignore other realms, for now
			throw new $TypeError$E('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

var $TypeError$F = GetIntrinsic('%TypeError%');





var $charAt = callBound('String.prototype.charAt');
var $strSlice$3 = callBound('String.prototype.slice');
var $indexOf$2 = callBound('String.prototype.indexOf');
var $parseInt = parseInt;

var isDigit = regexTester(/^[0-9]$/);










var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type$1(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type$1(capture) === 'Undefined');
};

// http://www.ecma-international.org/ecma-262/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
var GetSubstitution = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type$1(matched) !== 'String') {
		throw new $TypeError$F('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type$1(str) !== 'String') {
		throw new $TypeError$F('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError$F('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + objectInspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError$F('Assertion failed: `captures` must be a List of Strings, got ' + objectInspect(captures));
	}

	if (Type$1(replacement) !== 'String') {
		throw new $TypeError$F('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type$1(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice$3(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice$3(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += (n <= m && Type$1(captures[n - 1]) === 'Undefined') ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += (nn <= m && Type$1(captures[nnI]) === 'Undefined') ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type$1(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf$2(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice$3(replacement, i, endIndex);
							var capture = Get(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type$1(capture) !== 'Undefined') {
								result += ToString(capture);
							}
							i += '$<' + groupName + '>'.length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

var $TypeError$G = GetIntrinsic('%TypeError%');






// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty = function HasOwnProperty(O, P) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$G('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$G('Assertion failed: `P` must be a Property Key');
	}
	return src(O, P);
};

var $floor$4 = GetIntrinsic('%Math.floor%');



var msPerHour$1 = timeConstants.msPerHour;
var HoursPerDay$1 = timeConstants.HoursPerDay;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10

var HourFromTime = function HourFromTime(t) {
	return mod($floor$4(t / msPerHour$1), HoursPerDay$1);
};

var $TypeError$H = GetIntrinsic('%TypeError%');





// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

var OrdinaryHasInstance = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type$1(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type$1(P) !== 'Object') {
		throw new $TypeError$H('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

var $TypeError$I = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);








// https://www.ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

var InstanceofOperator = function InstanceofOperator(O, C) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$I('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod$1(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError$I('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);






// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

var IsConcatSpreadable = function IsConcatSpreadable(O) {
	if (Type$1(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

var $PromiseThen = callBound('Promise.prototype.then', true);



// https://www.ecma-international.org/ecma-262/6.0/#sec-ispromise

var IsPromise = function IsPromise(x) {
	if (Type$1(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

var $TypeError$J = GetIntrinsic('%TypeError%');



// var callBound = require('../helpers/callBound');

// var $charAt = callBound('String.prototype.charAt');



// https://www.ecma-international.org/ecma-262/9.0/#sec-isstringprefix

var IsStringPrefix = function IsStringPrefix(p, q) {
	if (Type$1(p) !== 'String') {
		throw new $TypeError$J('Assertion failed: "p" must be a String');
	}

	if (Type$1(q) !== 'String') {
		throw new $TypeError$J('Assertion failed: "q" must be a String');
	}

	return isPrefixOf(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

var $arrayPush = callBound('Array.prototype.push');





// https://www.ecma-international.org/ecma-262/8.0/#sec-iterabletolist

var IterableToList = function IterableToList(items, method) {
	var iterator = GetIterator(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep(iterator);
		if (next) {
			var nextValue = IteratorValue(next);
			$arrayPush(values, nextValue);
		}
	}
	return values;
};

var msPerDay$2 = timeConstants.msPerDay;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.13

var MakeDate = function MakeDate(day, time) {
	if (!_isFinite(day) || !_isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay$2) + time;
};

var $floor$5 = GetIntrinsic('%Math.floor%');
var $DateUTC = GetIntrinsic('%Date.UTC%');










// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.12

var MakeDay = function MakeDay(year, month, date) {
	if (!_isFinite(year) || !_isFinite(month) || !_isFinite(date)) {
		return NaN;
	}
	var y = ToInteger$1(year);
	var m = ToInteger$1(month);
	var dt = ToInteger$1(date);
	var ym = y + $floor$5(m / 12);
	var mn = mod(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

var msPerSecond$1 = timeConstants.msPerSecond;
var msPerMinute$1 = timeConstants.msPerMinute;
var msPerHour$2 = timeConstants.msPerHour;



// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.11

var MakeTime = function MakeTime(hour, min, sec, ms) {
	if (!_isFinite(hour) || !_isFinite(min) || !_isFinite(sec) || !_isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger$1(hour);
	var m = ToInteger$1(min);
	var s = ToInteger$1(sec);
	var milli = ToInteger$1(ms);
	var t = (h * msPerHour$2) + (m * msPerMinute$1) + (s * msPerSecond$1) + milli;
	return t;
};

var $floor$6 = GetIntrinsic('%Math.floor%');



var msPerMinute$2 = timeConstants.msPerMinute;
var MinutesPerHour$1 = timeConstants.MinutesPerHour;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10

var MinFromTime = function MinFromTime(t) {
	return mod($floor$6(t / msPerMinute$2), MinutesPerHour$1);
};

// https://ecma-international.org/ecma-262/5.1/#sec-5.2

var modulo = function modulo(x, y) {
	return mod(x, y);
};

var msPerSecond$2 = timeConstants.msPerSecond;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10

var msFromTime = function msFromTime(t) {
	return mod(t, msPerSecond$2);
};

var $String$1 = GetIntrinsic('%String%');



// https://www.ecma-international.org/ecma-262/9.0/#sec-tostring-applied-to-the-number-type

var NumberToString = function NumberToString(m) {
	if (Type$1(m) !== 'Number') {
		throw new TypeError('Assertion failed: "m" must be a String');
	}

	return $String$1(m);
};

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError$K = GetIntrinsic('%TypeError%');
var $SyntaxError$3 = GetIntrinsic('%SyntaxError%');



var hasProto = !({ __proto__: null } instanceof Object);

// https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate

var ObjectCreate = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type$1(proto) !== 'Object') {
		throw new $TypeError$K('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError$3('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError$3('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

var originalGetProto = GetIntrinsic('%Object.getPrototypeOf%', true);
var $ArrayProto = GetIntrinsic('%Array.prototype%');

var getProto$1 = originalGetProto || (
	// eslint-disable-next-line no-proto
	[].__proto__ === $ArrayProto
		? function (O) {
			return O.__proto__; // eslint-disable-line no-proto
		}
		: null
);

var $TypeError$L = GetIntrinsic('%TypeError%');





// https://ecma-international.org/ecma-262/7.0/#sec-ordinarygetprototypeof

var OrdinaryGetPrototypeOf = function OrdinaryGetPrototypeOf(O) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$L('Assertion failed: O must be an Object');
	}
	if (!getProto$1) {
		throw new $TypeError$L('This environment does not support fetching prototypes.');
	}
	return getProto$1(O);
};

var originalSetProto = GetIntrinsic('%Object.setPrototypeOf%', true);
var $ArrayProto$1 = GetIntrinsic('%Array.prototype%');

var setProto = originalSetProto || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayProto$1
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

var $TypeError$M = GetIntrinsic('%TypeError%');






// https://ecma-international.org/ecma-262/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf = function OrdinarySetPrototypeOf(O, V) {
	if (Type$1(V) !== 'Object' && Type$1(V) !== 'Null') {
		throw new $TypeError$M('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

var $TypeError$N = GetIntrinsic('%TypeError%');




// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

var OrdinaryHasProperty = function OrdinaryHasProperty(O, P) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$N('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$N('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

var $PromiseResolve = callBound('Promise.resolve', true);

// https://ecma-international.org/ecma-262/9.0/#sec-promise-resolve

var PromiseResolve = function PromiseResolve(C, x) {
	if (!$PromiseResolve) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve(C, x);
};

var $TypeError$O = GetIntrinsic('%TypeError%');

var regexExec$1 = callBound('RegExp.prototype.exec');






// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

var RegExpExec = function RegExpExec(R, S) {
	if (Type$1(R) !== 'Object') {
		throw new $TypeError$O('Assertion failed: `R` must be an Object');
	}
	if (Type$1(S) !== 'String') {
		throw new $TypeError$O('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type$1(result) === 'Object') {
			return result;
		}
		throw new $TypeError$O('"exec" method must return `null` or an Object');
	}
	return regexExec$1(R, S);
};

var $TypeError$P = GetIntrinsic('%TypeError%');



// https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluenonnumber

var SameValueNonNumber = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError$P('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue(x, y);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero

var SameValueZero = function SameValueZero(x, y) {
	return (x === y) || (_isNaN(x) && _isNaN(y));
};

var $floor$7 = GetIntrinsic('%Math.floor%');



var msPerSecond$3 = timeConstants.msPerSecond;
var SecondsPerMinute$1 = timeConstants.SecondsPerMinute;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.10

var SecFromTime = function SecFromTime(t) {
	return mod($floor$7(t / msPerSecond$3), SecondsPerMinute$1);
};

var $TypeError$Q = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

var _Set = function Set(O, P, V, Throw) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$Q('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError$Q('Assertion failed: `P` must be a Property Key');
	}
	if (Type$1(Throw) !== 'Boolean') {
		throw new $TypeError$Q('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
		} catch (e) {
			return false;
		}
	}
};

var getInferredName;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred = function () {};
var getInferredName_1 = getInferredName && inferred.name === 'inferred' ? getInferredName : null;

var $SyntaxError$4 = GetIntrinsic('%SyntaxError%');
var symToStr = callBound('Symbol.prototype.toString', true);



var getSymbolDescription = function getSymbolDescription(symbol) {
	if (!symToStr) {
		throw new $SyntaxError$4('Symbols are not supported in this environment');
	}
	var str = symToStr(symbol); // will throw if not a symbol

	if (getInferredName_1) {
		var name = getInferredName_1(symbol);
		if (name === '') { return; }
		// eslint-disable-next-line consistent-return
		return name.slice(1, -1); // name.slice('['.length, -']'.length);
	}

	var desc = str.slice(7, -1); // str.slice('Symbol('.length, -')'.length);
	if (desc) {
		// eslint-disable-next-line consistent-return
		return desc;
	}
};

var $TypeError$R = GetIntrinsic('%TypeError%');







// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

var SetFunctionName = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError$R('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || src(F, 'name')) {
		throw new $TypeError$R('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type$1(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError$R('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

var $SyntaxError$5 = GetIntrinsic('%SyntaxError%');
var $TypeError$S = GetIntrinsic('%TypeError%');
var $preventExtensions$1 = GetIntrinsic('%Object.preventExtensions%');

var $gOPN$2 = GetIntrinsic('%Object.getOwnPropertyNames%');








// https://www.ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

var SetIntegrityLevel = function SetIntegrityLevel(O, level) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$S('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$S('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions$1) {
		throw new $SyntaxError$5('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions$1(O);
	if (!status) {
		return false;
	}
	if (!$gOPN$2) {
		throw new $SyntaxError$5('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN$2(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = getOwnPropertyDescriptor(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

var $species$1 = GetIntrinsic('%Symbol.species%', true);
var $TypeError$T = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

var SpeciesConstructor = function SpeciesConstructor(O, defaultConstructor) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$T('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type$1(C) !== 'Object') {
		throw new $TypeError$T('O.constructor is not an Object');
	}
	var S = $species$1 ? C[$species$1] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError$T('no constructor found');
};

var $TypeError$U = GetIntrinsic('%TypeError%');



var $SymbolToString = callBound('Symbol.prototype.toString', true);



// https://www.ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

var SymbolDescriptiveString = function SymbolDescriptiveString(sym) {
	if (Type$1(sym) !== 'Symbol') {
		throw new $TypeError$U('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

var $gOPN$3 = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError$V = GetIntrinsic('%TypeError%');








// https://www.ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

var TestIntegrityLevel = function TestIntegrityLevel(O, level) {
	if (Type$1(O) !== 'Object') {
		throw new $TypeError$V('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError$V('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN$3(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = getOwnPropertyDescriptor(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

var $BooleanValueOf = callBound('Boolean.prototype.valueOf');



// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

var thisBooleanValue = function thisBooleanValue(value) {
	if (Type$1(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

var thisNumberValue = function thisNumberValue(value) {
	if (Type$1(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};

var $StringValueOf = callBound('String.prototype.valueOf');



// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

var thisStringValue = function thisStringValue(value) {
	if (Type$1(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

var $SymbolValueOf$1 = callBound('Symbol.prototype.valueOf', true);



// https://ecma-international.org/ecma-262/9.0/#sec-thissymbolvalue

var thisSymbolValue = function thisSymbolValue(value) {
	if (!$SymbolValueOf$1) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type$1(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf$1(value);
};

var $DateValueOf = callBound('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

var thisTimeValue = function thisTimeValue(value) {
	return $DateValueOf(value);
};

var thisTimeValue$1 = thisTimeValue;

var $Date$1 = GetIntrinsic('%Date%');
var $Number$3 = GetIntrinsic('%Number%');
var $abs$2 = GetIntrinsic('%Math.abs%');





// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.14

var TimeClip = function TimeClip(time) {
	if (!_isFinite(time) || $abs$2(time) > 8.64e15) {
		return NaN;
	}
	return $Number$3(new $Date$1(ToNumber(time)));
};

var msPerDay$3 = timeConstants.msPerDay;



// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.3

var TimeFromYear = function TimeFromYear(y) {
	return msPerDay$3 * DayFromYear(y);
};

var $TypeError$W = GetIntrinsic('%TypeError%');









// https://www.ecma-international.org/ecma-262/9.0/#sec-timestring

var TimeString = function TimeString(tv) {
	if (Type$1(tv) !== 'Number' || _isNaN(tv)) {
		throw new $TypeError$W('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime(tv);
	var minute = MinFromTime(tv);
	var second = SecFromTime(tv);
	return padTimeComponent(hour) + ':' + padTimeComponent(minute) + ':' + padTimeComponent(second) + '\x20GMT';
};

var msPerDay$4 = timeConstants.msPerDay;

// https://ecma-international.org/ecma-262/5.1/#sec-15.9.1.2

var TimeWithinDay = function TimeWithinDay(t) {
	return mod(t, msPerDay$4);
};

var $TypeError$X = GetIntrinsic('%TypeError%');
var $Date$2 = GetIntrinsic('%Date%');





// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

var ToDateString = function ToDateString(tv) {
	if (Type$1(tv) !== 'Number') {
		throw new $TypeError$X('Assertion failed: `tv` must be a Number');
	}
	if (_isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date$2(tv);
};

var $RangeError$2 = GetIntrinsic('%RangeError%');





// https://www.ecma-international.org/ecma-262/8.0/#sec-toindex

var ToIndex = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger$1(value);
	if (integerIndex < 0) {
		throw new $RangeError$2('index must be >= 0');
	}
	var index = ToLength(integerIndex);
	if (!SameValueZero(integerIndex, index)) {
		throw new $RangeError$2('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

var $Math$3 = GetIntrinsic('%Math%');








var $floor$8 = $Math$3.floor;
var $abs$3 = $Math$3.abs;

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.7

var ToUint16 = function ToUint16(value) {
	var number = ToNumber(value);
	if (_isNaN(number) || number === 0 || !_isFinite(number)) { return 0; }
	var posInt = sign(number) * $floor$8($abs$3(number));
	return mod(posInt, 0x10000);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-toint16

var ToInt16 = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.5

var ToInt32 = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

var $Math$4 = GetIntrinsic('%Math%');








var $floor$9 = $Math$4.floor;
var $abs$4 = $Math$4.abs;

var ToUint8 = function ToUint8(argument) {
	var number = ToNumber(argument);
	if (_isNaN(number) || number === 0 || !_isFinite(number)) { return 0; }
	var posInt = sign(number) * $floor$9($abs$4(number));
	return mod(posInt, 0x100);
};

// https://www.ecma-international.org/ecma-262/6.0/#sec-toint8

var ToInt8 = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

var $String$2 = GetIntrinsic('%String%');




// https://www.ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String$2);
	return typeof key === 'symbol' ? key : ToString(key);
};

var $Math$5 = GetIntrinsic('%Math%');





var $floor$a = $Math$5.floor;

// https://www.ecma-international.org/ecma-262/6.0/#sec-touint8clamp

var ToUint8Clamp = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if (_isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = $floor$a(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

var replace = functionBind.call(Function.call, String.prototype.replace);

/* eslint-disable no-control-regex */
var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*/;
/* eslint-enable no-control-regex */

var implementation$3 = function trimLeft() {
	return replace(this, leftWhitespace, '');
};

var polyfill$2 = function getPolyfill() {
	if (!String.prototype.trimLeft) {
		return implementation$3;
	}
	var zeroWidthSpace = '\u200b';
	if (zeroWidthSpace.trimLeft() !== zeroWidthSpace) {
		return implementation$3;
	}
	return String.prototype.trimLeft;
};

var shim$1 = function shimTrimLeft() {
	var polyfill = polyfill$2();
	defineProperties_1(
		String.prototype,
		{ trimLeft: polyfill },
		{ trimLeft: function () { return String.prototype.trimLeft !== polyfill; } }
	);
	return polyfill;
};

var bound = functionBind.call(Function.call, polyfill$2());

defineProperties_1(bound, {
	getPolyfill: polyfill$2,
	implementation: implementation$3,
	shim: shim$1
});

var string_prototype_trimleft = bound;

var replace$1 = functionBind.call(Function.call, String.prototype.replace);

/* eslint-disable no-control-regex */
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]*$/;
/* eslint-enable no-control-regex */

var implementation$4 = function trimRight() {
	return replace$1(this, rightWhitespace, '');
};

var polyfill$3 = function getPolyfill() {
	if (!String.prototype.trimRight) {
		return implementation$4;
	}
	var zeroWidthSpace = '\u200b';
	if (zeroWidthSpace.trimRight() !== zeroWidthSpace) {
		return implementation$4;
	}
	return String.prototype.trimRight;
};

var shim$2 = function shimTrimRight() {
	var polyfill = polyfill$3();
	defineProperties_1(
		String.prototype,
		{ trimRight: polyfill },
		{ trimRight: function () { return String.prototype.trimRight !== polyfill; } }
	);
	return polyfill;
};

var bound$1 = functionBind.call(Function.call, polyfill$3());

defineProperties_1(bound$1, {
	getPolyfill: polyfill$3,
	implementation: implementation$4,
	shim: shim$2
});

var string_prototype_trimright = bound$1;

var $TypeError$Y = GetIntrinsic('%TypeError%');




// https://ecma-international.org/ecma-262/10.0/#sec-trimstring

var TrimString = function TrimString(string, where) {
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var T;
	if (where === 'start') {
		T = string_prototype_trimleft(S);
	} else if (where === 'end') {
		T = string_prototype_trimright(S);
	} else if (where === 'start+end') {
		T = string_prototype_trimleft(string_prototype_trimright(S));
	} else {
		throw new $TypeError$Y('Assertion failed: invalid `where` value; must be "start", "end", or "start+end"');
	}
	return T;
};

/* eslint global-require: 0 */
// https://www.ecma-international.org/ecma-262/10.0/#sec-abstract-operations
var ES2019 = {
	'Abstract Equality Comparison': AbstractEqualityComparison,
	'Abstract Relational Comparison': AbstractRelationalComparison,
	'Strict Equality Comparison': StrictEqualityComparison,
	AddEntriesFromIterable: AddEntriesFromIterable,
	AdvanceStringIndex: AdvanceStringIndex,
	ArrayCreate: ArrayCreate,
	ArraySetLength: ArraySetLength,
	ArraySpeciesCreate: ArraySpeciesCreate,
	Call: Call,
	CanonicalNumericIndexString: CanonicalNumericIndexString,
	CompletePropertyDescriptor: CompletePropertyDescriptor,
	CopyDataProperties: CopyDataProperties,
	CreateDataProperty: CreateDataProperty,
	CreateDataPropertyOrThrow: CreateDataPropertyOrThrow,
	CreateHTML: CreateHTML,
	CreateIterResultObject: CreateIterResultObject,
	CreateListFromArrayLike: CreateListFromArrayLike,
	CreateMethodProperty: CreateMethodProperty,
	DateFromTime: DateFromTime,
	DateString: DateString,
	Day: Day,
	DayFromYear: DayFromYear,
	DaysInYear: DaysInYear,
	DayWithinYear: DayWithinYear,
	DefinePropertyOrThrow: DefinePropertyOrThrow,
	DeletePropertyOrThrow: DeletePropertyOrThrow,
	EnumerableOwnPropertyNames: EnumerableOwnPropertyNames,
	FlattenIntoArray: FlattenIntoArray,
	FromPropertyDescriptor: FromPropertyDescriptor,
	Get: Get,
	GetIterator: GetIterator,
	GetMethod: GetMethod$1,
	GetOwnPropertyKeys: GetOwnPropertyKeys,
	GetPrototypeFromConstructor: GetPrototypeFromConstructor,
	GetSubstitution: GetSubstitution,
	GetV: GetV,
	HasOwnProperty: HasOwnProperty,
	HasProperty: HasProperty,
	HourFromTime: HourFromTime,
	InLeapYear: InLeapYear,
	InstanceofOperator: InstanceofOperator,
	Invoke: Invoke,
	IsAccessorDescriptor: IsAccessorDescriptor,
	IsArray: IsArray,
	IsCallable: IsCallable,
	IsConcatSpreadable: IsConcatSpreadable,
	IsConstructor: IsConstructor,
	IsDataDescriptor: IsDataDescriptor,
	IsExtensible: IsExtensible,
	IsGenericDescriptor: IsGenericDescriptor,
	IsInteger: IsInteger,
	IsPromise: IsPromise,
	IsPropertyKey: IsPropertyKey,
	IsRegExp: IsRegExp,
	IsStringPrefix: IsStringPrefix,
	IterableToList: IterableToList,
	IteratorClose: IteratorClose,
	IteratorComplete: IteratorComplete,
	IteratorNext: IteratorNext,
	IteratorStep: IteratorStep,
	IteratorValue: IteratorValue,
	MakeDate: MakeDate,
	MakeDay: MakeDay,
	MakeTime: MakeTime,
	MinFromTime: MinFromTime,
	modulo: modulo,
	MonthFromTime: MonthFromTime,
	msFromTime: msFromTime,
	NumberToString: NumberToString,
	ObjectCreate: ObjectCreate,
	OrdinaryDefineOwnProperty: OrdinaryDefineOwnProperty,
	OrdinaryGetOwnProperty: OrdinaryGetOwnProperty,
	OrdinaryGetPrototypeOf: OrdinaryGetPrototypeOf,
	OrdinarySetPrototypeOf: OrdinarySetPrototypeOf,
	OrdinaryHasInstance: OrdinaryHasInstance,
	OrdinaryHasProperty: OrdinaryHasProperty,
	PromiseResolve: PromiseResolve,
	RegExpExec: RegExpExec,
	RequireObjectCoercible: RequireObjectCoercible,
	SameValue: SameValue,
	SameValueNonNumber: SameValueNonNumber,
	SameValueZero: SameValueZero,
	SecFromTime: SecFromTime,
	Set: _Set,
	SetFunctionName: SetFunctionName,
	SetIntegrityLevel: SetIntegrityLevel,
	SpeciesConstructor: SpeciesConstructor,
	SymbolDescriptiveString: SymbolDescriptiveString,
	TestIntegrityLevel: TestIntegrityLevel,
	thisBooleanValue: thisBooleanValue,
	thisNumberValue: thisNumberValue,
	thisStringValue: thisStringValue,
	thisSymbolValue: thisSymbolValue,
	thisTimeValue: thisTimeValue$1,
	TimeClip: TimeClip,
	TimeFromYear: TimeFromYear,
	TimeString: TimeString,
	TimeWithinDay: TimeWithinDay,
	ToBoolean: ToBoolean,
	ToDateString: ToDateString,
	ToIndex: ToIndex,
	ToInt16: ToInt16,
	ToInt32: ToInt32,
	ToInt8: ToInt8,
	ToInteger: ToInteger$1,
	ToLength: ToLength,
	ToNumber: ToNumber,
	ToObject: ToObject,
	ToPrimitive: ToPrimitive,
	ToPropertyDescriptor: ToPropertyDescriptor,
	ToPropertyKey: ToPropertyKey,
	ToString: ToString,
	ToUint16: ToUint16,
	ToUint32: ToUint32,
	ToUint8: ToUint8,
	ToUint8Clamp: ToUint8Clamp,
	TrimString: TrimString,
	Type: Type$1,
	ValidateAndApplyPropertyDescriptor: ValidateAndApplyPropertyDescriptor,
	WeekDay: WeekDay,
	YearFromTime: YearFromTime
};

var es2019 = ES2019;

function assign(target, source) {
  for (var name in source) {
    if (Object.prototype.hasOwnProperty.call(source, name)) target[name] = source[name];
  }

  return target;
}
function unique(arr) {
  var obj = Object.create(null);

  for (var i = 0; i < arr.length; i++) {
    var v = arr[i];
    obj[v] = v;
  }

  var res = [];

  for (var p in obj) {
    res.push(obj[p]);
  }

  return res;
}

function MakeIntrinsicClass(Class, name) {
  if ('undefined' !== typeof Symbol) {
    Object.defineProperty(Class.prototype, Symbol.toStringTag, {
      value: name,
      writable: false,
      enumerable: false,
      configurable: true
    });

    var species = function species() {
      return this;
    };

    Object.defineProperty(species, "name", {
      value: "get [Symbol.species]",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Class, Symbol.species, {
      get: species,
      enumerable: false,
      configurable: true
    });
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.getOwnPropertyNames(Class)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;
      var desc = Object.getOwnPropertyDescriptor(Class, prop);
      if (!desc.configurable || !desc.enumerable) continue;
      desc.enumerable = false;
      Object.defineProperty(Class, prop, desc);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.getOwnPropertyNames(Class.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _prop = _step2.value;

      var _desc = Object.getOwnPropertyDescriptor(Class.prototype, _prop);

      if (!_desc.configurable || !_desc.enumerable) continue;
      _desc.enumerable = false;
      Object.defineProperty(Class.prototype, _prop, _desc);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

// Absolute
var EPOCHNANOSECONDS = 'slot-epochNanoSeconds'; // TimeZone

var IDENTIFIER = 'slot-identifier'; // DateTime, Date, Time, YearMonth, MonthDay

var YEAR = 'slot-year';
var MONTH = 'slot-month';
var DAY = 'slot-day';
var HOUR = 'slot-hour';
var MINUTE = 'slot-minute';
var SECOND = 'slot-second';
var MILLISECOND = 'slot-millisecond';
var MICROSECOND = 'slot-microsecond';
var NANOSECOND = 'slot-nanosecond'; // Duration

var YEARS = 'slot-years';
var MONTHS = 'slot-months';
var DAYS = 'slot-days';
var HOURS = 'slot-hours';
var MINUTES = 'slot-minutes';
var SECONDS = 'slot-seconds';
var MILLISECONDS = 'slot-milliseconds';
var MICROSECONDS = 'slot-microseconds';
var NANOSECONDS = 'slot-nanoseconds';
var SLOTS = 'undefined' === typeof Symbol ? '_SLOTS' : Symbol('SLOTS');
var slots = 'function' === typeof WeakMap ? new WeakMap() : null;
function CreateSlots(container) {
  if (!slots) {
    container[SLOTS] = Object.create(null);
  } else {
    slots.set(container, Object.create(null));
  }
}

function GetSlots(container) {
  if (!slots) {
    return container[SLOTS];
  } else {
    return slots.get(container);
  }
}

function HasSlot(container) {
  if (!container || 'object' !== _typeof(container)) return false;
  var myslots = GetSlots(container);

  for (var _len = arguments.length, ids = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ids[_key - 1] = arguments[_key];
  }

  return !!myslots && ids.reduce(function (all, id) {
    return all && id in myslots;
  }, true);
}
function GetSlot(container, id) {
  return GetSlots(container)[id];
}
function SetSlot(container, id, value) {
  GetSlots(container)[id] = value;
}

var DateTime = /*#__PURE__*/function () {
  function DateTime(year, month, day) {
    var hour = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var minute = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var second = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var millisecond = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var microsecond = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var nanosecond = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;

    _classCallCheck(this, DateTime);

    year = ES.ToInteger(year);
    month = ES.ToInteger(month);
    day = ES.ToInteger(day);
    hour = ES.ToInteger(hour);
    minute = ES.ToInteger(minute);
    second = ES.ToInteger(second);
    millisecond = ES.ToInteger(millisecond);
    microsecond = ES.ToInteger(microsecond);
    nanosecond = ES.ToInteger(nanosecond);
    ES.RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    CreateSlots(this);
    SetSlot(this, YEAR, year);
    SetSlot(this, MONTH, month);
    SetSlot(this, DAY, day);
    SetSlot(this, HOUR, hour);
    SetSlot(this, MINUTE, minute);
    SetSlot(this, SECOND, second);
    SetSlot(this, MILLISECOND, millisecond);
    SetSlot(this, MICROSECOND, microsecond);
    SetSlot(this, NANOSECOND, nanosecond);
  }

  _createClass(DateTime, [{
    key: "with",
    value: function _with(dateTimeLike, options) {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToDisambiguation(options);
      var props = ES.ValidPropertyBag(dateTimeLike, ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond']);

      if (!props) {
        throw new RangeError('invalid date-time-like');
      }

      var _props$year = props.year,
          year = _props$year === void 0 ? GetSlot(this, YEAR) : _props$year,
          _props$month = props.month,
          month = _props$month === void 0 ? GetSlot(this, MONTH) : _props$month,
          _props$day = props.day,
          day = _props$day === void 0 ? GetSlot(this, DAY) : _props$day,
          _props$hour = props.hour,
          hour = _props$hour === void 0 ? GetSlot(this, HOUR) : _props$hour,
          _props$minute = props.minute,
          minute = _props$minute === void 0 ? GetSlot(this, MINUTE) : _props$minute,
          _props$second = props.second,
          second = _props$second === void 0 ? GetSlot(this, SECOND) : _props$second,
          _props$millisecond = props.millisecond,
          millisecond = _props$millisecond === void 0 ? GetSlot(this, MILLISECOND) : _props$millisecond,
          _props$microsecond = props.microsecond,
          microsecond = _props$microsecond === void 0 ? GetSlot(this, MICROSECOND) : _props$microsecond,
          _props$nanosecond = props.nanosecond,
          nanosecond = _props$nanosecond === void 0 ? GetSlot(this, NANOSECOND) : _props$nanosecond;

      var _ES$RegulateDateTime = ES.RegulateDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, disambiguation);

      year = _ES$RegulateDateTime.year;
      month = _ES$RegulateDateTime.month;
      day = _ES$RegulateDateTime.day;
      hour = _ES$RegulateDateTime.hour;
      minute = _ES$RegulateDateTime.minute;
      second = _ES$RegulateDateTime.second;
      millisecond = _ES$RegulateDateTime.millisecond;
      microsecond = _ES$RegulateDateTime.microsecond;
      nanosecond = _ES$RegulateDateTime.nanosecond;
      var Construct = ES.SpeciesConstructor(this, DateTime);
      var result = new Construct(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
      if (!ES.IsDateTime(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "plus",
    value: function plus(durationLike, options) {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var duration = ES.ToLimitedDuration(durationLike);
      var year = this.year,
          month = this.month,
          day = this.day,
          hour = this.hour,
          minute = this.minute,
          second = this.second,
          millisecond = this.millisecond,
          microsecond = this.microsecond,
          nanosecond = this.nanosecond;
      var years = duration.years,
          months = duration.months,
          days = duration.days,
          hours = duration.hours,
          minutes = duration.minutes,
          seconds = duration.seconds,
          milliseconds = duration.milliseconds,
          microseconds = duration.microseconds,
          nanoseconds = duration.nanoseconds;

      var _ES$AddDate = ES.AddDate(year, month, day, years, months, days, disambiguation);

      year = _ES$AddDate.year;
      month = _ES$AddDate.month;
      day = _ES$AddDate.day;
      var deltaDays = 0;

      var _ES$AddTime = ES.AddTime(hour, minute, second, millisecond, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

      deltaDays = _ES$AddTime.deltaDays;
      hour = _ES$AddTime.hour;
      minute = _ES$AddTime.minute;
      second = _ES$AddTime.second;
      millisecond = _ES$AddTime.millisecond;
      microsecond = _ES$AddTime.microsecond;
      nanosecond = _ES$AddTime.nanosecond;
      day += deltaDays;

      var _ES$BalanceDate = ES.BalanceDate(year, month, day);

      year = _ES$BalanceDate.year;
      month = _ES$BalanceDate.month;
      day = _ES$BalanceDate.day;

      var _ES$RegulateDateTime2 = ES.RegulateDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, disambiguation);

      year = _ES$RegulateDateTime2.year;
      month = _ES$RegulateDateTime2.month;
      day = _ES$RegulateDateTime2.day;
      hour = _ES$RegulateDateTime2.hour;
      minute = _ES$RegulateDateTime2.minute;
      second = _ES$RegulateDateTime2.second;
      millisecond = _ES$RegulateDateTime2.millisecond;
      microsecond = _ES$RegulateDateTime2.microsecond;
      nanosecond = _ES$RegulateDateTime2.nanosecond;
      var Construct = ES.SpeciesConstructor(this, DateTime);
      var result = new Construct(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
      if (!ES.IsDateTime(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "minus",
    value: function minus(durationLike, options) {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var duration = ES.ToLimitedDuration(durationLike);
      var year = this.year,
          month = this.month,
          day = this.day,
          hour = this.hour,
          minute = this.minute,
          second = this.second,
          millisecond = this.millisecond,
          microsecond = this.microsecond,
          nanosecond = this.nanosecond;
      var years = duration.years,
          months = duration.months,
          days = duration.days,
          hours = duration.hours,
          minutes = duration.minutes,
          seconds = duration.seconds,
          milliseconds = duration.milliseconds,
          microseconds = duration.microseconds,
          nanoseconds = duration.nanoseconds;
      var deltaDays = 0;

      var _ES$SubtractTime = ES.SubtractTime(hour, minute, second, millisecond, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

      deltaDays = _ES$SubtractTime.deltaDays;
      hour = _ES$SubtractTime.hour;
      minute = _ES$SubtractTime.minute;
      second = _ES$SubtractTime.second;
      millisecond = _ES$SubtractTime.millisecond;
      microsecond = _ES$SubtractTime.microsecond;
      nanosecond = _ES$SubtractTime.nanosecond;
      days -= deltaDays;

      var _ES$SubtractDate = ES.SubtractDate(year, month, day, years, months, days, disambiguation);

      year = _ES$SubtractDate.year;
      month = _ES$SubtractDate.month;
      day = _ES$SubtractDate.day;

      var _ES$RegulateDateTime3 = ES.RegulateDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, disambiguation);

      year = _ES$RegulateDateTime3.year;
      month = _ES$RegulateDateTime3.month;
      day = _ES$RegulateDateTime3.day;
      hour = _ES$RegulateDateTime3.hour;
      minute = _ES$RegulateDateTime3.minute;
      second = _ES$RegulateDateTime3.second;
      millisecond = _ES$RegulateDateTime3.millisecond;
      microsecond = _ES$RegulateDateTime3.microsecond;
      nanosecond = _ES$RegulateDateTime3.nanosecond;
      var Construct = ES.SpeciesConstructor(this, DateTime);
      var result = new Construct(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
      if (!ES.IsDateTime(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "difference",
    value: function difference(other, options) {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      if (!ES.IsDateTime(other)) throw new TypeError('invalid DateTime object');
      var largestUnit = ES.ToLargestTemporalUnit(options, 'days');

      var _sort = [this, other].sort(DateTime.compare),
          _sort2 = _slicedToArray(_sort, 2),
          smaller = _sort2[0],
          larger = _sort2[1];

      var _ES$DifferenceTime = ES.DifferenceTime(smaller, larger),
          deltaDays = _ES$DifferenceTime.deltaDays,
          hours = _ES$DifferenceTime.hours,
          minutes = _ES$DifferenceTime.minutes,
          seconds = _ES$DifferenceTime.seconds,
          milliseconds = _ES$DifferenceTime.milliseconds,
          microseconds = _ES$DifferenceTime.microseconds,
          nanoseconds = _ES$DifferenceTime.nanoseconds;

      var year = larger.year,
          month = larger.month,
          day = larger.day;
      day += deltaDays;

      var _ES$BalanceDate2 = ES.BalanceDate(year, month, day);

      year = _ES$BalanceDate2.year;
      month = _ES$BalanceDate2.month;
      day = _ES$BalanceDate2.day;
      var dateLargestUnit = 'days';

      if (largestUnit === 'years' || largestUnit === 'months') {
        dateLargestUnit = largestUnit;
      }

      var _ES$DifferenceDate = ES.DifferenceDate(smaller, {
        year: year,
        month: month,
        day: day
      }, dateLargestUnit),
          years = _ES$DifferenceDate.years,
          months = _ES$DifferenceDate.months,
          days = _ES$DifferenceDate.days;

      var _ES$BalanceDuration = ES.BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit);

      days = _ES$BalanceDuration.days;
      hours = _ES$BalanceDuration.hours;
      minutes = _ES$BalanceDuration.minutes;
      seconds = _ES$BalanceDuration.seconds;
      milliseconds = _ES$BalanceDuration.milliseconds;
      microseconds = _ES$BalanceDuration.microseconds;
      nanoseconds = _ES$BalanceDuration.nanoseconds;
      var Duration = ES.GetIntrinsic('%Temporal.Duration%');
      return new Duration(years, months, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var year = ES.ISOYearString(GetSlot(this, YEAR));
      var month = ES.ISODateTimePartString(GetSlot(this, MONTH));
      var day = ES.ISODateTimePartString(GetSlot(this, DAY));
      var hour = ES.ISODateTimePartString(GetSlot(this, HOUR));
      var minute = ES.ISODateTimePartString(GetSlot(this, MINUTE));
      var second = ES.ISOSecondsString(GetSlot(this, SECOND), GetSlot(this, MILLISECOND), GetSlot(this, MICROSECOND), GetSlot(this, NANOSECOND));
      var resultString = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute).concat(second ? ":".concat(second) : '');
      return resultString;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "inTimeZone",
    value: function inTimeZone() {
      var timeZoneParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'UTC';
      var options = arguments.length > 1 ? arguments[1] : undefined;
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var timeZone = ES.ToTimeZone(timeZoneParam);
      var disambiguation = ES.ToTimeZoneDisambiguation(options);
      return timeZone.getAbsoluteFor(this, disambiguation);
    }
  }, {
    key: "getDate",
    value: function getDate() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var Date = ES.GetIntrinsic('%Temporal.Date%');
      return new Date(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "getYearMonth",
    value: function getYearMonth() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var YearMonth = ES.GetIntrinsic('%Temporal.YearMonth%');
      return new YearMonth(GetSlot(this, YEAR), GetSlot(this, MONTH));
    }
  }, {
    key: "getMonthDay",
    value: function getMonthDay() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var MonthDay = ES.GetIntrinsic('%Temporal.MonthDay%');
      return new MonthDay(GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "getTime",
    value: function getTime() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      var Time = ES.GetIntrinsic('%Temporal.Time%');
      return new Time(GetSlot(this, HOUR), GetSlot(this, MINUTE), GetSlot(this, SECOND), GetSlot(this, MILLISECOND), GetSlot(this, MICROSECOND), GetSlot(this, NANOSECOND));
    }
  }, {
    key: "year",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, YEAR);
    }
  }, {
    key: "month",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MONTH);
    }
  }, {
    key: "day",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, DAY);
    }
  }, {
    key: "hour",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, HOUR);
    }
  }, {
    key: "minute",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MINUTE);
    }
  }, {
    key: "second",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, SECOND);
    }
  }, {
    key: "millisecond",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MILLISECOND);
    }
  }, {
    key: "microsecond",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MICROSECOND);
    }
  }, {
    key: "nanosecond",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, NANOSECOND);
    }
  }, {
    key: "dayOfWeek",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return ES.DayOfWeek(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "dayOfYear",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return ES.DayOfYear(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "weekOfYear",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return ES.WeekOfYear(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "daysInYear",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return ES.LeapYear(GetSlot(this, YEAR)) ? 366 : 365;
    }
  }, {
    key: "daysInMonth",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return ES.DaysInMonth(GetSlot(this, YEAR), GetSlot(this, MONTH));
    }
  }, {
    key: "isLeapYear",
    get: function get() {
      if (!ES.IsDateTime(this)) throw new TypeError('invalid receiver');
      return ES.LeapYear(GetSlot(this, YEAR));
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var disambiguation = ES.ToDisambiguation(options);
      var result = ES.ToDateTime(arg, disambiguation);
      return this === DateTime ? result : new this(GetSlot(result, YEAR), GetSlot(result, MONTH), GetSlot(result, DAY), GetSlot(result, HOUR), GetSlot(result, MINUTE), GetSlot(result, SECOND), GetSlot(result, MILLISECOND), GetSlot(result, MICROSECOND), GetSlot(result, NANOSECOND));
    }
  }, {
    key: "compare",
    value: function compare(one, two) {
      if (!ES.IsDateTime(one) || !ES.IsDateTime(two)) throw new TypeError('invalid DateTime object');
      if (one.year !== two.year) return ES.ComparisonResult(one.year - two.year);
      if (one.month !== two.month) return ES.ComparisonResult(one.month - two.month);
      if (one.day !== two.day) return ES.ComparisonResult(one.day - two.day);
      if (one.hour !== two.hour) return ES.ComparisonResult(one.hour - two.hour);
      if (one.minute !== two.minute) return ES.ComparisonResult(one.minute - two.minute);
      if (one.second !== two.second) return ES.ComparisonResult(one.second - two.second);
      if (one.millisecond !== two.millisecond) return ES.ComparisonResult(one.millisecond - two.millisecond);
      if (one.microsecond !== two.microsecond) return ES.ComparisonResult(one.microsecond - two.microsecond);
      if (one.nanosecond !== two.nanosecond) return ES.ComparisonResult(one.nanosecond - two.nanosecond);
      return ES.ComparisonResult(0);
    }
  }]);

  return DateTime;
}();
DateTime.prototype.toJSON = DateTime.prototype.toString;
MakeIntrinsicClass(DateTime, 'Temporal.DateTime');

var Date$1 = /*#__PURE__*/function () {
  function Date(year, month, day) {
    _classCallCheck(this, Date);

    year = ES.ToInteger(year);
    month = ES.ToInteger(month);
    day = ES.ToInteger(day);
    ES.RejectDate(year, month, day);
    CreateSlots(this);
    SetSlot(this, YEAR, year);
    SetSlot(this, MONTH, month);
    SetSlot(this, DAY, day);
  }

  _createClass(Date, [{
    key: "with",
    value: function _with() {
      var dateLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 ? arguments[1] : undefined;
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToDisambiguation(options);
      var props = ES.ValidPropertyBag(dateLike, ['year', 'month', 'day']);

      if (!props) {
        throw new RangeError('invalid date-like');
      }

      var _props$year = props.year,
          year = _props$year === void 0 ? GetSlot(this, YEAR) : _props$year,
          _props$month = props.month,
          month = _props$month === void 0 ? GetSlot(this, MONTH) : _props$month,
          _props$day = props.day,
          day = _props$day === void 0 ? GetSlot(this, DAY) : _props$day;

      var _ES$RegulateDate = ES.RegulateDate(year, month, day, disambiguation);

      year = _ES$RegulateDate.year;
      month = _ES$RegulateDate.month;
      day = _ES$RegulateDate.day;
      var Construct = ES.SpeciesConstructor(this, Date);
      var result = new Construct(year, month, day);
      if (!ES.IsDate(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "plus",
    value: function plus() {
      var durationLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 ? arguments[1] : undefined;
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var duration = ES.ToLimitedDuration(durationLike, [HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS]);
      var year = this.year,
          month = this.month,
          day = this.day;
      var years = duration.years,
          months = duration.months,
          days = duration.days;

      var _ES$AddDate = ES.AddDate(year, month, day, years, months, days, disambiguation);

      year = _ES$AddDate.year;
      month = _ES$AddDate.month;
      day = _ES$AddDate.day;

      var _ES$RegulateDate2 = ES.RegulateDate(year, month, day, disambiguation);

      year = _ES$RegulateDate2.year;
      month = _ES$RegulateDate2.month;
      day = _ES$RegulateDate2.day;
      var Construct = ES.SpeciesConstructor(this, Date);
      var result = new Construct(year, month, day);
      if (!ES.IsDate(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "minus",
    value: function minus() {
      var durationLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 ? arguments[1] : undefined;
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var duration = ES.ToLimitedDuration(durationLike, [HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS]);
      var year = this.year,
          month = this.month,
          day = this.day;
      var years = duration.years,
          months = duration.months,
          days = duration.days;

      var _ES$SubtractDate = ES.SubtractDate(year, month, day, years, months, days, disambiguation);

      year = _ES$SubtractDate.year;
      month = _ES$SubtractDate.month;
      day = _ES$SubtractDate.day;

      var _ES$RegulateDate3 = ES.RegulateDate(year, month, day, disambiguation);

      year = _ES$RegulateDate3.year;
      month = _ES$RegulateDate3.month;
      day = _ES$RegulateDate3.day;
      var Construct = ES.SpeciesConstructor(this, Date);
      var result = new Construct(year, month, day);
      if (!ES.IsDate(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "difference",
    value: function difference(other, options) {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      if (!ES.IsDate(other)) throw new TypeError('invalid Date object');
      var largestUnit = ES.ToLargestTemporalUnit(options, 'days', ['hours', 'minutes', 'seconds']);

      var _sort = [this, other].sort(Date.compare),
          _sort2 = _slicedToArray(_sort, 2),
          smaller = _sort2[0],
          larger = _sort2[1];

      var _ES$DifferenceDate = ES.DifferenceDate(smaller, larger, largestUnit),
          years = _ES$DifferenceDate.years,
          months = _ES$DifferenceDate.months,
          days = _ES$DifferenceDate.days;

      var Duration = ES.GetIntrinsic('%Temporal.Duration%');
      return new Duration(years, months, days, 0, 0, 0, 0, 0, 0);
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var year = ES.ISOYearString(GetSlot(this, YEAR));
      var month = ES.ISODateTimePartString(GetSlot(this, MONTH));
      var day = ES.ISODateTimePartString(GetSlot(this, DAY));
      var resultString = "".concat(year, "-").concat(month, "-").concat(day);
      return resultString;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "withTime",
    value: function withTime(timeLike) {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var year = GetSlot(this, YEAR);
      var month = GetSlot(this, MONTH);
      var day = GetSlot(this, DAY);
      timeLike = ES.ToTime(timeLike, 'reject');
      var _timeLike = timeLike,
          hour = _timeLike.hour,
          minute = _timeLike.minute,
          second = _timeLike.second,
          millisecond = _timeLike.millisecond,
          microsecond = _timeLike.microsecond,
          nanosecond = _timeLike.nanosecond;
      var DateTime = ES.GetIntrinsic('%Temporal.DateTime%');
      return new DateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    }
  }, {
    key: "getYearMonth",
    value: function getYearMonth() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var YearMonth = ES.GetIntrinsic('%Temporal.YearMonth%');
      return new YearMonth(GetSlot(this, YEAR), GetSlot(this, MONTH));
    }
  }, {
    key: "getMonthDay",
    value: function getMonthDay() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      var MonthDay = ES.GetIntrinsic('%Temporal.MonthDay%');
      return new MonthDay(GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "year",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, YEAR);
    }
  }, {
    key: "month",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MONTH);
    }
  }, {
    key: "day",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, DAY);
    }
  }, {
    key: "dayOfWeek",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return ES.DayOfWeek(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "dayOfYear",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return ES.DayOfYear(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "weekOfYear",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return ES.WeekOfYear(GetSlot(this, YEAR), GetSlot(this, MONTH), GetSlot(this, DAY));
    }
  }, {
    key: "daysInYear",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return ES.LeapYear(GetSlot(this, YEAR)) ? 366 : 365;
    }
  }, {
    key: "daysInMonth",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return ES.DaysInMonth(GetSlot(this, YEAR), GetSlot(this, MONTH));
    }
  }, {
    key: "isLeapYear",
    get: function get() {
      if (!ES.IsDate(this)) throw new TypeError('invalid receiver');
      return ES.LeapYear(GetSlot(this, YEAR));
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var disambiguation = ES.ToDisambiguation(options);
      var result = ES.ToDate(arg, disambiguation);
      return this === Date ? result : new this(GetSlot(result, YEAR), GetSlot(result, MONTH), GetSlot(result, DAY));
    }
  }, {
    key: "compare",
    value: function compare(one, two) {
      if (!ES.IsDate(one) || !ES.IsDate(two)) throw new TypeError('invalid Date object');
      if (one.year !== two.year) return ES.ComparisonResult(one.year - two.year);
      if (one.month !== two.month) return ES.ComparisonResult(one.month - two.month);
      if (one.day !== two.day) return ES.ComparisonResult(one.day - two.day);
      return ES.ComparisonResult(0);
    }
  }]);

  return Date;
}();
Date$1.prototype.toJSON = Date$1.prototype.toString;
MakeIntrinsicClass(Date$1, 'Temporal.Date');

var YearMonth = /*#__PURE__*/function () {
  function YearMonth(year, month) {
    _classCallCheck(this, YearMonth);

    year = ES.ToInteger(year);
    month = ES.ToInteger(month);
    ES.RejectYearMonth(year, month);
    CreateSlots(this);
    SetSlot(this, YEAR, year);
    SetSlot(this, MONTH, month);
  }

  _createClass(YearMonth, [{
    key: "with",
    value: function _with() {
      var dateLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 ? arguments[1] : undefined;
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToDisambiguation(options);
      var props = ES.ValidPropertyBag(dateLike, ['year', 'month']);

      if (!props) {
        throw new RangeError('invalid year-month-like');
      }

      var _props$year = props.year,
          year = _props$year === void 0 ? GetSlot(this, YEAR) : _props$year,
          _props$month = props.month,
          month = _props$month === void 0 ? GetSlot(this, MONTH) : _props$month;
      var result = ES.ToYearMonth({
        year: year,
        month: month
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, YearMonth);
      return Construct === YearMonth ? result : new Construct(GetSlot(result, YEAR), GetSlot(result, MONTH));
    }
  }, {
    key: "plus",
    value: function plus(durationLike, options) {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var duration = ES.ToLimitedDuration(durationLike, [DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS]);
      var year = this.year,
          month = this.month;
      var years = duration.years,
          months = duration.months;

      var _ES$AddDate = ES.AddDate(year, month, 1, years, months, 0, disambiguation);

      year = _ES$AddDate.year;
      month = _ES$AddDate.month;

      var _ES$BalanceYearMonth = ES.BalanceYearMonth(year, month);

      year = _ES$BalanceYearMonth.year;
      month = _ES$BalanceYearMonth.month;
      var result = ES.ToYearMonth({
        year: year,
        month: month
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, YearMonth);
      return Construct === YearMonth ? result : new Construct(GetSlot(result, YEAR), GetSlot(result, MONTH));
    }
  }, {
    key: "minus",
    value: function minus(durationLike, options) {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var duration = ES.ToLimitedDuration(durationLike, [DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS]);
      var year = this.year,
          month = this.month;
      var years = duration.years,
          months = duration.months;

      var _ES$SubtractDate = ES.SubtractDate(year, month, 1, years, months, 0, disambiguation);

      year = _ES$SubtractDate.year;
      month = _ES$SubtractDate.month;

      var _ES$BalanceYearMonth2 = ES.BalanceYearMonth(year, month);

      year = _ES$BalanceYearMonth2.year;
      month = _ES$BalanceYearMonth2.month;
      var result = ES.ToYearMonth({
        year: year,
        month: month
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, YearMonth);
      return Construct === YearMonth ? result : new Construct(GetSlot(result, YEAR), GetSlot(result, MONTH));
    }
  }, {
    key: "difference",
    value: function difference(other, options) {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      if (!ES.IsYearMonth(other)) throw new TypeError('invalid YearMonth object');
      var largestUnit = ES.ToLargestTemporalUnit(options, 'years', ['days', 'hours', 'minutes', 'seconds']);

      var _sort = [this, other].sort(YearMonth.compare),
          _sort2 = _slicedToArray(_sort, 2),
          one = _sort2[0],
          two = _sort2[1];

      var years = two.year - one.year;
      var months = two.month - one.month;

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      if (largestUnit === 'months') {
        months += 12 * years;
        years = 0;
      }

      var Duration = ES.GetIntrinsic('%Temporal.Duration%');
      return new Duration(years, months);
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      var year = ES.ISOYearString(GetSlot(this, YEAR));
      var month = ES.ISODateTimePartString(GetSlot(this, MONTH));
      var resultString = "".concat(year, "-").concat(month);
      return resultString;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "withDay",
    value: function withDay(day) {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      var year = GetSlot(this, YEAR);
      var month = GetSlot(this, MONTH);
      var Date = ES.GetIntrinsic('%Temporal.Date%');
      return new Date(year, month, day);
    }
  }, {
    key: "year",
    get: function get() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, YEAR);
    }
  }, {
    key: "month",
    get: function get() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MONTH);
    }
  }, {
    key: "daysInMonth",
    get: function get() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      return ES.DaysInMonth(GetSlot(this, YEAR), GetSlot(this, MONTH));
    }
  }, {
    key: "daysInYear",
    get: function get() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      return ES.LeapYear(GetSlot(this, YEAR)) ? 366 : 365;
    }
  }, {
    key: "isLeapYear",
    get: function get() {
      if (!ES.IsYearMonth(this)) throw new TypeError('invalid receiver');
      return ES.LeapYear(GetSlot(this, YEAR));
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var disambiguation = ES.ToDisambiguation(options);
      var result = ES.ToYearMonth(arg, disambiguation);
      return this === YearMonth ? result : new this(GetSlot(result, YEAR), GetSlot(result, MONTH));
    }
  }, {
    key: "compare",
    value: function compare(one, two) {
      if (!ES.IsYearMonth(one) || !ES.IsYearMonth(two)) throw new TypeError('invalid YearMonth object');
      if (one.year !== two.year) return ES.ComparisonResult(one.year - two.year);
      if (one.month !== two.month) return ES.ComparisonResult(one.month - two.month);
      return ES.ComparisonResult(0);
    }
  }]);

  return YearMonth;
}();
YearMonth.prototype.toJSON = YearMonth.prototype.toString;
MakeIntrinsicClass(YearMonth, 'Temporal.YearMonth');

var MonthDay = /*#__PURE__*/function () {
  function MonthDay(month, day) {
    _classCallCheck(this, MonthDay);

    month = ES.ToInteger(month);
    day = ES.ToInteger(day);
    var leapYear = 1972; // XXX #261 leap year

    ES.RejectDate(leapYear, month, day);
    CreateSlots(this);
    SetSlot(this, MONTH, month);
    SetSlot(this, DAY, day);
  }

  _createClass(MonthDay, [{
    key: "with",
    value: function _with(dateLike, options) {
      if (!ES.IsMonthDay(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToDisambiguation(options);
      var props = ES.ValidPropertyBag(dateLike, ['month', 'day']);

      if (!props) {
        throw new RangeError('invalid month-day-like');
      }

      var _props$month = props.month,
          month = _props$month === void 0 ? GetSlot(this, MONTH) : _props$month,
          _props$day = props.day,
          day = _props$day === void 0 ? GetSlot(this, DAY) : _props$day;
      var result = ES.ToMonthDay({
        month: month,
        day: day
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, MonthDay);
      return this === MonthDay ? result : new Construct(GetSlot(result, MONTH), GetSlot(result, DAY));
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!ES.IsMonthDay(this)) throw new TypeError('invalid receiver');
      var month = ES.ISODateTimePartString(GetSlot(this, MONTH));
      var day = ES.ISODateTimePartString(GetSlot(this, DAY));
      var resultString = "".concat(month, "-").concat(day);
      return resultString;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsMonthDay(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "withYear",
    value: function withYear(year) {
      if (!ES.IsMonthDay(this)) throw new TypeError('invalid receiver');
      var month = GetSlot(this, MONTH);
      var day = GetSlot(this, DAY);
      var Date = ES.GetIntrinsic('%Temporal.Date%');
      return new Date(year, month, day);
    }
  }, {
    key: "month",
    get: function get() {
      if (!ES.IsMonthDay(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MONTH);
    }
  }, {
    key: "day",
    get: function get() {
      if (!ES.IsMonthDay(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, DAY);
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var disambiguation = ES.ToDisambiguation(options);
      var result = ES.ToMonthDay(arg, disambiguation);
      return this === MonthDay ? result : new this(GetSlot(result, MONTH), GetSlot(result, DAY));
    }
  }, {
    key: "compare",
    value: function compare(one, two) {
      if (!ES.IsMonthDay(one) || !ES.IsMonthDay(two)) throw new TypeError('invalid MonthDay object');
      if (one.month !== two.month) return ES.ComparisonResult(one.month - two.month);
      if (one.day !== two.day) return ES.ComparisonResult(one.day - two.day);
      return ES.ComparisonResult(0);
    }
  }]);

  return MonthDay;
}();
MonthDay.prototype.toJSON = MonthDay.prototype.toString;
MakeIntrinsicClass(MonthDay, 'Temporal.MonthDay');

var Time = /*#__PURE__*/function () {
  function Time() {
    var hour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var minute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var second = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var millisecond = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var microsecond = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var nanosecond = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Time);

    hour = ES.ToInteger(hour);
    minute = ES.ToInteger(minute);
    second = ES.ToInteger(second);
    millisecond = ES.ToInteger(millisecond);
    microsecond = ES.ToInteger(microsecond);
    nanosecond = ES.ToInteger(nanosecond);
    ES.RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
    CreateSlots(this);
    SetSlot(this, HOUR, hour);
    SetSlot(this, MINUTE, minute);
    SetSlot(this, SECOND, second);
    SetSlot(this, MILLISECOND, millisecond);
    SetSlot(this, MICROSECOND, microsecond);
    SetSlot(this, NANOSECOND, nanosecond);
  }

  _createClass(Time, [{
    key: "with",
    value: function _with() {
      var timeLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 ? arguments[1] : undefined;
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      var disambiguation = ES.ToDisambiguation(options);
      var props = ES.ValidPropertyBag(timeLike, ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond']);

      if (!props) {
        throw new RangeError('invalid time-like');
      }

      var _props$hour = props.hour,
          hour = _props$hour === void 0 ? GetSlot(this, HOUR) : _props$hour,
          _props$minute = props.minute,
          minute = _props$minute === void 0 ? GetSlot(this, MINUTE) : _props$minute,
          _props$second = props.second,
          second = _props$second === void 0 ? GetSlot(this, SECOND) : _props$second,
          _props$millisecond = props.millisecond,
          millisecond = _props$millisecond === void 0 ? GetSlot(this, MILLISECOND) : _props$millisecond,
          _props$microsecond = props.microsecond,
          microsecond = _props$microsecond === void 0 ? GetSlot(this, MICROSECOND) : _props$microsecond,
          _props$nanosecond = props.nanosecond,
          nanosecond = _props$nanosecond === void 0 ? GetSlot(this, NANOSECOND) : _props$nanosecond;
      var result = ES.ToTime({
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, Time);
      return Construct === Time ? result : new Construct(GetSlot(result, HOUR), GetSlot(result, MINUTE), GetSlot(result, SECOND), GetSlot(result, MILLISECOND), GetSlot(result, MICROSECOND), GetSlot(result, NANOSECOND));
    }
  }, {
    key: "plus",
    value: function plus(durationLike, options) {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      var hour = this.hour,
          minute = this.minute,
          second = this.second,
          millisecond = this.millisecond,
          microsecond = this.microsecond,
          nanosecond = this.nanosecond;
      var duration = ES.ToLimitedDuration(durationLike, [YEARS, MONTHS, DAYS]);
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var hours = duration.hours,
          minutes = duration.minutes,
          seconds = duration.seconds,
          milliseconds = duration.milliseconds,
          microseconds = duration.microseconds,
          nanoseconds = duration.nanoseconds;

      var _ES$AddTime = ES.AddTime(hour, minute, second, millisecond, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

      hour = _ES$AddTime.hour;
      minute = _ES$AddTime.minute;
      second = _ES$AddTime.second;
      millisecond = _ES$AddTime.millisecond;
      microsecond = _ES$AddTime.microsecond;
      nanosecond = _ES$AddTime.nanosecond;
      var result = ES.ToTime({
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, Time);
      return Construct === Time ? result : new Construct(GetSlot(result, HOUR), GetSlot(result, MINUTE), GetSlot(result, SECOND), GetSlot(result, MILLISECOND), GetSlot(result, MICROSECOND), GetSlot(result, NANOSECOND));
    }
  }, {
    key: "minus",
    value: function minus(durationLike, options) {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      var hour = this.hour,
          minute = this.minute,
          second = this.second,
          millisecond = this.millisecond,
          microsecond = this.microsecond,
          nanosecond = this.nanosecond;
      var duration = ES.ToLimitedDuration(durationLike, [YEARS, MONTHS, DAYS]);
      var disambiguation = ES.ToArithmeticDisambiguation(options);
      var hours = duration.hours,
          minutes = duration.minutes,
          seconds = duration.seconds,
          milliseconds = duration.milliseconds,
          microseconds = duration.microseconds,
          nanoseconds = duration.nanoseconds;

      var _ES$SubtractTime = ES.SubtractTime(hour, minute, second, minute, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

      hour = _ES$SubtractTime.hour;
      minute = _ES$SubtractTime.minute;
      second = _ES$SubtractTime.second;
      minute = _ES$SubtractTime.minute;
      microsecond = _ES$SubtractTime.microsecond;
      nanosecond = _ES$SubtractTime.nanosecond;
      var result = ES.ToTime({
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      }, disambiguation);
      var Construct = ES.SpeciesConstructor(this, Time);
      return Construct === Time ? result : new Construct(GetSlot(result, HOUR), GetSlot(result, MINUTE), GetSlot(result, SECOND), GetSlot(result, MILLISECOND), GetSlot(result, MICROSECOND), GetSlot(result, NANOSECOND));
    }
  }, {
    key: "difference",
    value: function difference(other, options) {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      if (!ES.IsTime(other)) throw new TypeError('invalid Time object');
      var largestUnit = ES.ToLargestTemporalUnit(options, 'hours');

      var _sort = [this, other].sort(Time.compare),
          _sort2 = _slicedToArray(_sort, 2),
          earlier = _sort2[0],
          later = _sort2[1];

      var _ES$DifferenceTime = ES.DifferenceTime(earlier, later),
          hours = _ES$DifferenceTime.hours,
          minutes = _ES$DifferenceTime.minutes,
          seconds = _ES$DifferenceTime.seconds,
          milliseconds = _ES$DifferenceTime.milliseconds,
          microseconds = _ES$DifferenceTime.microseconds,
          nanoseconds = _ES$DifferenceTime.nanoseconds;

      if (hours >= 12) {
        hours = 24 - hours;
        minutes *= -1;
        seconds *= -1;
        milliseconds *= -1;
        microseconds *= -1;
        nanoseconds *= -1;
      }

      var _ES$BalanceDuration = ES.BalanceDuration(0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit);

      hours = _ES$BalanceDuration.hours;
      minutes = _ES$BalanceDuration.minutes;
      seconds = _ES$BalanceDuration.seconds;
      milliseconds = _ES$BalanceDuration.milliseconds;
      microseconds = _ES$BalanceDuration.microseconds;
      nanoseconds = _ES$BalanceDuration.nanoseconds;
      var Duration = ES.GetIntrinsic('%Temporal.Duration%');
      return new Duration(0, 0, 0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      var hour = ES.ISODateTimePartString(GetSlot(this, HOUR));
      var minute = ES.ISODateTimePartString(GetSlot(this, MINUTE));
      var seconds = ES.ISOSecondsString(GetSlot(this, SECOND), GetSlot(this, MILLISECOND), GetSlot(this, MICROSECOND), GetSlot(this, NANOSECOND));
      var resultString = "".concat(hour, ":").concat(minute).concat(seconds ? ":".concat(seconds) : '');
      return resultString;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "withDate",
    value: function withDate(dateLike) {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');

      var _ES$ToDate = ES.ToDate(dateLike, 'reject'),
          year = _ES$ToDate.year,
          month = _ES$ToDate.month,
          day = _ES$ToDate.day;

      var hour = this.hour,
          minute = this.minute,
          second = this.second,
          millisecond = this.millisecond,
          microsecond = this.microsecond,
          nanosecond = this.nanosecond;
      var DateTime = ES.GetIntrinsic('%Temporal.DateTime%');
      return new DateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    }
  }, {
    key: "hour",
    get: function get() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, HOUR);
    }
  }, {
    key: "minute",
    get: function get() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MINUTE);
    }
  }, {
    key: "second",
    get: function get() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, SECOND);
    }
  }, {
    key: "millisecond",
    get: function get() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MILLISECOND);
    }
  }, {
    key: "microsecond",
    get: function get() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MICROSECOND);
    }
  }, {
    key: "nanosecond",
    get: function get() {
      if (!ES.IsTime(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, NANOSECOND);
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var disambiguation = ES.ToDisambiguation(options);
      var result = ES.ToTime(arg, disambiguation);
      return this === Time ? result : new this(GetSlot(result, HOUR), GetSlot(result, MINUTE), GetSlot(result, SECOND), GetSlot(result, MILLISECOND), GetSlot(result, MICROSECOND), GetSlot(result, NANOSECOND));
    }
  }, {
    key: "compare",
    value: function compare(one, two) {
      if (!ES.IsTime(one) || !ES.IsTime(two)) throw new TypeError('invalid Time object');
      if (one.hour !== two.hour) return ES.ComparisonResult(one.hour - two.hour);
      if (one.minute !== two.minute) return ES.ComparisonResult(one.minute - two.minute);
      if (one.second !== two.second) return ES.ComparisonResult(one.second - two.second);
      if (one.millisecond !== two.millisecond) return ES.ComparisonResult(one.millisecond - two.millisecond);
      if (one.microsecond !== two.microsecond) return ES.ComparisonResult(one.microsecond - two.microsecond);
      if (one.nanosecond !== two.nanosecond) return ES.ComparisonResult(one.nanosecond - two.nanosecond);
      return ES.ComparisonResult(0);
    }
  }]);

  return Time;
}();
Time.prototype.toJSON = Time.prototype.toString;
MakeIntrinsicClass(Time, 'Temporal.Time');

var BigInteger = createCommonjsModule(function (module) {
var bigInt = (function (undefined$1) {

    var BASE = 1e7,
        LOG_BASE = 7,
        MAX_INT = 9007199254740992,
        MAX_INT_ARR = smallToArray(MAX_INT),
        DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

    var supportsNativeBigInt = typeof BigInt === "function";

    function Integer(v, radix, alphabet, caseSensitive) {
        if (typeof v === "undefined") return Integer[0];
        if (typeof radix !== "undefined") return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
        return parseValue(v);
    }

    function BigInteger(value, sign) {
        this.value = value;
        this.sign = sign;
        this.isSmall = false;
    }
    BigInteger.prototype = Object.create(Integer.prototype);

    function SmallInteger(value) {
        this.value = value;
        this.sign = value < 0;
        this.isSmall = true;
    }
    SmallInteger.prototype = Object.create(Integer.prototype);

    function NativeBigInt(value) {
        this.value = value;
    }
    NativeBigInt.prototype = Object.create(Integer.prototype);

    function isPrecise(n) {
        return -MAX_INT < n && n < MAX_INT;
    }

    function smallToArray(n) { // For performance reasons doesn't reference BASE, need to change this function if BASE changes
        if (n < 1e7)
            return [n];
        if (n < 1e14)
            return [n % 1e7, Math.floor(n / 1e7)];
        return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
    }

    function arrayToSmall(arr) { // If BASE changes this function may need to change
        trim(arr);
        var length = arr.length;
        if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
            switch (length) {
                case 0: return 0;
                case 1: return arr[0];
                case 2: return arr[0] + arr[1] * BASE;
                default: return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
            }
        }
        return arr;
    }

    function trim(v) {
        var i = v.length;
        while (v[--i] === 0);
        v.length = i + 1;
    }

    function createArray(length) { // function shamelessly stolen from Yaffle's library https://github.com/Yaffle/BigInteger
        var x = new Array(length);
        var i = -1;
        while (++i < length) {
            x[i] = 0;
        }
        return x;
    }

    function truncate(n) {
        if (n > 0) return Math.floor(n);
        return Math.ceil(n);
    }

    function add(a, b) { // assumes a and b are arrays with a.length >= b.length
        var l_a = a.length,
            l_b = b.length,
            r = new Array(l_a),
            carry = 0,
            base = BASE,
            sum, i;
        for (i = 0; i < l_b; i++) {
            sum = a[i] + b[i] + carry;
            carry = sum >= base ? 1 : 0;
            r[i] = sum - carry * base;
        }
        while (i < l_a) {
            sum = a[i] + carry;
            carry = sum === base ? 1 : 0;
            r[i++] = sum - carry * base;
        }
        if (carry > 0) r.push(carry);
        return r;
    }

    function addAny(a, b) {
        if (a.length >= b.length) return add(a, b);
        return add(b, a);
    }

    function addSmall(a, carry) { // assumes a is array, carry is number with 0 <= carry < MAX_INT
        var l = a.length,
            r = new Array(l),
            base = BASE,
            sum, i;
        for (i = 0; i < l; i++) {
            sum = a[i] - base + carry;
            carry = Math.floor(sum / base);
            r[i] = sum - carry * base;
            carry += 1;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }

    BigInteger.prototype.add = function (v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.subtract(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall) {
            return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
        }
        return new BigInteger(addAny(a, b), this.sign);
    };
    BigInteger.prototype.plus = BigInteger.prototype.add;

    SmallInteger.prototype.add = function (v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
            return this.subtract(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
            if (isPrecise(a + b)) return new SmallInteger(a + b);
            b = smallToArray(Math.abs(b));
        }
        return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
    };
    SmallInteger.prototype.plus = SmallInteger.prototype.add;

    NativeBigInt.prototype.add = function (v) {
        return new NativeBigInt(this.value + parseValue(v).value);
    };
    NativeBigInt.prototype.plus = NativeBigInt.prototype.add;

    function subtract(a, b) { // assumes a and b are arrays with a >= b
        var a_l = a.length,
            b_l = b.length,
            r = new Array(a_l),
            borrow = 0,
            base = BASE,
            i, difference;
        for (i = 0; i < b_l; i++) {
            difference = a[i] - borrow - b[i];
            if (difference < 0) {
                difference += base;
                borrow = 1;
            } else borrow = 0;
            r[i] = difference;
        }
        for (i = b_l; i < a_l; i++) {
            difference = a[i] - borrow;
            if (difference < 0) difference += base;
            else {
                r[i++] = difference;
                break;
            }
            r[i] = difference;
        }
        for (; i < a_l; i++) {
            r[i] = a[i];
        }
        trim(r);
        return r;
    }

    function subtractAny(a, b, sign) {
        var value;
        if (compareAbs(a, b) >= 0) {
            value = subtract(a, b);
        } else {
            value = subtract(b, a);
            sign = !sign;
        }
        value = arrayToSmall(value);
        if (typeof value === "number") {
            if (sign) value = -value;
            return new SmallInteger(value);
        }
        return new BigInteger(value, sign);
    }

    function subtractSmall(a, b, sign) { // assumes a is array, b is number with 0 <= b < MAX_INT
        var l = a.length,
            r = new Array(l),
            carry = -b,
            base = BASE,
            i, difference;
        for (i = 0; i < l; i++) {
            difference = a[i] + carry;
            carry = Math.floor(difference / base);
            difference %= base;
            r[i] = difference < 0 ? difference + base : difference;
        }
        r = arrayToSmall(r);
        if (typeof r === "number") {
            if (sign) r = -r;
            return new SmallInteger(r);
        } return new BigInteger(r, sign);
    }

    BigInteger.prototype.subtract = function (v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.add(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall)
            return subtractSmall(a, Math.abs(b), this.sign);
        return subtractAny(a, b, this.sign);
    };
    BigInteger.prototype.minus = BigInteger.prototype.subtract;

    SmallInteger.prototype.subtract = function (v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
            return this.add(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
            return new SmallInteger(a - b);
        }
        return subtractSmall(b, Math.abs(a), a >= 0);
    };
    SmallInteger.prototype.minus = SmallInteger.prototype.subtract;

    NativeBigInt.prototype.subtract = function (v) {
        return new NativeBigInt(this.value - parseValue(v).value);
    };
    NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;

    BigInteger.prototype.negate = function () {
        return new BigInteger(this.value, !this.sign);
    };
    SmallInteger.prototype.negate = function () {
        var sign = this.sign;
        var small = new SmallInteger(-this.value);
        small.sign = !sign;
        return small;
    };
    NativeBigInt.prototype.negate = function () {
        return new NativeBigInt(-this.value);
    };

    BigInteger.prototype.abs = function () {
        return new BigInteger(this.value, false);
    };
    SmallInteger.prototype.abs = function () {
        return new SmallInteger(Math.abs(this.value));
    };
    NativeBigInt.prototype.abs = function () {
        return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
    };


    function multiplyLong(a, b) {
        var a_l = a.length,
            b_l = b.length,
            l = a_l + b_l,
            r = createArray(l),
            base = BASE,
            product, carry, i, a_i, b_j;
        for (i = 0; i < a_l; ++i) {
            a_i = a[i];
            for (var j = 0; j < b_l; ++j) {
                b_j = b[j];
                product = a_i * b_j + r[i + j];
                carry = Math.floor(product / base);
                r[i + j] = product - carry * base;
                r[i + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }

    function multiplySmall(a, b) { // assumes a is array, b is number with |b| < BASE
        var l = a.length,
            r = new Array(l),
            base = BASE,
            carry = 0,
            product, i;
        for (i = 0; i < l; i++) {
            product = a[i] * b + carry;
            carry = Math.floor(product / base);
            r[i] = product - carry * base;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }

    function shiftLeft(x, n) {
        var r = [];
        while (n-- > 0) r.push(0);
        return r.concat(x);
    }

    function multiplyKaratsuba(x, y) {
        var n = Math.max(x.length, y.length);

        if (n <= 30) return multiplyLong(x, y);
        n = Math.ceil(n / 2);

        var b = x.slice(n),
            a = x.slice(0, n),
            d = y.slice(n),
            c = y.slice(0, n);

        var ac = multiplyKaratsuba(a, c),
            bd = multiplyKaratsuba(b, d),
            abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));

        var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
        trim(product);
        return product;
    }

    // The following function is derived from a surface fit of a graph plotting the performance difference
    // between long multiplication and karatsuba multiplication versus the lengths of the two arrays.
    function useKaratsuba(l1, l2) {
        return -0.012 * l1 - 0.012 * l2 + 0.000015 * l1 * l2 > 0;
    }

    BigInteger.prototype.multiply = function (v) {
        var n = parseValue(v),
            a = this.value, b = n.value,
            sign = this.sign !== n.sign,
            abs;
        if (n.isSmall) {
            if (b === 0) return Integer[0];
            if (b === 1) return this;
            if (b === -1) return this.negate();
            abs = Math.abs(b);
            if (abs < BASE) {
                return new BigInteger(multiplySmall(a, abs), sign);
            }
            b = smallToArray(abs);
        }
        if (useKaratsuba(a.length, b.length)) // Karatsuba is only faster for certain array sizes
            return new BigInteger(multiplyKaratsuba(a, b), sign);
        return new BigInteger(multiplyLong(a, b), sign);
    };

    BigInteger.prototype.times = BigInteger.prototype.multiply;

    function multiplySmallAndArray(a, b, sign) { // a >= 0
        if (a < BASE) {
            return new BigInteger(multiplySmall(b, a), sign);
        }
        return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
    }
    SmallInteger.prototype._multiplyBySmall = function (a) {
        if (isPrecise(a.value * this.value)) {
            return new SmallInteger(a.value * this.value);
        }
        return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
    };
    BigInteger.prototype._multiplyBySmall = function (a) {
        if (a.value === 0) return Integer[0];
        if (a.value === 1) return this;
        if (a.value === -1) return this.negate();
        return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
    };
    SmallInteger.prototype.multiply = function (v) {
        return parseValue(v)._multiplyBySmall(this);
    };
    SmallInteger.prototype.times = SmallInteger.prototype.multiply;

    NativeBigInt.prototype.multiply = function (v) {
        return new NativeBigInt(this.value * parseValue(v).value);
    };
    NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;

    function square(a) {
        //console.assert(2 * BASE * BASE < MAX_INT);
        var l = a.length,
            r = createArray(l + l),
            base = BASE,
            product, carry, i, a_i, a_j;
        for (i = 0; i < l; i++) {
            a_i = a[i];
            carry = 0 - a_i * a_i;
            for (var j = i; j < l; j++) {
                a_j = a[j];
                product = 2 * (a_i * a_j) + r[i + j] + carry;
                carry = Math.floor(product / base);
                r[i + j] = product - carry * base;
            }
            r[i + l] = carry;
        }
        trim(r);
        return r;
    }

    BigInteger.prototype.square = function () {
        return new BigInteger(square(this.value), false);
    };

    SmallInteger.prototype.square = function () {
        var value = this.value * this.value;
        if (isPrecise(value)) return new SmallInteger(value);
        return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
    };

    NativeBigInt.prototype.square = function (v) {
        return new NativeBigInt(this.value * this.value);
    };

    function divMod1(a, b) { // Left over from previous version. Performs faster than divMod2 on smaller input sizes.
        var a_l = a.length,
            b_l = b.length,
            base = BASE,
            result = createArray(b.length),
            divisorMostSignificantDigit = b[b_l - 1],
            // normalization
            lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
            remainder = multiplySmall(a, lambda),
            divisor = multiplySmall(b, lambda),
            quotientDigit, shift, carry, borrow, i, l, q;
        if (remainder.length <= a_l) remainder.push(0);
        divisor.push(0);
        divisorMostSignificantDigit = divisor[b_l - 1];
        for (shift = a_l - b_l; shift >= 0; shift--) {
            quotientDigit = base - 1;
            if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
                quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
            }
            // quotientDigit <= base - 1
            carry = 0;
            borrow = 0;
            l = divisor.length;
            for (i = 0; i < l; i++) {
                carry += quotientDigit * divisor[i];
                q = Math.floor(carry / base);
                borrow += remainder[shift + i] - (carry - q * base);
                carry = q;
                if (borrow < 0) {
                    remainder[shift + i] = borrow + base;
                    borrow = -1;
                } else {
                    remainder[shift + i] = borrow;
                    borrow = 0;
                }
            }
            while (borrow !== 0) {
                quotientDigit -= 1;
                carry = 0;
                for (i = 0; i < l; i++) {
                    carry += remainder[shift + i] - base + divisor[i];
                    if (carry < 0) {
                        remainder[shift + i] = carry + base;
                        carry = 0;
                    } else {
                        remainder[shift + i] = carry;
                        carry = 1;
                    }
                }
                borrow += carry;
            }
            result[shift] = quotientDigit;
        }
        // denormalization
        remainder = divModSmall(remainder, lambda)[0];
        return [arrayToSmall(result), arrayToSmall(remainder)];
    }

    function divMod2(a, b) { // Implementation idea shamelessly stolen from Silent Matt's library http://silentmatt.com/biginteger/
        // Performs faster than divMod1 on larger input sizes.
        var a_l = a.length,
            b_l = b.length,
            result = [],
            part = [],
            base = BASE,
            guess, xlen, highx, highy, check;
        while (a_l) {
            part.unshift(a[--a_l]);
            trim(part);
            if (compareAbs(part, b) < 0) {
                result.push(0);
                continue;
            }
            xlen = part.length;
            highx = part[xlen - 1] * base + part[xlen - 2];
            highy = b[b_l - 1] * base + b[b_l - 2];
            if (xlen > b_l) {
                highx = (highx + 1) * base;
            }
            guess = Math.ceil(highx / highy);
            do {
                check = multiplySmall(b, guess);
                if (compareAbs(check, part) <= 0) break;
                guess--;
            } while (guess);
            result.push(guess);
            part = subtract(part, check);
        }
        result.reverse();
        return [arrayToSmall(result), arrayToSmall(part)];
    }

    function divModSmall(value, lambda) {
        var length = value.length,
            quotient = createArray(length),
            base = BASE,
            i, q, remainder, divisor;
        remainder = 0;
        for (i = length - 1; i >= 0; --i) {
            divisor = remainder * base + value[i];
            q = truncate(divisor / lambda);
            remainder = divisor - q * lambda;
            quotient[i] = q | 0;
        }
        return [quotient, remainder | 0];
    }

    function divModAny(self, v) {
        var value, n = parseValue(v);
        if (supportsNativeBigInt) {
            return [new NativeBigInt(self.value / n.value), new NativeBigInt(self.value % n.value)];
        }
        var a = self.value, b = n.value;
        var quotient;
        if (b === 0) throw new Error("Cannot divide by zero");
        if (self.isSmall) {
            if (n.isSmall) {
                return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
            }
            return [Integer[0], self];
        }
        if (n.isSmall) {
            if (b === 1) return [self, Integer[0]];
            if (b == -1) return [self.negate(), Integer[0]];
            var abs = Math.abs(b);
            if (abs < BASE) {
                value = divModSmall(a, abs);
                quotient = arrayToSmall(value[0]);
                var remainder = value[1];
                if (self.sign) remainder = -remainder;
                if (typeof quotient === "number") {
                    if (self.sign !== n.sign) quotient = -quotient;
                    return [new SmallInteger(quotient), new SmallInteger(remainder)];
                }
                return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
            }
            b = smallToArray(abs);
        }
        var comparison = compareAbs(a, b);
        if (comparison === -1) return [Integer[0], self];
        if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];

        // divMod1 is faster on smaller input sizes
        if (a.length + b.length <= 200)
            value = divMod1(a, b);
        else value = divMod2(a, b);

        quotient = value[0];
        var qSign = self.sign !== n.sign,
            mod = value[1],
            mSign = self.sign;
        if (typeof quotient === "number") {
            if (qSign) quotient = -quotient;
            quotient = new SmallInteger(quotient);
        } else quotient = new BigInteger(quotient, qSign);
        if (typeof mod === "number") {
            if (mSign) mod = -mod;
            mod = new SmallInteger(mod);
        } else mod = new BigInteger(mod, mSign);
        return [quotient, mod];
    }

    BigInteger.prototype.divmod = function (v) {
        var result = divModAny(this, v);
        return {
            quotient: result[0],
            remainder: result[1]
        };
    };
    NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger.prototype.divmod;


    BigInteger.prototype.divide = function (v) {
        return divModAny(this, v)[0];
    };
    NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function (v) {
        return new NativeBigInt(this.value / parseValue(v).value);
    };
    SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;

    BigInteger.prototype.mod = function (v) {
        return divModAny(this, v)[1];
    };
    NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function (v) {
        return new NativeBigInt(this.value % parseValue(v).value);
    };
    SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;

    BigInteger.prototype.pow = function (v) {
        var n = parseValue(v),
            a = this.value,
            b = n.value,
            value, x, y;
        if (b === 0) return Integer[1];
        if (a === 0) return Integer[0];
        if (a === 1) return Integer[1];
        if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
        if (n.sign) {
            return Integer[0];
        }
        if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
        if (this.isSmall) {
            if (isPrecise(value = Math.pow(a, b)))
                return new SmallInteger(truncate(value));
        }
        x = this;
        y = Integer[1];
        while (true) {
            if (b & 1 === 1) {
                y = y.times(x);
                --b;
            }
            if (b === 0) break;
            b /= 2;
            x = x.square();
        }
        return y;
    };
    SmallInteger.prototype.pow = BigInteger.prototype.pow;

    NativeBigInt.prototype.pow = function (v) {
        var n = parseValue(v);
        var a = this.value, b = n.value;
        var _0 = BigInt(0), _1 = BigInt(1), _2 = BigInt(2);
        if (b === _0) return Integer[1];
        if (a === _0) return Integer[0];
        if (a === _1) return Integer[1];
        if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
        if (n.isNegative()) return new NativeBigInt(_0);
        var x = this;
        var y = Integer[1];
        while (true) {
            if ((b & _1) === _1) {
                y = y.times(x);
                --b;
            }
            if (b === _0) break;
            b /= _2;
            x = x.square();
        }
        return y;
    };

    BigInteger.prototype.modPow = function (exp, mod) {
        exp = parseValue(exp);
        mod = parseValue(mod);
        if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
        var r = Integer[1],
            base = this.mod(mod);
        if (exp.isNegative()) {
            exp = exp.multiply(Integer[-1]);
            base = base.modInv(mod);
        }
        while (exp.isPositive()) {
            if (base.isZero()) return Integer[0];
            if (exp.isOdd()) r = r.multiply(base).mod(mod);
            exp = exp.divide(2);
            base = base.square().mod(mod);
        }
        return r;
    };
    NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger.prototype.modPow;

    function compareAbs(a, b) {
        if (a.length !== b.length) {
            return a.length > b.length ? 1 : -1;
        }
        for (var i = a.length - 1; i >= 0; i--) {
            if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
        }
        return 0;
    }

    BigInteger.prototype.compareAbs = function (v) {
        var n = parseValue(v),
            a = this.value,
            b = n.value;
        if (n.isSmall) return 1;
        return compareAbs(a, b);
    };
    SmallInteger.prototype.compareAbs = function (v) {
        var n = parseValue(v),
            a = Math.abs(this.value),
            b = n.value;
        if (n.isSmall) {
            b = Math.abs(b);
            return a === b ? 0 : a > b ? 1 : -1;
        }
        return -1;
    };
    NativeBigInt.prototype.compareAbs = function (v) {
        var a = this.value;
        var b = parseValue(v).value;
        a = a >= 0 ? a : -a;
        b = b >= 0 ? b : -b;
        return a === b ? 0 : a > b ? 1 : -1;
    };

    BigInteger.prototype.compare = function (v) {
        // See discussion about comparison with Infinity:
        // https://github.com/peterolson/BigInteger.js/issues/61
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }

        var n = parseValue(v),
            a = this.value,
            b = n.value;
        if (this.sign !== n.sign) {
            return n.sign ? 1 : -1;
        }
        if (n.isSmall) {
            return this.sign ? -1 : 1;
        }
        return compareAbs(a, b) * (this.sign ? -1 : 1);
    };
    BigInteger.prototype.compareTo = BigInteger.prototype.compare;

    SmallInteger.prototype.compare = function (v) {
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }

        var n = parseValue(v),
            a = this.value,
            b = n.value;
        if (n.isSmall) {
            return a == b ? 0 : a > b ? 1 : -1;
        }
        if (a < 0 !== n.sign) {
            return a < 0 ? -1 : 1;
        }
        return a < 0 ? 1 : -1;
    };
    SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;

    NativeBigInt.prototype.compare = function (v) {
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }
        var a = this.value;
        var b = parseValue(v).value;
        return a === b ? 0 : a > b ? 1 : -1;
    };
    NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;

    BigInteger.prototype.equals = function (v) {
        return this.compare(v) === 0;
    };
    NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;

    BigInteger.prototype.notEquals = function (v) {
        return this.compare(v) !== 0;
    };
    NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;

    BigInteger.prototype.greater = function (v) {
        return this.compare(v) > 0;
    };
    NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;

    BigInteger.prototype.lesser = function (v) {
        return this.compare(v) < 0;
    };
    NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;

    BigInteger.prototype.greaterOrEquals = function (v) {
        return this.compare(v) >= 0;
    };
    NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;

    BigInteger.prototype.lesserOrEquals = function (v) {
        return this.compare(v) <= 0;
    };
    NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;

    BigInteger.prototype.isEven = function () {
        return (this.value[0] & 1) === 0;
    };
    SmallInteger.prototype.isEven = function () {
        return (this.value & 1) === 0;
    };
    NativeBigInt.prototype.isEven = function () {
        return (this.value & BigInt(1)) === BigInt(0);
    };

    BigInteger.prototype.isOdd = function () {
        return (this.value[0] & 1) === 1;
    };
    SmallInteger.prototype.isOdd = function () {
        return (this.value & 1) === 1;
    };
    NativeBigInt.prototype.isOdd = function () {
        return (this.value & BigInt(1)) === BigInt(1);
    };

    BigInteger.prototype.isPositive = function () {
        return !this.sign;
    };
    SmallInteger.prototype.isPositive = function () {
        return this.value > 0;
    };
    NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;

    BigInteger.prototype.isNegative = function () {
        return this.sign;
    };
    SmallInteger.prototype.isNegative = function () {
        return this.value < 0;
    };
    NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;

    BigInteger.prototype.isUnit = function () {
        return false;
    };
    SmallInteger.prototype.isUnit = function () {
        return Math.abs(this.value) === 1;
    };
    NativeBigInt.prototype.isUnit = function () {
        return this.abs().value === BigInt(1);
    };

    BigInteger.prototype.isZero = function () {
        return false;
    };
    SmallInteger.prototype.isZero = function () {
        return this.value === 0;
    };
    NativeBigInt.prototype.isZero = function () {
        return this.value === BigInt(0);
    };

    BigInteger.prototype.isDivisibleBy = function (v) {
        var n = parseValue(v);
        if (n.isZero()) return false;
        if (n.isUnit()) return true;
        if (n.compareAbs(2) === 0) return this.isEven();
        return this.mod(n).isZero();
    };
    NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;

    function isBasicPrime(v) {
        var n = v.abs();
        if (n.isUnit()) return false;
        if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
        if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
        if (n.lesser(49)) return true;
        // we don't know if it's prime: let the other functions figure it out
    }

    function millerRabinTest(n, a) {
        var nPrev = n.prev(),
            b = nPrev,
            r = 0,
            d, i, x;
        while (b.isEven()) b = b.divide(2), r++;
        next: for (i = 0; i < a.length; i++) {
            if (n.lesser(a[i])) continue;
            x = bigInt(a[i]).modPow(b, n);
            if (x.isUnit() || x.equals(nPrev)) continue;
            for (d = r - 1; d != 0; d--) {
                x = x.square().mod(n);
                if (x.isUnit()) return false;
                if (x.equals(nPrev)) continue next;
            }
            return false;
        }
        return true;
    }

    // Set "strict" to true to force GRH-supported lower bound of 2*log(N)^2
    BigInteger.prototype.isPrime = function (strict) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined$1) return isPrime;
        var n = this.abs();
        var bits = n.bitLength();
        if (bits <= 64)
            return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
        var logN = Math.log(2) * bits.toJSNumber();
        var t = Math.ceil((strict === true) ? (2 * Math.pow(logN, 2)) : logN);
        for (var a = [], i = 0; i < t; i++) {
            a.push(bigInt(i + 2));
        }
        return millerRabinTest(n, a);
    };
    NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;

    BigInteger.prototype.isProbablePrime = function (iterations, rng) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined$1) return isPrime;
        var n = this.abs();
        var t = iterations === undefined$1 ? 5 : iterations;
        for (var a = [], i = 0; i < t; i++) {
            a.push(bigInt.randBetween(2, n.minus(2), rng));
        }
        return millerRabinTest(n, a);
    };
    NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;

    BigInteger.prototype.modInv = function (n) {
        var t = bigInt.zero, newT = bigInt.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
        while (!newR.isZero()) {
            q = r.divide(newR);
            lastT = t;
            lastR = r;
            t = newT;
            r = newR;
            newT = lastT.subtract(q.multiply(newT));
            newR = lastR.subtract(q.multiply(newR));
        }
        if (!r.isUnit()) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
        if (t.compare(0) === -1) {
            t = t.add(n);
        }
        if (this.isNegative()) {
            return t.negate();
        }
        return t;
    };

    NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger.prototype.modInv;

    BigInteger.prototype.next = function () {
        var value = this.value;
        if (this.sign) {
            return subtractSmall(value, 1, this.sign);
        }
        return new BigInteger(addSmall(value, 1), this.sign);
    };
    SmallInteger.prototype.next = function () {
        var value = this.value;
        if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
        return new BigInteger(MAX_INT_ARR, false);
    };
    NativeBigInt.prototype.next = function () {
        return new NativeBigInt(this.value + BigInt(1));
    };

    BigInteger.prototype.prev = function () {
        var value = this.value;
        if (this.sign) {
            return new BigInteger(addSmall(value, 1), true);
        }
        return subtractSmall(value, 1, this.sign);
    };
    SmallInteger.prototype.prev = function () {
        var value = this.value;
        if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
        return new BigInteger(MAX_INT_ARR, true);
    };
    NativeBigInt.prototype.prev = function () {
        return new NativeBigInt(this.value - BigInt(1));
    };

    var powersOfTwo = [1];
    while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
    var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];

    function shift_isSmall(n) {
        return Math.abs(n) <= BASE;
    }

    BigInteger.prototype.shiftLeft = function (v) {
        var n = parseValue(v).toJSNumber();
        if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
        }
        if (n < 0) return this.shiftRight(-n);
        var result = this;
        if (result.isZero()) return result;
        while (n >= powers2Length) {
            result = result.multiply(highestPower2);
            n -= powers2Length - 1;
        }
        return result.multiply(powersOfTwo[n]);
    };
    NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;

    BigInteger.prototype.shiftRight = function (v) {
        var remQuo;
        var n = parseValue(v).toJSNumber();
        if (!shift_isSmall(n)) {
            throw new Error(String(n) + " is too large for shifting.");
        }
        if (n < 0) return this.shiftLeft(-n);
        var result = this;
        while (n >= powers2Length) {
            if (result.isZero() || (result.isNegative() && result.isUnit())) return result;
            remQuo = divModAny(result, highestPower2);
            result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
            n -= powers2Length - 1;
        }
        remQuo = divModAny(result, powersOfTwo[n]);
        return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
    };
    NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;

    function bitwise(x, y, fn) {
        y = parseValue(y);
        var xSign = x.isNegative(), ySign = y.isNegative();
        var xRem = xSign ? x.not() : x,
            yRem = ySign ? y.not() : y;
        var xDigit = 0, yDigit = 0;
        var xDivMod = null, yDivMod = null;
        var result = [];
        while (!xRem.isZero() || !yRem.isZero()) {
            xDivMod = divModAny(xRem, highestPower2);
            xDigit = xDivMod[1].toJSNumber();
            if (xSign) {
                xDigit = highestPower2 - 1 - xDigit; // two's complement for negative numbers
            }

            yDivMod = divModAny(yRem, highestPower2);
            yDigit = yDivMod[1].toJSNumber();
            if (ySign) {
                yDigit = highestPower2 - 1 - yDigit; // two's complement for negative numbers
            }

            xRem = xDivMod[0];
            yRem = yDivMod[0];
            result.push(fn(xDigit, yDigit));
        }
        var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0);
        for (var i = result.length - 1; i >= 0; i -= 1) {
            sum = sum.multiply(highestPower2).add(bigInt(result[i]));
        }
        return sum;
    }

    BigInteger.prototype.not = function () {
        return this.negate().prev();
    };
    NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger.prototype.not;

    BigInteger.prototype.and = function (n) {
        return bitwise(this, n, function (a, b) { return a & b; });
    };
    NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger.prototype.and;

    BigInteger.prototype.or = function (n) {
        return bitwise(this, n, function (a, b) { return a | b; });
    };
    NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger.prototype.or;

    BigInteger.prototype.xor = function (n) {
        return bitwise(this, n, function (a, b) { return a ^ b; });
    };
    NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger.prototype.xor;

    var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
    function roughLOB(n) { // get lowestOneBit (rough)
        // SmallInteger: return Min(lowestOneBit(n), 1 << 30)
        // BigInteger: return Min(lowestOneBit(n), 1 << 14) [BASE=1e7]
        var v = n.value,
            x = typeof v === "number" ? v | LOBMASK_I :
                typeof v === "bigint" ? v | BigInt(LOBMASK_I) :
                    v[0] + v[1] * BASE | LOBMASK_BI;
        return x & -x;
    }

    function integerLogarithm(value, base) {
        if (base.compareTo(value) <= 0) {
            var tmp = integerLogarithm(value, base.square(base));
            var p = tmp.p;
            var e = tmp.e;
            var t = p.multiply(base);
            return t.compareTo(value) <= 0 ? { p: t, e: e * 2 + 1 } : { p: p, e: e * 2 };
        }
        return { p: bigInt(1), e: 0 };
    }

    BigInteger.prototype.bitLength = function () {
        var n = this;
        if (n.compareTo(bigInt(0)) < 0) {
            n = n.negate().subtract(bigInt(1));
        }
        if (n.compareTo(bigInt(0)) === 0) {
            return bigInt(0);
        }
        return bigInt(integerLogarithm(n, bigInt(2)).e).add(bigInt(1));
    };
    NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger.prototype.bitLength;

    function max(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.greater(b) ? a : b;
    }
    function min(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.lesser(b) ? a : b;
    }
    function gcd(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        if (a.equals(b)) return a;
        if (a.isZero()) return b;
        if (b.isZero()) return a;
        var c = Integer[1], d, t;
        while (a.isEven() && b.isEven()) {
            d = min(roughLOB(a), roughLOB(b));
            a = a.divide(d);
            b = b.divide(d);
            c = c.multiply(d);
        }
        while (a.isEven()) {
            a = a.divide(roughLOB(a));
        }
        do {
            while (b.isEven()) {
                b = b.divide(roughLOB(b));
            }
            if (a.greater(b)) {
                t = b; b = a; a = t;
            }
            b = b.subtract(a);
        } while (!b.isZero());
        return c.isUnit() ? a : a.multiply(c);
    }
    function lcm(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        return a.divide(gcd(a, b)).multiply(b);
    }
    function randBetween(a, b, rng) {
        a = parseValue(a);
        b = parseValue(b);
        var usedRNG = rng || Math.random;
        var low = min(a, b), high = max(a, b);
        var range = high.subtract(low).add(1);
        if (range.isSmall) return low.add(Math.floor(usedRNG() * range));
        var digits = toBase(range, BASE).value;
        var result = [], restricted = true;
        for (var i = 0; i < digits.length; i++) {
            var top = restricted ? digits[i] : BASE;
            var digit = truncate(usedRNG() * top);
            result.push(digit);
            if (digit < top) restricted = false;
        }
        return low.add(Integer.fromArray(result, BASE, false));
    }

    var parseBase = function (text, base, alphabet, caseSensitive) {
        alphabet = alphabet || DEFAULT_ALPHABET;
        text = String(text);
        if (!caseSensitive) {
            text = text.toLowerCase();
            alphabet = alphabet.toLowerCase();
        }
        var length = text.length;
        var i;
        var absBase = Math.abs(base);
        var alphabetValues = {};
        for (i = 0; i < alphabet.length; i++) {
            alphabetValues[alphabet[i]] = i;
        }
        for (i = 0; i < length; i++) {
            var c = text[i];
            if (c === "-") continue;
            if (c in alphabetValues) {
                if (alphabetValues[c] >= absBase) {
                    if (c === "1" && absBase === 1) continue;
                    throw new Error(c + " is not a valid digit in base " + base + ".");
                }
            }
        }
        base = parseValue(base);
        var digits = [];
        var isNegative = text[0] === "-";
        for (i = isNegative ? 1 : 0; i < text.length; i++) {
            var c = text[i];
            if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));
            else if (c === "<") {
                var start = i;
                do { i++; } while (text[i] !== ">" && i < text.length);
                digits.push(parseValue(text.slice(start + 1, i)));
            }
            else throw new Error(c + " is not a valid character");
        }
        return parseBaseFromArray(digits, base, isNegative);
    };

    function parseBaseFromArray(digits, base, isNegative) {
        var val = Integer[0], pow = Integer[1], i;
        for (i = digits.length - 1; i >= 0; i--) {
            val = val.add(digits[i].times(pow));
            pow = pow.times(base);
        }
        return isNegative ? val.negate() : val;
    }

    function stringify(digit, alphabet) {
        alphabet = alphabet || DEFAULT_ALPHABET;
        if (digit < alphabet.length) {
            return alphabet[digit];
        }
        return "<" + digit + ">";
    }

    function toBase(n, base) {
        base = bigInt(base);
        if (base.isZero()) {
            if (n.isZero()) return { value: [0], isNegative: false };
            throw new Error("Cannot convert nonzero numbers to base 0.");
        }
        if (base.equals(-1)) {
            if (n.isZero()) return { value: [0], isNegative: false };
            if (n.isNegative())
                return {
                    value: [].concat.apply([], Array.apply(null, Array(-n.toJSNumber()))
                        .map(Array.prototype.valueOf, [1, 0])
                    ),
                    isNegative: false
                };

            var arr = Array.apply(null, Array(n.toJSNumber() - 1))
                .map(Array.prototype.valueOf, [0, 1]);
            arr.unshift([1]);
            return {
                value: [].concat.apply([], arr),
                isNegative: false
            };
        }

        var neg = false;
        if (n.isNegative() && base.isPositive()) {
            neg = true;
            n = n.abs();
        }
        if (base.isUnit()) {
            if (n.isZero()) return { value: [0], isNegative: false };

            return {
                value: Array.apply(null, Array(n.toJSNumber()))
                    .map(Number.prototype.valueOf, 1),
                isNegative: neg
            };
        }
        var out = [];
        var left = n, divmod;
        while (left.isNegative() || left.compareAbs(base) >= 0) {
            divmod = left.divmod(base);
            left = divmod.quotient;
            var digit = divmod.remainder;
            if (digit.isNegative()) {
                digit = base.minus(digit).abs();
                left = left.next();
            }
            out.push(digit.toJSNumber());
        }
        out.push(left.toJSNumber());
        return { value: out.reverse(), isNegative: neg };
    }

    function toBaseString(n, base, alphabet) {
        var arr = toBase(n, base);
        return (arr.isNegative ? "-" : "") + arr.value.map(function (x) {
            return stringify(x, alphabet);
        }).join('');
    }

    BigInteger.prototype.toArray = function (radix) {
        return toBase(this, radix);
    };

    SmallInteger.prototype.toArray = function (radix) {
        return toBase(this, radix);
    };

    NativeBigInt.prototype.toArray = function (radix) {
        return toBase(this, radix);
    };

    BigInteger.prototype.toString = function (radix, alphabet) {
        if (radix === undefined$1) radix = 10;
        if (radix !== 10) return toBaseString(this, radix, alphabet);
        var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
        while (--l >= 0) {
            digit = String(v[l]);
            str += zeros.slice(digit.length) + digit;
        }
        var sign = this.sign ? "-" : "";
        return sign + str;
    };

    SmallInteger.prototype.toString = function (radix, alphabet) {
        if (radix === undefined$1) radix = 10;
        if (radix != 10) return toBaseString(this, radix, alphabet);
        return String(this.value);
    };

    NativeBigInt.prototype.toString = SmallInteger.prototype.toString;

    NativeBigInt.prototype.toJSON = BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function () { return this.toString(); };

    BigInteger.prototype.valueOf = function () {
        return parseInt(this.toString(), 10);
    };
    BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;

    SmallInteger.prototype.valueOf = function () {
        return this.value;
    };
    SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
    NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function () {
        return parseInt(this.toString(), 10);
    };

    function parseStringValue(v) {
        if (isPrecise(+v)) {
            var x = +v;
            if (x === truncate(x))
                return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
            throw new Error("Invalid integer: " + v);
        }
        var sign = v[0] === "-";
        if (sign) v = v.slice(1);
        var split = v.split(/e/i);
        if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
        if (split.length === 2) {
            var exp = split[1];
            if (exp[0] === "+") exp = exp.slice(1);
            exp = +exp;
            if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
            var text = split[0];
            var decimalPlace = text.indexOf(".");
            if (decimalPlace >= 0) {
                exp -= text.length - decimalPlace - 1;
                text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
            }
            if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
            text += (new Array(exp + 1)).join("0");
            v = text;
        }
        var isValid = /^([0-9][0-9]*)$/.test(v);
        if (!isValid) throw new Error("Invalid integer: " + v);
        if (supportsNativeBigInt) {
            return new NativeBigInt(BigInt(sign ? "-" + v : v));
        }
        var r = [], max = v.length, l = LOG_BASE, min = max - l;
        while (max > 0) {
            r.push(+v.slice(min, max));
            min -= l;
            if (min < 0) min = 0;
            max -= l;
        }
        trim(r);
        return new BigInteger(r, sign);
    }

    function parseNumberValue(v) {
        if (supportsNativeBigInt) {
            return new NativeBigInt(BigInt(v));
        }
        if (isPrecise(v)) {
            if (v !== truncate(v)) throw new Error(v + " is not an integer.");
            return new SmallInteger(v);
        }
        return parseStringValue(v.toString());
    }

    function parseValue(v) {
        if (typeof v === "number") {
            return parseNumberValue(v);
        }
        if (typeof v === "string") {
            return parseStringValue(v);
        }
        if (typeof v === "bigint") {
            return new NativeBigInt(v);
        }
        return v;
    }
    // Pre-define numbers in range [-999,999]
    for (var i = 0; i < 1000; i++) {
        Integer[i] = parseValue(i);
        if (i > 0) Integer[-i] = parseValue(-i);
    }
    // Backwards compatibility
    Integer.one = Integer[1];
    Integer.zero = Integer[0];
    Integer.minusOne = Integer[-1];
    Integer.max = max;
    Integer.min = min;
    Integer.gcd = gcd;
    Integer.lcm = lcm;
    Integer.isInstance = function (x) { return x instanceof BigInteger || x instanceof SmallInteger || x instanceof NativeBigInt; };
    Integer.randBetween = randBetween;

    Integer.fromArray = function (digits, base, isNegative) {
        return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
    };

    return Integer;
})();

// Node.js check
if ( module.hasOwnProperty("exports")) {
    module.exports = bigInt;
}
});

var Absolute = /*#__PURE__*/function () {
  function Absolute(epochNanoseconds) {
    _classCallCheck(this, Absolute);

    if ('bigint' !== typeof epochNanoseconds && !BigInteger.isInstance(epochNanoseconds)) throw RangeError('bigint required');
    var ns = BigInteger(epochNanoseconds);
    ES.RejectAbsolute(ns);
    CreateSlots(this);
    SetSlot(this, EPOCHNANOSECONDS, ns);
  }

  _createClass(Absolute, [{
    key: "getEpochSeconds",
    value: function getEpochSeconds() {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      var value = GetSlot(this, EPOCHNANOSECONDS);
      return +value.divide(1e9);
    }
  }, {
    key: "getEpochMilliseconds",
    value: function getEpochMilliseconds() {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      var value = BigInteger(GetSlot(this, EPOCHNANOSECONDS));
      return +value.divide(1e6);
    }
  }, {
    key: "getEpochMicroseconds",
    value: function getEpochMicroseconds() {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      var value = BigInteger(GetSlot(this, EPOCHNANOSECONDS));
      return value.divide(1e3).value;
    }
  }, {
    key: "getEpochNanoseconds",
    value: function getEpochNanoseconds() {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      return BigInteger(GetSlot(this, EPOCHNANOSECONDS)).value;
    }
  }, {
    key: "plus",
    value: function plus(durationLike) {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');

      var _ES$ToLimitedDuration = ES.ToLimitedDuration(durationLike, [YEARS, MONTHS]),
          days = _ES$ToLimitedDuration.days,
          hours = _ES$ToLimitedDuration.hours,
          minutes = _ES$ToLimitedDuration.minutes,
          seconds = _ES$ToLimitedDuration.seconds,
          milliseconds = _ES$ToLimitedDuration.milliseconds,
          microseconds = _ES$ToLimitedDuration.microseconds,
          nanoseconds = _ES$ToLimitedDuration.nanoseconds;

      var add = BigInteger(0);
      add = add.plus(BigInteger(nanoseconds));
      add = add.plus(BigInteger(microseconds).multiply(1e3));
      add = add.plus(BigInteger(milliseconds).multiply(1e6));
      add = add.plus(BigInteger(seconds).multiply(1e9));
      add = add.plus(BigInteger(minutes).multiply(60 * 1e9));
      add = add.plus(BigInteger(hours).multiply(60 * 60 * 1e9));
      add = add.plus(BigInteger(days).multiply(24 * 60 * 60 * 1e9));
      var ns = BigInteger(GetSlot(this, EPOCHNANOSECONDS)).plus(add);
      ES.RejectAbsolute(ns);
      var Construct = ES.SpeciesConstructor(this, Absolute);
      var result = new Construct(ns.value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "minus",
    value: function minus(durationLike) {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');

      var _ES$ToLimitedDuration2 = ES.ToLimitedDuration(durationLike, [YEARS, MONTHS]),
          days = _ES$ToLimitedDuration2.days,
          hours = _ES$ToLimitedDuration2.hours,
          minutes = _ES$ToLimitedDuration2.minutes,
          seconds = _ES$ToLimitedDuration2.seconds,
          milliseconds = _ES$ToLimitedDuration2.milliseconds,
          microseconds = _ES$ToLimitedDuration2.microseconds,
          nanoseconds = _ES$ToLimitedDuration2.nanoseconds;

      var add = BigInteger(0);
      add = add.plus(BigInteger(nanoseconds));
      add = add.plus(BigInteger(microseconds).multiply(1e3));
      add = add.plus(BigInteger(milliseconds).multiply(1e6));
      add = add.plus(BigInteger(seconds).multiply(1e9));
      add = add.plus(BigInteger(minutes).multiply(60 * 1e9));
      add = add.plus(BigInteger(hours).multiply(60 * 60 * 1e9));
      add = add.plus(BigInteger(days).multiply(24 * 60 * 60 * 1e9));
      var ns = BigInteger(GetSlot(this, EPOCHNANOSECONDS)).minus(add);
      ES.RejectAbsolute(ns);
      var Construct = ES.SpeciesConstructor(this, Absolute);
      var result = new Construct(ns.value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "difference",
    value: function difference(other, options) {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      if (!ES.IsAbsolute(other)) throw new TypeError('invalid Absolute object');
      var largestUnit = ES.ToLargestTemporalUnit(options, 'seconds', ['years', 'months']);

      var _sort = [this, other].sort(Absolute.compare),
          _sort2 = _slicedToArray(_sort, 2),
          one = _sort2[0],
          two = _sort2[1];

      var onens = GetSlot(one, EPOCHNANOSECONDS);
      var twons = GetSlot(two, EPOCHNANOSECONDS);
      var diff = twons.minus(onens);
      var ns = diff.mod(1e3);
      var us = diff.divide(1e3).mod(1e3);
      var ms = diff.divide(1e6).mod(1e3);
      var ss = diff.divide(1e9);
      var Duration = ES.GetIntrinsic('%Temporal.Duration%');

      var _ES$BalanceDuration = ES.BalanceDuration(0, 0, 0, ss, ms, us, ns, largestUnit),
          days = _ES$BalanceDuration.days,
          hours = _ES$BalanceDuration.hours,
          minutes = _ES$BalanceDuration.minutes,
          seconds = _ES$BalanceDuration.seconds,
          milliseconds = _ES$BalanceDuration.milliseconds,
          microseconds = _ES$BalanceDuration.microseconds,
          nanoseconds = _ES$BalanceDuration.nanoseconds;

      return new Duration(0, 0, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    }
  }, {
    key: "toString",
    value: function toString() {
      var timeZoneParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'UTC';
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      var timeZone = ES.ToTimeZone(timeZoneParam);
      var dateTime = timeZone.getDateTimeFor(this);
      var year = ES.ISOYearString(dateTime.year);
      var month = ES.ISODateTimePartString(dateTime.month);
      var day = ES.ISODateTimePartString(dateTime.day);
      var hour = ES.ISODateTimePartString(dateTime.hour);
      var minute = ES.ISODateTimePartString(dateTime.minute);
      var seconds = ES.ISOSecondsString(dateTime.second, dateTime.millisecond, dateTime.microsecond, dateTime.nanosecond);
      var timeZoneString = ES.ISOTimeZoneString(timeZone, this);
      var resultString = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute).concat(seconds ? ":".concat(seconds) : '').concat(timeZoneString);
      return resultString;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "inTimeZone",
    value: function inTimeZone() {
      var timeZoneParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'UTC';
      if (!ES.IsAbsolute(this)) throw new TypeError('invalid receiver');
      var timeZone = ES.ToTimeZone(timeZoneParam);
      return timeZone.getDateTimeFor(this);
    }
  }], [{
    key: "fromEpochSeconds",
    value: function fromEpochSeconds(epochSecondsParam) {
      var epochNanoseconds = BigInteger(epochSecondsParam).multiply(1e9);
      ES.RejectAbsolute(epochNanoseconds);
      var result = new this(epochNanoseconds.value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "fromEpochMilliseconds",
    value: function fromEpochMilliseconds(epochMillisecondsParam) {
      var epochNanoseconds = BigInteger(epochMillisecondsParam).multiply(1e6);
      ES.RejectAbsolute(epochNanoseconds);
      var result = new this(epochNanoseconds.value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "fromEpochMicroseconds",
    value: function fromEpochMicroseconds(epochMicroseconds) {
      var epochNanoseconds = BigInteger(epochMicroseconds).multiply(1e3);
      ES.RejectAbsolute(epochNanoseconds);
      var result = new this(epochNanoseconds.value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "fromEpochNanoseconds",
    value: function fromEpochNanoseconds(epochNanoseconds) {
      epochNanoseconds = BigInteger(epochNanoseconds);
      ES.RejectAbsolute(epochNanoseconds);
      var result = new this(epochNanoseconds.value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "from",
    value: function from(arg) {
      var absolute = ES.ToAbsolute(arg);
      if (this === Absolute) return absolute;
      var result = new this(GetSlot(absolute, EPOCHNANOSECONDS).value);
      if (!ES.IsAbsolute(result)) throw new TypeError('invalid result');
      return result;
    }
  }, {
    key: "compare",
    value: function compare(one, two) {
      if (!ES.IsAbsolute(one) || !ES.IsAbsolute(two)) throw new TypeError('invalid Absolute object');
      one = GetSlot(one, EPOCHNANOSECONDS);
      two = GetSlot(two, EPOCHNANOSECONDS);
      if (BigInteger(one).lesser(two)) return -1;
      if (BigInteger(one).greater(two)) return 1;
      return 0;
    }
  }]);

  return Absolute;
}();
Absolute.prototype.toJSON = Absolute.prototype.toString;
MakeIntrinsicClass(Absolute, 'Temporal.Absolute');

var ZONES = ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', 'Africa/Asmara', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau', 'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca', 'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti', 'Africa/Douala', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare', 'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda', 'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru', 'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome', 'Africa/Timbuktu', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek', 'America/Adak', 'America/Anchorage', 'America/Anguilla', 'America/Antigua', 'America/Araguaina', 'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/ComodRivadavia', 'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja', 'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta', 'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman', 'America/Argentina/Ushuaia', 'America/Aruba', 'America/Asuncion', 'America/Atikokan', 'America/Atka', 'America/Bahia', 'America/Bahia_Banderas', 'America/Barbados', 'America/Belem', 'America/Belize', 'America/Blanc-Sablon', 'America/Boa_Vista', 'America/Bogota', 'America/Boise', 'America/Buenos_Aires', 'America/Cambridge_Bay', 'America/Campo_Grande', 'America/Cancun', 'America/Caracas', 'America/Catamarca', 'America/Cayenne', 'America/Cayman', 'America/Chicago', 'America/Chihuahua', 'America/Coral_Harbour', 'America/Cordoba', 'America/Costa_Rica', 'America/Creston', 'America/Cuiaba', 'America/Curacao', 'America/Danmarkshavn', 'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Detroit', 'America/Dominica', 'America/Edmonton', 'America/Eirunepe', 'America/El_Salvador', 'America/Ensenada', 'America/Fort_Nelson', 'America/Fort_Wayne', 'America/Fortaleza', 'America/Glace_Bay', 'America/Godthab', 'America/Goose_Bay', 'America/Grand_Turk', 'America/Grenada', 'America/Guadeloupe', 'America/Guatemala', 'America/Guayaquil', 'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indianapolis', 'America/Inuvik', 'America/Iqaluit', 'America/Jamaica', 'America/Jujuy', 'America/Juneau', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Knox_IN', 'America/Kralendijk', 'America/La_Paz', 'America/Lima', 'America/Los_Angeles', 'America/Louisville', 'America/Lower_Princes', 'America/Maceio', 'America/Managua', 'America/Manaus', 'America/Marigot', 'America/Martinique', 'America/Matamoros', 'America/Mazatlan', 'America/Mendoza', 'America/Menominee', 'America/Merida', 'America/Metlakatla', 'America/Mexico_City', 'America/Miquelon', 'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Montreal', 'America/Montserrat', 'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Nome', 'America/Noronha', 'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/Ojinaga', 'America/Panama', 'America/Pangnirtung', 'America/Paramaribo', 'America/Phoenix', 'America/Port_of_Spain', 'America/Port-au-Prince', 'America/Porto_Acre', 'America/Porto_Velho', 'America/Puerto_Rico', 'America/Punta_Arenas', 'America/Rainy_River', 'America/Rankin_Inlet', 'America/Recife', 'America/Regina', 'America/Resolute', 'America/Rio_Branco', 'America/Rosario', 'America/Santa_Isabel', 'America/Santarem', 'America/Santiago', 'America/Santo_Domingo', 'America/Sao_Paulo', 'America/Scoresbysund', 'America/Shiprock', 'America/Sitka', 'America/St_Barthelemy', 'America/St_Johns', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas', 'America/St_Vincent', 'America/Swift_Current', 'America/Tegucigalpa', 'America/Thule', 'America/Thunder_Bay', 'America/Tijuana', 'America/Toronto', 'America/Tortola', 'America/Vancouver', 'America/Virgin', 'America/Whitehorse', 'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Macquarie', 'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/South_Pole', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'Arctic/Longyearbyen', 'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Ashgabat', 'Asia/Ashkhabad', 'Asia/Atyrau', 'Asia/Baghdad', 'Asia/Bahrain', 'Asia/Baku', 'Asia/Bangkok', 'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Calcutta', 'Asia/Chita', 'Asia/Choibalsan', 'Asia/Chongqing', 'Asia/Chungking', 'Asia/Colombo', 'Asia/Dacca', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Harbin', 'Asia/Hebron', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Istanbul', 'Asia/Jakarta', 'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kashgar', 'Asia/Kathmandu', 'Asia/Katmandu', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Asia/Kuwait', 'Asia/Macao', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila', 'Asia/Muscat', 'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom_Penh', 'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qyzylorda', 'Asia/Rangoon', 'Asia/Riyadh', 'Asia/Saigon', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Tel_Aviv', 'Asia/Thimbu', 'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ujung_Pandang', 'Asia/Ulaanbaatar', 'Asia/Ulan_Bator', 'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vientiane', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yangon', 'Asia/Yekaterinburg', 'Asia/Yerevan', 'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde', 'Atlantic/Faeroe', 'Atlantic/Faroe', 'Atlantic/Jan_Mayen', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South_Georgia', 'Atlantic/St_Helena', 'Atlantic/Stanley', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Canberra', 'Australia/Currie', 'Australia/Darwin', 'Australia/Eucla', 'Australia/Hobart', 'Australia/Lindeman', 'Australia/Lord_Howe', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney', 'Australia/Yancowinna', 'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belfast', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Busingen', 'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Helsinki', 'Europe/Isle_of_Man', 'Europe/Istanbul', 'Europe/Jersey', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon', 'Europe/Ljubljana', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow', 'Asia/Nicosia', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica', 'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara', 'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Skopje', 'Europe/Sofia', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Tiraspol', 'Europe/Ulyanovsk', 'Europe/Uzhgorod', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich', 'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos', 'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe', 'Indian/Maldives', 'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville', 'Pacific/Chatham', 'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury', 'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Johnston', 'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas', 'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk', 'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Ponape', 'Pacific/Port_Moresby', 'Pacific/Rarotonga', 'Pacific/Saipan', 'Pacific/Samoa', 'Pacific/Tahiti', 'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Truk', 'Pacific/Wake', 'Pacific/Wallis', 'Pacific/Yap', 'UTC'];

var TimeZone = /*#__PURE__*/function () {
  function TimeZone(timeZoneIdentifier) {
    _classCallCheck(this, TimeZone);

    CreateSlots(this);
    SetSlot(this, IDENTIFIER, ES.GetCanonicalTimeZoneIdentifier(timeZoneIdentifier));
  }

  _createClass(TimeZone, [{
    key: "getOffsetFor",
    value: function getOffsetFor(absolute) {
      if (!ES.IsTimeZone(this)) throw new TypeError('invalid receiver');
      if (!ES.IsAbsolute(absolute)) throw new TypeError('invalid Absolute object');
      return ES.GetTimeZoneOffsetString(GetSlot(absolute, EPOCHNANOSECONDS), GetSlot(this, IDENTIFIER));
    }
  }, {
    key: "getDateTimeFor",
    value: function getDateTimeFor(absolute) {
      if (!ES.IsTimeZone(this)) throw new TypeError('invalid receiver');
      if (!ES.IsAbsolute(absolute)) throw new TypeError('invalid Absolute object');
      var ns = GetSlot(absolute, EPOCHNANOSECONDS);

      var _ES$GetTimeZoneDateTi = ES.GetTimeZoneDateTimeParts(ns, GetSlot(this, IDENTIFIER)),
          year = _ES$GetTimeZoneDateTi.year,
          month = _ES$GetTimeZoneDateTi.month,
          day = _ES$GetTimeZoneDateTi.day,
          hour = _ES$GetTimeZoneDateTi.hour,
          minute = _ES$GetTimeZoneDateTi.minute,
          second = _ES$GetTimeZoneDateTi.second,
          millisecond = _ES$GetTimeZoneDateTi.millisecond,
          microsecond = _ES$GetTimeZoneDateTi.microsecond,
          nanosecond = _ES$GetTimeZoneDateTi.nanosecond;

      var DateTime = ES.GetIntrinsic('%Temporal.DateTime%');
      return new DateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    }
  }, {
    key: "getAbsoluteFor",
    value: function getAbsoluteFor(dateTime, options) {
      if (!ES.IsTimeZone(this)) throw new TypeError('invalid receiver');
      dateTime = ES.ToDateTime(dateTime, 'reject');
      var disambiguation = ES.ToTimeZoneDisambiguation(options);
      var Absolute = ES.GetIntrinsic('%Temporal.Absolute%');
      var _dateTime = dateTime,
          year = _dateTime.year,
          month = _dateTime.month,
          day = _dateTime.day,
          hour = _dateTime.hour,
          minute = _dateTime.minute,
          second = _dateTime.second,
          millisecond = _dateTime.millisecond,
          microsecond = _dateTime.microsecond,
          nanosecond = _dateTime.nanosecond;
      var possibleEpochNs = ES.GetTimeZoneEpochValue(GetSlot(this, IDENTIFIER), year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
      if (possibleEpochNs.length === 1) return new Absolute(possibleEpochNs[0]);

      if (possibleEpochNs.length) {
        switch (disambiguation) {
          case 'earlier':
            return new Absolute(possibleEpochNs[0]);

          case 'later':
            return new Absolute(possibleEpochNs[1]);

          case 'reject':
            {
              throw new RangeError("multiple absolute found");
            }
        }
      }

      var utcns = ES.GetEpochFromParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
      if (utcns === null) throw new RangeError('DateTime outside of supported range');
      var before = ES.GetTimeZoneOffsetNanoseconds(utcns.minus(BigInteger(86400 * 1e9)), GetSlot(this, IDENTIFIER));
      var after = ES.GetTimeZoneOffsetNanoseconds(utcns.plus(BigInteger(86400 * 1e9)), GetSlot(this, IDENTIFIER));
      var diff = ES.ToDuration({
        nanoseconds: after.minus(before)
      }, 'reject');

      switch (disambiguation) {
        case 'earlier':
          {
            var earlier = dateTime.minus(diff);
            return this.getAbsoluteFor(earlier, disambiguation);
          }

        case 'later':
          {
            var later = dateTime.plus(diff);
            return this.getAbsoluteFor(later, disambiguation);
          }

        case 'reject':
          {
            throw new RangeError("no such absolute found");
          }
      }
    }
  }, {
    key: "getTransitions",
    value: function getTransitions(startingPoint) {
      if (!ES.IsTimeZone(this)) throw new TypeError('invalid receiver');
      startingPoint = ES.ToAbsolute(startingPoint);
      var epochNanoseconds = GetSlot(startingPoint, EPOCHNANOSECONDS);
      var Absolute = ES.GetIntrinsic('%Temporal.Absolute%');
      var timeZone = GetSlot(this, IDENTIFIER);
      var result = {
        next: function next() {
          epochNanoseconds = ES.GetTimeZoneNextTransition(epochNanoseconds, timeZone);
          var done = epochNanoseconds === null;
          var value = epochNanoseconds === null ? null : new Absolute(epochNanoseconds);
          return {
            done: done,
            value: value
          };
        }
      };

      if (typeof Symbol === 'function') {
        result[Symbol.iterator] = function () {
          return result;
        };
      }

      return result;
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!ES.IsTimeZone(this)) throw new TypeError('invalid receiver');
      return this.name;
    }
  }, {
    key: "name",
    get: function get() {
      if (!ES.IsTimeZone(this)) throw new TypeError('invalid receiver');
      return String(GetSlot(this, IDENTIFIER));
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var result = ES.ToTimeZone(arg);
      return this === TimeZone ? result : new this(GetSlot(result, IDENTIFIER));
    }
  }]);

  return TimeZone;
}();
TimeZone.prototype.toJSON = TimeZone.prototype.toString;

if ('undefined' !== typeof Symbol) {
  TimeZone[Symbol.iterator] = function () {
    var iter = ZONES[Symbol.iterator]();
    return {
      next: function next() {
        while (true) {
          // eslint-disable-line no-constant-condition
          var _iter$next = iter.next(),
              value = _iter$next.value,
              done = _iter$next.done;

          if (done) return {
            done: done
          };

          try {
            value = new TimeZone(value);
            done = false;
            return {
              done: done,
              value: value
            };
          } catch (ex) {
            continue;
          }
        }
      }
    };
  };
}

MakeIntrinsicClass(TimeZone, 'Temporal.TimeZone');

var Duration = /*#__PURE__*/function () {
  function Duration() {
    var years = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var months = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var hours = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var minutes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var seconds = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var milliseconds = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var microseconds = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var nanoseconds = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;

    _classCallCheck(this, Duration);

    years = ES.ToInteger(years);
    months = ES.ToInteger(months);
    days = ES.ToInteger(days);
    hours = ES.ToInteger(hours);
    minutes = ES.ToInteger(minutes);
    seconds = ES.ToInteger(seconds);
    milliseconds = ES.ToInteger(milliseconds);
    microseconds = ES.ToInteger(microseconds);
    nanoseconds = ES.ToInteger(nanoseconds);

    for (var _i = 0, _arr = [years, months, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds]; _i < _arr.length; _i++) {
      var prop = _arr[_i];
      if (prop < 0) throw new RangeError('negative values not allowed as duration fields');
      if (!Number.isFinite(prop)) throw new RangeError('infinite values not allowed as duration fields');
    }

    CreateSlots(this);
    SetSlot(this, YEARS, years);
    SetSlot(this, MONTHS, months);
    SetSlot(this, DAYS, days);
    SetSlot(this, HOURS, hours);
    SetSlot(this, MINUTES, minutes);
    SetSlot(this, SECONDS, seconds);
    SetSlot(this, MILLISECONDS, milliseconds);
    SetSlot(this, MICROSECONDS, microseconds);
    SetSlot(this, NANOSECONDS, nanoseconds);
  }

  _createClass(Duration, [{
    key: "toString",
    value: function toString() {
      function formatNumber(num) {
        if (num <= Number.MAX_SAFE_INTEGER) return num.toString(10);
        return BigInteger(num).toString();
      }

      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      var dateParts = [];
      if (GetSlot(this, YEARS)) dateParts.push("".concat(formatNumber(GetSlot(this, YEARS)), "Y"));
      if (GetSlot(this, MONTHS)) dateParts.push("".concat(formatNumber(GetSlot(this, MONTHS)), "M"));
      if (GetSlot(this, DAYS)) dateParts.push("".concat(formatNumber(GetSlot(this, DAYS)), "D"));
      var timeParts = [];
      if (GetSlot(this, HOURS)) timeParts.push("".concat(formatNumber(GetSlot(this, HOURS)), "H"));
      if (GetSlot(this, MINUTES)) timeParts.push("".concat(formatNumber(GetSlot(this, MINUTES)), "M"));
      var secondParts = [];
      var ms = GetSlot(this, MILLISECONDS);
      var µs = GetSlot(this, MICROSECONDS);
      var ns = GetSlot(this, NANOSECONDS);
      var seconds;

      var _ES$BalanceSubSecond = ES.BalanceSubSecond(ms, µs, ns);

      seconds = _ES$BalanceSubSecond.seconds;
      ms = _ES$BalanceSubSecond.millisecond;
      µs = _ES$BalanceSubSecond.microsecond;
      ns = _ES$BalanceSubSecond.nanosecond;
      var s = GetSlot(this, SECONDS) + seconds;
      if (ns) secondParts.unshift("".concat(ns).padStart(3, '0'));
      if (µs || secondParts.length) secondParts.unshift("".concat(µs).padStart(3, '0'));
      if (ms || secondParts.length) secondParts.unshift("".concat(ms).padStart(3, '0'));
      if (secondParts.length) secondParts.unshift('.');
      if (s || secondParts.length) secondParts.unshift(formatNumber(s));
      if (secondParts.length) timeParts.push("".concat(secondParts.join(''), "S"));
      if (timeParts.length) timeParts.unshift('T');
      if (!dateParts.length && !timeParts.length) return 'PT0S';
      return "P".concat(dateParts.join('')).concat(timeParts.join(''));
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(Intl.DateTimeFormat, args).format(this);
    }
  }, {
    key: "years",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, YEARS);
    }
  }, {
    key: "months",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MONTHS);
    }
  }, {
    key: "days",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, DAYS);
    }
  }, {
    key: "hours",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, HOURS);
    }
  }, {
    key: "minutes",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MINUTES);
    }
  }, {
    key: "seconds",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, SECONDS);
    }
  }, {
    key: "milliseconds",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MILLISECONDS);
    }
  }, {
    key: "microseconds",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, MICROSECONDS);
    }
  }, {
    key: "nanoseconds",
    get: function get() {
      if (!ES.IsDuration(this)) throw new TypeError('invalid receiver');
      return GetSlot(this, NANOSECONDS);
    }
  }], [{
    key: "from",
    value: function from(arg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var disambiguation = ES.ToDisambiguation(options);
      var result = ES.ToDuration(arg, disambiguation);
      return this === Duration ? result : new this(GetSlot(result, YEARS), GetSlot(result, MONTHS), GetSlot(result, DAYS), GetSlot(result, HOURS), GetSlot(result, MINUTES), GetSlot(result, SECONDS), GetSlot(result, MILLISECONDS), GetSlot(result, MICROSECONDS), GetSlot(result, NANOSECONDS));
    }
  }]);

  return Duration;
}();
Duration.prototype.toJSON = Duration.prototype.toString;
MakeIntrinsicClass(Duration, 'Temporal.Duration');

var yearpart = /(?:[+-]\d{6}|\d{4})/;
var datesplit = new RegExp("(".concat(yearpart.source, ")-(\\d{2})-(\\d{2})"));
var timesplit = /(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3})(\d{3})?(\d{3})?)?)?/;
var zonesplit = /(?:(Z)|(?:([+-]\d{2})(?::?(\d{2}))?(?:\[([^\]\s]+)\])?))/;
var absolute = new RegExp("^".concat(datesplit.source, "(?:T|\\s+)").concat(timesplit.source).concat(zonesplit.source, "$"));
var datetime = new RegExp("^".concat(datesplit.source, "(?:(?:T|\\s+)").concat(timesplit.source, "(?:").concat(zonesplit.source, ")?)?$"));
var time = new RegExp("^".concat(timesplit.source, "(?:").concat(zonesplit.source, ")?$"));
var yearmonth = new RegExp("^(".concat(yearpart.source, ")-(\\d{2})$"));
var monthday = /^(\d{2})-(\d{2})$/;
var offset = /([+-])([0-2][0-9])(?::?([0-5][0-9]))?/;
var duration = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d{3})(\d{3})?(\d{3})?)?S)?)?/;

var IntlDateTimeFormat = Intl.DateTimeFormat;
var DAYMILLIS = 86400000;
var NS_MIN = BigInteger(-86400).multiply(1e17);
var NS_MAX = BigInteger(86400).multiply(1e17);
var YEAR_MIN = -271821;
var YEAR_MAX = 275760;
var INTRINSICS$1 = {
  '%Temporal.DateTime%': DateTime,
  '%Temporal.Date%': Date$1,
  '%Temporal.YearMonth%': YearMonth,
  '%Temporal.MonthDay%': MonthDay,
  '%Temporal.Time%': Time,
  '%Temporal.TimeZone%': TimeZone,
  '%Temporal.Absolute%': Absolute,
  '%Temporal.Duration%': Duration
};
var ES = assign(assign({}, es2019), {
  IsAbsolute: function IsAbsolute(item) {
    return HasSlot(item, EPOCHNANOSECONDS);
  },
  IsTimeZone: function IsTimeZone(item) {
    return HasSlot(item, IDENTIFIER);
  },
  IsDuration: function IsDuration(item) {
    return HasSlot(item, YEARS, MONTHS, DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS);
  },
  IsDate: function IsDate(item) {
    return HasSlot(item, YEAR, MONTH, DAY) && !HasSlot(item, HOUR, MINUTE, SECOND, MILLISECOND, MICROSECOND, NANOSECOND);
  },
  IsTime: function IsTime(item) {
    return HasSlot(item, HOUR, MINUTE, SECOND, MILLISECOND, MICROSECOND, NANOSECOND) && !HasSlot(item, YEAR, MONTH, DAY);
  },
  IsDateTime: function IsDateTime(item) {
    return HasSlot(item, YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, MILLISECOND, MICROSECOND, NANOSECOND);
  },
  IsYearMonth: function IsYearMonth(item) {
    return HasSlot(item, YEAR, MONTH) && !HasSlot(item, DAY);
  },
  IsMonthDay: function IsMonthDay(item) {
    return HasSlot(item, MONTH, DAY) && !HasSlot(item, YEAR);
  },
  ToTimeZone: function ToTimeZone(item) {
    if (ES.IsTimeZone(item)) return item;
    var stringIdent = ES.ToString(item);

    var _ES$ParseTimeZoneStri = ES.ParseTimeZoneString(stringIdent),
        zone = _ES$ParseTimeZoneStri.zone,
        ianaName = _ES$ParseTimeZoneStri.ianaName,
        offset = _ES$ParseTimeZoneStri.offset;

    var result = new TimeZone(zone);

    if (offset && ianaName) {
      var absolute = Absolute.from(stringIdent);

      if (result.getOffsetFor(absolute) !== offset) {
        throw new RangeError("invalid offset ".concat(offset, "[").concat(ianaName, "]"));
      }
    }

    return result;
  },
  ParseISODateTime: function ParseISODateTime(isoString, _ref) {
    var zoneRequired = _ref.zoneRequired;
    var regex = zoneRequired ? absolute : datetime;
    var match = regex.exec(isoString);
    if (!match) throw new RangeError("invalid ISO 8601 string: ".concat(isoString));
    var year = ES.ToInteger(match[1]);
    var month = ES.ToInteger(match[2]);
    var day = ES.ToInteger(match[3]);
    var hour = ES.ToInteger(match[4]);
    var minute = ES.ToInteger(match[5]);
    var second = ES.ToInteger(match[6]);
    if (second === 60) second = 59;
    var millisecond = ES.ToInteger(match[7]);
    var microsecond = ES.ToInteger(match[8]);
    var nanosecond = ES.ToInteger(match[9]);
    var offset = "".concat(match[11], ":").concat(match[12] || '00');
    var ianaName = match[13];
    if (ianaName) ianaName = ES.GetCanonicalTimeZoneIdentifier(ianaName).toString();
    var zone = match[10] ? 'UTC' : ianaName || offset;
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond,
      zone: zone,
      ianaName: ianaName,
      offset: offset
    };
  },
  ParseAbsoluteString: function ParseAbsoluteString(isoString) {
    return ES.ParseISODateTime(isoString, {
      zoneRequired: true
    });
  },
  ParseDateTimeString: function ParseDateTimeString(isoString) {
    return ES.ParseISODateTime(isoString, {
      zoneRequired: false
    });
  },
  ParseDateString: function ParseDateString(isoString) {
    return ES.ParseISODateTime(isoString, {
      zoneRequired: false
    });
  },
  ParseTimeString: function ParseTimeString(isoString) {
    var match = time.exec(isoString);
    var hour, minute, second, millisecond, microsecond, nanosecond;

    if (match) {
      hour = ES.ToInteger(match[1]);
      minute = ES.ToInteger(match[2]);
      second = ES.ToInteger(match[3]);
      if (second === 60) second = 59;
      millisecond = ES.ToInteger(match[4]);
      microsecond = ES.ToInteger(match[5]);
      nanosecond = ES.ToInteger(match[6]);
    } else {
      var _ES$ParseISODateTime = ES.ParseISODateTime(isoString, {
        zoneRequired: false
      });

      hour = _ES$ParseISODateTime.hour;
      minute = _ES$ParseISODateTime.minute;
      second = _ES$ParseISODateTime.second;
      millisecond = _ES$ParseISODateTime.millisecond;
      microsecond = _ES$ParseISODateTime.microsecond;
      nanosecond = _ES$ParseISODateTime.nanosecond;
    }

    return {
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  ParseYearMonthString: function ParseYearMonthString(isoString) {
    var match = yearmonth.exec(isoString);
    var year, month;

    if (match) {
      year = ES.ToInteger(match[1]);
      month = ES.ToInteger(match[2]);
    } else {
      var _ES$ParseISODateTime2 = ES.ParseISODateTime(isoString, {
        zoneRequired: false
      });

      year = _ES$ParseISODateTime2.year;
      month = _ES$ParseISODateTime2.month;
    }

    return {
      year: year,
      month: month
    };
  },
  ParseMonthDayString: function ParseMonthDayString(isoString) {
    var match = monthday.exec(isoString);
    var month, day;

    if (match) {
      month = ES.ToInteger(match[1]);
      day = ES.ToInteger(match[2]);
    } else {
      var _ES$ParseISODateTime3 = ES.ParseISODateTime(isoString, {
        zoneRequired: false
      });

      month = _ES$ParseISODateTime3.month;
      day = _ES$ParseISODateTime3.day;
    }

    return {
      month: month,
      day: day
    };
  },
  ParseTimeZoneString: function ParseTimeZoneString(stringIdent) {
    try {
      var canonicalIdent = ES.GetCanonicalTimeZoneIdentifier(stringIdent);
      if (canonicalIdent) return {
        zone: canonicalIdent.toString()
      };
    } catch (_unused) {} // fall through
    // Try parsing ISO string instead


    return ES.ParseISODateTime(stringIdent, {
      zoneRequired: true
    });
  },
  ParseDurationString: function ParseDurationString(isoString) {
    var match = duration.exec(isoString);
    if (!match) throw new RangeError("invalid duration: ".concat(isoString));
    var years = ES.ToInteger(match[1]);
    var months = ES.ToInteger(match[2]);
    var days = ES.ToInteger(match[3]);
    var hours = ES.ToInteger(match[4]);
    var minutes = ES.ToInteger(match[5]);
    var seconds = ES.ToInteger(match[6]);
    var milliseconds = ES.ToInteger(match[7]);
    var microseconds = ES.ToInteger(match[8]);
    var nanoseconds = ES.ToInteger(match[9]);
    return {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
      microseconds: microseconds,
      nanoseconds: nanoseconds
    };
  },
  ToAbsolute: function ToAbsolute(item) {
    if (ES.IsAbsolute(item)) return item;
    var isoString = ES.ToString(item);

    var _ES$ParseAbsoluteStri = ES.ParseAbsoluteString(isoString),
        zone = _ES$ParseAbsoluteStri.zone,
        props = _objectWithoutProperties(_ES$ParseAbsoluteStri, ["zone"]);

    var datetime = ES.ToDateTime(props, 'reject');
    return datetime.inTimeZone(zone, 'reject');
  },
  ToDateTime: function ToDateTime(item, disambiguation) {
    if (ES.IsDateTime(item)) return item;
    var props = ES.ValidDateTimeFrom(item, ['year', 'month', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond']);

    if (!props) {
      var isoString = ES.ToString(item);
      props = ES.ParseDateTimeString(isoString);
    }

    var _props = props,
        _props$hour = _props.hour,
        hour = _props$hour === void 0 ? 0 : _props$hour,
        day = _props.day,
        _props$microsecond = _props.microsecond,
        microsecond = _props$microsecond === void 0 ? 0 : _props$microsecond,
        _props$millisecond = _props.millisecond,
        millisecond = _props$millisecond === void 0 ? 0 : _props$millisecond,
        _props$minute = _props.minute,
        minute = _props$minute === void 0 ? 0 : _props$minute,
        month = _props.month,
        _props$nanosecond = _props.nanosecond,
        nanosecond = _props$nanosecond === void 0 ? 0 : _props$nanosecond,
        _props$second = _props.second,
        second = _props$second === void 0 ? 0 : _props$second,
        year = _props.year;

    var _ES$RegulateDateTime = ES.RegulateDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, disambiguation);

    year = _ES$RegulateDateTime.year;
    month = _ES$RegulateDateTime.month;
    day = _ES$RegulateDateTime.day;
    hour = _ES$RegulateDateTime.hour;
    minute = _ES$RegulateDateTime.minute;
    second = _ES$RegulateDateTime.second;
    millisecond = _ES$RegulateDateTime.millisecond;
    microsecond = _ES$RegulateDateTime.microsecond;
    nanosecond = _ES$RegulateDateTime.nanosecond;
    return new DateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  },
  RegulateDateTime: function RegulateDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, disambiguation) {
    switch (disambiguation) {
      case 'reject':
        ES.RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
        break;

      case 'constrain':
        var _ES$ConstrainDateTime = ES.ConstrainDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);

        year = _ES$ConstrainDateTime.year;
        month = _ES$ConstrainDateTime.month;
        day = _ES$ConstrainDateTime.day;
        hour = _ES$ConstrainDateTime.hour;
        minute = _ES$ConstrainDateTime.minute;
        second = _ES$ConstrainDateTime.second;
        millisecond = _ES$ConstrainDateTime.millisecond;
        microsecond = _ES$ConstrainDateTime.microsecond;
        nanosecond = _ES$ConstrainDateTime.nanosecond;
        break;

      case 'balance':
        {
          var deltaDays;

          var _ES$BalanceTime = ES.BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);

          deltaDays = _ES$BalanceTime.deltaDays;
          hour = _ES$BalanceTime.hour;
          minute = _ES$BalanceTime.minute;
          second = _ES$BalanceTime.second;
          millisecond = _ES$BalanceTime.millisecond;
          microsecond = _ES$BalanceTime.microsecond;
          nanosecond = _ES$BalanceTime.nanosecond;

          var _ES$BalanceDate = ES.BalanceDate(year, month, day + deltaDays);

          year = _ES$BalanceDate.year;
          month = _ES$BalanceDate.month;
          day = _ES$BalanceDate.day;
          // Still rejected if balanced DateTime is outside valid range
          ES.RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
          break;
        }
    }

    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  ToDate: function ToDate(item, disambiguation) {
    if (ES.IsDate(item)) return item;
    var props = ES.ValidDateTimeFrom(item, ['year', 'month', 'day']);

    if (!props) {
      var isoString = ES.ToString(item);
      props = ES.ParseDateString(isoString);
    }

    var _props2 = props,
        day = _props2.day,
        month = _props2.month,
        year = _props2.year;

    var _ES$RegulateDate = ES.RegulateDate(year, month, day, disambiguation);

    year = _ES$RegulateDate.year;
    month = _ES$RegulateDate.month;
    day = _ES$RegulateDate.day;
    return new Date$1(year, month, day);
  },
  RegulateDate: function RegulateDate(year, month, day, disambiguation) {
    switch (disambiguation) {
      case 'reject':
        ES.RejectDate(year, month, day);
        break;

      case 'constrain':
        var _ES$ConstrainDate = ES.ConstrainDate(year, month, day);

        year = _ES$ConstrainDate.year;
        month = _ES$ConstrainDate.month;
        day = _ES$ConstrainDate.day;
        break;

      case 'balance':
        var _ES$BalanceDate2 = ES.BalanceDate(year, month, day);

        year = _ES$BalanceDate2.year;
        month = _ES$BalanceDate2.month;
        day = _ES$BalanceDate2.day;
        // Still rejected if balanced Date is outside valid range
        ES.RejectDate(year, month, day);
        break;
    }

    return {
      year: year,
      month: month,
      day: day
    };
  },
  ToTime: function ToTime(item, disambiguation) {
    if (ES.IsTime(item)) return item;
    var props = ES.ValidDateTimeFrom(item, [], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond']);

    if (!props) {
      var isoString = ES.ToString(item);
      props = ES.ParseTimeString(isoString);
    }

    var _props3 = props,
        _props3$hour = _props3.hour,
        hour = _props3$hour === void 0 ? 0 : _props3$hour,
        _props3$microsecond = _props3.microsecond,
        microsecond = _props3$microsecond === void 0 ? 0 : _props3$microsecond,
        _props3$millisecond = _props3.millisecond,
        millisecond = _props3$millisecond === void 0 ? 0 : _props3$millisecond,
        _props3$minute = _props3.minute,
        minute = _props3$minute === void 0 ? 0 : _props3$minute,
        _props3$nanosecond = _props3.nanosecond,
        nanosecond = _props3$nanosecond === void 0 ? 0 : _props3$nanosecond,
        _props3$second = _props3.second,
        second = _props3$second === void 0 ? 0 : _props3$second;

    switch (disambiguation) {
      case 'reject':
        ES.RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
        break;

      case 'constrain':
        var _ES$ConstrainTime = ES.ConstrainTime(hour, minute, second, millisecond, microsecond, nanosecond);

        hour = _ES$ConstrainTime.hour;
        minute = _ES$ConstrainTime.minute;
        second = _ES$ConstrainTime.second;
        millisecond = _ES$ConstrainTime.millisecond;
        microsecond = _ES$ConstrainTime.microsecond;
        nanosecond = _ES$ConstrainTime.nanosecond;
        break;

      case 'balance':
        var _ES$BalanceTime2 = ES.BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);

        hour = _ES$BalanceTime2.hour;
        minute = _ES$BalanceTime2.minute;
        second = _ES$BalanceTime2.second;
        millisecond = _ES$BalanceTime2.millisecond;
        microsecond = _ES$BalanceTime2.microsecond;
        nanosecond = _ES$BalanceTime2.nanosecond;
        break;
    }

    return new Time(hour, minute, second, millisecond, microsecond, nanosecond);
  },
  ToYearMonth: function ToYearMonth(item, disambiguation) {
    if (ES.IsYearMonth(item)) return item;
    var props = ES.ValidDateTimeFrom(item, ['year', 'month']);

    if (!props) {
      var isoString = ES.ToString(item);
      props = ES.ParseYearMonthString(isoString);
    }

    var _props4 = props,
        month = _props4.month,
        year = _props4.year;

    switch (disambiguation) {
      case 'reject':
        ES.RejectYearMonth(year, month);
        break;

      case 'constrain':
        var _ES$ConstrainYearMont = ES.ConstrainYearMonth(year, month);

        year = _ES$ConstrainYearMont.year;
        month = _ES$ConstrainYearMont.month;
        break;

      case 'balance':
        var _ES$BalanceYearMonth = ES.BalanceYearMonth(year, month);

        year = _ES$BalanceYearMonth.year;
        month = _ES$BalanceYearMonth.month;
        // Still rejected if balanced YearMonth is outside valid range
        ES.RejectYearMonth(year, month);
        break;
    }

    return new YearMonth(year, month);
  },
  ToMonthDay: function ToMonthDay(item, disambiguation) {
    if (ES.IsMonthDay(item)) return item;
    var props = ES.ValidDateTimeFrom(item, ['month', 'day']);

    if (!props) {
      var isoString = ES.ToString(item);
      props = ES.ParseMonthDayString(isoString);
    }

    var _props5 = props,
        day = _props5.day,
        month = _props5.month;
    var leapYear = 1972;

    switch (disambiguation) {
      case 'reject':
        ES.RejectDate(leapYear, month, day);
        break;

      case 'constrain':
        var _ES$ConstrainDate2 = ES.ConstrainDate(leapYear, month, day);

        month = _ES$ConstrainDate2.month;
        day = _ES$ConstrainDate2.day;
        break;

      case 'balance':
        var _ES$BalanceDate3 = ES.BalanceDate(leapYear, month, day);

        month = _ES$BalanceDate3.month;
        day = _ES$BalanceDate3.day;
        break;
    }

    return new MonthDay(month, day);
  },
  ToDuration: function ToDuration(item, disambiguation) {
    if (ES.IsDuration(item)) return item;
    var props = ES.ValidPropertyBag(item, ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds']);

    if (!props) {
      var isoString = ES.ToString(item);
      props = ES.ParseDurationString(isoString);
    }

    var _props6 = props,
        _props6$days = _props6.days,
        days = _props6$days === void 0 ? 0 : _props6$days,
        _props6$hours = _props6.hours,
        hours = _props6$hours === void 0 ? 0 : _props6$hours,
        _props6$microseconds = _props6.microseconds,
        microseconds = _props6$microseconds === void 0 ? 0 : _props6$microseconds,
        _props6$milliseconds = _props6.milliseconds,
        milliseconds = _props6$milliseconds === void 0 ? 0 : _props6$milliseconds,
        _props6$minutes = _props6.minutes,
        minutes = _props6$minutes === void 0 ? 0 : _props6$minutes,
        _props6$months = _props6.months,
        months = _props6$months === void 0 ? 0 : _props6$months,
        _props6$nanoseconds = _props6.nanoseconds,
        nanoseconds = _props6$nanoseconds === void 0 ? 0 : _props6$nanoseconds,
        _props6$seconds = _props6.seconds,
        seconds = _props6$seconds === void 0 ? 0 : _props6$seconds,
        _props6$years = _props6.years,
        years = _props6$years === void 0 ? 0 : _props6$years;

    switch (disambiguation) {
      case 'reject':
        for (var _i = 0, _arr = [years, months, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds]; _i < _arr.length; _i++) {
          var prop = _arr[_i];
          if (prop < 0) throw new RangeError('negative values not allowed as duration fields');
          if (!Number.isFinite(prop)) throw new RangeError('infinite values not allowed as duration fields');
        }

        break;

      case 'constrain':
        {
          var arr = [years, months, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds];

          for (var idx in arr) {
            if (arr[idx] < 0) arr[idx] = -arr[idx];
            if (!Number.isFinite(arr[idx])) arr[idx] = Number.MAX_VALUE;
          }

          years = arr[0];
          months = arr[1];
          days = arr[2];
          hours = arr[3];
          minutes = arr[4];
          seconds = arr[5];
          milliseconds = arr[6];
          microseconds = arr[7];
          nanoseconds = arr[8];
          break;
        }

      case 'balance':
        {
          var _ES$BalanceDuration = ES.BalanceDuration(0, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, 'hours');

          hours = _ES$BalanceDuration.hours;
          minutes = _ES$BalanceDuration.minutes;
          seconds = _ES$BalanceDuration.seconds;
          milliseconds = _ES$BalanceDuration.milliseconds;
          microseconds = _ES$BalanceDuration.microseconds;
          nanoseconds = _ES$BalanceDuration.nanoseconds;

          for (var _i2 = 0, _arr2 = [years, months, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds]; _i2 < _arr2.length; _i2++) {
            var _prop = _arr2[_i2];
            if (!Number.isFinite(_prop)) throw new RangeError('infinite values not allowed as duration fields');
          }

          break;
        }
    }

    return new Duration(years, months, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  },
  ToLimitedDuration: function ToLimitedDuration(item) {
    var disallowedSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var duration = ES.ToDuration(item, 'reject');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = disallowedSlots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var slot = _step.value;

        if (GetSlot(duration, slot) !== 0) {
          throw new RangeError("invalid duration field ".concat(slot));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return duration;
  },
  ToDisambiguation: function ToDisambiguation(options) {
    return ES.GetOption(options, 'disambiguation', ['constrain', 'balance', 'reject'], 'constrain');
  },
  ToArithmeticDisambiguation: function ToArithmeticDisambiguation(options) {
    return ES.GetOption(options, 'disambiguation', ['constrain', 'reject'], 'constrain');
  },
  ToTimeZoneDisambiguation: function ToTimeZoneDisambiguation(options) {
    return ES.GetOption(options, 'disambiguation', ['earlier', 'later', 'reject'], 'earlier');
  },
  ToLargestTemporalUnit: function ToLargestTemporalUnit(options, fallback) {
    var disallowedStrings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var largestUnit = ES.GetOption(options, 'largestUnit', ['years', 'months', 'days', 'hours', 'minutes', 'seconds'], fallback);

    if (disallowedStrings.includes(largestUnit)) {
      throw new RangeError("".concat(largestUnit, " not allowed as the largest unit here"));
    }

    return largestUnit;
  },
  GetIntrinsic: function GetIntrinsic$1(intrinsic) {
    return intrinsic in INTRINSICS$1 ? INTRINSICS$1[intrinsic] : GetIntrinsic(intrinsic);
  },
  ValidPropertyBag: function ValidPropertyBag(bag) {
    var anyof = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!bag || 'object' !== _typeof(bag)) return false;
    var any;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = anyof[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var prop = _step2.value;

        if (prop in bag) {
          var value = ES.ToNumber(bag[prop]);

          if (Number.isFinite(value)) {
            any = any || {};
            any[prop] = value;
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return any ? any : false;
  },
  ValidDateTimeFrom: function ValidDateTimeFrom(bag, required) {
    var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (!bag || 'object' !== _typeof(bag)) return false;
    var result = {};
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = required[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var prop = _step3.value;

        if (!(prop in bag) || typeof bag[prop] === 'undefined') {
          throw new TypeError("required property '".concat(prop, "' missing or undefined"));
        }

        result[prop] = ES.ToNumber(bag[prop]);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = optional[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _prop2 = _step4.value;

        if (_prop2 in bag) {
          var value = ES.ToNumber(bag[_prop2]);
          if (Number.isFinite(value)) result[_prop2] = value;
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return result;
  },
  ISOTimeZoneString: function ISOTimeZoneString(timeZone, absolute) {
    var offset = timeZone.getOffsetFor(absolute);
    var timeZoneString;

    switch (true) {
      case 'UTC' === timeZone.name:
        timeZoneString = 'Z';
        break;

      case timeZone.name === offset:
        timeZoneString = offset;
        break;

      default:
        timeZoneString = "".concat(offset, "[").concat(timeZone.name, "]");
        break;
    }

    return timeZoneString;
  },
  ISOYearString: function ISOYearString(year) {
    var yearString;

    if (year < 1000 || year > 9999) {
      var sign = year < 0 ? '-' : '+';
      var yearNumber = Math.abs(year);
      yearString = sign + "000000".concat(yearNumber).slice(-6);
    } else {
      yearString = "".concat(year);
    }

    return yearString;
  },
  ISODateTimePartString: function ISODateTimePartString(part) {
    return "00".concat(part).slice(-2);
  },
  ISOSecondsString: function ISOSecondsString(seconds, millis, micros, nanos) {
    if (!seconds && !millis && !micros && !nanos) return '';
    var parts = [];
    if (nanos) parts.unshift("000".concat(nanos || 0).slice(-3));
    if (micros || parts.length) parts.unshift("000".concat(micros || 0).slice(-3));
    if (millis || parts.length) parts.unshift("000".concat(millis || 0).slice(-3));
    var secs = "00".concat(seconds).slice(-2);
    var post = parts.length ? ".".concat(parts.join('')) : '';
    return "".concat(secs).concat(post);
  },
  GetCanonicalTimeZoneIdentifier: function GetCanonicalTimeZoneIdentifier(timeZoneIdentifier) {
    var offset = parseOffsetString(timeZoneIdentifier);
    if (offset !== null) return makeOffsetString(offset);
    var formatter = new IntlDateTimeFormat('en-us', {
      timeZone: String(timeZoneIdentifier),
      hour12: false,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    formatter.toString = tzIdent;
    return formatter;
  },
  GetTimeZoneOffsetNanoseconds: function GetTimeZoneOffsetNanoseconds(epochNanoseconds, timeZone) {
    var offset = parseOffsetString("".concat(timeZone));
    if (offset !== null) return BigInteger(offset).multiply(1e6);

    var _ES$GetTimeZoneDateTi = ES.GetTimeZoneDateTimeParts(epochNanoseconds, timeZone),
        year = _ES$GetTimeZoneDateTi.year,
        month = _ES$GetTimeZoneDateTi.month,
        day = _ES$GetTimeZoneDateTi.day,
        hour = _ES$GetTimeZoneDateTi.hour,
        minute = _ES$GetTimeZoneDateTi.minute,
        second = _ES$GetTimeZoneDateTi.second,
        millisecond = _ES$GetTimeZoneDateTi.millisecond,
        microsecond = _ES$GetTimeZoneDateTi.microsecond,
        nanosecond = _ES$GetTimeZoneDateTi.nanosecond;

    var utc = ES.GetEpochFromParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    if (utc === null) throw new RangeError('Date outside of supported range');
    return utc.minus(epochNanoseconds);
  },
  GetTimeZoneOffsetString: function GetTimeZoneOffsetString(epochNanoseconds, timeZone) {
    var offsetNanos = BigInteger(ES.GetTimeZoneOffsetNanoseconds(epochNanoseconds, timeZone));
    var offsetString = makeOffsetString(offsetNanos.divide(1e6));
    return offsetString;
  },
  GetEpochFromParts: function GetEpochFromParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    var ms = Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
    if (Number.isNaN(ms)) return null; // Date.UTC interprets one and two-digit years as being in the 20th century

    if (year >= 0 && year < 100) ms = new Date(ms).setUTCFullYear(year);
    var ns = BigInteger(ms).multiply(1e6);
    ns = ns.plus(BigInteger(microsecond).multiply(1e3));
    ns = ns.plus(BigInteger(nanosecond));
    if (ns.lesser(NS_MIN) || ns.greater(NS_MAX)) return null;
    return ns;
  },
  GetTimeZoneDateTimeParts: function GetTimeZoneDateTimeParts(epochNanoseconds, timeZone) {
    var offset = parseOffsetString(timeZone);
    var nanos = BigInteger(epochNanoseconds).mod(1e9);
    var epochMilliseconds = BigInteger(epochNanoseconds).divide(1e9).multiply(1e3).plus(Math.floor(nanos / 1e6));
    nanos = +((epochNanoseconds < 0 ? 1e9 : 0) + nanos);
    var millisecond = Math.floor(nanos / 1e6) % 1e3;
    var microsecond = Math.floor(nanos / 1e3) % 1e3;
    var nanosecond = Math.floor(nanos / 1e0) % 1e3;

    if (offset !== null) {
      millisecond += offset;
      var item = new Date(+epochMilliseconds);

      var _year = item.getUTCFullYear();

      var _month = item.getUTCMonth() + 1;

      var _day = item.getUTCDate();

      var _hour = item.getUTCHours();

      var _minute = item.getUTCMinutes();

      var _second = item.getUTCSeconds();

      var _deltaDays = 0;

      var _ES$BalanceTime3 = ES.BalanceTime(_hour, _minute, _second, millisecond, microsecond, nanosecond);

      _deltaDays = _ES$BalanceTime3.deltaDays;
      _hour = _ES$BalanceTime3.hour;
      _minute = _ES$BalanceTime3.minute;
      _second = _ES$BalanceTime3.second;
      millisecond = _ES$BalanceTime3.millisecond;
      microsecond = _ES$BalanceTime3.microsecond;
      nanosecond = _ES$BalanceTime3.nanosecond;
      _day += _deltaDays;

      var _ES$BalanceDate4 = ES.BalanceDate(_year, _month, _day);

      _year = _ES$BalanceDate4.year;
      _month = _ES$BalanceDate4.month;
      _day = _ES$BalanceDate4.day;
      return {
        year: _year,
        month: _month,
        day: _day,
        hour: _hour,
        minute: _minute,
        second: _second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      };
    }

    var year, month, day, hour, minute, second;

    var _ES$GetFormatterParts = ES.GetFormatterParts(timeZone, epochMilliseconds).reduce(reduceParts, {});

    year = _ES$GetFormatterParts.year;
    month = _ES$GetFormatterParts.month;
    day = _ES$GetFormatterParts.day;
    hour = _ES$GetFormatterParts.hour;
    minute = _ES$GetFormatterParts.minute;
    second = _ES$GetFormatterParts.second;
    var deltaDays = 0;

    var _ES$BalanceTime4 = ES.BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);

    deltaDays = _ES$BalanceTime4.deltaDays;
    hour = _ES$BalanceTime4.hour;
    minute = _ES$BalanceTime4.minute;
    second = _ES$BalanceTime4.second;
    millisecond = _ES$BalanceTime4.millisecond;
    microsecond = _ES$BalanceTime4.microsecond;
    nanosecond = _ES$BalanceTime4.nanosecond;
    day += deltaDays;

    var _ES$BalanceDate5 = ES.BalanceDate(year, month, day);

    year = _ES$BalanceDate5.year;
    month = _ES$BalanceDate5.month;
    day = _ES$BalanceDate5.day;
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  GetTimeZoneNextTransition: function GetTimeZoneNextTransition(epochNanoseconds, timeZone) {
    var offset = parseOffsetString(timeZone);

    if (offset !== null) {
      return null;
    }

    var leftNanos = epochNanoseconds;
    var leftOffset = ES.GetTimeZoneOffsetString(leftNanos, timeZone);
    var rightNanos = leftNanos;
    var rightOffset = leftOffset;
    var weeks = 0;

    while (leftOffset === rightOffset && weeks < 104) {
      rightNanos = BigInteger(leftNanos).plus(7 * 24 * DAYMILLIS * 1e6);
      rightOffset = ES.GetTimeZoneOffsetString(rightNanos, timeZone);

      if (leftOffset === rightOffset) {
        leftNanos = rightNanos;
      }

      weeks++;
    }

    if (leftOffset === rightOffset) return null;
    var result = bisect(function (epochNS) {
      return ES.GetTimeZoneOffsetString(epochNS, timeZone);
    }, leftNanos, rightNanos, leftOffset, rightOffset);
    return result;
  },
  GetFormatterParts: function GetFormatterParts(timeZone, epochMilliseconds) {
    var formatter = new IntlDateTimeFormat('en-us', {
      timeZone: timeZone,
      hour12: false,
      era: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }); // FIXME: can this use formatToParts instead?

    var datetime = formatter.format(new Date(epochMilliseconds));

    var _datetime$split = datetime.split(/,\s+/),
        _datetime$split2 = _slicedToArray(_datetime$split, 3),
        date = _datetime$split2[0],
        fullYear = _datetime$split2[1],
        time = _datetime$split2[2];

    var _date$split = date.split(' '),
        _date$split2 = _slicedToArray(_date$split, 2),
        month = _date$split2[0],
        day = _date$split2[1];

    var _fullYear$split = fullYear.split(' '),
        _fullYear$split2 = _slicedToArray(_fullYear$split, 2),
        year = _fullYear$split2[0],
        era = _fullYear$split2[1];

    var _time$split = time.split(':'),
        _time$split2 = _slicedToArray(_time$split, 3),
        hour = _time$split2[0],
        minute = _time$split2[1],
        second = _time$split2[2];

    return [{
      type: 'year',
      value: era === 'BC' ? -year + 1 : +year
    }, {
      type: 'month',
      value: +month
    }, {
      type: 'day',
      value: +day
    }, {
      type: 'hour',
      value: +hour
    }, {
      type: 'minute',
      value: +minute
    }, {
      type: 'second',
      value: +second
    }];
  },
  GetTimeZoneEpochValue: function GetTimeZoneEpochValue(timeZone, year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    var offset = parseOffsetString(timeZone);
    var ns = ES.GetEpochFromParts(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    if (ns === null) throw new RangeError('DateTime outside of supported range');

    if (offset !== null) {
      ns = ns.minus(BigInteger(offset).multiply(1e6));
      return [ns];
    }

    var dayNanos = BigInteger(DAYMILLIS).multiply(1e6);
    var nsEarlier = ns.minus(dayNanos);
    if (nsEarlier.lesser(NS_MIN)) nsEarlier = ns;
    var nsLater = ns.plus(dayNanos);
    if (nsLater.greater(NS_MAX)) nsLater = ns;
    var earliest = ES.GetTimeZoneOffsetNanoseconds(nsEarlier, timeZone);
    var latest = ES.GetTimeZoneOffsetNanoseconds(nsLater, timeZone);
    var found = unique([earliest, latest]).map(function (offsetNanoseconds) {
      var epochNanoseconds = BigInteger(ns).minus(offsetNanoseconds);
      var parts = ES.GetTimeZoneDateTimeParts(epochNanoseconds, timeZone);

      if (year !== parts.year || month !== parts.month || day !== parts.day || hour !== parts.hour || minute !== parts.minute || second !== parts.second || millisecond !== parts.millisecond || microsecond !== parts.microsecond || nanosecond !== parts.nanosecond) {
        return undefined;
      }

      return epochNanoseconds;
    }).filter(function (x) {
      return x !== undefined;
    });
    return found;
  },
  LeapYear: function LeapYear(year) {
    if (undefined === year) return false;
    var isDiv4 = year % 4 === 0;
    var isDiv100 = year % 100 === 0;
    var isDiv400 = year % 400 === 0;
    return isDiv4 && (!isDiv100 || isDiv400);
  },
  DaysInMonth: function DaysInMonth(year, month) {
    var DoM = {
      standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };
    return DoM[ES.LeapYear(year) ? 'leapyear' : 'standard'][month - 1];
  },
  DayOfWeek: function DayOfWeek(year, month, day) {
    var m = month + (month < 3 ? 10 : -2);
    var Y = year - (month < 3 ? 1 : 0);
    var c = Math.floor(Y / 100);
    var y = Y - c * 100;
    var d = day;
    var pD = d;
    var pM = Math.floor(2.6 * m - 0.2);
    var pY = y + Math.floor(y / 4);
    var pC = Math.floor(c / 4) - 2 * c;
    var dow = (pD + pM + pY + pC) % 7;
    return dow + (dow <= 0 ? 7 : 0);
  },
  DayOfYear: function DayOfYear(year, month, day) {
    var days = day;

    for (var m = month - 1; m > 0; m--) {
      days += ES.DaysInMonth(year, m);
    }

    return days;
  },
  WeekOfYear: function WeekOfYear(year, month, day) {
    var doy = ES.DayOfYear(year, month, day);
    var dow = ES.DayOfWeek(year, month, day) || 7;
    var doj = ES.DayOfWeek(year, 1, 1);
    var week = Math.floor((doy - dow + 10) / 7);

    if (week < 1) {
      if (doj === (ES.LeapYear(year) ? 5 : 6)) {
        return 53;
      } else {
        return 52;
      }
    }

    if (week === 53) {
      if ((ES.LeapYear(year) ? 366 : 365) - doy < 4 - dow) {
        return 1;
      }
    }

    return week;
  },
  BalanceYearMonth: function BalanceYearMonth(year, month) {
    month -= 1;
    year += Math.floor(month / 12);
    month %= 12;
    if (month < 0) month += 12;
    month += 1;
    return {
      year: year,
      month: month
    };
  },
  BalanceDate: function BalanceDate(year, month, day) {
    var _ES$BalanceYearMonth2 = ES.BalanceYearMonth(year, month);

    year = _ES$BalanceYearMonth2.year;
    month = _ES$BalanceYearMonth2.month;
    var daysInYear = 0;
    var testYear = month > 2 ? year : year - 1;

    while (daysInYear = ES.LeapYear(testYear) ? 366 : 365, day < -daysInYear) {
      year -= 1;
      testYear -= 1;
      day += daysInYear;
    }

    testYear += 1;

    while (daysInYear = ES.LeapYear(testYear) ? 366 : 365, day > daysInYear) {
      year += 1;
      testYear += 1;
      day -= daysInYear;
    }

    while (day < 1) {
      var _ES$BalanceYearMonth3 = ES.BalanceYearMonth(year, month - 1);

      year = _ES$BalanceYearMonth3.year;
      month = _ES$BalanceYearMonth3.month;
      day += ES.DaysInMonth(year, month);
    }

    while (day > ES.DaysInMonth(year, month)) {
      day -= ES.DaysInMonth(year, month);

      var _ES$BalanceYearMonth4 = ES.BalanceYearMonth(year, month + 1);

      year = _ES$BalanceYearMonth4.year;
      month = _ES$BalanceYearMonth4.month;
    }

    return {
      year: year,
      month: month,
      day: day
    };
  },
  BalanceSubSecond: function BalanceSubSecond(millisecond, microsecond, nanosecond) {
    microsecond += Math.floor(nanosecond / 1000);
    nanosecond = nanosecond % 1000;
    nanosecond = nanosecond < 0 ? 1000 + nanosecond : nanosecond;
    millisecond += Math.floor(microsecond / 1000);
    microsecond = microsecond % 1000;
    microsecond = microsecond < 0 ? 1000 + microsecond : microsecond;
    var seconds = Math.floor(millisecond / 1000);
    millisecond = millisecond % 1000;
    millisecond = millisecond < 0 ? 1000 + millisecond : millisecond;
    return {
      seconds: seconds,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  BalanceTime: function BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond) {
    var seconds;

    var _ES$BalanceSubSecond = ES.BalanceSubSecond(millisecond, microsecond, nanosecond);

    seconds = _ES$BalanceSubSecond.seconds;
    millisecond = _ES$BalanceSubSecond.millisecond;
    microsecond = _ES$BalanceSubSecond.microsecond;
    nanosecond = _ES$BalanceSubSecond.nanosecond;
    second += seconds;
    minute += Math.floor(second / 60);
    second = second % 60;
    second = second < 0 ? 60 + second : second;
    hour += Math.floor(minute / 60);
    minute = minute % 60;
    minute = minute < 0 ? 60 + minute : minute;
    var deltaDays = Math.floor(hour / 24);
    hour = hour % 24;
    hour = hour < 0 ? 24 + hour : hour;
    return {
      deltaDays: deltaDays,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  BalanceDurationDate: function BalanceDurationDate(years, months, startYear, startMonth, startDay) {
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    var _ES$BalanceYearMonth5 = ES.BalanceYearMonth(startYear + years, startMonth + months),
        year = _ES$BalanceYearMonth5.year,
        month = _ES$BalanceYearMonth5.month;

    while (startDay > ES.DaysInMonth(year, month)) {
      months -= 1;

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      var _ES$BalanceYearMonth6 = ES.BalanceYearMonth(startYear + years, startMonth + months);

      year = _ES$BalanceYearMonth6.year;
      month = _ES$BalanceYearMonth6.month;
    }

    return {
      year: year,
      month: month,
      years: years,
      months: months
    };
  },
  BalanceDuration: function BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, largestUnit) {
    var deltaDays;

    var _ES$BalanceTime5 = ES.BalanceTime(hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

    deltaDays = _ES$BalanceTime5.deltaDays;
    hours = _ES$BalanceTime5.hour;
    minutes = _ES$BalanceTime5.minute;
    seconds = _ES$BalanceTime5.second;
    milliseconds = _ES$BalanceTime5.millisecond;
    microseconds = _ES$BalanceTime5.microsecond;
    nanoseconds = _ES$BalanceTime5.nanosecond;
    days += deltaDays;

    switch (largestUnit) {
      case 'hours':
        hours += 24 * days;
        days = 0;
        break;

      case 'minutes':
        minutes += 60 * (hours + 24 * days);
        hours = days = 0;
        break;

      case 'seconds':
        seconds += 60 * (minutes + 60 * (hours + 24 * days));
        minutes = hours = days = 0;
        break;

      case 'years':
      case 'months':
      case 'days':
        break;

      default:
        throw new Error('assert not reached');
    }

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
      microseconds: microseconds,
      nanoseconds: nanoseconds
    };
  },
  ConstrainToRange: function ConstrainToRange(value, min, max) {
    return Math.min(max, Math.max(min, value));
  },
  ConstrainDate: function ConstrainDate(year, month, day) {
    // Noon avoids trouble at edges of DateTime range (excludes midnight)
    var _ES$ConstrainDateTime2 = ES.ConstrainDateTime(year, month, day, 12, 0, 0, 0, 0, 0);

    year = _ES$ConstrainDateTime2.year;
    month = _ES$ConstrainDateTime2.month;
    day = _ES$ConstrainDateTime2.day;
    return {
      year: year,
      month: month,
      day: day
    };
  },
  ConstrainTime: function ConstrainTime(hour, minute, second, millisecond, microsecond, nanosecond) {
    hour = ES.ConstrainToRange(hour, 0, 23);
    minute = ES.ConstrainToRange(minute, 0, 59);
    second = ES.ConstrainToRange(second, 0, 59);
    millisecond = ES.ConstrainToRange(millisecond, 0, 999);
    microsecond = ES.ConstrainToRange(microsecond, 0, 999);
    nanosecond = ES.ConstrainToRange(nanosecond, 0, 999);
    return {
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  ConstrainDateTime: function ConstrainDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    year = ES.ConstrainToRange(year, YEAR_MIN, YEAR_MAX);
    month = ES.ConstrainToRange(month, 1, 12);
    day = ES.ConstrainToRange(day, 1, ES.DaysInMonth(year, month));

    var _ES$ConstrainTime2 = ES.ConstrainTime(hour, minute, second, millisecond, microsecond, nanosecond);

    hour = _ES$ConstrainTime2.hour;
    minute = _ES$ConstrainTime2.minute;
    second = _ES$ConstrainTime2.second;
    millisecond = _ES$ConstrainTime2.millisecond;
    microsecond = _ES$ConstrainTime2.microsecond;
    nanosecond = _ES$ConstrainTime2.nanosecond;

    // Constrain to within 24 hours outside the Absolute range
    if (year === YEAR_MIN && null === ES.GetEpochFromParts(year, month, day + 1, hour, minute, second, millisecond, microsecond, nanosecond - 1)) {
      month = 4;
      day = 19;
      hour = minute = second = millisecond = microsecond = 0;
      nanosecond = 1;
    } else if (year === YEAR_MAX && null === ES.GetEpochFromParts(year, month, day - 1, hour, minute, second, millisecond, microsecond, nanosecond + 1)) {
      month = 9;
      day = 13;
      hour = 23;
      minute = second = 59;
      millisecond = microsecond = nanosecond = 999;
    }

    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  ConstrainYearMonth: function ConstrainYearMonth(year, month) {
    year = ES.ConstrainToRange(year, YEAR_MIN, YEAR_MAX);

    if (year === YEAR_MIN) {
      month = ES.ConstrainToRange(month, 4, 12);
    } else if (year === YEAR_MAX) {
      month = ES.ConstrainToRange(month, 1, 9);
    } else {
      month = ES.ConstrainToRange(month, 1, 12);
    }

    return {
      year: year,
      month: month
    };
  },
  RejectToRange: function RejectToRange(value, min, max) {
    if (value < min || value > max) throw new RangeError("value out of range: ".concat(min, " <= ").concat(value, " <= ").concat(max));
  },
  RejectDate: function RejectDate(year, month, day) {
    // Noon avoids trouble at edges of DateTime range (excludes midnight)
    ES.RejectDateTime(year, month, day, 12, 0, 0, 0, 0, 0);
  },
  RejectTime: function RejectTime(hour, minute, second, millisecond, microsecond, nanosecond) {
    ES.RejectToRange(hour, 0, 23);
    ES.RejectToRange(minute, 0, 59);
    ES.RejectToRange(second, 0, 59);
    ES.RejectToRange(millisecond, 0, 999);
    ES.RejectToRange(microsecond, 0, 999);
    ES.RejectToRange(nanosecond, 0, 999);
  },
  RejectDateTime: function RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    ES.RejectToRange(year, YEAR_MIN, YEAR_MAX);
    ES.RejectToRange(month, 1, 12);
    ES.RejectToRange(day, 1, ES.DaysInMonth(year, month));
    ES.RejectTime(hour, minute, second, millisecond, microsecond, nanosecond); // Reject any DateTime 24 hours or more outside the Absolute range

    if (year === YEAR_MIN && null == ES.GetEpochFromParts(year, month, day + 1, hour, minute, second, millisecond, microsecond, nanosecond - 1) || year === YEAR_MAX && null == ES.GetEpochFromParts(year, month, day - 1, hour, minute, second, millisecond, microsecond, nanosecond + 1)) {
      throw new RangeError('DateTime outside of supported range');
    }
  },
  RejectAbsolute: function RejectAbsolute(epochNanoseconds) {
    if (epochNanoseconds.lesser(NS_MIN) || epochNanoseconds.greater(NS_MAX)) {
      throw new RangeError('Absolute outside of supported range');
    }
  },
  RejectYearMonth: function RejectYearMonth(year, month) {
    ES.RejectToRange(year, YEAR_MIN, YEAR_MAX);

    if (year === YEAR_MIN) {
      ES.RejectToRange(month, 4, 12);
    } else if (year === YEAR_MAX) {
      ES.RejectToRange(month, 1, 9);
    } else {
      ES.RejectToRange(month, 1, 12);
    }
  },
  DifferenceDate: function DifferenceDate(smaller, larger) {
    var largestUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'days';
    var years = larger.year - smaller.year;
    var months, days;

    switch (largestUnit) {
      case 'years':
      case 'months':
        {
          months = larger.month - smaller.month;
          var year, month;

          var _ES$BalanceDurationDa = ES.BalanceDurationDate(years, months, smaller.year, smaller.month, smaller.day);

          year = _ES$BalanceDurationDa.year;
          month = _ES$BalanceDurationDa.month;
          years = _ES$BalanceDurationDa.years;
          months = _ES$BalanceDurationDa.months;
          days = ES.DayOfYear(larger.year, larger.month, larger.day) - ES.DayOfYear(year, month, smaller.day);

          if (days < 0) {
            months -= 1;

            var _ES$BalanceDurationDa2 = ES.BalanceDurationDate(years, months, smaller.year, smaller.month, smaller.day);

            year = _ES$BalanceDurationDa2.year;
            month = _ES$BalanceDurationDa2.month;
            years = _ES$BalanceDurationDa2.years;
            months = _ES$BalanceDurationDa2.months;
            days = ES.DayOfYear(larger.year, larger.month, larger.day) - ES.DayOfYear(year, month, smaller.day);
            if (larger.year > year) days += ES.LeapYear(year) ? 366 : 365;
          }

          if (largestUnit === 'months') {
            months += years * 12;
            years = 0;
          }

          break;
        }

      case 'days':
        months = 0;
        days = ES.DayOfYear(larger.year, larger.month, larger.day) - ES.DayOfYear(smaller.year, smaller.month, smaller.day);

        while (years > 0) {
          days += ES.LeapYear(smaller.year + years - 1) ? 366 : 365;
          years -= 1;
        }

        break;

      default:
        throw new Error('assert not reached');
    }

    return {
      years: years,
      months: months,
      days: days
    };
  },
  DifferenceTime: function DifferenceTime(earlier, later) {
    var hours = later.hour - earlier.hour;
    var minutes = later.minute - earlier.minute;
    var seconds = later.second - earlier.second;
    var milliseconds = later.millisecond - earlier.millisecond;
    var microseconds = later.microsecond - earlier.microsecond;
    var nanoseconds = later.nanosecond - earlier.nanosecond;
    var deltaDays = 0;

    var _ES$BalanceTime6 = ES.BalanceTime(hours, minutes, seconds, milliseconds, microseconds, nanoseconds);

    deltaDays = _ES$BalanceTime6.deltaDays;
    hours = _ES$BalanceTime6.hour;
    minutes = _ES$BalanceTime6.minute;
    seconds = _ES$BalanceTime6.second;
    milliseconds = _ES$BalanceTime6.millisecond;
    microseconds = _ES$BalanceTime6.microsecond;
    nanoseconds = _ES$BalanceTime6.nanosecond;
    return {
      deltaDays: deltaDays,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
      microseconds: microseconds,
      nanoseconds: nanoseconds
    };
  },
  AddDate: function AddDate(year, month, day, years, months, days, disambiguation) {
    year += years;
    month += months;

    var _ES$BalanceYearMonth7 = ES.BalanceYearMonth(year, month);

    year = _ES$BalanceYearMonth7.year;
    month = _ES$BalanceYearMonth7.month;

    switch (disambiguation) {
      case 'reject':
        ES.RejectDate(year, month, day);
        break;

      case 'constrain':
        var _ES$ConstrainDate3 = ES.ConstrainDate(year, month, day);

        year = _ES$ConstrainDate3.year;
        month = _ES$ConstrainDate3.month;
        day = _ES$ConstrainDate3.day;
        break;
    }

    day += days;

    var _ES$BalanceDate6 = ES.BalanceDate(year, month, day);

    year = _ES$BalanceDate6.year;
    month = _ES$BalanceDate6.month;
    day = _ES$BalanceDate6.day;
    return {
      year: year,
      month: month,
      day: day
    };
  },
  AddTime: function AddTime(hour, minute, second, millisecond, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds) {
    hour += hours;
    minute += minutes;
    second += seconds;
    millisecond += milliseconds;
    microsecond += microseconds;
    nanosecond += nanoseconds;
    var deltaDays = 0;

    var _ES$BalanceTime7 = ES.BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);

    deltaDays = _ES$BalanceTime7.deltaDays;
    hour = _ES$BalanceTime7.hour;
    minute = _ES$BalanceTime7.minute;
    second = _ES$BalanceTime7.second;
    millisecond = _ES$BalanceTime7.millisecond;
    microsecond = _ES$BalanceTime7.microsecond;
    nanosecond = _ES$BalanceTime7.nanosecond;
    return {
      deltaDays: deltaDays,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  SubtractDate: function SubtractDate(year, month, day, years, months, days, disambiguation) {
    day -= days;

    var _ES$BalanceDate7 = ES.BalanceDate(year, month, day);

    year = _ES$BalanceDate7.year;
    month = _ES$BalanceDate7.month;
    day = _ES$BalanceDate7.day;
    month -= months;
    year -= years;

    var _ES$BalanceYearMonth8 = ES.BalanceYearMonth(year, month);

    year = _ES$BalanceYearMonth8.year;
    month = _ES$BalanceYearMonth8.month;

    switch (disambiguation) {
      case 'reject':
        ES.RejectDate(year, month, day);
        break;

      case 'constrain':
        var _ES$ConstrainDate4 = ES.ConstrainDate(year, month, day);

        year = _ES$ConstrainDate4.year;
        month = _ES$ConstrainDate4.month;
        day = _ES$ConstrainDate4.day;
        break;
    }

    return {
      year: year,
      month: month,
      day: day
    };
  },
  SubtractTime: function SubtractTime(hour, minute, second, millisecond, microsecond, nanosecond, hours, minutes, seconds, milliseconds, microseconds, nanoseconds) {
    hour -= hours;
    minute -= minutes;
    second -= seconds;
    millisecond -= milliseconds;
    microsecond -= microseconds;
    nanosecond -= nanoseconds;
    var deltaDays = 0;

    var _ES$BalanceTime8 = ES.BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);

    deltaDays = _ES$BalanceTime8.deltaDays;
    hour = _ES$BalanceTime8.hour;
    minute = _ES$BalanceTime8.minute;
    second = _ES$BalanceTime8.second;
    millisecond = _ES$BalanceTime8.millisecond;
    microsecond = _ES$BalanceTime8.microsecond;
    nanosecond = _ES$BalanceTime8.nanosecond;
    return {
      deltaDays: deltaDays,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  },
  AssertPositiveInteger: function AssertPositiveInteger(num) {
    if (!Number.isFinite(num) || Math.abs(num) !== num) throw new RangeError("invalid positive integer: ".concat(num));
    return num;
  },
  // Note: This method returns values with bogus nanoseconds based on the previous iteration's
  // milliseconds. That way there is a guarantee that the full nanoseconds are always going to be
  // increasing at least and that the microsecond and nanosecond fields are likely to be non-zero.
  SystemUTCEpochNanoSeconds: function () {
    var ns = Date.now() % 1e6;
    return function () {
      var ms = Date.now();
      var result = BigInteger(ms).multiply(1e6).plus(ns);
      ns = ms % 1e6;
      return result;
    };
  }(),
  SystemTimeZone: function SystemTimeZone() {
    var fmt = new IntlDateTimeFormat('en-us');
    return ES.ToTimeZone(fmt.resolvedOptions().timeZone);
  },
  ComparisonResult: function ComparisonResult(value) {
    return value < 0 ? -1 : value > 0 ? 1 : value;
  },
  GetOption: function GetOption(options, property, allowedValues, fallback) {
    if (options === null || options === undefined) return fallback;
    options = ES.ToObject(options);
    var value = options[property];

    if (value !== undefined) {
      value = ES.ToString(value);

      if (!allowedValues.includes(value)) {
        throw new RangeError("".concat(property, " must be one of ").concat(allowedValues.join(', '), ", not ").concat(value));
      }

      return value;
    }

    return fallback;
  }
});
var OFFSET = new RegExp("^".concat(offset.source, "$"));

function parseOffsetString(string) {
  var match = OFFSET.exec(String(string));
  if (!match) return null;
  var sign = match[1] === '-' ? -1 : +1;
  var hours = +match[2];
  var minutes = +(match[3] || 0);
  return sign * (hours * 60 + minutes) * 60 * 1000;
}

function makeOffsetString(offsetMilliSeconds) {
  var offsetSeconds = Math.round(offsetMilliSeconds / 1000);
  var sign = offsetSeconds < 0 ? '-' : '+';
  offsetSeconds = Math.abs(offsetSeconds);
  var offsetMinutes = Math.floor(offsetSeconds / 60) % 60;
  var offsetHours = Math.floor(offsetSeconds / 3600);
  var offsetMinuteString = "00".concat(offsetMinutes).slice(-2);
  var offsetHourString = "00".concat(offsetHours).slice(-2);
  return "".concat(sign).concat(offsetHourString, ":").concat(offsetMinuteString);
}

function reduceParts(res, item) {
  if (item.type === 'literal') return res;
  if (item.type === 'timeZoneName') return res;
  res[item.type] = parseInt(item.value, 10);
  return res;
}

function bisect(getState, left, right) {
  var lstate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getState(left);
  var rstate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getState(right);
  left = BigInteger(left);
  right = BigInteger(right);

  while (right.minus(left).greater(1)) {
    var middle = left.plus(right).divide(2);
    var mstate = getState(middle);

    if (mstate === lstate) {
      left = middle;
      lstate = mstate;
    } else if (mstate === rstate) {
      right = middle;
      rstate = mstate;
    } else {
      throw new Error("invalid state in bisection ".concat(lstate, " - ").concat(mstate, " - ").concat(rstate));
    }
  }

  return right;
}

function tzIdent() {
  return this.resolvedOptions().timeZone;
}

var Absolute$1 = ES.GetIntrinsic('%Temporal.Absolute%');
var now = {
  absolute: absolute$1,
  dateTime: dateTime,
  date: date,
  time: time$1,
  timeZone: timeZone
};

function absolute$1() {
  var ns = ES.SystemUTCEpochNanoSeconds();
  return new Absolute$1(ns);
}

function dateTime() {
  var zone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeZone();
  zone = ES.ToTimeZone(zone);
  var abs = absolute$1();
  var dateTime = zone.getDateTimeFor(abs);
  return dateTime;
}

function date(zone) {
  return dateTime(zone).getDate();
}

function time$1(zone) {
  return dateTime(zone).getTime();
}

function timeZone() {
  return ES.SystemTimeZone();
}

if ('undefined' === typeof Symbol) {
  var gt = 'object' === (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) ? globalThis : new Function('return this')();
  var ltr = Array(26).fill(0).map(function (_, idx) {
    return String.fromCharCode(idx + 65);
  });

  var _Symbol = gt.Symbol = function _Symbol2(name) {
    if (!(this instanceof _Symbol2)) return new _Symbol2(name);
    var rnd = Array(100).fill(0).map(function () {
      return ltr[Math.floor(Math.random() * ltr.length)];
    }).join('');
    this.id = "Symbol(".concat(name, ")-").concat(rnd);
  };

  _Symbol.prototype.toString = function () {
    return this.id;
  };

  _Symbol.iterator = _Symbol('iterator');
  _Symbol.toStringTag = _Symbol('toStringTag');
}
var Absolute$2 = ES.GetIntrinsic('%Temporal.Absolute%');
var TimeZone$1 = ES.GetIntrinsic('%Temporal.TimeZone%');
var DateTime$1 = ES.GetIntrinsic('%Temporal.DateTime%');
var Date$2 = ES.GetIntrinsic('%Temporal.Date%');
var YearMonth$1 = ES.GetIntrinsic('%Temporal.YearMonth%');
var MonthDay$1 = ES.GetIntrinsic('%Temporal.MonthDay%');
var Time$1 = ES.GetIntrinsic('%Temporal.Time%');
var Duration$1 = ES.GetIntrinsic('%Temporal.Duration%');

var Temporal = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Absolute: Absolute$2,
  TimeZone: TimeZone$1,
  DateTime: DateTime$1,
  Date: Date$2,
  YearMonth: YearMonth$1,
  MonthDay: MonthDay$1,
  Time: Time$1,
  Duration: Duration$1,
  now: now
});

var Absolute$3 = ES.GetIntrinsic('%Temporal.Absolute%');
var DateTime$2 = ES.GetIntrinsic('%Temporal.DateTime%');
var Date$3 = ES.GetIntrinsic('%Temporal.Date%');
var Time$2 = ES.GetIntrinsic('%Temporal.Time%');
var YearMonth$2 = ES.GetIntrinsic('%Temporal.YearMonth%');
var MonthDay$2 = ES.GetIntrinsic('%Temporal.MonthDay%');
var Duration$2 = ES.GetIntrinsic('%Temporal.Duration%');
var DATE = Symbol('date');
var YM = Symbol('ym');
var MD = Symbol('md');
var TIME = Symbol('time');
var DATETIME = Symbol('datetime');
var DURATION = Symbol('duration');
var ORIGINAL = Symbol('original');
var TIMEZONE = Symbol('timezone');
var IntlDateTimeFormat$1 = Intl.DateTimeFormat;

var DurationFormat = /*#__PURE__*/function () {
  function DurationFormat(locale) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DurationFormat);

    this.locale = locale;
    this.options = options;
  }

  _createClass(DurationFormat, [{
    key: "format",
    value: function format(duration) {
      console.error('Intl.DateTimeFormat.format with a Duration is not fully polyfilled!');
      return this.formatToParts(duration).map(function (item) {
        return item.value;
      }).join('');
    }
  }, {
    key: "formatToParts",
    value: function formatToParts(duration) {
      console.error('Intl.DateTimeFormat.formatToParts with a Duration is not fully polyfilled!');
      var locale = this.locale.split('-').shift().toLowerCase();
      var strings = DurationFormat[locale] || DurationFormat.en;
      var parts = [];

      if (duration.years && this.options.year) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'years',
          value: "".concat(duration.years)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.years === 1 ? strings.year : strings.years
        });
      }

      if (duration.months && this.options.month) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'months',
          value: "".concat(duration.months)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.months === 1 ? strings.month : strings.months
        });
      }

      if (duration.days && this.options.day) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'days',
          value: "".concat(duration.days)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.days === 1 ? strings.day : strings.days
        });
      }

      if (duration.hours && this.options.hour) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'hours',
          value: "".concat(duration.hours)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.hours === 1 ? strings.hour : strings.hours
        });
      }

      if (duration.minutes && this.options.minute) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'minutes',
          value: "".concat(duration.minutes)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.minutes === 1 ? strings.minute : strings.minutes
        });
      }

      if (duration.seconds && this.options.second) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'seconds',
          value: "".concat(duration.seconds)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.seconds === 1 ? strings.second : strings.seconds
        });
      }

      if (duration.milliseconds && this.options.millisecond) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'milliseconds',
          value: "".concat(duration.milliseconds)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.milliseconds === 1 ? strings.millisecond : strings.milliseconds
        });
      }

      if (duration.microseconds && this.options.microsecond) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'microseconds',
          value: "".concat(duration.microseconds)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.microseconds === 1 ? strings.microsecond : strings.microseconds
        });
      }

      if (duration.nanoseconds && this.options.nanosecond) {
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'nanoseconds',
          value: "".concat(duration.nanoseconds)
        });
        parts.push({
          type: 'literal',
          value: ' '
        });
        parts.push({
          type: 'literal',
          value: duration.nanoseconds === 1 ? strings.nanosecond : strings.nanoseconds
        });
      }

      return parts.slice(1);
    }
  }], [{
    key: "en",
    get: function get() {
      return {
        year: 'year',
        years: 'years',
        month: 'month',
        months: 'months',
        day: 'day',
        days: 'days',
        hour: 'hour',
        hours: 'hours',
        minute: 'minute',
        minutes: 'minutes',
        second: 'second',
        seconds: 'seconds',
        millisecond: 'millisecond',
        milliseconds: 'milliseconds',
        microsecond: 'microsecond',
        microseconds: 'microseconds',
        nanosecond: 'nanosecond',
        nanoseconds: 'nanoseconds'
      };
    }
  }, {
    key: "de",
    get: function get() {
      return {
        year: 'Jahr',
        years: 'Jahre',
        month: 'Monat',
        months: 'Monate',
        day: 'Tag',
        days: 'Tage',
        hour: 'Stunde',
        hours: 'Stunden',
        minute: 'Minute',
        minutes: 'Minuten',
        second: 'Sekunde',
        seconds: 'Sekunden',
        millisecond: 'Millisekunde',
        milliseconds: 'Millisekunden',
        microsecond: 'Mikrosekunde',
        microseconds: 'Mikrosekunden',
        nanosecond: 'Nanosekunde',
        nanoseconds: 'Nanosekunden'
      };
    }
  }]);

  return DurationFormat;
}();

function DateTimeFormat() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IntlDateTimeFormat$1().resolvedOptions().locale;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!(this instanceof DateTimeFormat)) return new DateTimeFormat(locale, options);
  this[ORIGINAL] = new IntlDateTimeFormat$1(locale, datetimeAmend(options));
  this[TIMEZONE] = new TimeZone(this.resolvedOptions().timeZone);
  this[DATE] = new IntlDateTimeFormat$1(locale, dateAmend(options, {}));
  this[YM] = new IntlDateTimeFormat$1(locale, dateAmend(options, {
    day: false
  }));
  this[MD] = new IntlDateTimeFormat$1(locale, dateAmend(options, {
    year: false
  }));
  this[TIME] = new IntlDateTimeFormat$1(locale, timeAmend(options));
  this[DATETIME] = new IntlDateTimeFormat$1(locale, datetimeAmend(options));
  this[DURATION] = new DurationFormat(locale, datetimeAmend(options));
}

DateTimeFormat.supportedLocalesOf = function () {
  return IntlDateTimeFormat$1.supportedLocalesOf.apply(IntlDateTimeFormat$1, arguments);
};

var properties = {
  resolvedOptions: {
    value: resolvedOptions,
    enumerable: true,
    writable: false,
    configurable: true
  },
  format: {
    value: format,
    enumerable: true,
    writable: false,
    configurable: true
  },
  formatRange: {
    value: formatRange,
    enumerable: true,
    writable: false,
    configurable: true
  },
  formatRangeToParts: {
    value: formatRangeToParts,
    enumerable: true,
    writable: false,
    configurable: true
  }
};

if (formatToParts in IntlDateTimeFormat$1.prototype) {
  properties.formatToParts = {
    value: formatToParts,
    enumerable: true,
    writable: false,
    configurable: true
  };
}

if (formatRangeToParts in IntlDateTimeFormat$1.prototype) {
  properties.formatRangeToParts = {
    value: formatRangeToParts,
    enumerable: true,
    writable: false,
    configurable: true
  };
}

DateTimeFormat.prototype = Object.create(IntlDateTimeFormat$1.prototype, properties);

function resolvedOptions() {
  return this[ORIGINAL].resolvedOptions();
}

function format(datetime) {
  var _this$ORIGINAL;

  var _extractOverrides = extractOverrides(datetime, this),
      absolute = _extractOverrides.absolute,
      formatter = _extractOverrides.formatter;

  if (absolute && formatter) {
    return formatter.format(absolute.getEpochMilliseconds());
  }

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if (datetime instanceof Duration$2) {
    var _this$DURATION;

    return (_this$DURATION = this[DURATION]).format.apply(_this$DURATION, [datetime].concat(rest));
  }

  return (_this$ORIGINAL = this[ORIGINAL]).format.apply(_this$ORIGINAL, [datetime].concat(rest));
}

function formatToParts(datetime) {
  var _this$ORIGINAL2;

  var _extractOverrides2 = extractOverrides(datetime, this),
      absolute = _extractOverrides2.absolute,
      formatter = _extractOverrides2.formatter;

  if (absolute && formatter) return formatter.formatToParts(absolute.getEpochMilliseconds());

  for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    rest[_key2 - 1] = arguments[_key2];
  }

  if (datetime instanceof Duration$2) {
    var _this$DURATION2;

    return (_this$DURATION2 = this[DURATION]).formatToParts.apply(_this$DURATION2, [datetime].concat(rest));
  }

  return (_this$ORIGINAL2 = this[ORIGINAL]).formatToParts.apply(_this$ORIGINAL2, [datetime].concat(rest));
}

function formatRange(a, b) {
  if ('object' === _typeof(a) && 'object' === _typeof(b) && Object.getPrototypeOf(a) === Object.getPrototypeOf(b)) {
    var _extractOverrides3 = extractOverrides(a, this),
        aa = _extractOverrides3.absolute,
        aformatter = _extractOverrides3.formatter;

    var _extractOverrides4 = extractOverrides(b, this),
        bb = _extractOverrides4.absolute,
        bformatter = _extractOverrides4.formatter;

    if (aa && bb && aformatter && bformatter && aformatter === bformatter) {
      return aformatter.formatRange(aa.getEpochMilliseconds(), bb.getEpochMilliseconds());
    }
  }

  return this[ORIGINAL].formatRange(a, b);
}

function formatRangeToParts(a, b) {
  if ('object' === _typeof(a) && 'object' === _typeof(b) && Object.getPrototypeOf(a) === Object.getPrototypeOf(b)) {
    var _extractOverrides5 = extractOverrides(a, this),
        aa = _extractOverrides5.absolute,
        aformatter = _extractOverrides5.formatter;

    var _extractOverrides6 = extractOverrides(b, this),
        bb = _extractOverrides6.absolute,
        bformatter = _extractOverrides6.formatter;

    if (aa && bb && aformatter && bformatter && aformatter === bformatter) {
      return aformatter.formatRangeToParts(aa.getEpochMilliseconds(), bb.getEpochMilliseconds());
    }
  }

  return this[ORIGINAL].formatRangeToParts(a, b);
}

function amend() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var amended = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = assign({}, options);

  for (var _i = 0, _arr = ['year', 'month', 'day', 'hour', 'minute', 'second']; _i < _arr.length; _i++) {
    var opt = _arr[_i];
    options[opt] = opt in amended ? amended[opt] : options[opt];
    if (options[opt] === false || options[opt] === undefined) delete options[opt];
  }

  return options;
}

function timeAmend(options) {
  options = amend(options, {
    year: false,
    month: false,
    day: false
  });

  if (!hasTimeOptions(options)) {
    options = assign(options, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  return options;
}

function dateAmend(options, amendments) {
  options = amend(options, {
    hour: false,
    minute: false,
    second: false
  });

  if (!hasDateOptions(options)) {
    options = assign(options, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  }

  options = amend(options, amendments);
  return options;
}

function datetimeAmend(options) {
  options = assign({}, options);

  if (!hasTimeOptions(options) && !hasDateOptions(options)) {
    assign(options, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  return options;
}

function hasDateOptions(options) {
  return 'year' in options || 'month' in options || 'day' in options;
}

function hasTimeOptions(options) {
  return 'hour' in options || 'minute' in options || 'second' in options;
}

function extractOverrides(datetime, main) {
  var formatter;

  if (datetime instanceof Time$2) {
    datetime = datetime.withDate(new Date$3(1970, 1, 1));
    formatter = main[TIME];
  }

  if (datetime instanceof YearMonth$2) {
    datetime = datetime.withDay(1);
    formatter = main[YM];
  }

  if (datetime instanceof MonthDay$2) {
    datetime = datetime.withYear(2004); // use a leap-year for maximum range

    formatter = main[MD];
  }

  if (datetime instanceof Date$3) {
    datetime = datetime.withTime(new Time$2(12, 0));
    formatter = formatter || main[DATE];
  }

  if (datetime instanceof DateTime$2) {
    formatter = formatter || main[DATETIME];
    datetime = main[TIMEZONE].getAbsoluteFor(datetime, 'earlier');
  }

  if (datetime instanceof Absolute$3) {
    formatter = formatter || main[DATETIME];
    return {
      absolute: datetime,
      formatter: formatter
    };
  } else {
    return {};
  }
}

var Intl$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DateTimeFormat: DateTimeFormat
});

Object.defineProperty(globalThis, "Temporal", {
  value: {},
  writable: true,
  enumerable: false,
  configurable: true
});
copy(globalThis.Temporal, Temporal);
copy(globalThis.Intl, Intl$1);

function copy(target, source) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.getOwnPropertyNames(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;
      Object.defineProperty(target, prop, {
        value: source[prop],
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

export { Intl$1 as Intl, Temporal };
//# sourceMappingURL=temporal.mjs.map
