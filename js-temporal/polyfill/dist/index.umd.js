(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.temporal = {}));
})(this, (function (exports) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _createSuper(t) {
    var r = _isNativeReflectConstruct();
    return function () {
      var e,
        o = _getPrototypeOf(t);
      if (r) {
        var s = _getPrototypeOf(this).constructor;
        e = Reflect.construct(o, arguments, s);
      } else e = o.apply(this, arguments);
      return _possibleConstructorReturn(this, e);
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function (t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  var JSBI = /*#__PURE__*/function (_Array) {
    _inherits(JSBI, _Array);
    var _super = _createSuper(JSBI);
    function JSBI(i, _) {
      var _this;
      _classCallCheck(this, JSBI);
      if (_this = _super.call(this, i), _this.sign = _, Object.setPrototypeOf(_assertThisInitialized(_this), JSBI.prototype), i > JSBI.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
      return _possibleConstructorReturn(_this);
    }
    _createClass(JSBI, [{
      key: "toDebugString",
      value: function toDebugString() {
        var i = ["BigInt["];
        var _iterator = _createForOfIteratorHelper(this),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ = _step.value;
            i.push((_ ? (_ >>> 0).toString(16) : _) + ", ");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return i.push("]"), i.join("");
      }
    }, {
      key: "toString",
      value: function toString() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        if (2 > i || 36 < i) throw new RangeError("toString() radix argument must be between 2 and 36");
        return 0 === this.length ? "0" : 0 == (i & i - 1) ? JSBI.__toStringBasePowerOfTwo(this, i) : JSBI.__toStringGeneric(this, i, !1);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
      }
    }, {
      key: "__copy",
      value: function __copy() {
        var _ = new JSBI(this.length, this.sign);
        for (var t = 0; t < this.length; t++) _[t] = this[t];
        return _;
      }
    }, {
      key: "__trim",
      value: function __trim() {
        var i = this.length,
          _ = this[i - 1];
        for (; 0 === _;) i--, _ = this[i - 1], this.pop();
        return 0 === i && (this.sign = !1), this;
      }
    }, {
      key: "__initializeDigits",
      value: function __initializeDigits() {
        for (var _ = 0; _ < this.length; _++) this[_] = 0;
      }
    }, {
      key: "__clzmsd",
      value: function __clzmsd() {
        return JSBI.__clz30(this.__digit(this.length - 1));
      }
    }, {
      key: "__inplaceMultiplyAdd",
      value: function __inplaceMultiplyAdd(i, _, t) {
        t > this.length && (t = this.length);
        var e = 32767 & i,
          n = i >>> 15;
        var g = 0,
          s = _;
        for (var o = 0; o < t; o++) {
          var _i = this.__digit(o),
            _2 = 32767 & _i,
            _t = _i >>> 15,
            l = JSBI.__imul(_2, e),
            r = JSBI.__imul(_2, n),
            a = JSBI.__imul(_t, e),
            u = JSBI.__imul(_t, n);
          var d = s + l + g;
          g = d >>> 30, d &= 1073741823, d += ((32767 & r) << 15) + ((32767 & a) << 15), g += d >>> 30, s = u + (r >>> 15) + (a >>> 15), this.__setDigit(o, 1073741823 & d);
        }
        if (0 != g || 0 !== s) throw new Error("implementation bug");
      }
    }, {
      key: "__inplaceAdd",
      value: function __inplaceAdd(_, t, e) {
        var n = 0;
        for (var g = 0; g < e; g++) {
          var i = this.__halfDigit(t + g) + _.__halfDigit(g) + n;
          n = i >>> 15, this.__setHalfDigit(t + g, 32767 & i);
        }
        return n;
      }
    }, {
      key: "__inplaceSub",
      value: function __inplaceSub(_, t, e) {
        var n = 0;
        if (1 & t) {
          t >>= 1;
          var g = this.__digit(t),
            s = 32767 & g,
            o = 0;
          for (; o < e - 1 >>> 1; o++) {
            var _i2 = _.__digit(o),
              _e = (g >>> 15) - (32767 & _i2) - n;
            n = 1 & _e >>> 15, this.__setDigit(t + o, (32767 & _e) << 15 | 32767 & s), g = this.__digit(t + o + 1), s = (32767 & g) - (_i2 >>> 15) - n, n = 1 & s >>> 15;
          }
          var i = _.__digit(o),
            l = (g >>> 15) - (32767 & i) - n;
          n = 1 & l >>> 15, this.__setDigit(t + o, (32767 & l) << 15 | 32767 & s);
          if (t + o + 1 >= this.length) throw new RangeError("out of bounds");
          0 == (1 & e) && (g = this.__digit(t + o + 1), s = (32767 & g) - (i >>> 15) - n, n = 1 & s >>> 15, this.__setDigit(t + _.length, 1073709056 & g | 32767 & s));
        } else {
          t >>= 1;
          var _g = 0;
          for (; _g < _.length - 1; _g++) {
            var _i3 = this.__digit(t + _g),
              _e2 = _.__digit(_g),
              _s = (32767 & _i3) - (32767 & _e2) - n;
            n = 1 & _s >>> 15;
            var _o = (_i3 >>> 15) - (_e2 >>> 15) - n;
            n = 1 & _o >>> 15, this.__setDigit(t + _g, (32767 & _o) << 15 | 32767 & _s);
          }
          var _i4 = this.__digit(t + _g),
            _s2 = _.__digit(_g),
            _o2 = (32767 & _i4) - (32767 & _s2) - n;
          n = 1 & _o2 >>> 15;
          var _l = 0;
          0 == (1 & e) && (_l = (_i4 >>> 15) - (_s2 >>> 15) - n, n = 1 & _l >>> 15), this.__setDigit(t + _g, (32767 & _l) << 15 | 32767 & _o2);
        }
        return n;
      }
    }, {
      key: "__inplaceRightShift",
      value: function __inplaceRightShift(_) {
        if (0 === _) return;
        var t = this.__digit(0) >>> _;
        var e = this.length - 1;
        for (var n = 0; n < e; n++) {
          var i = this.__digit(n + 1);
          this.__setDigit(n, 1073741823 & i << 30 - _ | t), t = i >>> _;
        }
        this.__setDigit(e, t);
      }
    }, {
      key: "__digit",
      value: function __digit(_) {
        return this[_];
      }
    }, {
      key: "__unsignedDigit",
      value: function __unsignedDigit(_) {
        return this[_] >>> 0;
      }
    }, {
      key: "__setDigit",
      value: function __setDigit(_, i) {
        this[_] = 0 | i;
      }
    }, {
      key: "__setDigitGrow",
      value: function __setDigitGrow(_, i) {
        this[_] = 0 | i;
      }
    }, {
      key: "__halfDigitLength",
      value: function __halfDigitLength() {
        var i = this.length;
        return 32767 >= this.__unsignedDigit(i - 1) ? 2 * i - 1 : 2 * i;
      }
    }, {
      key: "__halfDigit",
      value: function __halfDigit(_) {
        return 32767 & this[_ >>> 1] >>> 15 * (1 & _);
      }
    }, {
      key: "__setHalfDigit",
      value: function __setHalfDigit(_, i) {
        var t = _ >>> 1,
          e = this.__digit(t),
          n = 1 & _ ? 32767 & e | i << 15 : 1073709056 & e | 32767 & i;
        this.__setDigit(t, n);
      }
    }], [{
      key: "BigInt",
      value: function BigInt(i) {
        var _ = Math.floor,
          t = Number.isFinite;
        if ("number" == typeof i) {
          if (0 === i) return JSBI.__zero();
          if (JSBI.__isOneDigitInt(i)) return 0 > i ? JSBI.__oneDigit(-i, !0) : JSBI.__oneDigit(i, !1);
          if (!t(i) || _(i) !== i) throw new RangeError("The number " + i + " cannot be converted to BigInt because it is not an integer");
          return JSBI.__fromDouble(i);
        }
        if ("string" == typeof i) {
          var _3 = JSBI.__fromString(i);
          if (null === _3) throw new SyntaxError("Cannot convert " + i + " to a BigInt");
          return _3;
        }
        if ("boolean" == typeof i) return !0 === i ? JSBI.__oneDigit(1, !1) : JSBI.__zero();
        if ("object" == _typeof(i)) {
          if (i.constructor === JSBI) return i;
          var _4 = JSBI.__toPrimitive(i);
          return JSBI.BigInt(_4);
        }
        throw new TypeError("Cannot convert " + i + " to a BigInt");
      }
    }, {
      key: "toNumber",
      value: function toNumber(i) {
        var _ = i.length;
        if (0 === _) return 0;
        if (1 === _) {
          var _5 = i.__unsignedDigit(0);
          return i.sign ? -_5 : _5;
        }
        var t = i.__digit(_ - 1),
          e = JSBI.__clz30(t),
          n = 30 * _ - e;
        if (1024 < n) return i.sign ? -Infinity : 1 / 0;
        var g = n - 1,
          s = t,
          o = _ - 1;
        var l = e + 3;
        var r = 32 === l ? 0 : s << l;
        r >>>= 12;
        var a = l - 12;
        var u = 12 <= l ? 0 : s << 20 + l,
          d = 20 + l;
        for (0 < a && 0 < o && (o--, s = i.__digit(o), r |= s >>> 30 - a, u = s << a + 2, d = a + 2); 0 < d && 0 < o;) o--, s = i.__digit(o), u |= 30 <= d ? s << d - 30 : s >>> 30 - d, d -= 30;
        var h = JSBI.__decideRounding(i, d, o, s);
        if ((1 === h || 0 === h && 1 == (1 & u)) && (u = u + 1 >>> 0, 0 === u && (r++, 0 != r >>> 20 && (r = 0, g++, 1023 < g)))) return i.sign ? -Infinity : 1 / 0;
        var m = i.sign ? -2147483648 : 0;
        return g = g + 1023 << 20, JSBI.__kBitConversionInts[1] = m | g | r, JSBI.__kBitConversionInts[0] = u, JSBI.__kBitConversionDouble[0];
      }
    }, {
      key: "unaryMinus",
      value: function unaryMinus(i) {
        if (0 === i.length) return i;
        var _ = i.__copy();
        return _.sign = !i.sign, _;
      }
    }, {
      key: "bitwiseNot",
      value: function bitwiseNot(i) {
        return i.sign ? JSBI.__absoluteSubOne(i).__trim() : JSBI.__absoluteAddOne(i, !0);
      }
    }, {
      key: "exponentiate",
      value: function exponentiate(i, _) {
        if (_.sign) throw new RangeError("Exponent must be positive");
        if (0 === _.length) return JSBI.__oneDigit(1, !1);
        if (0 === i.length) return i;
        if (1 === i.length && 1 === i.__digit(0)) return i.sign && 0 == (1 & _.__digit(0)) ? JSBI.unaryMinus(i) : i;
        if (1 < _.length) throw new RangeError("BigInt too big");
        var t = _.__unsignedDigit(0);
        if (1 === t) return i;
        if (t >= JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big");
        if (1 === i.length && 2 === i.__digit(0)) {
          var _6 = 1 + (0 | t / 30),
            _e3 = i.sign && 0 != (1 & t),
            _n = new JSBI(_6, _e3);
          _n.__initializeDigits();
          var g = 1 << t % 30;
          return _n.__setDigit(_6 - 1, g), _n;
        }
        var e = null,
          n = i;
        for (0 != (1 & t) && (e = i), t >>= 1; 0 !== t; t >>= 1) n = JSBI.multiply(n, n), 0 != (1 & t) && (null === e ? e = n : e = JSBI.multiply(e, n));
        return e;
      }
    }, {
      key: "multiply",
      value: function multiply(_, t) {
        if (0 === _.length) return _;
        if (0 === t.length) return t;
        var i = _.length + t.length;
        30 <= _.__clzmsd() + t.__clzmsd() && i--;
        var e = new JSBI(i, _.sign !== t.sign);
        e.__initializeDigits();
        for (var n = 0; n < _.length; n++) JSBI.__multiplyAccumulate(t, _.__digit(n), e, n);
        return e.__trim();
      }
    }, {
      key: "divide",
      value: function divide(i, _) {
        if (0 === _.length) throw new RangeError("Division by zero");
        if (0 > JSBI.__absoluteCompare(i, _)) return JSBI.__zero();
        var t = i.sign !== _.sign,
          e = _.__unsignedDigit(0);
        var n;
        if (1 === _.length && 32767 >= e) {
          if (1 === e) return t === i.sign ? i : JSBI.unaryMinus(i);
          n = JSBI.__absoluteDivSmall(i, e, null);
        } else n = JSBI.__absoluteDivLarge(i, _, !0, !1);
        return n.sign = t, n.__trim();
      }
    }, {
      key: "remainder",
      value: function remainder(i, _) {
        if (0 === _.length) throw new RangeError("Division by zero");
        if (0 > JSBI.__absoluteCompare(i, _)) return i;
        var t = _.__unsignedDigit(0);
        if (1 === _.length && 32767 >= t) {
          if (1 === t) return JSBI.__zero();
          var _7 = JSBI.__absoluteModSmall(i, t);
          return 0 === _7 ? JSBI.__zero() : JSBI.__oneDigit(_7, i.sign);
        }
        var e = JSBI.__absoluteDivLarge(i, _, !1, !0);
        return e.sign = i.sign, e.__trim();
      }
    }, {
      key: "add",
      value: function add(i, _) {
        var t = i.sign;
        return t === _.sign ? JSBI.__absoluteAdd(i, _, t) : 0 <= JSBI.__absoluteCompare(i, _) ? JSBI.__absoluteSub(i, _, t) : JSBI.__absoluteSub(_, i, !t);
      }
    }, {
      key: "subtract",
      value: function subtract(i, _) {
        var t = i.sign;
        return t === _.sign ? 0 <= JSBI.__absoluteCompare(i, _) ? JSBI.__absoluteSub(i, _, t) : JSBI.__absoluteSub(_, i, !t) : JSBI.__absoluteAdd(i, _, t);
      }
    }, {
      key: "leftShift",
      value: function leftShift(i, _) {
        return 0 === _.length || 0 === i.length ? i : _.sign ? JSBI.__rightShiftByAbsolute(i, _) : JSBI.__leftShiftByAbsolute(i, _);
      }
    }, {
      key: "signedRightShift",
      value: function signedRightShift(i, _) {
        return 0 === _.length || 0 === i.length ? i : _.sign ? JSBI.__leftShiftByAbsolute(i, _) : JSBI.__rightShiftByAbsolute(i, _);
      }
    }, {
      key: "unsignedRightShift",
      value: function unsignedRightShift() {
        throw new TypeError("BigInts have no unsigned right shift; use >> instead");
      }
    }, {
      key: "lessThan",
      value: function lessThan(i, _) {
        return 0 > JSBI.__compareToBigInt(i, _);
      }
    }, {
      key: "lessThanOrEqual",
      value: function lessThanOrEqual(i, _) {
        return 0 >= JSBI.__compareToBigInt(i, _);
      }
    }, {
      key: "greaterThan",
      value: function greaterThan(i, _) {
        return 0 < JSBI.__compareToBigInt(i, _);
      }
    }, {
      key: "greaterThanOrEqual",
      value: function greaterThanOrEqual(i, _) {
        return 0 <= JSBI.__compareToBigInt(i, _);
      }
    }, {
      key: "equal",
      value: function equal(_, t) {
        if (_.sign !== t.sign) return !1;
        if (_.length !== t.length) return !1;
        for (var e = 0; e < _.length; e++) if (_.__digit(e) !== t.__digit(e)) return !1;
        return !0;
      }
    }, {
      key: "notEqual",
      value: function notEqual(i, _) {
        return !JSBI.equal(i, _);
      }
    }, {
      key: "bitwiseAnd",
      value: function bitwiseAnd(i, _) {
        var _ref;
        var t = Math.max;
        if (!i.sign && !_.sign) return JSBI.__absoluteAnd(i, _).__trim();
        if (i.sign && _.sign) {
          var e = t(i.length, _.length) + 1;
          var n = JSBI.__absoluteSubOne(i, e);
          var g = JSBI.__absoluteSubOne(_);
          return n = JSBI.__absoluteOr(n, g, n), JSBI.__absoluteAddOne(n, !0, n).__trim();
        }
        return i.sign && (_ref = [_, i], i = _ref[0], _ = _ref[1], _ref), JSBI.__absoluteAndNot(i, JSBI.__absoluteSubOne(_)).__trim();
      }
    }, {
      key: "bitwiseXor",
      value: function bitwiseXor(i, _) {
        var _ref2;
        var t = Math.max;
        if (!i.sign && !_.sign) return JSBI.__absoluteXor(i, _).__trim();
        if (i.sign && _.sign) {
          var _e4 = t(i.length, _.length),
            _n2 = JSBI.__absoluteSubOne(i, _e4),
            g = JSBI.__absoluteSubOne(_);
          return JSBI.__absoluteXor(_n2, g, _n2).__trim();
        }
        var e = t(i.length, _.length) + 1;
        i.sign && (_ref2 = [_, i], i = _ref2[0], _ = _ref2[1], _ref2);
        var n = JSBI.__absoluteSubOne(_, e);
        return n = JSBI.__absoluteXor(n, i, n), JSBI.__absoluteAddOne(n, !0, n).__trim();
      }
    }, {
      key: "bitwiseOr",
      value: function bitwiseOr(i, _) {
        var _ref3;
        var t = Math.max;
        var e = t(i.length, _.length);
        if (!i.sign && !_.sign) return JSBI.__absoluteOr(i, _).__trim();
        if (i.sign && _.sign) {
          var _t2 = JSBI.__absoluteSubOne(i, e);
          var _n3 = JSBI.__absoluteSubOne(_);
          return _t2 = JSBI.__absoluteAnd(_t2, _n3, _t2), JSBI.__absoluteAddOne(_t2, !0, _t2).__trim();
        }
        i.sign && (_ref3 = [_, i], i = _ref3[0], _ = _ref3[1], _ref3);
        var n = JSBI.__absoluteSubOne(_, e);
        return n = JSBI.__absoluteAndNot(n, i, n), JSBI.__absoluteAddOne(n, !0, n).__trim();
      }
    }, {
      key: "asIntN",
      value: function asIntN(_, t) {
        var i = Math.floor;
        if (0 === t.length) return t;
        if (_ = i(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
        if (0 === _) return JSBI.__zero();
        if (_ >= JSBI.__kMaxLengthBits) return t;
        var e = 0 | (_ + 29) / 30;
        if (t.length < e) return t;
        var g = t.__unsignedDigit(e - 1),
          s = 1 << (_ - 1) % 30;
        if (t.length === e && g < s) return t;
        if (!((g & s) === s)) return JSBI.__truncateToNBits(_, t);
        if (!t.sign) return JSBI.__truncateAndSubFromPowerOfTwo(_, t, !0);
        if (0 == (g & s - 1)) {
          for (var n = e - 2; 0 <= n; n--) if (0 !== t.__digit(n)) return JSBI.__truncateAndSubFromPowerOfTwo(_, t, !1);
          return t.length === e && g === s ? t : JSBI.__truncateToNBits(_, t);
        }
        return JSBI.__truncateAndSubFromPowerOfTwo(_, t, !1);
      }
    }, {
      key: "asUintN",
      value: function asUintN(i, _) {
        var t = Math.floor;
        if (0 === _.length) return _;
        if (i = t(i), 0 > i) throw new RangeError("Invalid value: not (convertible to) a safe integer");
        if (0 === i) return JSBI.__zero();
        if (_.sign) {
          if (i > JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big");
          return JSBI.__truncateAndSubFromPowerOfTwo(i, _, !1);
        }
        if (i >= JSBI.__kMaxLengthBits) return _;
        var e = 0 | (i + 29) / 30;
        if (_.length < e) return _;
        var g = i % 30;
        if (_.length == e) {
          if (0 === g) return _;
          var _i5 = _.__digit(e - 1);
          if (0 == _i5 >>> g) return _;
        }
        return JSBI.__truncateToNBits(i, _);
      }
    }, {
      key: "ADD",
      value: function ADD(i, _) {
        if (i = JSBI.__toPrimitive(i), _ = JSBI.__toPrimitive(_), "string" == typeof i) return "string" != typeof _ && (_ = _.toString()), i + _;
        if ("string" == typeof _) return i.toString() + _;
        if (i = JSBI.__toNumeric(i), _ = JSBI.__toNumeric(_), JSBI.__isBigInt(i) && JSBI.__isBigInt(_)) return JSBI.add(i, _);
        if ("number" == typeof i && "number" == typeof _) return i + _;
        throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
      }
    }, {
      key: "LT",
      value: function LT(i, _) {
        return JSBI.__compare(i, _, 0);
      }
    }, {
      key: "LE",
      value: function LE(i, _) {
        return JSBI.__compare(i, _, 1);
      }
    }, {
      key: "GT",
      value: function GT(i, _) {
        return JSBI.__compare(i, _, 2);
      }
    }, {
      key: "GE",
      value: function GE(i, _) {
        return JSBI.__compare(i, _, 3);
      }
    }, {
      key: "EQ",
      value: function EQ(i, _) {
        for (;;) {
          if (JSBI.__isBigInt(i)) return JSBI.__isBigInt(_) ? JSBI.equal(i, _) : JSBI.EQ(_, i);
          if ("number" == typeof i) {
            if (JSBI.__isBigInt(_)) return JSBI.__equalToNumber(_, i);
            if ("object" != _typeof(_)) return i == _;
            _ = JSBI.__toPrimitive(_);
          } else if ("string" == typeof i) {
            if (JSBI.__isBigInt(_)) return i = JSBI.__fromString(i), null !== i && JSBI.equal(i, _);
            if ("object" != _typeof(_)) return i == _;
            _ = JSBI.__toPrimitive(_);
          } else if ("boolean" == typeof i) {
            if (JSBI.__isBigInt(_)) return JSBI.__equalToNumber(_, +i);
            if ("object" != _typeof(_)) return i == _;
            _ = JSBI.__toPrimitive(_);
          } else if ("symbol" == _typeof(i)) {
            if (JSBI.__isBigInt(_)) return !1;
            if ("object" != _typeof(_)) return i == _;
            _ = JSBI.__toPrimitive(_);
          } else if ("object" == _typeof(i)) {
            if ("object" == _typeof(_) && _.constructor !== JSBI) return i == _;
            i = JSBI.__toPrimitive(i);
          } else return i == _;
        }
      }
    }, {
      key: "NE",
      value: function NE(i, _) {
        return !JSBI.EQ(i, _);
      }
    }, {
      key: "DataViewGetBigInt64",
      value: function DataViewGetBigInt64(i, _) {
        var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        return JSBI.asIntN(64, JSBI.DataViewGetBigUint64(i, _, t));
      }
    }, {
      key: "DataViewGetBigUint64",
      value: function DataViewGetBigUint64(i, _) {
        var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        var _ref4 = t ? [4, 0] : [0, 4],
          _ref5 = _slicedToArray(_ref4, 2),
          e = _ref5[0],
          n = _ref5[1],
          g = i.getUint32(_ + e, t),
          s = i.getUint32(_ + n, t),
          o = new JSBI(3, !1);
        return o.__setDigit(0, 1073741823 & s), o.__setDigit(1, (268435455 & g) << 2 | s >>> 30), o.__setDigit(2, g >>> 28), o.__trim();
      }
    }, {
      key: "DataViewSetBigInt64",
      value: function DataViewSetBigInt64(i, _, t) {
        var e = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        JSBI.DataViewSetBigUint64(i, _, t, e);
      }
    }, {
      key: "DataViewSetBigUint64",
      value: function DataViewSetBigUint64(i, _, t) {
        var e = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        t = JSBI.asUintN(64, t);
        var n = 0,
          g = 0;
        if (0 < t.length && (g = t.__digit(0), 1 < t.length)) {
          var _i6 = t.__digit(1);
          g |= _i6 << 30, n = _i6 >>> 2, 2 < t.length && (n |= t.__digit(2) << 28);
        }
        var _ref6 = e ? [4, 0] : [0, 4],
          _ref7 = _slicedToArray(_ref6, 2),
          s = _ref7[0],
          o = _ref7[1];
        i.setUint32(_ + s, n, e), i.setUint32(_ + o, g, e);
      }
    }, {
      key: "__zero",
      value: function __zero() {
        return new JSBI(0, !1);
      }
    }, {
      key: "__oneDigit",
      value: function __oneDigit(i, _) {
        var t = new JSBI(1, _);
        return t.__setDigit(0, i), t;
      }
    }, {
      key: "__decideRounding",
      value: function __decideRounding(i, _, t, e) {
        if (0 < _) return -1;
        var n;
        if (0 > _) n = -_ - 1;else {
          if (0 === t) return -1;
          t--, e = i.__digit(t), n = 29;
        }
        var g = 1 << n;
        if (0 == (e & g)) return -1;
        if (g -= 1, 0 != (e & g)) return 1;
        for (; 0 < t;) if (t--, 0 !== i.__digit(t)) return 1;
        return 0;
      }
    }, {
      key: "__fromDouble",
      value: function __fromDouble(i) {
        JSBI.__kBitConversionDouble[0] = i;
        var _ = 2047 & JSBI.__kBitConversionInts[1] >>> 20,
          t = _ - 1023,
          e = (0 | t / 30) + 1,
          n = new JSBI(e, 0 > i);
        var g = 1048575 & JSBI.__kBitConversionInts[1] | 1048576,
          s = JSBI.__kBitConversionInts[0];
        var o = 20,
          l = t % 30;
        var r,
          a = 0;
        if (l < 20) {
          var _i7 = o - l;
          a = _i7 + 32, r = g >>> _i7, g = g << 32 - _i7 | s >>> _i7, s <<= 32 - _i7;
        } else if (l === 20) a = 32, r = g, g = s, s = 0;else {
          var _i8 = l - o;
          a = 32 - _i8, r = g << _i8 | s >>> 32 - _i8, g = s << _i8, s = 0;
        }
        n.__setDigit(e - 1, r);
        for (var _8 = e - 2; 0 <= _8; _8--) 0 < a ? (a -= 30, r = g >>> 2, g = g << 30 | s >>> 2, s <<= 30) : r = 0, n.__setDigit(_8, r);
        return n.__trim();
      }
    }, {
      key: "__isWhitespace",
      value: function __isWhitespace(i) {
        return !!(13 >= i && 9 <= i) || (159 >= i ? 32 == i : 131071 >= i ? 160 == i || 5760 == i : 196607 >= i ? (i &= 131071, 10 >= i || 40 == i || 41 == i || 47 == i || 95 == i || 4096 == i) : 65279 == i);
      }
    }, {
      key: "__fromString",
      value: function __fromString(i) {
        var _ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var t = 0;
        var e = i.length;
        var n = 0;
        if (n === e) return JSBI.__zero();
        var g = i.charCodeAt(n);
        for (; JSBI.__isWhitespace(g);) {
          if (++n === e) return JSBI.__zero();
          g = i.charCodeAt(n);
        }
        if (43 === g) {
          if (++n === e) return null;
          g = i.charCodeAt(n), t = 1;
        } else if (45 === g) {
          if (++n === e) return null;
          g = i.charCodeAt(n), t = -1;
        }
        if (0 === _) {
          if (_ = 10, 48 === g) {
            if (++n === e) return JSBI.__zero();
            if (g = i.charCodeAt(n), 88 === g || 120 === g) {
              if (_ = 16, ++n === e) return null;
              g = i.charCodeAt(n);
            } else if (79 === g || 111 === g) {
              if (_ = 8, ++n === e) return null;
              g = i.charCodeAt(n);
            } else if (66 === g || 98 === g) {
              if (_ = 2, ++n === e) return null;
              g = i.charCodeAt(n);
            }
          }
        } else if (16 === _ && 48 === g) {
          if (++n === e) return JSBI.__zero();
          if (g = i.charCodeAt(n), 88 === g || 120 === g) {
            if (++n === e) return null;
            g = i.charCodeAt(n);
          }
        }
        if (0 != t && 10 !== _) return null;
        for (; 48 === g;) {
          if (++n === e) return JSBI.__zero();
          g = i.charCodeAt(n);
        }
        var s = e - n;
        var o = JSBI.__kMaxBitsPerChar[_],
          l = JSBI.__kBitsPerCharTableMultiplier - 1;
        if (s > 1073741824 / o) return null;
        var r = o * s + l >>> JSBI.__kBitsPerCharTableShift,
          a = new JSBI(0 | (r + 29) / 30, !1),
          u = 10 > _ ? _ : 10,
          h = 10 < _ ? _ - 10 : 0;
        if (0 == (_ & _ - 1)) {
          o >>= JSBI.__kBitsPerCharTableShift;
          var _9 = [],
            _t3 = [];
          var _s3 = !1;
          do {
            var _l2 = 0,
              _r = 0;
            for (;;) {
              var _10 = void 0;
              if (g - 48 >>> 0 < u) _10 = g - 48;else if ((32 | g) - 97 >>> 0 < h) _10 = (32 | g) - 87;else {
                _s3 = !0;
                break;
              }
              if (_r += o, _l2 = _l2 << o | _10, ++n === e) {
                _s3 = !0;
                break;
              }
              if (g = i.charCodeAt(n), 30 < _r + o) break;
            }
            _9.push(_l2), _t3.push(_r);
          } while (!_s3);
          JSBI.__fillFromParts(a, _9, _t3);
        } else {
          a.__initializeDigits();
          var _t4 = !1,
            _s4 = 0;
          do {
            var _r2 = 0,
              b = 1;
            for (;;) {
              var _o3 = void 0;
              if (g - 48 >>> 0 < u) _o3 = g - 48;else if ((32 | g) - 97 >>> 0 < h) _o3 = (32 | g) - 87;else {
                _t4 = !0;
                break;
              }
              var _l3 = b * _;
              if (1073741823 < _l3) break;
              if (b = _l3, _r2 = _r2 * _ + _o3, _s4++, ++n === e) {
                _t4 = !0;
                break;
              }
              g = i.charCodeAt(n);
            }
            l = 30 * JSBI.__kBitsPerCharTableMultiplier - 1;
            var D = 0 | (o * _s4 + l >>> JSBI.__kBitsPerCharTableShift) / 30;
            a.__inplaceMultiplyAdd(b, _r2, D);
          } while (!_t4);
        }
        if (n !== e) {
          if (!JSBI.__isWhitespace(g)) return null;
          for (n++; n < e; n++) if (g = i.charCodeAt(n), !JSBI.__isWhitespace(g)) return null;
        }
        return a.sign = -1 == t, a.__trim();
      }
    }, {
      key: "__fillFromParts",
      value: function __fillFromParts(_, t, e) {
        var n = 0,
          g = 0,
          s = 0;
        for (var o = t.length - 1; 0 <= o; o--) {
          var i = t[o],
            l = e[o];
          g |= i << s, s += l, 30 === s ? (_.__setDigit(n++, g), s = 0, g = 0) : 30 < s && (_.__setDigit(n++, 1073741823 & g), s -= 30, g = i >>> l - s);
        }
        if (0 !== g) {
          if (n >= _.length) throw new Error("implementation bug");
          _.__setDigit(n++, g);
        }
        for (; n < _.length; n++) _.__setDigit(n, 0);
      }
    }, {
      key: "__toStringBasePowerOfTwo",
      value: function __toStringBasePowerOfTwo(_, i) {
        var t = _.length;
        var e = i - 1;
        e = (85 & e >>> 1) + (85 & e), e = (51 & e >>> 2) + (51 & e), e = (15 & e >>> 4) + (15 & e);
        var n = e,
          g = i - 1,
          s = _.__digit(t - 1),
          o = JSBI.__clz30(s);
        var l = 0 | (30 * t - o + n - 1) / n;
        if (_.sign && l++, 268435456 < l) throw new Error("string too long");
        var r = Array(l);
        var a = l - 1,
          u = 0,
          d = 0;
        for (var _e5 = 0; _e5 < t - 1; _e5++) {
          var _i9 = _.__digit(_e5),
            _t5 = (u | _i9 << d) & g;
          r[a--] = JSBI.__kConversionChars[_t5];
          var _s5 = n - d;
          for (u = _i9 >>> _s5, d = 30 - _s5; d >= n;) r[a--] = JSBI.__kConversionChars[u & g], u >>>= n, d -= n;
        }
        var h = (u | s << d) & g;
        for (r[a--] = JSBI.__kConversionChars[h], u = s >>> n - d; 0 !== u;) r[a--] = JSBI.__kConversionChars[u & g], u >>>= n;
        if (_.sign && (r[a--] = "-"), -1 != a) throw new Error("implementation bug");
        return r.join("");
      }
    }, {
      key: "__toStringGeneric",
      value: function __toStringGeneric(_, i, t) {
        var e = _.length;
        if (0 === e) return "";
        if (1 === e) {
          var _e6 = _.__unsignedDigit(0).toString(i);
          return !1 === t && _.sign && (_e6 = "-" + _e6), _e6;
        }
        var n = 30 * e - JSBI.__clz30(_.__digit(e - 1)),
          g = JSBI.__kMaxBitsPerChar[i],
          s = g - 1;
        var o = n * JSBI.__kBitsPerCharTableMultiplier;
        o += s - 1, o = 0 | o / s;
        var l = o + 1 >> 1,
          r = JSBI.exponentiate(JSBI.__oneDigit(i, !1), JSBI.__oneDigit(l, !1));
        var a, u;
        var d = r.__unsignedDigit(0);
        if (1 === r.length && 32767 >= d) {
          a = new JSBI(_.length, !1), a.__initializeDigits();
          var _t6 = 0;
          for (var _e7 = 2 * _.length - 1; 0 <= _e7; _e7--) {
            var _i10 = _t6 << 15 | _.__halfDigit(_e7);
            a.__setHalfDigit(_e7, 0 | _i10 / d), _t6 = 0 | _i10 % d;
          }
          u = _t6.toString(i);
        } else {
          var _t7 = JSBI.__absoluteDivLarge(_, r, !0, !0);
          a = _t7.quotient;
          var _e8 = _t7.remainder.__trim();
          u = JSBI.__toStringGeneric(_e8, i, !0);
        }
        a.__trim();
        var h = JSBI.__toStringGeneric(a, i, !0);
        for (; u.length < l;) u = "0" + u;
        return !1 === t && _.sign && (h = "-" + h), h + u;
      }
    }, {
      key: "__unequalSign",
      value: function __unequalSign(i) {
        return i ? -1 : 1;
      }
    }, {
      key: "__absoluteGreater",
      value: function __absoluteGreater(i) {
        return i ? -1 : 1;
      }
    }, {
      key: "__absoluteLess",
      value: function __absoluteLess(i) {
        return i ? 1 : -1;
      }
    }, {
      key: "__compareToBigInt",
      value: function __compareToBigInt(i, _) {
        var t = i.sign;
        if (t !== _.sign) return JSBI.__unequalSign(t);
        var e = JSBI.__absoluteCompare(i, _);
        return 0 < e ? JSBI.__absoluteGreater(t) : 0 > e ? JSBI.__absoluteLess(t) : 0;
      }
    }, {
      key: "__compareToNumber",
      value: function __compareToNumber(i, _) {
        if (JSBI.__isOneDigitInt(_)) {
          var t = i.sign,
            e = 0 > _;
          if (t !== e) return JSBI.__unequalSign(t);
          if (0 === i.length) {
            if (e) throw new Error("implementation bug");
            return 0 === _ ? 0 : -1;
          }
          if (1 < i.length) return JSBI.__absoluteGreater(t);
          var n = Math.abs(_),
            g = i.__unsignedDigit(0);
          return g > n ? JSBI.__absoluteGreater(t) : g < n ? JSBI.__absoluteLess(t) : 0;
        }
        return JSBI.__compareToDouble(i, _);
      }
    }, {
      key: "__compareToDouble",
      value: function __compareToDouble(i, _) {
        if (_ !== _) return _;
        if (_ === 1 / 0) return -1;
        if (_ === -Infinity) return 1;
        var t = i.sign;
        if (t !== 0 > _) return JSBI.__unequalSign(t);
        if (0 === _) throw new Error("implementation bug: should be handled elsewhere");
        if (0 === i.length) return -1;
        JSBI.__kBitConversionDouble[0] = _;
        var e = 2047 & JSBI.__kBitConversionInts[1] >>> 20;
        if (2047 == e) throw new Error("implementation bug: handled elsewhere");
        var n = e - 1023;
        if (0 > n) return JSBI.__absoluteGreater(t);
        var g = i.length;
        var s = i.__digit(g - 1);
        var o = JSBI.__clz30(s),
          l = 30 * g - o,
          r = n + 1;
        if (l < r) return JSBI.__absoluteLess(t);
        if (l > r) return JSBI.__absoluteGreater(t);
        var a = 1048576 | 1048575 & JSBI.__kBitConversionInts[1],
          u = JSBI.__kBitConversionInts[0];
        var d = 20,
          h = 29 - o;
        if (h !== (0 | (l - 1) % 30)) throw new Error("implementation bug");
        var m,
          b = 0;
        if (20 > h) {
          var _i11 = d - h;
          b = _i11 + 32, m = a >>> _i11, a = a << 32 - _i11 | u >>> _i11, u <<= 32 - _i11;
        } else if (20 === h) b = 32, m = a, a = u, u = 0;else {
          var _i12 = h - d;
          b = 32 - _i12, m = a << _i12 | u >>> 32 - _i12, a = u << _i12, u = 0;
        }
        if (s >>>= 0, m >>>= 0, s > m) return JSBI.__absoluteGreater(t);
        if (s < m) return JSBI.__absoluteLess(t);
        for (var _e9 = g - 2; 0 <= _e9; _e9--) {
          0 < b ? (b -= 30, m = a >>> 2, a = a << 30 | u >>> 2, u <<= 30) : m = 0;
          var _11 = i.__unsignedDigit(_e9);
          if (_11 > m) return JSBI.__absoluteGreater(t);
          if (_11 < m) return JSBI.__absoluteLess(t);
        }
        if (0 !== a || 0 !== u) {
          if (0 === b) throw new Error("implementation bug");
          return JSBI.__absoluteLess(t);
        }
        return 0;
      }
    }, {
      key: "__equalToNumber",
      value: function __equalToNumber(i, _) {
        var t = Math.abs;
        return JSBI.__isOneDigitInt(_) ? 0 === _ ? 0 === i.length : 1 === i.length && i.sign === 0 > _ && i.__unsignedDigit(0) === t(_) : 0 === JSBI.__compareToDouble(i, _);
      }
    }, {
      key: "__comparisonResultToBool",
      value: function __comparisonResultToBool(i, _) {
        return 0 === _ ? 0 > i : 1 === _ ? 0 >= i : 2 === _ ? 0 < i : 3 === _ ? 0 <= i : void 0;
      }
    }, {
      key: "__compare",
      value: function __compare(i, _, t) {
        if (i = JSBI.__toPrimitive(i), _ = JSBI.__toPrimitive(_), "string" == typeof i && "string" == typeof _) switch (t) {
          case 0:
            return i < _;
          case 1:
            return i <= _;
          case 2:
            return i > _;
          case 3:
            return i >= _;
        }
        if (JSBI.__isBigInt(i) && "string" == typeof _) return _ = JSBI.__fromString(_), null !== _ && JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i, _), t);
        if ("string" == typeof i && JSBI.__isBigInt(_)) return i = JSBI.__fromString(i), null !== i && JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i, _), t);
        if (i = JSBI.__toNumeric(i), _ = JSBI.__toNumeric(_), JSBI.__isBigInt(i)) {
          if (JSBI.__isBigInt(_)) return JSBI.__comparisonResultToBool(JSBI.__compareToBigInt(i, _), t);
          if ("number" != typeof _) throw new Error("implementation bug");
          return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(i, _), t);
        }
        if ("number" != typeof i) throw new Error("implementation bug");
        if (JSBI.__isBigInt(_)) return JSBI.__comparisonResultToBool(JSBI.__compareToNumber(_, i), 2 ^ t);
        if ("number" != typeof _) throw new Error("implementation bug");
        return 0 === t ? i < _ : 1 === t ? i <= _ : 2 === t ? i > _ : 3 === t ? i >= _ : void 0;
      }
    }, {
      key: "__absoluteAdd",
      value: function __absoluteAdd(_, t, e) {
        if (_.length < t.length) return JSBI.__absoluteAdd(t, _, e);
        if (0 === _.length) return _;
        if (0 === t.length) return _.sign === e ? _ : JSBI.unaryMinus(_);
        var n = _.length;
        (0 === _.__clzmsd() || t.length === _.length && 0 === t.__clzmsd()) && n++;
        var g = new JSBI(n, e);
        var s = 0,
          o = 0;
        for (; o < t.length; o++) {
          var i = _.__digit(o) + t.__digit(o) + s;
          s = i >>> 30, g.__setDigit(o, 1073741823 & i);
        }
        for (; o < _.length; o++) {
          var _i13 = _.__digit(o) + s;
          s = _i13 >>> 30, g.__setDigit(o, 1073741823 & _i13);
        }
        return o < g.length && g.__setDigit(o, s), g.__trim();
      }
    }, {
      key: "__absoluteSub",
      value: function __absoluteSub(_, t, e) {
        if (0 === _.length) return _;
        if (0 === t.length) return _.sign === e ? _ : JSBI.unaryMinus(_);
        var n = new JSBI(_.length, e);
        var g = 0,
          s = 0;
        for (; s < t.length; s++) {
          var i = _.__digit(s) - t.__digit(s) - g;
          g = 1 & i >>> 30, n.__setDigit(s, 1073741823 & i);
        }
        for (; s < _.length; s++) {
          var _i14 = _.__digit(s) - g;
          g = 1 & _i14 >>> 30, n.__setDigit(s, 1073741823 & _i14);
        }
        return n.__trim();
      }
    }, {
      key: "__absoluteAddOne",
      value: function __absoluteAddOne(_, i) {
        var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var e = _.length;
        null === t ? t = new JSBI(e, i) : t.sign = i;
        var n = 1;
        for (var g = 0; g < e; g++) {
          var _i15 = _.__digit(g) + n;
          n = _i15 >>> 30, t.__setDigit(g, 1073741823 & _i15);
        }
        return 0 != n && t.__setDigitGrow(e, 1), t;
      }
    }, {
      key: "__absoluteSubOne",
      value: function __absoluteSubOne(_, t) {
        var e = _.length;
        t = t || e;
        var n = new JSBI(t, !1);
        var g = 1;
        for (var s = 0; s < e; s++) {
          var i = _.__digit(s) - g;
          g = 1 & i >>> 30, n.__setDigit(s, 1073741823 & i);
        }
        if (0 != g) throw new Error("implementation bug");
        for (var _g2 = e; _g2 < t; _g2++) n.__setDigit(_g2, 0);
        return n;
      }
    }, {
      key: "__absoluteAnd",
      value: function __absoluteAnd(_, t) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var n = _.length,
          g = t.length,
          s = g;
        if (n < g) {
          s = n;
          var i = _,
            _e10 = n;
          _ = t, n = g, t = i, g = _e10;
        }
        var o = s;
        null === e ? e = new JSBI(o, !1) : o = e.length;
        var l = 0;
        for (; l < s; l++) e.__setDigit(l, _.__digit(l) & t.__digit(l));
        for (; l < o; l++) e.__setDigit(l, 0);
        return e;
      }
    }, {
      key: "__absoluteAndNot",
      value: function __absoluteAndNot(_, t) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var n = _.length,
          g = t.length;
        var s = g;
        n < g && (s = n);
        var o = n;
        null === e ? e = new JSBI(o, !1) : o = e.length;
        var l = 0;
        for (; l < s; l++) e.__setDigit(l, _.__digit(l) & ~t.__digit(l));
        for (; l < n; l++) e.__setDigit(l, _.__digit(l));
        for (; l < o; l++) e.__setDigit(l, 0);
        return e;
      }
    }, {
      key: "__absoluteOr",
      value: function __absoluteOr(_, t) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var n = _.length,
          g = t.length,
          s = g;
        if (n < g) {
          s = n;
          var i = _,
            _e11 = n;
          _ = t, n = g, t = i, g = _e11;
        }
        var o = n;
        null === e ? e = new JSBI(o, !1) : o = e.length;
        var l = 0;
        for (; l < s; l++) e.__setDigit(l, _.__digit(l) | t.__digit(l));
        for (; l < n; l++) e.__setDigit(l, _.__digit(l));
        for (; l < o; l++) e.__setDigit(l, 0);
        return e;
      }
    }, {
      key: "__absoluteXor",
      value: function __absoluteXor(_, t) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var n = _.length,
          g = t.length,
          s = g;
        if (n < g) {
          s = n;
          var i = _,
            _e12 = n;
          _ = t, n = g, t = i, g = _e12;
        }
        var o = n;
        null === e ? e = new JSBI(o, !1) : o = e.length;
        var l = 0;
        for (; l < s; l++) e.__setDigit(l, _.__digit(l) ^ t.__digit(l));
        for (; l < n; l++) e.__setDigit(l, _.__digit(l));
        for (; l < o; l++) e.__setDigit(l, 0);
        return e;
      }
    }, {
      key: "__absoluteCompare",
      value: function __absoluteCompare(_, t) {
        var e = _.length - t.length;
        if (0 != e) return e;
        var n = _.length - 1;
        for (; 0 <= n && _.__digit(n) === t.__digit(n);) n--;
        return 0 > n ? 0 : _.__unsignedDigit(n) > t.__unsignedDigit(n) ? 1 : -1;
      }
    }, {
      key: "__multiplyAccumulate",
      value: function __multiplyAccumulate(_, t, e, n) {
        if (0 === t) return;
        var g = 32767 & t,
          s = t >>> 15;
        var o = 0,
          l = 0;
        for (var r, a = 0; a < _.length; a++, n++) {
          r = e.__digit(n);
          var i = _.__digit(a),
            _t8 = 32767 & i,
            u = i >>> 15,
            d = JSBI.__imul(_t8, g),
            h = JSBI.__imul(_t8, s),
            m = JSBI.__imul(u, g),
            b = JSBI.__imul(u, s);
          r += l + d + o, o = r >>> 30, r &= 1073741823, r += ((32767 & h) << 15) + ((32767 & m) << 15), o += r >>> 30, l = b + (h >>> 15) + (m >>> 15), e.__setDigit(n, 1073741823 & r);
        }
        for (; 0 != o || 0 !== l; n++) {
          var _i16 = e.__digit(n);
          _i16 += o + l, l = 0, o = _i16 >>> 30, e.__setDigit(n, 1073741823 & _i16);
        }
      }
    }, {
      key: "__internalMultiplyAdd",
      value: function __internalMultiplyAdd(_, t, e, g, s) {
        var o = e,
          l = 0;
        for (var n = 0; n < g; n++) {
          var i = _.__digit(n),
            _e13 = JSBI.__imul(32767 & i, t),
            _g3 = JSBI.__imul(i >>> 15, t),
            a = _e13 + ((32767 & _g3) << 15) + l + o;
          o = a >>> 30, l = _g3 >>> 15, s.__setDigit(n, 1073741823 & a);
        }
        if (s.length > g) for (s.__setDigit(g++, o + l); g < s.length;) s.__setDigit(g++, 0);else if (0 !== o + l) throw new Error("implementation bug");
      }
    }, {
      key: "__absoluteDivSmall",
      value: function __absoluteDivSmall(_, t) {
        var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        null === e && (e = new JSBI(_.length, !1));
        var n = 0;
        for (var g, s = 2 * _.length - 1; 0 <= s; s -= 2) {
          g = (n << 15 | _.__halfDigit(s)) >>> 0;
          var i = 0 | g / t;
          n = 0 | g % t, g = (n << 15 | _.__halfDigit(s - 1)) >>> 0;
          var o = 0 | g / t;
          n = 0 | g % t, e.__setDigit(s >>> 1, i << 15 | o);
        }
        return e;
      }
    }, {
      key: "__absoluteModSmall",
      value: function __absoluteModSmall(_, t) {
        var e = 0;
        for (var n = 2 * _.length - 1; 0 <= n; n--) {
          var i = (e << 15 | _.__halfDigit(n)) >>> 0;
          e = 0 | i % t;
        }
        return e;
      }
    }, {
      key: "__absoluteDivLarge",
      value: function __absoluteDivLarge(i, _, t, e) {
        var g = _.__halfDigitLength(),
          n = _.length,
          s = i.__halfDigitLength() - g;
        var o = null;
        t && (o = new JSBI(s + 2 >>> 1, !1), o.__initializeDigits());
        var l = new JSBI(g + 2 >>> 1, !1);
        l.__initializeDigits();
        var r = JSBI.__clz15(_.__halfDigit(g - 1));
        0 < r && (_ = JSBI.__specialLeftShift(_, r, 0));
        var a = JSBI.__specialLeftShift(i, r, 1),
          u = _.__halfDigit(g - 1);
        var d = 0;
        for (var _r3, h = s; 0 <= h; h--) {
          _r3 = 32767;
          var _i17 = a.__halfDigit(h + g);
          if (_i17 !== u) {
            var _t9 = (_i17 << 15 | a.__halfDigit(h + g - 1)) >>> 0;
            _r3 = 0 | _t9 / u;
            var _e14 = 0 | _t9 % u;
            var _n4 = _.__halfDigit(g - 2),
              _s6 = a.__halfDigit(h + g - 2);
            for (; JSBI.__imul(_r3, _n4) >>> 0 > (_e14 << 16 | _s6) >>> 0 && (_r3--, _e14 += u, !(32767 < _e14)););
          }
          JSBI.__internalMultiplyAdd(_, _r3, 0, n, l);
          var _e15 = a.__inplaceSub(l, h, g + 1);
          0 !== _e15 && (_e15 = a.__inplaceAdd(_, h, g), a.__setHalfDigit(h + g, 32767 & a.__halfDigit(h + g) + _e15), _r3--), t && (1 & h ? d = _r3 << 15 : o.__setDigit(h >>> 1, d | _r3));
        }
        if (e) return a.__inplaceRightShift(r), t ? {
          quotient: o,
          remainder: a
        } : a;
        if (t) return o;
        throw new Error("unreachable");
      }
    }, {
      key: "__clz15",
      value: function __clz15(i) {
        return JSBI.__clz30(i) - 15;
      }
    }, {
      key: "__specialLeftShift",
      value: function __specialLeftShift(_, t, e) {
        var g = _.length,
          n = new JSBI(g + e, !1);
        if (0 === t) {
          for (var _t10 = 0; _t10 < g; _t10++) n.__setDigit(_t10, _.__digit(_t10));
          return 0 < e && n.__setDigit(g, 0), n;
        }
        var s = 0;
        for (var o = 0; o < g; o++) {
          var i = _.__digit(o);
          n.__setDigit(o, 1073741823 & i << t | s), s = i >>> 30 - t;
        }
        return 0 < e && n.__setDigit(g, s), n;
      }
    }, {
      key: "__leftShiftByAbsolute",
      value: function __leftShiftByAbsolute(_, i) {
        var t = JSBI.__toShiftAmount(i);
        if (0 > t) throw new RangeError("BigInt too big");
        var e = 0 | t / 30,
          n = t % 30,
          g = _.length,
          s = 0 !== n && 0 != _.__digit(g - 1) >>> 30 - n,
          o = g + e + (s ? 1 : 0),
          l = new JSBI(o, _.sign);
        if (0 === n) {
          var _t11 = 0;
          for (; _t11 < e; _t11++) l.__setDigit(_t11, 0);
          for (; _t11 < o; _t11++) l.__setDigit(_t11, _.__digit(_t11 - e));
        } else {
          var _t12 = 0;
          for (var _12 = 0; _12 < e; _12++) l.__setDigit(_12, 0);
          for (var _s7 = 0; _s7 < g; _s7++) {
            var _i18 = _.__digit(_s7);
            l.__setDigit(_s7 + e, 1073741823 & _i18 << n | _t12), _t12 = _i18 >>> 30 - n;
          }
          if (s) l.__setDigit(g + e, _t12);else if (0 !== _t12) throw new Error("implementation bug");
        }
        return l.__trim();
      }
    }, {
      key: "__rightShiftByAbsolute",
      value: function __rightShiftByAbsolute(_, i) {
        var t = _.length,
          e = _.sign,
          n = JSBI.__toShiftAmount(i);
        if (0 > n) return JSBI.__rightShiftByMaximum(e);
        var g = 0 | n / 30,
          s = n % 30;
        var o = t - g;
        if (0 >= o) return JSBI.__rightShiftByMaximum(e);
        var l = !1;
        if (e) {
          if (0 != (_.__digit(g) & (1 << s) - 1)) l = !0;else for (var _t13 = 0; _t13 < g; _t13++) if (0 !== _.__digit(_t13)) {
            l = !0;
            break;
          }
        }
        if (l && 0 === s) {
          var _i19 = _.__digit(t - 1);
          0 == ~_i19 && o++;
        }
        var r = new JSBI(o, e);
        if (0 === s) {
          r.__setDigit(o - 1, 0);
          for (var _e16 = g; _e16 < t; _e16++) r.__setDigit(_e16 - g, _.__digit(_e16));
        } else {
          var _e17 = _.__digit(g) >>> s;
          var _n5 = t - g - 1;
          for (var _t14 = 0; _t14 < _n5; _t14++) {
            var _i20 = _.__digit(_t14 + g + 1);
            r.__setDigit(_t14, 1073741823 & _i20 << 30 - s | _e17), _e17 = _i20 >>> s;
          }
          r.__setDigit(_n5, _e17);
        }
        return l && (r = JSBI.__absoluteAddOne(r, !0, r)), r.__trim();
      }
    }, {
      key: "__rightShiftByMaximum",
      value: function __rightShiftByMaximum(i) {
        return i ? JSBI.__oneDigit(1, !0) : JSBI.__zero();
      }
    }, {
      key: "__toShiftAmount",
      value: function __toShiftAmount(i) {
        if (1 < i.length) return -1;
        var _ = i.__unsignedDigit(0);
        return _ > JSBI.__kMaxLengthBits ? -1 : _;
      }
    }, {
      key: "__toPrimitive",
      value: function __toPrimitive(i) {
        var _ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
        if ("object" != _typeof(i)) return i;
        if (i.constructor === JSBI) return i;
        if ("undefined" != typeof Symbol && "symbol" == _typeof(Symbol.toPrimitive)) {
          var _t15 = i[Symbol.toPrimitive];
          if (_t15) {
            var _i21 = _t15(_);
            if ("object" != _typeof(_i21)) return _i21;
            throw new TypeError("Cannot convert object to primitive value");
          }
        }
        var t = i.valueOf;
        if (t) {
          var _13 = t.call(i);
          if ("object" != _typeof(_13)) return _13;
        }
        var e = i.toString;
        if (e) {
          var _14 = e.call(i);
          if ("object" != _typeof(_14)) return _14;
        }
        throw new TypeError("Cannot convert object to primitive value");
      }
    }, {
      key: "__toNumeric",
      value: function __toNumeric(i) {
        return JSBI.__isBigInt(i) ? i : +i;
      }
    }, {
      key: "__isBigInt",
      value: function __isBigInt(i) {
        return "object" == _typeof(i) && null !== i && i.constructor === JSBI;
      }
    }, {
      key: "__truncateToNBits",
      value: function __truncateToNBits(i, _) {
        var t = 0 | (i + 29) / 30,
          e = new JSBI(t, _.sign),
          n = t - 1;
        for (var _t16 = 0; _t16 < n; _t16++) e.__setDigit(_t16, _.__digit(_t16));
        var g = _.__digit(n);
        if (0 != i % 30) {
          var _15 = 32 - i % 30;
          g = g << _15 >>> _15;
        }
        return e.__setDigit(n, g), e.__trim();
      }
    }, {
      key: "__truncateAndSubFromPowerOfTwo",
      value: function __truncateAndSubFromPowerOfTwo(_, t, e) {
        var n = Math.min;
        var g = 0 | (_ + 29) / 30,
          s = new JSBI(g, e);
        var o = 0;
        var l = g - 1;
        var a = 0;
        for (var i = n(l, t.length); o < i; o++) {
          var _i22 = 0 - t.__digit(o) - a;
          a = 1 & _i22 >>> 30, s.__setDigit(o, 1073741823 & _i22);
        }
        for (; o < l; o++) s.__setDigit(o, 0 | 1073741823 & -a);
        var u = l < t.length ? t.__digit(l) : 0;
        var d = _ % 30;
        var h;
        if (0 == d) h = 0 - u - a, h &= 1073741823;else {
          var _i23 = 32 - d;
          u = u << _i23 >>> _i23;
          var _16 = 1 << 32 - _i23;
          h = _16 - u - a, h &= _16 - 1;
        }
        return s.__setDigit(l, h), s.__trim();
      }
    }, {
      key: "__digitPow",
      value: function __digitPow(i, _) {
        var t = 1;
        for (; 0 < _;) 1 & _ && (t *= i), _ >>>= 1, i *= i;
        return t;
      }
    }, {
      key: "__isOneDigitInt",
      value: function __isOneDigitInt(i) {
        return (1073741823 & i) === i;
      }
    }]);
    return JSBI;
  }( /*#__PURE__*/_wrapNativeSuper(Array));
  JSBI.__kMaxLength = 33554432, JSBI.__kMaxLengthBits = JSBI.__kMaxLength << 5, JSBI.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], JSBI.__kBitsPerCharTableShift = 5, JSBI.__kBitsPerCharTableMultiplier = 1 << JSBI.__kBitsPerCharTableShift, JSBI.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], JSBI.__kBitConversionBuffer = new ArrayBuffer(8), JSBI.__kBitConversionDouble = new Float64Array(JSBI.__kBitConversionBuffer), JSBI.__kBitConversionInts = new Int32Array(JSBI.__kBitConversionBuffer), JSBI.__clz30 = Math.clz32 ? function (i) {
    return Math.clz32(i) - 2;
  } : function (i) {
    return 0 === i ? 30 : 0 | 29 - (0 | Math.log(i >>> 0) / Math.LN2);
  }, JSBI.__imul = Math.imul || function (i, _) {
    return 0 | i * _;
  };

  function assert(condition, message) {
    if (!condition) throw new Error("assertion failure: ".concat(message));
  }
  function assertNotReached(message) {
    var reason = message ? " because ".concat(message) : '';
    throw new Error("assertion failure: code should not be reached".concat(reason));
  }

  var ZERO = JSBI.BigInt(0);
  var ONE = JSBI.BigInt(1);
  var TWO = JSBI.BigInt(2);
  var TEN = JSBI.BigInt(10);
  var TWENTY_FOUR = JSBI.BigInt(24);
  var SIXTY = JSBI.BigInt(60);
  var THOUSAND = JSBI.BigInt(1e3);
  var MILLION = JSBI.BigInt(1e6);
  var BILLION = JSBI.BigInt(1e9);
  var HOUR_SECONDS = 3600;
  var HOUR_NANOS = JSBI.multiply(JSBI.BigInt(HOUR_SECONDS), BILLION);
  var MINUTE_NANOS_JSBI = JSBI.multiply(SIXTY, BILLION);
  var DAY_NANOS_JSBI = JSBI.multiply(HOUR_NANOS, TWENTY_FOUR);
  /** Handle a JSBI or native BigInt. For user input, use ES.ToBigInt instead */
  function ensureJSBI(value) {
    return typeof value === 'bigint' ? JSBI.BigInt(value.toString(10)) : value;
  }
  function isEven(value) {
    return JSBI.equal(JSBI.remainder(value, TWO), ZERO);
  }
  function abs(x) {
    if (JSBI.lessThan(x, ZERO)) return JSBI.unaryMinus(x);
    return x;
  }
  function compare(x, y) {
    return JSBI.lessThan(x, y) ? -1 : JSBI.greaterThan(x, y) ? 1 : 0;
  }
  function divmod(x, y) {
    var quotient = JSBI.divide(x, y);
    var remainder = JSBI.remainder(x, y);
    return {
      quotient: quotient,
      remainder: remainder
    };
  }

  var _a, _b;
  // Instant
  var EPOCHNANOSECONDS = 'slot-epochNanoSeconds';
  // DateTime, Date, Time, YearMonth, MonthDay
  var ISO_DATE = 'slot-iso-date';
  var ISO_DATE_TIME = 'slot-iso-date-time';
  var TIME = 'slot-time';
  var CALENDAR = 'slot-calendar';
  // Date, YearMonth, and MonthDay all have the same slots, disambiguation needed:
  var DATE_BRAND = 'slot-date-brand';
  var YEAR_MONTH_BRAND = 'slot-year-month-brand';
  var MONTH_DAY_BRAND = 'slot-month-day-brand';
  // ZonedDateTime
  var TIME_ZONE = 'slot-time-zone';
  // Duration
  var YEARS = 'slot-years';
  var MONTHS = 'slot-months';
  var WEEKS = 'slot-weeks';
  var DAYS = 'slot-days';
  var HOURS = 'slot-hours';
  var MINUTES = 'slot-minutes';
  var SECONDS = 'slot-seconds';
  var MILLISECONDS = 'slot-milliseconds';
  var MICROSECONDS = 'slot-microseconds';
  var NANOSECONDS = 'slot-nanoseconds';
  // DateTimeFormatImpl
  var DATE = 'date';
  var YM = 'ym';
  var MD = 'md';
  var TIME_FMT = 'time';
  var DATETIME = 'datetime';
  var INST = 'instant';
  var ORIGINAL = 'original';
  var TZ_CANONICAL = 'timezone-canonical';
  var TZ_ORIGINAL = 'timezone-original';
  var CAL_ID = 'calendar-id';
  var LOCALE = 'locale';
  var OPTIONS = 'options';
  var globalSlots = new WeakMap();
  function _GetSlots(container) {
    return globalSlots.get(container);
  }
  var GetSlotsSymbol = Symbol.for('@@Temporal__GetSlots');
  // expose GetSlots to avoid dual package hazards
  (_a = globalThis)[GetSlotsSymbol] || (_a[GetSlotsSymbol] = _GetSlots);
  var GetSlots = globalThis[GetSlotsSymbol];
  function _CreateSlots(container) {
    globalSlots.set(container, Object.create(null));
  }
  var CreateSlotsSymbol = Symbol.for('@@Temporal__CreateSlots');
  // expose CreateSlots to avoid dual package hazards
  (_b = globalThis)[CreateSlotsSymbol] || (_b[CreateSlotsSymbol] = _CreateSlots);
  var CreateSlots = globalThis[CreateSlotsSymbol];
  function HasSlot(container) {
    if (!container || 'object' !== _typeof(container)) return false;
    var myslots = GetSlots(container);
    for (var _len = arguments.length, ids = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      ids[_key - 1] = arguments[_key];
    }
    return !!myslots && ids.every(function (id) {
      return id in myslots;
    });
  }
  function GetSlot(container, id) {
    var _GetSlots2;
    var value = (_GetSlots2 = GetSlots(container)) === null || _GetSlots2 === void 0 ? void 0 : _GetSlots2[id];
    if (value === undefined) throw new TypeError("Missing internal slot ".concat(id));
    return value;
  }
  function SetSlot(container, id, value) {
    var slots = GetSlots(container);
    if (slots === undefined) throw new TypeError('Missing slots for the given container');
    var existingSlot = slots[id];
    if (existingSlot) throw new TypeError("".concat(id, " already has set"));
    slots[id] = value;
  }
  function ResetSlot(container, id, value) {
    var slots = GetSlots(container);
    if (slots === undefined) throw new TypeError('Missing slots for the given container');
    var existingSlot = slots[id];
    if (existingSlot === undefined) throw new TypeError("tried to reset ".concat(id, " which was not set"));
    slots[id] = value;
  }

  var _customUtilInspectFor;
  var INTRINSICS = {};
  var customUtilInspectFormatters = (_customUtilInspectFor = {}, _defineProperty(_customUtilInspectFor, 'Intl.DateTimeFormat', function IntlDateTimeFormat(depth, options, inspect) {
    return inspect(GetSlot(this, ORIGINAL), _objectSpread2({
      depth: depth
    }, options));
  }), _defineProperty(_customUtilInspectFor, 'Temporal.Duration', function TemporalDuration(depth, options) {
    var descr = options.stylize(this._repr_, 'special');
    if (depth < 1) return descr;
    var entries = [];
    var props = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds'];
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (this[prop] !== 0) {
        entries.push("  ".concat(prop, ": ").concat(options.stylize(this[prop], 'number')));
      }
    }
    return descr + ' {\n' + entries.join(',\n') + '\n}';
  }), _customUtilInspectFor);
  function defaultUtilInspectFormatter(depth, options) {
    return options.stylize(this._repr_, 'special');
  }
  function MakeIntrinsicClass(Class, name) {
    Object.defineProperty(Class.prototype, Symbol.toStringTag, {
      value: name,
      writable: false,
      enumerable: false,
      configurable: true
    });
    {
      Object.defineProperty(Class.prototype, Symbol.for('nodejs.util.inspect.custom'), {
        value: customUtilInspectFormatters[name] || defaultUtilInspectFormatter,
        writable: false,
        enumerable: false,
        configurable: true
      });
    }
    var staticNames = Object.getOwnPropertyNames(Class);
    for (var i = 0; i < staticNames.length; i++) {
      var prop = staticNames[i];
      // we know that `prop` is present, so the descriptor is never undefined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      var desc = Object.getOwnPropertyDescriptor(Class, prop);
      if (!desc.configurable || !desc.enumerable) continue;
      desc.enumerable = false;
      Object.defineProperty(Class, prop, desc);
    }
    var protoNames = Object.getOwnPropertyNames(Class.prototype);
    for (var _i = 0; _i < protoNames.length; _i++) {
      var _prop = protoNames[_i];
      // we know that `prop` is present, so the descriptor is never undefined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      var _desc = Object.getOwnPropertyDescriptor(Class.prototype, _prop);
      if (!_desc.configurable || !_desc.enumerable) continue;
      _desc.enumerable = false;
      Object.defineProperty(Class.prototype, _prop, _desc);
    }
    DefineIntrinsic(name, Class);
    DefineIntrinsic("".concat(name, ".prototype"), Class.prototype);
  }
  function DefineIntrinsic(name, value) {
    var key = "%".concat(name, "%");
    if (INTRINSICS[key] !== undefined) throw new Error("intrinsic ".concat(name, " already exists"));
    INTRINSICS[key] = value;
  }
  function GetIntrinsic(intrinsic) {
    return INTRINSICS[intrinsic];
  }

  // Computes trunc(x / 10**p) and x % 10**p, returning { div, mod }, with
  // precision loss only once in the quotient, by string manipulation. If the
  // quotient and remainder are safe integers, then they are exact. x must be an
  // integer. p must be a non-negative integer. Both div and mod have the sign of
  // x.
  function TruncatingDivModByPowerOf10(xParam, p) {
    var x = xParam;
    if (x === 0) return {
      div: x,
      mod: x
    }; // preserves signed zero
    var sign = Math.sign(x);
    x = Math.abs(x);
    var xDigits = Math.trunc(1 + Math.log10(x));
    if (p >= xDigits) return {
      div: sign * 0,
      mod: sign * x
    };
    if (p === 0) return {
      div: sign * x,
      mod: sign * 0
    };
    // would perform nearest rounding if x was not an integer:
    var xStr = x.toPrecision(xDigits);
    var div = sign * Number.parseInt(xStr.slice(0, xDigits - p), 10);
    var mod = sign * Number.parseInt(xStr.slice(xDigits - p), 10);
    return {
      div: div,
      mod: mod
    };
  }
  // Computes x * 10**p + z with precision loss only at the end, by string
  // manipulation. If the result is a safe integer, then it is exact. x must be
  // an integer. p must be a non-negative integer. z must have the same sign as
  // x and be less than 10**p.
  function FMAPowerOf10(xParam, p, zParam) {
    var x = xParam;
    var z = zParam;
    if (x === 0) return z;
    var sign = Math.sign(x) || Math.sign(z);
    x = Math.abs(x);
    z = Math.abs(z);
    var xStr = x.toPrecision(Math.trunc(1 + Math.log10(x)));
    if (z === 0) return sign * Number.parseInt(xStr + '0'.repeat(p), 10);
    var zStr = z.toPrecision(Math.trunc(1 + Math.log10(z)));
    var resStr = xStr + zStr.padStart(p, '0');
    return sign * Number.parseInt(resStr, 10);
  }
  function GetUnsignedRoundingMode(mode, sign) {
    var isNegative = sign === 'negative';
    switch (mode) {
      case 'ceil':
        return isNegative ? 'zero' : 'infinity';
      case 'floor':
        return isNegative ? 'infinity' : 'zero';
      case 'expand':
        return 'infinity';
      case 'trunc':
        return 'zero';
      case 'halfCeil':
        return isNegative ? 'half-zero' : 'half-infinity';
      case 'halfFloor':
        return isNegative ? 'half-infinity' : 'half-zero';
      case 'halfExpand':
        return 'half-infinity';
      case 'halfTrunc':
        return 'half-zero';
      case 'halfEven':
        return 'half-even';
    }
  }
  // Omits first step from spec algorithm so that it can be used both for
  // RoundNumberToIncrement and RoundTimeDurationToIncrement
  function ApplyUnsignedRoundingMode(r1, r2, cmp, evenCardinality, unsignedRoundingMode) {
    if (unsignedRoundingMode === 'zero') return r1;
    if (unsignedRoundingMode === 'infinity') return r2;
    if (cmp < 0) return r1;
    if (cmp > 0) return r2;
    if (unsignedRoundingMode === 'half-zero') return r1;
    if (unsignedRoundingMode === 'half-infinity') return r2;
    return evenCardinality ? r1 : r2;
  }

  var TimeDuration = /*#__PURE__*/function () {
    function TimeDuration(totalNs) {
      _classCallCheck(this, TimeDuration);
      assert(typeof totalNs !== 'number', 'big integer required');
      this.totalNs = ensureJSBI(totalNs);
      assert(JSBI.lessThanOrEqual(abs(this.totalNs), TimeDuration.MAX), 'integer too big');
      this.sec = JSBI.toNumber(JSBI.divide(this.totalNs, BILLION));
      this.subsec = JSBI.toNumber(JSBI.remainder(this.totalNs, BILLION));
      assert(Number.isSafeInteger(this.sec), 'seconds too big');
      assert(Math.abs(this.subsec) <= 999999999, 'subseconds too big');
    }
    _createClass(TimeDuration, [{
      key: "abs",
      value: function abs$1() {
        return new TimeDuration(abs(this.totalNs));
      }
    }, {
      key: "add",
      value: function add(other) {
        return TimeDuration.validateNew(JSBI.add(this.totalNs, other.totalNs), 'sum');
      }
    }, {
      key: "add24HourDays",
      value: function add24HourDays(days) {
        assert(Number.isInteger(days), 'days must be an integer');
        return TimeDuration.validateNew(JSBI.add(this.totalNs, JSBI.multiply(JSBI.BigInt(days), DAY_NANOS_JSBI)), 'sum');
      }
    }, {
      key: "addToEpochNs",
      value: function addToEpochNs(epochNs) {
        return JSBI.add(ensureJSBI(epochNs), this.totalNs);
      }
    }, {
      key: "cmp",
      value: function cmp(other) {
        return compare(this.totalNs, other.totalNs);
      }
    }, {
      key: "divmod",
      value: function divmod$1(n) {
        assert(n !== 0, 'division by zero');
        var _divmod2 = divmod(this.totalNs, JSBI.BigInt(n)),
          quotient = _divmod2.quotient,
          remainder = _divmod2.remainder;
        var q = JSBI.toNumber(quotient);
        var r = new TimeDuration(remainder);
        return {
          quotient: q,
          remainder: r
        };
      }
    }, {
      key: "fdiv",
      value: function fdiv(nParam) {
        var n = ensureJSBI(nParam);
        assert(!JSBI.equal(n, ZERO), 'division by zero');
        var nBigInt = JSBI.BigInt(n);
        var _divmod3 = divmod(this.totalNs, nBigInt),
          quotient = _divmod3.quotient,
          remainder = _divmod3.remainder;
        // Perform long division to calculate the fractional part of the quotient
        // remainder / n with more accuracy than 64-bit floating point division
        var precision = 50;
        var decimalDigits = [];
        var digit;
        var sign = (JSBI.lessThan(this.totalNs, ZERO) ? -1 : 1) * Math.sign(JSBI.toNumber(n));
        while (!JSBI.equal(remainder, ZERO) && decimalDigits.length < precision) {
          remainder = JSBI.multiply(remainder, TEN);
          var _divmod4 = divmod(remainder, nBigInt);
          digit = _divmod4.quotient;
          remainder = _divmod4.remainder;
          decimalDigits.push(Math.abs(JSBI.toNumber(digit)));
        }
        return sign * Number(abs(quotient).toString() + '.' + decimalDigits.join(''));
      }
    }, {
      key: "isZero",
      value: function isZero() {
        return JSBI.equal(this.totalNs, ZERO);
      }
    }, {
      key: "round",
      value: function round(incrementParam, mode) {
        var increment = ensureJSBI(incrementParam);
        if (JSBI.equal(increment, ONE)) return this;
        var _divmod5 = divmod(this.totalNs, increment),
          quotient = _divmod5.quotient,
          remainder = _divmod5.remainder;
        var sign = JSBI.lessThan(this.totalNs, ZERO) ? 'negative' : 'positive';
        var r1 = JSBI.multiply(abs(quotient), increment);
        var r2 = JSBI.add(r1, increment);
        var cmp = compare(abs(JSBI.multiply(remainder, TWO)), increment);
        var unsignedRoundingMode = GetUnsignedRoundingMode(mode, sign);
        var rounded = JSBI.equal(remainder, ZERO) ? r1 : ApplyUnsignedRoundingMode(r1, r2, cmp, isEven(quotient), unsignedRoundingMode);
        var result = sign === 'positive' ? rounded : JSBI.unaryMinus(rounded);
        return TimeDuration.validateNew(result, 'rounding');
      }
    }, {
      key: "sign",
      value: function sign() {
        return this.cmp(new TimeDuration(ZERO));
      }
    }, {
      key: "subtract",
      value: function subtract(other) {
        return TimeDuration.validateNew(JSBI.subtract(this.totalNs, other.totalNs), 'difference');
      }
    }], [{
      key: "validateNew",
      value: function validateNew(totalNs, operation) {
        if (JSBI.greaterThan(abs(totalNs), TimeDuration.MAX)) {
          throw new RangeError("".concat(operation, " of duration time units cannot exceed ").concat(TimeDuration.MAX, " s"));
        }
        return new TimeDuration(totalNs);
      }
    }, {
      key: "fromEpochNsDiff",
      value: function fromEpochNsDiff(epochNs1, epochNs2) {
        var diff = JSBI.subtract(ensureJSBI(epochNs1), ensureJSBI(epochNs2));
        // No extra validate step. Should instead fail assertion if too big
        return new TimeDuration(diff);
      }
    }, {
      key: "fromComponents",
      value: function fromComponents(h, min, s, ms, µs, ns) {
        var totalNs = JSBI.add(JSBI.add(JSBI.add(JSBI.add(JSBI.add(JSBI.BigInt(ns), JSBI.multiply(JSBI.BigInt(µs), THOUSAND)), JSBI.multiply(JSBI.BigInt(ms), MILLION)), JSBI.multiply(JSBI.BigInt(s), BILLION)), JSBI.multiply(JSBI.BigInt(min), MINUTE_NANOS_JSBI)), JSBI.multiply(JSBI.BigInt(h), HOUR_NANOS));
        return TimeDuration.validateNew(totalNs, 'total');
      }
    }]);
    return TimeDuration;
  }();
  TimeDuration.MAX = JSBI.BigInt('9007199254740991999999999');
  TimeDuration.ZERO = new TimeDuration(ZERO);

  var offsetIdentifierNoCapture = /(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/;
  var tzComponent = /[A-Za-z._][A-Za-z._0-9+-]*/;
  var timeZoneID = new RegExp("(?:".concat(offsetIdentifierNoCapture.source, "|(?:").concat(tzComponent.source, ")(?:\\/(?:").concat(tzComponent.source, "))*)"));
  var yearpart = /(?:[+-]\d{6}|\d{4})/;
  var monthpart = /(?:0[1-9]|1[0-2])/;
  var daypart = /(?:0[1-9]|[12]\d|3[01])/;
  var datesplit = new RegExp("(".concat(yearpart.source, ")(?:-(").concat(monthpart.source, ")-(").concat(daypart.source, ")|(").concat(monthpart.source, ")(").concat(daypart.source, "))"));
  var timesplit = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/;
  var offsetWithParts = /([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/;
  var offset = /((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/;
  var offsetpart = new RegExp("([zZ])|".concat(offset.source, "?"));
  var offsetIdentifier = /([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/;
  var annotation = /\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g;
  var zoneddatetime = new RegExp(["^".concat(datesplit.source), "(?:(?:[tT]|\\s+)".concat(timesplit.source, "(?:").concat(offsetpart.source, ")?)?"), "(?:\\[!?(".concat(timeZoneID.source, ")\\])?"), "((?:".concat(annotation.source, ")*)$")].join(''));
  var time = new RegExp(["^[tT]?".concat(timesplit.source), "(?:".concat(offsetpart.source, ")?"), "(?:\\[!?".concat(timeZoneID.source, "\\])?"), "((?:".concat(annotation.source, ")*)$")].join(''));
  // The short forms of YearMonth and MonthDay are only for the ISO calendar, but
  // annotations are still allowed, and will throw if the calendar annotation is
  // not ISO.
  // Non-ISO calendar YearMonth and MonthDay have to parse as a Temporal.PlainDate,
  // with the reference fields.
  // YYYYMM forbidden by ISO 8601 because ambiguous with YYMMDD, but allowed by
  // RFC 3339 and we don't allow 2-digit years, so we allow it.
  // Not ambiguous with HHMMSS because that requires a 'T' prefix
  // UTC offsets are not allowed, because they are not allowed with any date-only
  // format; also, YYYY-MM-UU is ambiguous with YYYY-MM-DD
  var yearmonth = new RegExp("^(".concat(yearpart.source, ")-?(").concat(monthpart.source, ")(?:\\[!?").concat(timeZoneID.source, "\\])?((?:").concat(annotation.source, ")*)$"));
  var monthday = new RegExp("^(?:--)?(".concat(monthpart.source, ")-?(").concat(daypart.source, ")(?:\\[!?").concat(timeZoneID.source, "\\])?((?:").concat(annotation.source, ")*)$"));
  var fraction = /(\d+)(?:[.,](\d{1,9}))?/;
  var durationDate = /(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/;
  var durationTime = new RegExp("(?:".concat(fraction.source, "H)?(?:").concat(fraction.source, "M)?(?:").concat(fraction.source, "S)?"));
  var duration = new RegExp("^([+-])?P".concat(durationDate.source, "(?:T(?!$)").concat(durationTime.source, ")?$"), 'i');

  var DAY_MS = 86400000;
  var DAY_NANOS = DAY_MS * 1e6;
  var MINUTE_NANOS = 60e9;
  // Instant range is 100 million days (inclusive) before or after epoch.
  var MS_MAX = DAY_MS * 1e8;
  var NS_MAX = epochMsToNs(MS_MAX);
  var NS_MIN = JSBI.unaryMinus(NS_MAX);
  // PlainDateTime range is 24 hours wider (exclusive) than the Instant range on
  // both ends, to allow for valid Instant=>PlainDateTime conversion for all
  // built-in time zones (whose offsets must have a magnitude less than 24 hours).
  var DATETIME_NS_MIN = JSBI.add(JSBI.subtract(NS_MIN, DAY_NANOS_JSBI), ONE);
  var DATETIME_NS_MAX = JSBI.subtract(JSBI.add(NS_MAX, DAY_NANOS_JSBI), ONE);
  // The pattern of leap years in the ISO 8601 calendar repeats every 400 years.
  // The constant below is the number of nanoseconds in 400 years. It is used to
  // avoid overflows when dealing with values at the edge legacy Date's range.
  var MS_IN_400_YEAR_CYCLE = (400 * 365 + 97) * DAY_MS;
  var YEAR_MIN = -271821;
  var YEAR_MAX = 275760;
  var BEFORE_FIRST_DST = Date.UTC(1847, 0, 1); // 1847-01-01T00:00:00Z
  var BUILTIN_CALENDAR_IDS = ['iso8601', 'hebrew', 'islamic', 'islamic-umalqura', 'islamic-tbla', 'islamic-civil', 'islamic-rgsa', 'islamicc', 'persian', 'ethiopic', 'ethioaa', 'ethiopic-amete-alem', 'coptic', 'chinese', 'dangi', 'roc', 'indian', 'buddhist', 'japanese', 'gregory'];
  var ICU_LEGACY_TIME_ZONE_IDS = new Set(['ACT', 'AET', 'AGT', 'ART', 'AST', 'BET', 'BST', 'CAT', 'CNT', 'CST', 'CTT', 'EAT', 'ECT', 'IET', 'IST', 'JST', 'MIT', 'NET', 'NST', 'PLT', 'PNT', 'PRT', 'PST', 'SST', 'VST']);
  /* eslint-enable */
  /**
   * In debug builds, this function verifies that the given argument "exists" (is not
   * null or undefined). This function becomes a no-op in the final bundles distributed via NPM.
   * @param arg
   */
  function assertExists(arg) {
    {
      if (arg == null) {
        throw new Error('Expected arg to be set.');
      }
    }
  }
  /** Similar to assertExists, but returns the argument. */
  function castExists(arg) {
    assertExists(arg);
    return arg;
  }
  function IsObject(value) {
    return _typeof(value) === 'object' && value !== null || typeof value === 'function';
  }
  function ToNumber(value) {
    // ES 2022's es-abstract made minor changes to ToNumber, but polyfilling these
    // changes adds zero benefit to Temporal and brings in a lot of extra code. So
    // we'll leave ToNumber as-is.
    // See https://github.com/ljharb/es-abstract/blob/main/2022/ToNumber.js
    if (typeof value === 'bigint') throw new TypeError('Cannot convert BigInt to number');
    return Number(value);
  }
  function IsIntegralNumber(argument) {
    if (typeof argument !== 'number' || Number.isNaN(argument) || argument === Infinity || argument === -Infinity) {
      return false;
    }
    var absValue = Math.abs(argument);
    return Math.floor(absValue) === absValue;
  }
  function ToString(value) {
    if (_typeof(value) === 'symbol') {
      throw new TypeError('Cannot convert a Symbol value to a String');
    }
    return String(value);
  }
  function ToIntegerWithTruncation(value) {
    var number = ToNumber(value);
    if (number === 0) return 0;
    if (Number.isNaN(number) || number === Infinity || number === -Infinity) {
      throw new RangeError('invalid number value');
    }
    var integer = Math.trunc(number);
    if (integer === 0) return 0; // ℝ(value) in spec text; converts -0 to 0
    return integer;
  }
  function ToPositiveIntegerWithTruncation(valueParam, property) {
    var integer = ToIntegerWithTruncation(valueParam);
    if (integer <= 0) {
      if (property !== undefined) {
        throw new RangeError("property '".concat(property, "' cannot be a a number less than one"));
      }
      throw new RangeError('Cannot convert a number less than one to a positive integer');
    }
    return integer;
  }
  function ToIntegerIfIntegral(valueParam) {
    var number = ToNumber(valueParam);
    if (Number.isNaN(number)) throw new RangeError('not a number');
    if (number === Infinity || number === -Infinity) throw new RangeError('infinity is out of range');
    if (!IsIntegralNumber(number)) throw new RangeError("unsupported fractional value ".concat(valueParam));
    if (number === 0) return 0; // ℝ(value) in spec text; converts -0 to 0
    return number;
  }
  function ToZeroPaddedDecimalString(n, minLength) {
    {
      if (!IsIntegralNumber(n) || n < 0) {
        throw new RangeError('Assertion failed: `${n}` must be a non-negative integer');
      }
    }
    var s = String(n);
    return s.padStart(minLength, '0');
  }
  // This convenience function isn't in the spec, but is useful in the polyfill
  // for DRY and better error messages.
  function RequireString(value) {
    if (typeof value !== 'string') {
      // Use String() to ensure that Symbols won't throw
      throw new TypeError("expected a string, not ".concat(String(value)));
    }
    return value;
  }
  function ToSyntacticallyValidMonthCode(valueParam) {
    var value = RequireString(ToPrimitive(valueParam, String));
    if (value.length < 3 || value.length > 4 || value[0] !== 'M' || '0123456789'.indexOf(value[1]) === -1 || '0123456789'.indexOf(value[2]) === -1 || value[1] + value[2] === '00' && value[3] !== 'L' || value[3] !== 'L' && value[3] !== undefined) {
      throw new RangeError("bad month code ".concat(value, "; must match M01-M99 or M00L-M99L"));
    }
    return value;
  }
  function ToOffsetString(valueParam) {
    var value = RequireString(ToPrimitive(valueParam, String));
    ParseDateTimeUTCOffset(value);
    return value;
  }
  // Limited implementation of ToPrimitive that only handles the string case,
  // because that's all that's used in this polyfill.
  function ToPrimitive(value, preferredType) {
    assertExists(preferredType === String);
    if (IsObject(value)) {
      var result = value === null || value === void 0 ? void 0 : value.toString();
      if (typeof result === 'string' || typeof result === 'number') return result;
      throw new TypeError('Cannot convert object to primitive value');
    }
    return value;
  }
  var CALENDAR_FIELD_KEYS = ['era', 'eraYear', 'year', 'month', 'monthCode', 'day', 'hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset', 'timeZone'];
  var BUILTIN_CASTS = {
    era: ToString,
    eraYear: ToIntegerWithTruncation,
    year: ToIntegerWithTruncation,
    month: ToPositiveIntegerWithTruncation,
    monthCode: ToSyntacticallyValidMonthCode,
    day: ToPositiveIntegerWithTruncation,
    hour: ToIntegerWithTruncation,
    minute: ToIntegerWithTruncation,
    second: ToIntegerWithTruncation,
    millisecond: ToIntegerWithTruncation,
    microsecond: ToIntegerWithTruncation,
    nanosecond: ToIntegerWithTruncation,
    offset: ToOffsetString,
    timeZone: ToTemporalTimeZoneIdentifier
  };
  var BUILTIN_DEFAULTS = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0
  };
  // each item is [plural, singular, category, (length in ns)]
  var TEMPORAL_UNITS = [['years', 'year', 'date'], ['months', 'month', 'date'], ['weeks', 'week', 'date'], ['days', 'day', 'date'], ['hours', 'hour', 'time'], ['minutes', 'minute', 'time'], ['seconds', 'second', 'time'], ['milliseconds', 'millisecond', 'time'], ['microseconds', 'microsecond', 'time'], ['nanoseconds', 'nanosecond', 'time']];
  var SINGULAR_FOR = Object.fromEntries(TEMPORAL_UNITS.map(function (e) {
    return [e[0], e[1]];
  }));
  var PLURAL_FOR = Object.fromEntries(TEMPORAL_UNITS.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      p = _ref2[0],
      s = _ref2[1];
    return [s, p];
  }));
  var UNITS_DESCENDING = TEMPORAL_UNITS.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      s = _ref4[1];
    return s;
  });
  var NS_PER_TIME_UNIT = {
    day: DAY_NANOS,
    hour: 3600e9,
    minute: 60e9,
    second: 1e9,
    millisecond: 1e6,
    microsecond: 1e3,
    nanosecond: 1
  };
  var DURATION_FIELDS = ['days', 'hours', 'microseconds', 'milliseconds', 'minutes', 'months', 'nanoseconds', 'seconds', 'weeks', 'years'];
  // Save the original Intl.DateTimeFormat, it will likely be overwritten with the
  // one from this polyfill. Caching the formatter below may be reentrant, so we
  // need to use the original one
  var OriginalIntlDateTimeFormat$1 = Intl.DateTimeFormat;
  var IntlDateTimeFormatEnUsCache = new Map();
  function getIntlDateTimeFormatEnUsForTimeZone(timeZoneIdentifier) {
    var lowercaseIdentifier = ASCIILowercase(timeZoneIdentifier);
    var instance = IntlDateTimeFormatEnUsCache.get(lowercaseIdentifier);
    if (instance === undefined) {
      instance = new OriginalIntlDateTimeFormat$1('en-us', {
        timeZone: lowercaseIdentifier,
        hour12: false,
        era: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
      IntlDateTimeFormatEnUsCache.set(lowercaseIdentifier, instance);
    }
    return instance;
  }
  function ToObject(value) {
    if (typeof value === 'undefined' || value === null) {
      throw new TypeError("Expected object not ".concat(value));
    }
    return Object(value);
  }
  // Adapted from https://github.com/ljharb/es-abstract/blob/main/2022/CopyDataProperties.js
  // but simplified (e.g. removed assertions) for this polyfill to reduce bundle size.
  function CopyDataProperties(target, source, excludedKeys, excludedValues) {
    if (typeof source === 'undefined' || source === null) return;
    var keys = Reflect.ownKeys(source);
    var _loop = function _loop() {
      var nextKey = keys[index];
      if (excludedKeys.some(function (e) {
        return Object.is(e, nextKey);
      })) return "continue";
      if (Object.prototype.propertyIsEnumerable.call(source, nextKey)) {
        var propValue = source[nextKey];
        if (excludedValues && excludedValues.some(function (e) {
          return Object.is(e, propValue);
        })) return "continue";
        target[nextKey] = propValue;
      }
    };
    for (var index = 0; index < keys.length; index++) {
      var _ret = _loop();
      if (_ret === "continue") continue;
    }
  }
  function IsTemporalInstant(item) {
    return HasSlot(item, EPOCHNANOSECONDS) && !HasSlot(item, TIME_ZONE, CALENDAR);
  }
  function IsTemporalDuration(item) {
    return HasSlot(item, YEARS, MONTHS, DAYS, HOURS, MINUTES, SECONDS, MILLISECONDS, MICROSECONDS, NANOSECONDS);
  }
  function IsTemporalDate(item) {
    return HasSlot(item, DATE_BRAND);
  }
  function IsTemporalTime(item) {
    return HasSlot(item, TIME);
  }
  function IsTemporalDateTime(item) {
    return HasSlot(item, ISO_DATE_TIME);
  }
  function IsTemporalYearMonth(item) {
    return HasSlot(item, YEAR_MONTH_BRAND);
  }
  function IsTemporalMonthDay(item) {
    return HasSlot(item, MONTH_DAY_BRAND);
  }
  function IsTemporalZonedDateTime(item) {
    return HasSlot(item, EPOCHNANOSECONDS, TIME_ZONE, CALENDAR);
  }
  function CheckReceiver(item, test) {
    if (!test(item)) throw new TypeError('invalid receiver: method called with the wrong type of this-object');
  }
  function RejectTemporalLikeObject(item) {
    if (HasSlot(item, CALENDAR) || HasSlot(item, TIME_ZONE)) {
      throw new TypeError('with() does not support a calendar or timeZone property');
    }
    if (IsTemporalTime(item)) {
      throw new TypeError('with() does not accept Temporal.PlainTime, use withPlainTime() instead');
    }
    if (item.calendar !== undefined) {
      throw new TypeError('with() does not support a calendar property');
    }
    if (item.timeZone !== undefined) {
      throw new TypeError('with() does not support a timeZone property');
    }
  }
  function FormatCalendarAnnotation(id, showCalendar) {
    if (showCalendar === 'never') return '';
    if (showCalendar === 'auto' && id === 'iso8601') return '';
    var flag = showCalendar === 'critical' ? '!' : '';
    return "[".concat(flag, "u-ca=").concat(id, "]");
  }
  // Not a separate abstract operation in the spec, because it only occurs in one
  // place: ParseISODateTime. In the code it's more convenient to split up
  // ParseISODateTime for the YYYY-MM, MM-DD, and THH:MM:SS parse goals, so it's
  // repeated four times.
  function processAnnotations(annotations) {
    var calendar;
    var calendarWasCritical = false;
    // Avoid the user code minefield of matchAll.
    var match;
    annotation.lastIndex = 0;
    while (match = annotation.exec(annotations)) {
      var _match = match,
        critical = _match[1],
        key = _match[2],
        value = _match[3];
      if (key === 'u-ca') {
        if (calendar === undefined) {
          calendar = value;
          calendarWasCritical = critical === '!';
        } else if (critical === '!' || calendarWasCritical) {
          throw new RangeError("Invalid annotations in ".concat(annotations, ": more than one u-ca present with critical flag"));
        }
      } else if (critical === '!') {
        throw new RangeError("Unrecognized annotation: !".concat(key, "=").concat(value));
      }
    }
    return calendar;
  }
  function ParseISODateTime(isoString) {
    var _ref5, _match$, _ref6, _match$2, _match$3, _ref7, _match$4, _ref8, _match$5, _ref9, _match$6;
    // ZDT is the superset of fields for every other Temporal type
    var match = zoneddatetime.exec(isoString);
    if (!match) throw new RangeError("invalid RFC 9557 string: ".concat(isoString));
    var calendar = processAnnotations(match[16]);
    var yearString = match[1];
    if (yearString === '-000000') throw new RangeError("invalid RFC 9557 string: ".concat(isoString));
    var year = +yearString;
    var month = +((_ref5 = (_match$ = match[2]) !== null && _match$ !== void 0 ? _match$ : match[4]) !== null && _ref5 !== void 0 ? _ref5 : 1);
    var day = +((_ref6 = (_match$2 = match[3]) !== null && _match$2 !== void 0 ? _match$2 : match[5]) !== null && _ref6 !== void 0 ? _ref6 : 1);
    var hasTime = match[6] !== undefined;
    var hour = +((_match$3 = match[6]) !== null && _match$3 !== void 0 ? _match$3 : 0);
    var minute = +((_ref7 = (_match$4 = match[7]) !== null && _match$4 !== void 0 ? _match$4 : match[10]) !== null && _ref7 !== void 0 ? _ref7 : 0);
    var second = +((_ref8 = (_match$5 = match[8]) !== null && _match$5 !== void 0 ? _match$5 : match[11]) !== null && _ref8 !== void 0 ? _ref8 : 0);
    if (second === 60) second = 59;
    var fraction = ((_ref9 = (_match$6 = match[9]) !== null && _match$6 !== void 0 ? _match$6 : match[12]) !== null && _ref9 !== void 0 ? _ref9 : '') + '000000000';
    var millisecond = +fraction.slice(0, 3);
    var microsecond = +fraction.slice(3, 6);
    var nanosecond = +fraction.slice(6, 9);
    var offset;
    var z = false;
    if (match[13]) {
      offset = undefined;
      z = true;
    } else if (match[14]) {
      offset = match[14];
    }
    var tzAnnotation = match[15];
    RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
    return {
      year: year,
      month: month,
      day: day,
      time: hasTime ? {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      } : 'start-of-day',
      tzAnnotation: tzAnnotation,
      offset: offset,
      z: z,
      calendar: calendar
    };
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalInstantString(isoString) {
    var result = ParseISODateTime(isoString);
    if (!result.z && !result.offset) throw new RangeError('Temporal.Instant requires a time zone offset');
    return result;
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalZonedDateTimeString(isoString) {
    var result = ParseISODateTime(isoString);
    if (!result.tzAnnotation) throw new RangeError('Temporal.ZonedDateTime requires a time zone ID in brackets');
    return result;
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalDateTimeString(isoString) {
    return ParseISODateTime(isoString);
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalDateString(isoString) {
    return ParseISODateTime(isoString);
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalTimeString(isoString) {
    var match = time.exec(isoString);
    var hour, minute, second, millisecond, microsecond, nanosecond, calendar;
    if (match) {
      var _match$7, _ref10, _match$8, _ref11, _match$9, _ref12, _match$10;
      calendar = processAnnotations(match[10]);
      hour = +((_match$7 = match[1]) !== null && _match$7 !== void 0 ? _match$7 : 0);
      minute = +((_ref10 = (_match$8 = match[2]) !== null && _match$8 !== void 0 ? _match$8 : match[5]) !== null && _ref10 !== void 0 ? _ref10 : 0);
      second = +((_ref11 = (_match$9 = match[3]) !== null && _match$9 !== void 0 ? _match$9 : match[6]) !== null && _ref11 !== void 0 ? _ref11 : 0);
      if (second === 60) second = 59;
      var fraction = ((_ref12 = (_match$10 = match[4]) !== null && _match$10 !== void 0 ? _match$10 : match[7]) !== null && _ref12 !== void 0 ? _ref12 : '') + '000000000';
      millisecond = +fraction.slice(0, 3);
      microsecond = +fraction.slice(3, 6);
      nanosecond = +fraction.slice(6, 9);
      if (match[8]) throw new RangeError('Z designator not supported for PlainTime');
    } else {
      var time$1, z;
      var _ParseISODateTime = ParseISODateTime(isoString);
      time$1 = _ParseISODateTime.time;
      z = _ParseISODateTime.z;
      calendar = _ParseISODateTime.calendar;
      if (time$1 === 'start-of-day') throw new RangeError("time is missing in string: ".concat(isoString));
      if (z) throw new RangeError('Z designator not supported for PlainTime');
      var _time = time$1;
      hour = _time.hour;
      minute = _time.minute;
      second = _time.second;
      millisecond = _time.millisecond;
      microsecond = _time.microsecond;
      nanosecond = _time.nanosecond;
    }
    RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
    // if it's a date-time string, OK
    if (/[tT ][0-9][0-9]/.test(isoString)) {
      return {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond,
        calendar: calendar
      };
    }
    try {
      var _ParseTemporalMonthDa = ParseTemporalMonthDayString(isoString),
        month = _ParseTemporalMonthDa.month,
        day = _ParseTemporalMonthDa.day;
      RejectISODate(1972, month, day);
    } catch (_unused) {
      try {
        var _ParseTemporalYearMon = ParseTemporalYearMonthString(isoString),
          year = _ParseTemporalYearMon.year,
          _month = _ParseTemporalYearMon.month;
        RejectISODate(year, _month, 1);
      } catch (_unused2) {
        return {
          hour: hour,
          minute: minute,
          second: second,
          millisecond: millisecond,
          microsecond: microsecond,
          nanosecond: nanosecond,
          calendar: calendar
        };
      }
    }
    throw new RangeError("invalid RFC 9557 time-only string ".concat(isoString, "; may need a T prefix"));
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalYearMonthString(isoString) {
    var match = yearmonth.exec(isoString);
    var year, month, calendar, referenceISODay;
    if (match) {
      calendar = processAnnotations(match[3]);
      var yearString = match[1];
      if (yearString === '-000000') throw new RangeError("invalid RFC 9557 string: ".concat(isoString));
      year = +yearString;
      month = +match[2];
      referenceISODay = 1;
      if (calendar !== undefined && calendar !== 'iso8601') {
        throw new RangeError('YYYY-MM format is only valid with iso8601 calendar');
      }
    } else {
      var z;
      var _ParseISODateTime2 = ParseISODateTime(isoString);
      year = _ParseISODateTime2.year;
      month = _ParseISODateTime2.month;
      calendar = _ParseISODateTime2.calendar;
      referenceISODay = _ParseISODateTime2.day;
      z = _ParseISODateTime2.z;
      if (z) throw new RangeError('Z designator not supported for PlainYearMonth');
    }
    return {
      year: year,
      month: month,
      calendar: calendar,
      referenceISODay: referenceISODay
    };
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalMonthDayString(isoString) {
    var match = monthday.exec(isoString);
    var month, day, calendar, referenceISOYear;
    if (match) {
      calendar = processAnnotations(match[3]);
      month = +match[1];
      day = +match[2];
      if (calendar !== undefined && calendar !== 'iso8601') {
        throw new RangeError('MM-DD format is only valid with iso8601 calendar');
      }
    } else {
      var z;
      var _ParseISODateTime3 = ParseISODateTime(isoString);
      month = _ParseISODateTime3.month;
      day = _ParseISODateTime3.day;
      calendar = _ParseISODateTime3.calendar;
      referenceISOYear = _ParseISODateTime3.year;
      z = _ParseISODateTime3.z;
      if (z) throw new RangeError('Z designator not supported for PlainMonthDay');
    }
    return {
      month: month,
      day: day,
      calendar: calendar,
      referenceISOYear: referenceISOYear
    };
  }
  var TIMEZONE_IDENTIFIER = new RegExp("^".concat(timeZoneID.source, "$"), 'i');
  var OFFSET_IDENTIFIER = new RegExp("^".concat(offsetIdentifier.source, "$"));
  function throwBadTimeZoneStringError(timeZoneString) {
    // Offset identifiers only support minute precision, but offsets in ISO
    // strings support nanosecond precision. If the identifier is invalid but
    // it's a valid ISO offset, then it has sub-minute precision. Show a clearer
    // error message in that case.
    var msg = OFFSET.test(timeZoneString) ? 'Seconds not allowed in offset time zone' : 'Invalid time zone';
    throw new RangeError("".concat(msg, ": ").concat(timeZoneString));
  }
  function ParseTimeZoneIdentifier(identifier) {
    if (!TIMEZONE_IDENTIFIER.test(identifier)) {
      throwBadTimeZoneStringError(identifier);
    }
    if (OFFSET_IDENTIFIER.test(identifier)) {
      var offsetNanoseconds = ParseDateTimeUTCOffset(identifier);
      // The regex limits the input to minutes precision, so we know that the
      // division below will result in an integer.
      return {
        offsetMinutes: offsetNanoseconds / 60e9
      };
    }
    return {
      tzName: identifier
    };
  }
  // This operation doesn't exist in the spec, but in the polyfill it's split from
  // ParseTemporalTimeZoneString so that parsing can be tested separately from the
  // logic of converting parsed values into a named or offset identifier.
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalTimeZoneStringRaw(timeZoneString) {
    if (TIMEZONE_IDENTIFIER.test(timeZoneString)) {
      return {
        tzAnnotation: timeZoneString,
        offset: undefined,
        z: false
      };
    }
    try {
      // Try parsing ISO string instead
      var _ParseISODateTime4 = ParseISODateTime(timeZoneString),
        tzAnnotation = _ParseISODateTime4.tzAnnotation,
        offset = _ParseISODateTime4.offset,
        z = _ParseISODateTime4.z;
      if (z || tzAnnotation || offset) {
        return {
          tzAnnotation: tzAnnotation,
          offset: offset,
          z: z
        };
      }
    } catch (_unused3) {
      // fall through
    }
    throwBadTimeZoneStringError(timeZoneString);
  }
  function ParseTemporalTimeZoneString(stringIdent) {
    var _ParseTemporalTimeZon = ParseTemporalTimeZoneStringRaw(stringIdent),
      tzAnnotation = _ParseTemporalTimeZon.tzAnnotation,
      offset = _ParseTemporalTimeZon.offset,
      z = _ParseTemporalTimeZon.z;
    if (tzAnnotation) return ParseTimeZoneIdentifier(tzAnnotation);
    if (z) return ParseTimeZoneIdentifier('UTC');
    if (offset) return ParseTimeZoneIdentifier(offset);
    /* c8 ignore next */
    assertNotReached();
  }
  // ts-prune-ignore-next TODO: remove if test/validStrings is converted to TS.
  function ParseTemporalDurationStringRaw(isoString) {
    var match = duration.exec(isoString);
    if (!match) throw new RangeError("invalid duration: ".concat(isoString));
    if (match.every(function (part, i) {
      return i < 2 || part === undefined;
    })) {
      throw new RangeError("invalid duration: ".concat(isoString));
    }
    var sign = match[1] === '-' ? -1 : 1;
    var years = match[2] === undefined ? 0 : ToIntegerWithTruncation(match[2]) * sign;
    var months = match[3] === undefined ? 0 : ToIntegerWithTruncation(match[3]) * sign;
    var weeks = match[4] === undefined ? 0 : ToIntegerWithTruncation(match[4]) * sign;
    var days = match[5] === undefined ? 0 : ToIntegerWithTruncation(match[5]) * sign;
    var hours = match[6] === undefined ? 0 : ToIntegerWithTruncation(match[6]) * sign;
    var fHours = match[7];
    var minutesStr = match[8];
    var fMinutes = match[9];
    var secondsStr = match[10];
    var fSeconds = match[11];
    var minutes = 0;
    var seconds = 0;
    // fractional hours, minutes, or seconds, expressed in whole nanoseconds:
    var excessNanoseconds = 0;
    if (fHours !== undefined) {
      var _ref13, _ref14, _ref15;
      if ((_ref13 = (_ref14 = (_ref15 = minutesStr !== null && minutesStr !== void 0 ? minutesStr : fMinutes) !== null && _ref15 !== void 0 ? _ref15 : secondsStr) !== null && _ref14 !== void 0 ? _ref14 : fSeconds) !== null && _ref13 !== void 0 ? _ref13 : false) {
        throw new RangeError('only the smallest unit can be fractional');
      }
      excessNanoseconds = ToIntegerWithTruncation((fHours + '000000000').slice(0, 9)) * 3600 * sign;
    } else {
      minutes = minutesStr === undefined ? 0 : ToIntegerWithTruncation(minutesStr) * sign;
      if (fMinutes !== undefined) {
        var _ref16;
        if ((_ref16 = secondsStr !== null && secondsStr !== void 0 ? secondsStr : fSeconds) !== null && _ref16 !== void 0 ? _ref16 : false) {
          throw new RangeError('only the smallest unit can be fractional');
        }
        excessNanoseconds = ToIntegerWithTruncation((fMinutes + '000000000').slice(0, 9)) * 60 * sign;
      } else {
        seconds = secondsStr === undefined ? 0 : ToIntegerWithTruncation(secondsStr) * sign;
        if (fSeconds !== undefined) {
          excessNanoseconds = ToIntegerWithTruncation((fSeconds + '000000000').slice(0, 9)) * sign;
        }
      }
    }
    var nanoseconds = excessNanoseconds % 1000;
    var microseconds = Math.trunc(excessNanoseconds / 1000) % 1000;
    var milliseconds = Math.trunc(excessNanoseconds / 1e6) % 1000;
    seconds += Math.trunc(excessNanoseconds / 1e9) % 60;
    minutes += Math.trunc(excessNanoseconds / 60e9);
    RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    return {
      years: years,
      months: months,
      weeks: weeks,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
      microseconds: microseconds,
      nanoseconds: nanoseconds
    };
  }
  function ParseTemporalDurationString(isoString) {
    var _ParseTemporalDuratio = ParseTemporalDurationStringRaw(isoString),
      years = _ParseTemporalDuratio.years,
      months = _ParseTemporalDuratio.months,
      weeks = _ParseTemporalDuratio.weeks,
      days = _ParseTemporalDuratio.days,
      hours = _ParseTemporalDuratio.hours,
      minutes = _ParseTemporalDuratio.minutes,
      seconds = _ParseTemporalDuratio.seconds,
      milliseconds = _ParseTemporalDuratio.milliseconds,
      microseconds = _ParseTemporalDuratio.microseconds,
      nanoseconds = _ParseTemporalDuratio.nanoseconds;
    var TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    return new TemporalDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
  }
  function RegulateISODate(yearParam, monthParam, dayParam, overflow) {
    var year = yearParam;
    var month = monthParam;
    var day = dayParam;
    switch (overflow) {
      case 'reject':
        RejectISODate(year, month, day);
        break;
      case 'constrain':
        var _ConstrainISODate = ConstrainISODate(year, month, day);
        year = _ConstrainISODate.year;
        month = _ConstrainISODate.month;
        day = _ConstrainISODate.day;
        break;
    }
    return {
      year: year,
      month: month,
      day: day
    };
  }
  function RegulateTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam, overflow) {
    var hour = hourParam;
    var minute = minuteParam;
    var second = secondParam;
    var millisecond = millisecondParam;
    var microsecond = microsecondParam;
    var nanosecond = nanosecondParam;
    switch (overflow) {
      case 'reject':
        RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
        break;
      case 'constrain':
        hour = ConstrainToRange(hour, 0, 23);
        minute = ConstrainToRange(minute, 0, 59);
        second = ConstrainToRange(second, 0, 59);
        millisecond = ConstrainToRange(millisecond, 0, 999);
        microsecond = ConstrainToRange(microsecond, 0, 999);
        nanosecond = ConstrainToRange(nanosecond, 0, 999);
        break;
    }
    return {
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  }
  function ToTemporalPartialDurationRecord(temporalDurationLike) {
    if (!IsObject(temporalDurationLike)) {
      throw new TypeError('invalid duration-like');
    }
    var result = {
      years: undefined,
      months: undefined,
      weeks: undefined,
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
      milliseconds: undefined,
      microseconds: undefined,
      nanoseconds: undefined
    };
    var any = false;
    for (var index = 0; index < DURATION_FIELDS.length; index++) {
      var property = DURATION_FIELDS[index];
      var value = temporalDurationLike[property];
      if (value !== undefined) {
        any = true;
        result[property] = ToIntegerIfIntegral(value);
      }
    }
    if (!any) {
      throw new TypeError('invalid duration-like');
    }
    return result;
  }
  function AdjustDateDurationRecord(_ref17, newDays, newWeeks, newMonths) {
    var years = _ref17.years,
      months = _ref17.months,
      weeks = _ref17.weeks,
      days = _ref17.days;
    return {
      years: years,
      months: newMonths !== null && newMonths !== void 0 ? newMonths : months,
      weeks: newWeeks !== null && newWeeks !== void 0 ? newWeeks : weeks,
      days: newDays !== null && newDays !== void 0 ? newDays : days
    };
  }
  function ZeroDateDuration() {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0
    };
  }
  function CombineISODateAndTimeRecord(isoDate, time) {
    return {
      isoDate: isoDate,
      time: time
    };
  }
  function MidnightTimeRecord() {
    return {
      deltaDays: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
      nanosecond: 0
    };
  }
  function NoonTimeRecord() {
    return {
      deltaDays: 0,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
      nanosecond: 0
    };
  }
  function GetTemporalOverflowOption(options) {
    return GetOption(options, 'overflow', ['constrain', 'reject'], 'constrain');
  }
  function GetTemporalDisambiguationOption(options) {
    return GetOption(options, 'disambiguation', ['compatible', 'earlier', 'later', 'reject'], 'compatible');
  }
  function GetRoundingModeOption(options, fallback) {
    return GetOption(options, 'roundingMode', ['ceil', 'floor', 'expand', 'trunc', 'halfCeil', 'halfFloor', 'halfExpand', 'halfTrunc', 'halfEven'], fallback);
  }
  function NegateRoundingMode(roundingMode) {
    switch (roundingMode) {
      case 'ceil':
        return 'floor';
      case 'floor':
        return 'ceil';
      case 'halfCeil':
        return 'halfFloor';
      case 'halfFloor':
        return 'halfCeil';
      default:
        return roundingMode;
    }
  }
  function GetTemporalOffsetOption(options, fallback) {
    return GetOption(options, 'offset', ['prefer', 'use', 'ignore', 'reject'], fallback);
  }
  function GetTemporalShowCalendarNameOption(options) {
    return GetOption(options, 'calendarName', ['auto', 'always', 'never', 'critical'], 'auto');
  }
  function GetTemporalShowTimeZoneNameOption(options) {
    return GetOption(options, 'timeZoneName', ['auto', 'never', 'critical'], 'auto');
  }
  function GetTemporalShowOffsetOption(options) {
    return GetOption(options, 'offset', ['auto', 'never'], 'auto');
  }
  function GetDirectionOption(options) {
    return GetOption(options, 'direction', ['next', 'previous'], REQUIRED);
  }
  function GetTemporalRoundingIncrementOption(options) {
    var increment = options.roundingIncrement;
    if (increment === undefined) return 1;
    var integerIncrement = ToIntegerWithTruncation(increment);
    if (integerIncrement < 1 || integerIncrement > 1e9) {
      throw new RangeError("roundingIncrement must be at least 1 and at most 1e9, not ".concat(increment));
    }
    return integerIncrement;
  }
  function ValidateTemporalRoundingIncrement(increment, dividend, inclusive) {
    var maximum = inclusive ? dividend : dividend - 1;
    if (increment > maximum) {
      throw new RangeError("roundingIncrement must be at least 1 and less than ".concat(maximum, ", not ").concat(increment));
    }
    if (dividend % increment !== 0) {
      throw new RangeError("Rounding increment must divide evenly into ".concat(dividend));
    }
  }
  function GetTemporalFractionalSecondDigitsOption(normalizedOptions) {
    var digitsValue = normalizedOptions.fractionalSecondDigits;
    if (digitsValue === undefined) return 'auto';
    if (typeof digitsValue !== 'number') {
      if (ToString(digitsValue) !== 'auto') {
        throw new RangeError("fractionalSecondDigits must be 'auto' or 0 through 9, not ".concat(digitsValue));
      }
      return 'auto';
    }
    var digitCount = Math.floor(digitsValue);
    if (!Number.isFinite(digitCount) || digitCount < 0 || digitCount > 9) {
      throw new RangeError("fractionalSecondDigits must be 'auto' or 0 through 9, not ".concat(digitsValue));
    }
    return digitCount;
  }
  function ToSecondsStringPrecisionRecord(smallestUnit, precision) {
    switch (smallestUnit) {
      case 'minute':
        return {
          precision: 'minute',
          unit: 'minute',
          increment: 1
        };
      case 'second':
        return {
          precision: 0,
          unit: 'second',
          increment: 1
        };
      case 'millisecond':
        return {
          precision: 3,
          unit: 'millisecond',
          increment: 1
        };
      case 'microsecond':
        return {
          precision: 6,
          unit: 'microsecond',
          increment: 1
        };
      case 'nanosecond':
        return {
          precision: 9,
          unit: 'nanosecond',
          increment: 1
        };
    }
    switch (precision) {
      case 'auto':
        return {
          precision: precision,
          unit: 'nanosecond',
          increment: 1
        };
      case 0:
        return {
          precision: precision,
          unit: 'second',
          increment: 1
        };
      case 1:
      case 2:
      case 3:
        return {
          precision: precision,
          unit: 'millisecond',
          increment: Math.pow(10, 3 - precision)
        };
      case 4:
      case 5:
      case 6:
        return {
          precision: precision,
          unit: 'microsecond',
          increment: Math.pow(10, 6 - precision)
        };
      case 7:
      case 8:
      case 9:
        return {
          precision: precision,
          unit: 'nanosecond',
          increment: Math.pow(10, 9 - precision)
        };
      default:
        throw new RangeError("fractionalSecondDigits must be 'auto' or 0 through 9, not ".concat(precision));
    }
  }
  var REQUIRED = Symbol('~required~');
  // This signature of the function is NOT used in type-checking, so restricting
  // the default value via generic binding like the other overloads isn't
  // necessary.
  function GetTemporalUnitValuedOption(options, key, unitGroup, requiredOrDefault) {
    var extraValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var allowedSingular = [];
    for (var index = 0; index < TEMPORAL_UNITS.length; index++) {
      var unitInfo = TEMPORAL_UNITS[index];
      var singular = unitInfo[1];
      var category = unitInfo[2];
      if (unitGroup === 'datetime' || unitGroup === category) {
        allowedSingular.push(singular);
      }
    }
    allowedSingular = allowedSingular.concat(extraValues);
    var defaultVal = requiredOrDefault;
    if (defaultVal === REQUIRED) {
      defaultVal = undefined;
    } else if (defaultVal !== undefined) {
      allowedSingular.push(defaultVal);
    }
    var allowedValues = [];
    allowedValues = allowedValues.concat(allowedSingular);
    for (var _index = 0; _index < allowedSingular.length; _index++) {
      var _singular = allowedSingular[_index];
      var plural = PLURAL_FOR[_singular];
      if (plural !== undefined) allowedValues.push(plural);
    }
    var retval = GetOption(options, key, allowedValues, defaultVal);
    if (retval === undefined && requiredOrDefault === REQUIRED) {
      throw new RangeError("".concat(key, " is required"));
    }
    // Coerce any plural units into their singular form
    return retval && retval in SINGULAR_FOR ? SINGULAR_FOR[retval] : retval;
  }
  function GetTemporalRelativeToOption(options) {
    var relativeTo = options.relativeTo;
    if (relativeTo === undefined) return {};
    var offsetBehaviour = 'option';
    var matchMinutes = false;
    var isoDate, time, calendar, timeZone, offset;
    if (IsObject(relativeTo)) {
      if (IsTemporalZonedDateTime(relativeTo)) {
        return {
          zonedRelativeTo: relativeTo
        };
      }
      if (IsTemporalDate(relativeTo)) return {
        plainRelativeTo: relativeTo
      };
      if (IsTemporalDateTime(relativeTo)) {
        return {
          plainRelativeTo: CreateTemporalDate(GetSlot(relativeTo, ISO_DATE_TIME).isoDate, GetSlot(relativeTo, CALENDAR))
        };
      }
      calendar = GetTemporalCalendarIdentifierWithISODefault(relativeTo);
      var fields = PrepareCalendarFields(calendar, relativeTo, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset', 'timeZone'], []);
      var _InterpretTemporalDat = InterpretTemporalDateTimeFields(calendar, fields, 'constrain');
      isoDate = _InterpretTemporalDat.isoDate;
      time = _InterpretTemporalDat.time;
      offset = fields.offset;
      timeZone = fields.timeZone;
      if (offset === undefined) offsetBehaviour = 'wall';
    } else {
      var tzAnnotation, z, year, month, day;
      var _ParseISODateTime5 = ParseISODateTime(RequireString(relativeTo));
      year = _ParseISODateTime5.year;
      month = _ParseISODateTime5.month;
      day = _ParseISODateTime5.day;
      time = _ParseISODateTime5.time;
      calendar = _ParseISODateTime5.calendar;
      tzAnnotation = _ParseISODateTime5.tzAnnotation;
      offset = _ParseISODateTime5.offset;
      z = _ParseISODateTime5.z;
      if (tzAnnotation) {
        timeZone = ToTemporalTimeZoneIdentifier(tzAnnotation);
        if (z) {
          offsetBehaviour = 'exact';
        } else if (!offset) {
          offsetBehaviour = 'wall';
        }
        matchMinutes = true;
      } else if (z) {
        throw new RangeError('Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone');
      }
      if (!calendar) calendar = 'iso8601';
      calendar = CanonicalizeCalendar(calendar);
      isoDate = {
        year: year,
        month: month,
        day: day
      };
    }
    if (timeZone === undefined) {
      return {
        plainRelativeTo: CreateTemporalDate(isoDate, calendar)
      };
    }
    var offsetNs = offsetBehaviour === 'option' ? ParseDateTimeUTCOffset(castExists(offset)) : 0;
    var epochNanoseconds = InterpretISODateTimeOffset(isoDate, time, offsetBehaviour, offsetNs, timeZone, 'compatible', 'reject', matchMinutes);
    return {
      zonedRelativeTo: CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar)
    };
  }
  function DefaultTemporalLargestUnit(duration) {
    if (GetSlot(duration, YEARS) !== 0) return 'year';
    if (GetSlot(duration, MONTHS) !== 0) return 'month';
    if (GetSlot(duration, WEEKS) !== 0) return 'week';
    if (GetSlot(duration, DAYS) !== 0) return 'day';
    if (GetSlot(duration, HOURS) !== 0) return 'hour';
    if (GetSlot(duration, MINUTES) !== 0) return 'minute';
    if (GetSlot(duration, SECONDS) !== 0) return 'second';
    if (GetSlot(duration, MILLISECONDS) !== 0) return 'millisecond';
    if (GetSlot(duration, MICROSECONDS) !== 0) return 'microsecond';
    return 'nanosecond';
  }
  function LargerOfTwoTemporalUnits(unit1, unit2) {
    var i1 = UNITS_DESCENDING.indexOf(unit1);
    var i2 = UNITS_DESCENDING.indexOf(unit2);
    if (i1 > i2) {
      return unit2;
    }
    return unit1;
  }
  function IsCalendarUnit(unit) {
    return unit === 'year' || unit === 'month' || unit === 'week';
  }
  function TemporalUnitCategory(unit) {
    if (IsCalendarUnit(unit) || unit === 'day') return 'date';
    return 'time';
  }
  function calendarImplForID(calendar) {
    return GetIntrinsic('%calendarImpl%')(calendar);
  }
  function calendarImplForObj(temporalObj) {
    return GetIntrinsic('%calendarImpl%')(GetSlot(temporalObj, CALENDAR));
  }
  function ISODateToFields(calendar, isoDate) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'date';
    var fields = Object.create(null);
    var calendarImpl = calendarImplForID(calendar);
    var calendarDate = calendarImpl.isoToDate(isoDate, {
      year: true,
      monthCode: true,
      day: true
    });
    fields.monthCode = calendarDate.monthCode;
    if (type === 'month-day' || type === 'date') {
      fields.day = calendarDate.day;
    }
    if (type === 'year-month' || type === 'date') {
      fields.year = calendarDate.year;
    }
    return fields;
  }
  function PrepareCalendarFields(calendar, bag, calendarFieldNames, nonCalendarFieldNames, requiredFields) {
    var extraFieldNames = calendarImplForID(calendar).extraFields(calendarFieldNames);
    var fields = calendarFieldNames.concat(nonCalendarFieldNames, extraFieldNames);
    var result = Object.create(null);
    var any = false;
    fields.sort();
    for (var index = 0; index < fields.length; index++) {
      var property = fields[index];
      var value = bag[property];
      if (value !== undefined) {
        any = true;
        result[property] = castExists(BUILTIN_CASTS[property])(value);
      } else if (requiredFields !== 'partial') {
        if (requiredFields.includes(property)) {
          throw new TypeError("required property '".concat(property, "' missing or undefined"));
        }
        result[property] = BUILTIN_DEFAULTS[property];
      }
    }
    if (requiredFields === 'partial' && !any) {
      throw new TypeError('no supported properties found');
    }
    return result;
  }
  function ToTemporalTimeRecord(bag) {
    var completeness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'complete';
    // NOTE: Field order is sorted to make the sort in PrepareTemporalFields more efficient.
    var fields = ['hour', 'microsecond', 'millisecond', 'minute', 'nanosecond', 'second'];
    var any = false;
    var result = Object.create(null);
    for (var index = 0; index < fields.length; index++) {
      var field = fields[index];
      var value = bag[field];
      if (value !== undefined) {
        result[field] = ToIntegerWithTruncation(value);
        any = true;
      } else if (completeness === 'complete') {
        result[field] = 0;
      }
    }
    if (!any) throw new TypeError('invalid time-like');
    return result;
  }
  function ToTemporalDate(item, options) {
    if (IsObject(item)) {
      if (IsTemporalDate(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalDate(GetSlot(item, ISO_DATE), GetSlot(item, CALENDAR));
      }
      if (IsTemporalZonedDateTime(item)) {
        var isoDateTime = GetISODateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, EPOCHNANOSECONDS));
        GetTemporalOverflowOption(GetOptionsObject(options)); // validate and ignore
        var _isoDate = isoDateTime.isoDate;
        return CreateTemporalDate(_isoDate, GetSlot(item, CALENDAR));
      }
      if (IsTemporalDateTime(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options)); // validate and ignore
        return CreateTemporalDate(GetSlot(item, ISO_DATE_TIME).isoDate, GetSlot(item, CALENDAR));
      }
      var _calendar = GetTemporalCalendarIdentifierWithISODefault(item);
      var fields = PrepareCalendarFields(_calendar, item, ['year', 'month', 'monthCode', 'day'], [], []);
      var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
      var isoDate = CalendarDateFromFields(_calendar, fields, overflow);
      return CreateTemporalDate(isoDate, _calendar);
    }
    var _ParseTemporalDateStr = ParseTemporalDateString(RequireString(item)),
      year = _ParseTemporalDateStr.year,
      month = _ParseTemporalDateStr.month,
      day = _ParseTemporalDateStr.day,
      calendar = _ParseTemporalDateStr.calendar,
      z = _ParseTemporalDateStr.z;
    if (z) throw new RangeError('Z designator not supported for PlainDate');
    if (!calendar) calendar = 'iso8601';
    calendar = CanonicalizeCalendar(calendar);
    GetTemporalOverflowOption(GetOptionsObject(options)); // validate and ignore
    return CreateTemporalDate({
      year: year,
      month: month,
      day: day
    }, calendar);
  }
  function InterpretTemporalDateTimeFields(calendar, fields, overflow) {
    var isoDate = CalendarDateFromFields(calendar, fields, overflow);
    var time = RegulateTime(fields.hour, fields.minute, fields.second, fields.millisecond, fields.microsecond, fields.nanosecond, overflow);
    return CombineISODateAndTimeRecord(isoDate, time);
  }
  function ToTemporalDateTime(item, options) {
    var isoDate, time, calendar;
    if (IsObject(item)) {
      if (IsTemporalDateTime(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalDateTime(GetSlot(item, ISO_DATE_TIME), GetSlot(item, CALENDAR));
      }
      if (IsTemporalZonedDateTime(item)) {
        var _isoDateTime = GetISODateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, EPOCHNANOSECONDS));
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalDateTime(_isoDateTime, GetSlot(item, CALENDAR));
      }
      if (IsTemporalDate(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalDateTime(CombineISODateAndTimeRecord(GetSlot(item, ISO_DATE), MidnightTimeRecord()), GetSlot(item, CALENDAR));
      }
      calendar = GetTemporalCalendarIdentifierWithISODefault(item);
      var fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond'], []);
      var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
      var _InterpretTemporalDat2 = InterpretTemporalDateTimeFields(calendar, fields, overflow);
      isoDate = _InterpretTemporalDat2.isoDate;
      time = _InterpretTemporalDat2.time;
    } else {
      var z, year, month, day;
      var _ParseTemporalDateTim = ParseTemporalDateTimeString(RequireString(item));
      year = _ParseTemporalDateTim.year;
      month = _ParseTemporalDateTim.month;
      day = _ParseTemporalDateTim.day;
      time = _ParseTemporalDateTim.time;
      calendar = _ParseTemporalDateTim.calendar;
      z = _ParseTemporalDateTim.z;
      if (z) throw new RangeError('Z designator not supported for PlainDateTime');
      if (time === 'start-of-day') time = MidnightTimeRecord();
      RejectDateTime(year, month, day, time.hour, time.minute, time.second, time.millisecond, time.microsecond, time.nanosecond);
      if (!calendar) calendar = 'iso8601';
      calendar = CanonicalizeCalendar(calendar);
      GetTemporalOverflowOption(GetOptionsObject(options));
      isoDate = {
        year: year,
        month: month,
        day: day
      };
    }
    var isoDateTime = CombineISODateAndTimeRecord(isoDate, time);
    return CreateTemporalDateTime(isoDateTime, calendar);
  }
  function ToTemporalDuration(item) {
    var TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    if (IsTemporalDuration(item)) {
      return new TemporalDuration(GetSlot(item, YEARS), GetSlot(item, MONTHS), GetSlot(item, WEEKS), GetSlot(item, DAYS), GetSlot(item, HOURS), GetSlot(item, MINUTES), GetSlot(item, SECONDS), GetSlot(item, MILLISECONDS), GetSlot(item, MICROSECONDS), GetSlot(item, NANOSECONDS));
    }
    if (!IsObject(item)) {
      return ParseTemporalDurationString(RequireString(item));
    }
    var result = {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      microseconds: 0,
      nanoseconds: 0
    };
    var partial = ToTemporalPartialDurationRecord(item);
    for (var index = 0; index < DURATION_FIELDS.length; index++) {
      var property = DURATION_FIELDS[index];
      var value = partial[property];
      if (value !== undefined) {
        result[property] = value;
      }
    }
    return new TemporalDuration(result.years, result.months, result.weeks, result.days, result.hours, result.minutes, result.seconds, result.milliseconds, result.microseconds, result.nanoseconds);
  }
  function ToTemporalInstant(itemParam) {
    var item;
    if (IsObject(itemParam)) {
      if (IsTemporalInstant(itemParam) || IsTemporalZonedDateTime(itemParam)) {
        return CreateTemporalInstant(GetSlot(itemParam, EPOCHNANOSECONDS));
      }
      item = ToPrimitive(itemParam, String);
    } else {
      item = itemParam;
    }
    var _ParseTemporalInstant = ParseTemporalInstantString(RequireString(item)),
      year = _ParseTemporalInstant.year,
      month = _ParseTemporalInstant.month,
      day = _ParseTemporalInstant.day,
      time = _ParseTemporalInstant.time,
      offset = _ParseTemporalInstant.offset,
      z = _ParseTemporalInstant.z;
    var _ref18 = time === 'start-of-day' ? {} : time,
      _ref18$hour = _ref18.hour,
      hour = _ref18$hour === void 0 ? 0 : _ref18$hour,
      _ref18$minute = _ref18.minute,
      minute = _ref18$minute === void 0 ? 0 : _ref18$minute,
      _ref18$second = _ref18.second,
      second = _ref18$second === void 0 ? 0 : _ref18$second,
      _ref18$millisecond = _ref18.millisecond,
      millisecond = _ref18$millisecond === void 0 ? 0 : _ref18$millisecond,
      _ref18$microsecond = _ref18.microsecond,
      microsecond = _ref18$microsecond === void 0 ? 0 : _ref18$microsecond,
      _ref18$nanosecond = _ref18.nanosecond,
      nanosecond = _ref18$nanosecond === void 0 ? 0 : _ref18$nanosecond;
    // ParseTemporalInstantString ensures that either `z` is true or or `offset` is non-undefined
    var offsetNanoseconds = z ? 0 : ParseDateTimeUTCOffset(castExists(offset));
    var balanced = BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond - offsetNanoseconds);
    CheckISODaysRange(balanced.isoDate);
    var epochNanoseconds = GetUTCEpochNanoseconds(balanced);
    return CreateTemporalInstant(epochNanoseconds);
  }
  function ToTemporalMonthDay(item, options) {
    if (IsObject(item)) {
      if (IsTemporalMonthDay(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalMonthDay(GetSlot(item, ISO_DATE), GetSlot(item, CALENDAR));
      }
      var _calendar2;
      if (HasSlot(item, CALENDAR)) {
        _calendar2 = GetSlot(item, CALENDAR);
      } else {
        _calendar2 = item.calendar;
        if (_calendar2 === undefined) _calendar2 = 'iso8601';
        _calendar2 = ToTemporalCalendarIdentifier(_calendar2);
      }
      var fields = PrepareCalendarFields(_calendar2, item, ['year', 'month', 'monthCode', 'day'], [], []);
      var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
      var _isoDate2 = CalendarMonthDayFromFields(_calendar2, fields, overflow);
      return CreateTemporalMonthDay(_isoDate2, _calendar2);
    }
    var _ParseTemporalMonthDa2 = ParseTemporalMonthDayString(RequireString(item)),
      month = _ParseTemporalMonthDa2.month,
      day = _ParseTemporalMonthDa2.day,
      referenceISOYear = _ParseTemporalMonthDa2.referenceISOYear,
      calendar = _ParseTemporalMonthDa2.calendar;
    if (calendar === undefined) calendar = 'iso8601';
    calendar = CanonicalizeCalendar(calendar);
    GetTemporalOverflowOption(GetOptionsObject(options));
    if (calendar === 'iso8601') {
      var isoCalendarReferenceYear = 1972; // First leap year after Unix epoch
      return CreateTemporalMonthDay({
        year: isoCalendarReferenceYear,
        month: month,
        day: day
      }, calendar);
    }
    assertExists(referenceISOYear);
    var isoDate = {
      year: referenceISOYear,
      month: month,
      day: day
    };
    RejectDateRange(isoDate);
    var result = ISODateToFields(calendar, isoDate, 'month-day');
    isoDate = CalendarMonthDayFromFields(calendar, result, 'constrain');
    return CreateTemporalMonthDay(isoDate, calendar);
  }
  function ToTemporalTime(item, options) {
    var time;
    if (IsObject(item)) {
      if (IsTemporalTime(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalTime(GetSlot(item, TIME));
      }
      if (IsTemporalDateTime(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalTime(GetSlot(item, ISO_DATE_TIME).time);
      }
      if (IsTemporalZonedDateTime(item)) {
        var isoDateTime = GetISODateTimeFor(GetSlot(item, TIME_ZONE), GetSlot(item, EPOCHNANOSECONDS));
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalTime(isoDateTime.time);
      }
      var _ToTemporalTimeRecord = ToTemporalTimeRecord(item),
        hour = _ToTemporalTimeRecord.hour,
        minute = _ToTemporalTimeRecord.minute,
        second = _ToTemporalTimeRecord.second,
        millisecond = _ToTemporalTimeRecord.millisecond,
        microsecond = _ToTemporalTimeRecord.microsecond,
        nanosecond = _ToTemporalTimeRecord.nanosecond;
      var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
      time = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow);
    } else {
      time = ParseTemporalTimeString(RequireString(item));
      GetTemporalOverflowOption(GetOptionsObject(options));
    }
    return CreateTemporalTime(time);
  }
  function ToTimeRecordOrMidnight(item) {
    if (item === undefined) return MidnightTimeRecord();
    return GetSlot(ToTemporalTime(item), TIME);
  }
  function ToTemporalYearMonth(item, options) {
    if (IsObject(item)) {
      if (IsTemporalYearMonth(item)) {
        GetTemporalOverflowOption(GetOptionsObject(options));
        return CreateTemporalYearMonth(GetSlot(item, ISO_DATE), GetSlot(item, CALENDAR));
      }
      var _calendar3 = GetTemporalCalendarIdentifierWithISODefault(item);
      var fields = PrepareCalendarFields(_calendar3, item, ['year', 'month', 'monthCode'], [], []);
      var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
      var _isoDate3 = CalendarYearMonthFromFields(_calendar3, fields, overflow);
      return CreateTemporalYearMonth(_isoDate3, _calendar3);
    }
    var _ParseTemporalYearMon2 = ParseTemporalYearMonthString(RequireString(item)),
      year = _ParseTemporalYearMon2.year,
      month = _ParseTemporalYearMon2.month,
      referenceISODay = _ParseTemporalYearMon2.referenceISODay,
      calendar = _ParseTemporalYearMon2.calendar;
    if (calendar === undefined) calendar = 'iso8601';
    calendar = CanonicalizeCalendar(calendar);
    GetTemporalOverflowOption(GetOptionsObject(options));
    var isoDate = {
      year: year,
      month: month,
      day: referenceISODay
    };
    RejectYearMonthRange(isoDate);
    var result = ISODateToFields(calendar, isoDate, 'year-month');
    isoDate = CalendarYearMonthFromFields(calendar, result, 'constrain');
    return CreateTemporalYearMonth(isoDate, calendar);
  }
  function InterpretISODateTimeOffset(isoDate, time, offsetBehaviour, offsetNs, timeZone, disambiguation, offsetOpt, matchMinute) {
    // start-of-day signifies that we had a string such as YYYY-MM-DD[Zone]. It is
    // grammatically not possible to specify a UTC offset in that string, so the
    // behaviour collapses into ~WALL~, which is equivalent to offset: "ignore".
    if (time === 'start-of-day') {
      assert(offsetBehaviour === 'wall', 'offset cannot be provided in YYYY-MM-DD[Zone] string');
      assert(offsetNs === 0, 'offset cannot be provided in YYYY-MM-DD[Zone] string');
      return GetStartOfDay(timeZone, isoDate);
    }
    var dt = CombineISODateAndTimeRecord(isoDate, time);
    if (offsetBehaviour === 'wall' || offsetOpt === 'ignore') {
      // Simple case: ISO string without a TZ offset (or caller wants to ignore
      // the offset), so just convert DateTime to Instant in the given time zone
      return GetEpochNanosecondsFor(timeZone, dt, disambiguation);
    }
    // The caller wants the offset to always win ('use') OR the caller is OK
    // with the offset winning ('prefer' or 'reject') as long as it's valid
    // for this timezone and date/time.
    if (offsetBehaviour === 'exact' || offsetOpt === 'use') {
      // Calculate the instant for the input's date/time and offset
      var balanced = BalanceISODateTime(isoDate.year, isoDate.month, isoDate.day, time.hour, time.minute, time.second, time.millisecond, time.microsecond, time.nanosecond - offsetNs);
      CheckISODaysRange(balanced.isoDate);
      var epochNs = GetUTCEpochNanoseconds(balanced);
      ValidateEpochNanoseconds(epochNs);
      return epochNs;
    }
    CheckISODaysRange(isoDate);
    var utcEpochNs = GetUTCEpochNanoseconds(dt);
    // "prefer" or "reject"
    var possibleEpochNs = GetPossibleEpochNanoseconds(timeZone, dt);
    for (var index = 0; index < possibleEpochNs.length; index++) {
      var candidate = possibleEpochNs[index];
      var candidateOffset = JSBI.toNumber(JSBI.subtract(utcEpochNs, candidate));
      var roundedCandidateOffset = RoundNumberToIncrement(candidateOffset, 60e9, 'halfExpand');
      if (candidateOffset === offsetNs || matchMinute && roundedCandidateOffset === offsetNs) {
        return candidate;
      }
    }
    // the user-provided offset doesn't match any instants for this time
    // zone and date/time.
    if (offsetOpt === 'reject') {
      var offsetStr = FormatUTCOffsetNanoseconds(offsetNs);
      var dtStr = ISODateTimeToString(dt, 'iso8601', 'auto');
      throw new RangeError("Offset ".concat(offsetStr, " is invalid for ").concat(dtStr, " in ").concat(timeZone));
    }
    // fall through: offsetOpt === 'prefer', but the offset doesn't match
    // so fall back to use the time zone instead.
    return DisambiguatePossibleEpochNanoseconds(possibleEpochNs, timeZone, dt, disambiguation);
  }
  function ToTemporalZonedDateTime(item, options) {
    var isoDate, time, timeZone, offset, calendar;
    var matchMinute = false;
    var offsetBehaviour = 'option';
    var disambiguation, offsetOpt;
    if (IsObject(item)) {
      if (IsTemporalZonedDateTime(item)) {
        var _resolvedOptions = GetOptionsObject(options);
        GetTemporalDisambiguationOption(_resolvedOptions); // validate and ignore
        GetTemporalOffsetOption(_resolvedOptions, 'reject');
        GetTemporalOverflowOption(_resolvedOptions);
        return CreateTemporalZonedDateTime(GetSlot(item, EPOCHNANOSECONDS), GetSlot(item, TIME_ZONE), GetSlot(item, CALENDAR));
      }
      calendar = GetTemporalCalendarIdentifierWithISODefault(item);
      var fields = PrepareCalendarFields(calendar, item, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset', 'timeZone'], ['timeZone']);
      offset = fields.offset;
      timeZone = fields.timeZone;
      if (offset === undefined) {
        offsetBehaviour = 'wall';
      }
      var resolvedOptions = GetOptionsObject(options);
      disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
      offsetOpt = GetTemporalOffsetOption(resolvedOptions, 'reject');
      var overflow = GetTemporalOverflowOption(resolvedOptions);
      var _InterpretTemporalDat3 = InterpretTemporalDateTimeFields(calendar, fields, overflow);
      isoDate = _InterpretTemporalDat3.isoDate;
      time = _InterpretTemporalDat3.time;
    } else {
      var tzAnnotation, z, year, month, day;
      var _ParseTemporalZonedDa = ParseTemporalZonedDateTimeString(RequireString(item));
      year = _ParseTemporalZonedDa.year;
      month = _ParseTemporalZonedDa.month;
      day = _ParseTemporalZonedDa.day;
      time = _ParseTemporalZonedDa.time;
      tzAnnotation = _ParseTemporalZonedDa.tzAnnotation;
      offset = _ParseTemporalZonedDa.offset;
      z = _ParseTemporalZonedDa.z;
      calendar = _ParseTemporalZonedDa.calendar;
      timeZone = ToTemporalTimeZoneIdentifier(tzAnnotation);
      if (z) {
        offsetBehaviour = 'exact';
      } else if (!offset) {
        offsetBehaviour = 'wall';
      }
      if (!calendar) calendar = 'iso8601';
      calendar = CanonicalizeCalendar(calendar);
      matchMinute = true; // ISO strings may specify offset with less precision
      var _resolvedOptions2 = GetOptionsObject(options);
      disambiguation = GetTemporalDisambiguationOption(_resolvedOptions2);
      offsetOpt = GetTemporalOffsetOption(_resolvedOptions2, 'reject');
      GetTemporalOverflowOption(_resolvedOptions2); // validate and ignore
      isoDate = {
        year: year,
        month: month,
        day: day
      };
    }
    var offsetNs = 0;
    if (offsetBehaviour === 'option') offsetNs = ParseDateTimeUTCOffset(castExists(offset));
    var epochNanoseconds = InterpretISODateTimeOffset(isoDate, time, offsetBehaviour, offsetNs, timeZone, disambiguation, offsetOpt, matchMinute);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar);
  }
  function CreateTemporalDateSlots(result, isoDate, calendar) {
    RejectDateRange(isoDate);
    CreateSlots(result);
    SetSlot(result, ISO_DATE, isoDate);
    SetSlot(result, CALENDAR, calendar);
    SetSlot(result, DATE_BRAND, true);
    {
      var repr = TemporalDateToString(result, 'auto');
      Object.defineProperty(result, '_repr_', {
        value: "Temporal.PlainDate <".concat(repr, ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalDate(isoDate, calendar) {
    var TemporalPlainDate = GetIntrinsic('%Temporal.PlainDate%');
    var result = Object.create(TemporalPlainDate.prototype);
    CreateTemporalDateSlots(result, isoDate, calendar);
    return result;
  }
  function CreateTemporalDateTimeSlots(result, isoDateTime, calendar) {
    RejectDateTimeRange(isoDateTime);
    CreateSlots(result);
    SetSlot(result, ISO_DATE_TIME, isoDateTime);
    SetSlot(result, CALENDAR, calendar);
    {
      var repr = ISODateTimeToString(isoDateTime, calendar, 'auto');
      Object.defineProperty(result, '_repr_', {
        value: "Temporal.PlainDateTime <".concat(repr, ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalDateTime(isoDateTime, calendar) {
    var TemporalPlainDateTime = GetIntrinsic('%Temporal.PlainDateTime%');
    var result = Object.create(TemporalPlainDateTime.prototype);
    CreateTemporalDateTimeSlots(result, isoDateTime, calendar);
    return result;
  }
  function CreateTemporalMonthDaySlots(result, isoDate, calendar) {
    RejectDateRange(isoDate);
    CreateSlots(result);
    SetSlot(result, ISO_DATE, isoDate);
    SetSlot(result, CALENDAR, calendar);
    SetSlot(result, MONTH_DAY_BRAND, true);
    {
      var repr = TemporalMonthDayToString(result, 'auto');
      Object.defineProperty(result, '_repr_', {
        value: "Temporal.PlainMonthDay <".concat(repr, ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalMonthDay(isoDate, calendar) {
    var TemporalPlainMonthDay = GetIntrinsic('%Temporal.PlainMonthDay%');
    var result = Object.create(TemporalPlainMonthDay.prototype);
    CreateTemporalMonthDaySlots(result, isoDate, calendar);
    return result;
  }
  function CreateTemporalTimeSlots(result, time) {
    CreateSlots(result);
    SetSlot(result, TIME, time);
    {
      Object.defineProperty(result, '_repr_', {
        value: "Temporal.PlainTime <".concat(TimeRecordToString(time, 'auto'), ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalTime(time) {
    var TemporalPlainTime = GetIntrinsic('%Temporal.PlainTime%');
    var result = Object.create(TemporalPlainTime.prototype);
    CreateTemporalTimeSlots(result, time);
    return result;
  }
  function CreateTemporalYearMonthSlots(result, isoDate, calendar) {
    RejectYearMonthRange(isoDate);
    CreateSlots(result);
    SetSlot(result, ISO_DATE, isoDate);
    SetSlot(result, CALENDAR, calendar);
    SetSlot(result, YEAR_MONTH_BRAND, true);
    {
      var repr = TemporalYearMonthToString(result, 'auto');
      Object.defineProperty(result, '_repr_', {
        value: "Temporal.PlainYearMonth <".concat(repr, ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalYearMonth(isoDate, calendar) {
    var TemporalPlainYearMonth = GetIntrinsic('%Temporal.PlainYearMonth%');
    var result = Object.create(TemporalPlainYearMonth.prototype);
    CreateTemporalYearMonthSlots(result, isoDate, calendar);
    return result;
  }
  function CreateTemporalInstantSlots(result, epochNanoseconds) {
    ValidateEpochNanoseconds(epochNanoseconds);
    CreateSlots(result);
    SetSlot(result, EPOCHNANOSECONDS, epochNanoseconds);
    {
      var iso = GetISOPartsFromEpoch(epochNanoseconds);
      var repr = ISODateTimeToString(iso, 'iso8601', 'auto', 'never') + 'Z';
      Object.defineProperty(result, '_repr_', {
        value: "".concat(result[Symbol.toStringTag], " <").concat(repr, ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalInstant(epochNanoseconds) {
    var TemporalInstant = GetIntrinsic('%Temporal.Instant%');
    var result = Object.create(TemporalInstant.prototype);
    CreateTemporalInstantSlots(result, epochNanoseconds);
    return result;
  }
  function CreateTemporalZonedDateTimeSlots(result, epochNanoseconds, timeZone, calendar) {
    ValidateEpochNanoseconds(epochNanoseconds);
    CreateSlots(result);
    SetSlot(result, EPOCHNANOSECONDS, epochNanoseconds);
    SetSlot(result, TIME_ZONE, timeZone);
    SetSlot(result, CALENDAR, calendar);
    {
      var repr = TemporalZonedDateTimeToString(result, 'auto');
      Object.defineProperty(result, '_repr_', {
        value: "Temporal.ZonedDateTime <".concat(repr, ">"),
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  function CreateTemporalZonedDateTime(epochNanoseconds, timeZone) {
    var calendar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iso8601';
    var TemporalZonedDateTime = GetIntrinsic('%Temporal.ZonedDateTime%');
    var result = Object.create(TemporalZonedDateTime.prototype);
    CreateTemporalZonedDateTimeSlots(result, epochNanoseconds, timeZone, calendar);
    return result;
  }
  function CalendarFieldKeysPresent(fields) {
    return CALENDAR_FIELD_KEYS.filter(function (key) {
      return fields[key] !== undefined;
    });
  }
  function CalendarMergeFields(calendar, fields, additionalFields) {
    var additionalKeys = CalendarFieldKeysPresent(additionalFields);
    var overriddenKeys = calendarImplForID(calendar).fieldKeysToIgnore(additionalKeys);
    var merged = Object.create(null);
    var fieldsKeys = CalendarFieldKeysPresent(fields);
    for (var ix = 0; ix < CALENDAR_FIELD_KEYS.length; ix++) {
      var propValue = undefined;
      var key = CALENDAR_FIELD_KEYS[ix];
      if (fieldsKeys.includes(key) && !overriddenKeys.includes(key)) {
        propValue = fields[key];
      }
      if (additionalKeys.includes(key)) {
        propValue = additionalFields[key];
      }
      if (propValue !== undefined) merged[key] = propValue;
    }
    return merged;
  }
  function CalendarDateAdd(calendar, isoDate, dateDuration, overflow) {
    var result = calendarImplForID(calendar).dateAdd(isoDate, dateDuration, overflow);
    RejectDateRange(result);
    return result;
  }
  function CalendarDateUntil(calendar, isoDate, isoOtherDate, largestUnit) {
    return calendarImplForID(calendar).dateUntil(isoDate, isoOtherDate, largestUnit);
  }
  function ToTemporalCalendarIdentifier(calendarLike) {
    if (IsObject(calendarLike)) {
      if (HasSlot(calendarLike, CALENDAR)) return GetSlot(calendarLike, CALENDAR);
    }
    var identifier = RequireString(calendarLike);
    try {
      // Fast path: identifier is a calendar type, no ISO string parsing needed
      return CanonicalizeCalendar(identifier);
    } catch (_unused4) {
      // fall through
    }
    var calendar;
    try {
      var _ParseISODateTime6 = ParseISODateTime(identifier);
      calendar = _ParseISODateTime6.calendar;
    } catch (_unused5) {
      try {
        var _ParseTemporalTimeStr = ParseTemporalTimeString(identifier);
        calendar = _ParseTemporalTimeStr.calendar;
      } catch (_unused6) {
        try {
          var _ParseTemporalYearMon3 = ParseTemporalYearMonthString(identifier);
          calendar = _ParseTemporalYearMon3.calendar;
        } catch (_unused7) {
          var _ParseTemporalMonthDa3 = ParseTemporalMonthDayString(identifier);
          calendar = _ParseTemporalMonthDa3.calendar;
        }
      }
    }
    if (!calendar) calendar = 'iso8601';
    return CanonicalizeCalendar(calendar);
  }
  function GetTemporalCalendarIdentifierWithISODefault(item) {
    if (HasSlot(item, CALENDAR)) return GetSlot(item, CALENDAR);
    var calendar = item.calendar;
    if (calendar === undefined) return 'iso8601';
    return ToTemporalCalendarIdentifier(calendar);
  }
  function CalendarEquals(one, two) {
    return CanonicalizeCalendar(one) === CanonicalizeCalendar(two);
  }
  function CalendarDateFromFields(calendar, fields, overflow) {
    var calendarImpl = calendarImplForID(calendar);
    calendarImpl.resolveFields(fields, 'date');
    var result = calendarImpl.dateToISO(fields, overflow);
    RejectDateRange(result);
    return result;
  }
  function CalendarYearMonthFromFields(calendar, fields, overflow) {
    var calendarImpl = calendarImplForID(calendar);
    calendarImpl.resolveFields(fields, 'year-month');
    fields.day = 1;
    var result = calendarImpl.dateToISO(fields, overflow);
    RejectYearMonthRange(result);
    return result;
  }
  function CalendarMonthDayFromFields(calendar, fields, overflow) {
    var calendarImpl = calendarImplForID(calendar);
    calendarImpl.resolveFields(fields, 'month-day');
    var result = calendarImpl.monthDayToISOReferenceDate(fields, overflow);
    RejectDateRange(result);
    return result;
  }
  function ToTemporalTimeZoneIdentifier(temporalTimeZoneLike) {
    if (IsObject(temporalTimeZoneLike)) {
      if (IsTemporalZonedDateTime(temporalTimeZoneLike)) return GetSlot(temporalTimeZoneLike, TIME_ZONE);
    }
    var timeZoneString = RequireString(temporalTimeZoneLike);
    if (timeZoneString === 'UTC') return 'UTC'; // UTC fast path
    var _ParseTemporalTimeZon2 = ParseTemporalTimeZoneString(timeZoneString),
      tzName = _ParseTemporalTimeZon2.tzName,
      offsetMinutes = _ParseTemporalTimeZon2.offsetMinutes;
    if (offsetMinutes !== undefined) {
      return FormatOffsetTimeZoneIdentifier(offsetMinutes);
    }
    // if offsetMinutes is undefined, then tzName must be present
    var record = GetAvailableNamedTimeZoneIdentifier(castExists(tzName));
    if (!record) throw new RangeError("Unrecognized time zone ".concat(tzName));
    return record.identifier;
  }
  function TimeZoneEquals(one, two) {
    if (one === two) return true;
    var offsetMinutes1 = ParseTimeZoneIdentifier(one).offsetMinutes;
    var offsetMinutes2 = ParseTimeZoneIdentifier(two).offsetMinutes;
    if (offsetMinutes1 === undefined && offsetMinutes2 === undefined) {
      // Calling GetAvailableNamedTimeZoneIdentifier is costly, so (unlike the
      // spec) the polyfill will early-return if one of them isn't recognized. Try
      // the second ID first because it's more likely to be unknown, because it
      // can come from the argument of TimeZone.p.equals as opposed to the first
      // ID which comes from the receiver.
      var idRecord2 = GetAvailableNamedTimeZoneIdentifier(two);
      if (!idRecord2) return false;
      var idRecord1 = GetAvailableNamedTimeZoneIdentifier(one);
      if (!idRecord1) return false;
      return idRecord1.primaryIdentifier === idRecord2.primaryIdentifier;
    } else {
      return offsetMinutes1 === offsetMinutes2;
    }
  }
  function GetOffsetNanosecondsFor(timeZone, epochNs) {
    var offsetMinutes = ParseTimeZoneIdentifier(timeZone).offsetMinutes;
    if (offsetMinutes !== undefined) return offsetMinutes * 60e9;
    return GetNamedTimeZoneOffsetNanoseconds(timeZone, epochNs);
  }
  function FormatUTCOffsetNanoseconds(offsetNs) {
    var sign = offsetNs < 0 ? '-' : '+';
    var absoluteNs = Math.abs(offsetNs);
    var hour = Math.floor(absoluteNs / 3600e9);
    var minute = Math.floor(absoluteNs / 60e9) % 60;
    var second = Math.floor(absoluteNs / 1e9) % 60;
    var subSecondNs = absoluteNs % 1e9;
    var precision = second === 0 && subSecondNs === 0 ? 'minute' : 'auto';
    var timeString = FormatTimeString(hour, minute, second, subSecondNs, precision);
    return "".concat(sign).concat(timeString);
  }
  function GetISODateTimeFor(timeZone, epochNs) {
    var offsetNs = GetOffsetNanosecondsFor(timeZone, epochNs);
    var _GetISOPartsFromEpoch = GetISOPartsFromEpoch(epochNs),
      _GetISOPartsFromEpoch2 = _GetISOPartsFromEpoch.isoDate,
      year = _GetISOPartsFromEpoch2.year,
      month = _GetISOPartsFromEpoch2.month,
      day = _GetISOPartsFromEpoch2.day,
      _GetISOPartsFromEpoch3 = _GetISOPartsFromEpoch.time,
      hour = _GetISOPartsFromEpoch3.hour,
      minute = _GetISOPartsFromEpoch3.minute,
      second = _GetISOPartsFromEpoch3.second,
      millisecond = _GetISOPartsFromEpoch3.millisecond,
      microsecond = _GetISOPartsFromEpoch3.microsecond,
      nanosecond = _GetISOPartsFromEpoch3.nanosecond;
    return BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond + offsetNs);
  }
  function GetEpochNanosecondsFor(timeZone, isoDateTime, disambiguation) {
    var possibleEpochNs = GetPossibleEpochNanoseconds(timeZone, isoDateTime);
    return DisambiguatePossibleEpochNanoseconds(possibleEpochNs, timeZone, isoDateTime, disambiguation);
  }
  // TODO: See if this logic can be removed in favour of GetNamedTimeZoneEpochNanoseconds
  function DisambiguatePossibleEpochNanoseconds(possibleEpochNs, timeZone, isoDateTime, disambiguation) {
    var numInstants = possibleEpochNs.length;
    if (numInstants === 1) return possibleEpochNs[0];
    if (numInstants) {
      switch (disambiguation) {
        case 'compatible':
        // fall through because 'compatible' means 'earlier' for "fall back" transitions
        case 'earlier':
          return possibleEpochNs[0];
        case 'later':
          return possibleEpochNs[numInstants - 1];
        case 'reject':
          {
            throw new RangeError('multiple instants found');
          }
      }
    }
    if (disambiguation === 'reject') throw new RangeError('multiple instants found');
    var utcns = GetUTCEpochNanoseconds(isoDateTime);
    var dayBefore = JSBI.subtract(utcns, DAY_NANOS_JSBI);
    ValidateEpochNanoseconds(dayBefore);
    var offsetBefore = GetOffsetNanosecondsFor(timeZone, dayBefore);
    var dayAfter = JSBI.add(utcns, DAY_NANOS_JSBI);
    ValidateEpochNanoseconds(dayAfter);
    var offsetAfter = GetOffsetNanosecondsFor(timeZone, dayAfter);
    var nanoseconds = offsetAfter - offsetBefore;
    assert(Math.abs(nanoseconds) <= DAY_NANOS, 'UTC offset shift longer than 24 hours');
    switch (disambiguation) {
      case 'earlier':
        {
          var timeDuration = TimeDuration.fromComponents(0, 0, 0, 0, 0, -nanoseconds);
          var earlierTime = AddTime(isoDateTime.time, timeDuration);
          var earlierDate = BalanceISODate(isoDateTime.isoDate.year, isoDateTime.isoDate.month, isoDateTime.isoDate.day + earlierTime.deltaDays);
          var earlier = CombineISODateAndTimeRecord(earlierDate, earlierTime);
          return GetPossibleEpochNanoseconds(timeZone, earlier)[0];
        }
      case 'compatible':
      // fall through because 'compatible' means 'later' for "spring forward" transitions
      case 'later':
        {
          var _timeDuration = TimeDuration.fromComponents(0, 0, 0, 0, 0, nanoseconds);
          var laterTime = AddTime(isoDateTime.time, _timeDuration);
          var laterDate = BalanceISODate(isoDateTime.isoDate.year, isoDateTime.isoDate.month, isoDateTime.isoDate.day + laterTime.deltaDays);
          var later = CombineISODateAndTimeRecord(laterDate, laterTime);
          var possible = GetPossibleEpochNanoseconds(timeZone, later);
          return possible[possible.length - 1];
        }
    }
  }
  function GetPossibleEpochNanoseconds(timeZone, isoDateTime) {
    // UTC fast path
    if (timeZone === 'UTC') {
      CheckISODaysRange(isoDateTime.isoDate);
      return [GetUTCEpochNanoseconds(isoDateTime)];
    }
    var offsetMinutes = ParseTimeZoneIdentifier(timeZone).offsetMinutes;
    if (offsetMinutes !== undefined) {
      var balanced = BalanceISODateTime(isoDateTime.isoDate.year, isoDateTime.isoDate.month, isoDateTime.isoDate.day, isoDateTime.time.hour, isoDateTime.time.minute - offsetMinutes, isoDateTime.time.second, isoDateTime.time.millisecond, isoDateTime.time.microsecond, isoDateTime.time.nanosecond);
      CheckISODaysRange(balanced.isoDate);
      var epochNs = GetUTCEpochNanoseconds(balanced);
      ValidateEpochNanoseconds(epochNs);
      return [epochNs];
    }
    CheckISODaysRange(isoDateTime.isoDate);
    return GetNamedTimeZoneEpochNanoseconds(timeZone, isoDateTime);
  }
  function GetStartOfDay(timeZone, isoDate) {
    var isoDateTime = CombineISODateAndTimeRecord(isoDate, MidnightTimeRecord());
    var possibleEpochNs = GetPossibleEpochNanoseconds(timeZone, isoDateTime);
    // If not a DST gap, return the single or earlier epochNs
    if (possibleEpochNs.length) return possibleEpochNs[0];
    // Otherwise, 00:00:00 lies within a DST gap. Compute an epochNs that's
    // guaranteed to be before the transition
    assert(!IsOffsetTimeZoneIdentifier(timeZone), 'should only be reached with named time zone');
    var utcns = GetUTCEpochNanoseconds(isoDateTime);
    var dayBefore = JSBI.subtract(utcns, DAY_NANOS_JSBI);
    ValidateEpochNanoseconds(dayBefore);
    return castExists(GetNamedTimeZoneNextTransition(timeZone, dayBefore));
  }
  function ISOYearString(year) {
    var yearString;
    if (year < 0 || year > 9999) {
      var sign = year < 0 ? '-' : '+';
      var yearNumber = Math.abs(year);
      yearString = sign + ToZeroPaddedDecimalString(yearNumber, 6);
    } else {
      yearString = ToZeroPaddedDecimalString(year, 4);
    }
    return yearString;
  }
  function ISODateTimePartString(part) {
    return ToZeroPaddedDecimalString(part, 2);
  }
  function FormatFractionalSeconds(subSecondNanoseconds, precision) {
    var fraction;
    if (precision === 'auto') {
      if (subSecondNanoseconds === 0) return '';
      var fractionFullPrecision = ToZeroPaddedDecimalString(subSecondNanoseconds, 9);
      // now remove any trailing zeroes
      fraction = fractionFullPrecision.replace(/0+$/, '');
    } else {
      if (precision === 0) return '';
      var _fractionFullPrecision = ToZeroPaddedDecimalString(subSecondNanoseconds, 9);
      fraction = _fractionFullPrecision.slice(0, precision);
    }
    return ".".concat(fraction);
  }
  function FormatTimeString(hour, minute, second, subSecondNanoseconds, precision) {
    var result = "".concat(ISODateTimePartString(hour), ":").concat(ISODateTimePartString(minute));
    if (precision === 'minute') return result;
    result += ":".concat(ISODateTimePartString(second));
    result += FormatFractionalSeconds(subSecondNanoseconds, precision);
    return result;
  }
  function TemporalInstantToString(instant, timeZone, precision) {
    var outputTimeZone = timeZone;
    if (outputTimeZone === undefined) outputTimeZone = 'UTC';
    var epochNs = GetSlot(instant, EPOCHNANOSECONDS);
    var iso = GetISODateTimeFor(outputTimeZone, epochNs);
    var dateTimeString = ISODateTimeToString(iso, 'iso8601', precision, 'never');
    var timeZoneString = 'Z';
    if (timeZone !== undefined) {
      var offsetNs = GetOffsetNanosecondsFor(outputTimeZone, epochNs);
      timeZoneString = FormatDateTimeUTCOffsetRounded(offsetNs);
    }
    return "".concat(dateTimeString).concat(timeZoneString);
  }
  function TemporalDurationToString(duration, precision) {
    var years = GetSlot(duration, YEARS);
    var months = GetSlot(duration, MONTHS);
    var weeks = GetSlot(duration, WEEKS);
    var days = GetSlot(duration, DAYS);
    var hours = GetSlot(duration, HOURS);
    var minutes = GetSlot(duration, MINUTES);
    var sign = DurationSign(duration);
    var datePart = '';
    if (years !== 0) datePart += "".concat(Math.abs(years), "Y");
    if (months !== 0) datePart += "".concat(Math.abs(months), "M");
    if (weeks !== 0) datePart += "".concat(Math.abs(weeks), "W");
    if (days !== 0) datePart += "".concat(Math.abs(days), "D");
    var timePart = '';
    if (hours !== 0) timePart += "".concat(Math.abs(hours), "H");
    if (minutes !== 0) timePart += "".concat(Math.abs(minutes), "M");
    // Keeping sub-second units separate avoids losing precision after resolving
    // any overflows from rounding
    var secondsDuration = TimeDuration.fromComponents(0, 0, GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS));
    if (!secondsDuration.isZero() || ['second', 'millisecond', 'microsecond', 'nanosecond'].includes(DefaultTemporalLargestUnit(duration)) || precision !== 'auto') {
      var secondsPart = Math.abs(secondsDuration.sec);
      var subSecondsPart = FormatFractionalSeconds(Math.abs(secondsDuration.subsec), precision);
      timePart += "".concat(secondsPart).concat(subSecondsPart, "S");
    }
    var result = "".concat(sign < 0 ? '-' : '', "P").concat(datePart);
    if (timePart) result = "".concat(result, "T").concat(timePart);
    return result;
  }
  function TemporalDateToString(date) {
    var showCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _GetSlot = GetSlot(date, ISO_DATE),
      year = _GetSlot.year,
      month = _GetSlot.month,
      day = _GetSlot.day;
    var yearString = ISOYearString(year);
    var monthString = ISODateTimePartString(month);
    var dayString = ISODateTimePartString(day);
    var calendar = FormatCalendarAnnotation(GetSlot(date, CALENDAR), showCalendar);
    return "".concat(yearString, "-").concat(monthString, "-").concat(dayString).concat(calendar);
  }
  function TimeRecordToString(_ref19, precision) {
    var hour = _ref19.hour,
      minute = _ref19.minute,
      second = _ref19.second,
      millisecond = _ref19.millisecond,
      microsecond = _ref19.microsecond,
      nanosecond = _ref19.nanosecond;
    var subSecondNanoseconds = millisecond * 1e6 + microsecond * 1e3 + nanosecond;
    return FormatTimeString(hour, minute, second, subSecondNanoseconds, precision);
  }
  function ISODateTimeToString(isoDateTime, calendar, precision) {
    var showCalendar = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'auto';
    var _isoDateTime$isoDate = isoDateTime.isoDate,
      year = _isoDateTime$isoDate.year,
      month = _isoDateTime$isoDate.month,
      day = _isoDateTime$isoDate.day,
      _isoDateTime$time = isoDateTime.time,
      hour = _isoDateTime$time.hour,
      minute = _isoDateTime$time.minute,
      second = _isoDateTime$time.second,
      millisecond = _isoDateTime$time.millisecond,
      microsecond = _isoDateTime$time.microsecond,
      nanosecond = _isoDateTime$time.nanosecond;
    var yearString = ISOYearString(year);
    var monthString = ISODateTimePartString(month);
    var dayString = ISODateTimePartString(day);
    var subSecondNanoseconds = millisecond * 1e6 + microsecond * 1e3 + nanosecond;
    var timeString = FormatTimeString(hour, minute, second, subSecondNanoseconds, precision);
    var calendarString = FormatCalendarAnnotation(calendar, showCalendar);
    return "".concat(yearString, "-").concat(monthString, "-").concat(dayString, "T").concat(timeString).concat(calendarString);
  }
  function TemporalMonthDayToString(monthDay) {
    var showCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _GetSlot2 = GetSlot(monthDay, ISO_DATE),
      year = _GetSlot2.year,
      month = _GetSlot2.month,
      day = _GetSlot2.day;
    var monthString = ISODateTimePartString(month);
    var dayString = ISODateTimePartString(day);
    var resultString = "".concat(monthString, "-").concat(dayString);
    var calendar = GetSlot(monthDay, CALENDAR);
    if (showCalendar === 'always' || showCalendar === 'critical' || calendar !== 'iso8601') {
      var yearString = ISOYearString(year);
      resultString = "".concat(yearString, "-").concat(resultString);
    }
    var calendarString = FormatCalendarAnnotation(calendar, showCalendar);
    if (calendarString) resultString += calendarString;
    return resultString;
  }
  function TemporalYearMonthToString(yearMonth) {
    var showCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _GetSlot3 = GetSlot(yearMonth, ISO_DATE),
      year = _GetSlot3.year,
      month = _GetSlot3.month,
      day = _GetSlot3.day;
    var yearString = ISOYearString(year);
    var monthString = ISODateTimePartString(month);
    var resultString = "".concat(yearString, "-").concat(monthString);
    var calendar = GetSlot(yearMonth, CALENDAR);
    if (showCalendar === 'always' || showCalendar === 'critical' || calendar !== 'iso8601') {
      var dayString = ISODateTimePartString(day);
      resultString += "-".concat(dayString);
    }
    var calendarString = FormatCalendarAnnotation(calendar, showCalendar);
    if (calendarString) resultString += calendarString;
    return resultString;
  }
  function TemporalZonedDateTimeToString(zdt, precision) {
    var showCalendar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
    var showTimeZone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'auto';
    var showOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'auto';
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    var epochNs = GetSlot(zdt, EPOCHNANOSECONDS);
    if (options) {
      var unit = options.unit,
        increment = options.increment,
        roundingMode = options.roundingMode;
      epochNs = RoundTemporalInstant(epochNs, increment, unit, roundingMode);
    }
    var tz = GetSlot(zdt, TIME_ZONE);
    var offsetNs = GetOffsetNanosecondsFor(tz, epochNs);
    var iso = GetISODateTimeFor(tz, epochNs);
    var dateTimeString = ISODateTimeToString(iso, 'iso8601', precision, 'never');
    if (showOffset !== 'never') {
      dateTimeString += FormatDateTimeUTCOffsetRounded(offsetNs);
    }
    if (showTimeZone !== 'never') {
      var flag = showTimeZone === 'critical' ? '!' : '';
      dateTimeString += "[".concat(flag).concat(tz, "]");
    }
    dateTimeString += FormatCalendarAnnotation(GetSlot(zdt, CALENDAR), showCalendar);
    return dateTimeString;
  }
  function IsOffsetTimeZoneIdentifier(string) {
    return OFFSET_IDENTIFIER.test(string);
  }
  function ParseDateTimeUTCOffset(string) {
    var match = OFFSET_WITH_PARTS.exec(string);
    if (!match) {
      throw new RangeError("invalid time zone offset: ".concat(string, "; must match \xB1HH:MM[:SS.SSSSSSSSS]"));
    }
    var sign = match[1] === '-' ? -1 : +1;
    var hours = +match[2];
    var minutes = +(match[3] || 0);
    var seconds = +(match[4] || 0);
    var nanoseconds = +((match[5] || 0) + '000000000').slice(0, 9);
    var offsetNanoseconds = sign * (((hours * 60 + minutes) * 60 + seconds) * 1e9 + nanoseconds);
    return offsetNanoseconds;
  }
  var canonicalTimeZoneIdsCache = undefined;
  var isTZIDSep = Object.assign(Object.create(null), {
    '/': true,
    '-': true,
    _: true
  });
  function GetAvailableNamedTimeZoneIdentifier(identifier) {
    var _canonicalTimeZoneIds, _specialCases$get, _specialCases$get2;
    // The most common case is when the identifier is a canonical time zone ID.
    // Fast-path that case by caching all canonical IDs. For old ECMAScript
    // implementations lacking this API, set the cache to `null` to avoid retries.
    if (canonicalTimeZoneIdsCache === undefined) {
      var _Intl$supportedValues, _Intl;
      var canonicalTimeZoneIds = (_Intl$supportedValues = (_Intl = Intl).supportedValuesOf) === null || _Intl$supportedValues === void 0 ? void 0 : _Intl$supportedValues.call(_Intl, 'timeZone');
      if (canonicalTimeZoneIds) {
        canonicalTimeZoneIdsCache = new Map();
        for (var ix = 0; ix < canonicalTimeZoneIds.length; ix++) {
          var id = canonicalTimeZoneIds[ix];
          canonicalTimeZoneIdsCache.set(ASCIILowercase(id), id);
        }
      } else {
        canonicalTimeZoneIdsCache = null;
      }
    }
    var lower = ASCIILowercase(identifier);
    var primaryIdentifier = (_canonicalTimeZoneIds = canonicalTimeZoneIdsCache) === null || _canonicalTimeZoneIds === void 0 ? void 0 : _canonicalTimeZoneIds.get(lower);
    if (primaryIdentifier) return {
      identifier: primaryIdentifier,
      primaryIdentifier: primaryIdentifier
    };
    // It's not already a primary identifier, so get its primary identifier (or
    // return if it's not an available named time zone ID).
    try {
      var formatter = getIntlDateTimeFormatEnUsForTimeZone(identifier);
      primaryIdentifier = formatter.resolvedOptions().timeZone;
    } catch (_unused8) {
      return undefined;
    }
    // Special case this legacy identifier that is listed both in `backzone` and
    // `backward` in the TZDB. Work around implementations that incorrectly use
    // the `backward` data.
    if (lower === 'antarctica/south_pole') primaryIdentifier = 'Antarctica/McMurdo';
    // Some legacy identifiers are aliases in ICU but not legal IANA identifiers.
    // Reject them even if the implementation's Intl supports them, as they are
    // not present in the IANA time zone database.
    if (ICU_LEGACY_TIME_ZONE_IDS.has(identifier)) {
      throw new RangeError("".concat(identifier, " is a legacy time zone identifier from ICU. Use ").concat(primaryIdentifier, " instead"));
    }
    // The identifier is an alias (a deprecated identifier that's a synonym for a
    // primary identifier), so we need to case-normalize the identifier to match
    // the IANA TZDB, e.g. america/new_york => America/New_York. There's no
    // built-in way to do this using Intl.DateTimeFormat, but the we can normalize
    // almost all aliases (modulo a few special cases) using the TZDB's basic
    // capitalization pattern:
    // 1. capitalize the first letter of the identifier
    // 2. capitalize the letter after every slash, dash, or underscore delimiter
    var chars = _toConsumableArray(lower).map(function (c, i) {
      return i === 0 || isTZIDSep[lower[i - 1]] ? c.toUpperCase() : c;
    });
    var standardCase = chars.join('');
    var segments = standardCase.split('/');
    if (segments.length === 1) {
      // If a single-segment legacy ID is 2-3 chars or contains a number or dash, then
      // (except for the "GB-Eire" special case) the case-normalized form is uppercase.
      // These are: GMT+0, GMT-0, GB, NZ, PRC, ROC, ROK, UCT, GMT, GMT0, CET, CST6CDT,
      // EET, EST, HST, MET, MST, MST7MDT, PST8PDT, WET, NZ-CHAT, and W-SU.
      // Otherwise it's standard form: first letter capitalized, e.g. Iran, Egypt, Hongkong
      if (lower === 'gb-eire') return {
        identifier: 'GB-Eire',
        primaryIdentifier: primaryIdentifier
      };
      return {
        identifier: lower.length <= 3 || /[-0-9]/.test(lower) ? lower.toUpperCase() : segments[0],
        primaryIdentifier: primaryIdentifier
      };
    }
    // All Etc zone names are uppercase except three exceptions.
    if (segments[0] === 'Etc') {
      var etcName = ['Zulu', 'Greenwich', 'Universal'].includes(segments[1]) ? segments[1] : segments[1].toUpperCase();
      return {
        identifier: "Etc/".concat(etcName),
        primaryIdentifier: primaryIdentifier
      };
    }
    // Legacy US identifiers like US/Alaska or US/Indiana-Starke are 2 segments and use standard form.
    if (segments[0] === 'Us') return {
      identifier: "US/".concat(segments[1]),
      primaryIdentifier: primaryIdentifier
    };
    // For multi-segment IDs, there's a few special cases in the second/third segments
    var specialCases = new Map([['Act', 'ACT'], ['Lhi', 'LHI'], ['Nsw', 'NSW'], ['Dar_Es_Salaam', 'Dar_es_Salaam'], ['Port_Of_Spain', 'Port_of_Spain'], ['Port-Au-Prince', 'Port-au-Prince'], ['Isle_Of_Man', 'Isle_of_Man'], ['Comodrivadavia', 'ComodRivadavia'], ['Knox_In', 'Knox_IN'], ['Dumontdurville', 'DumontDUrville'], ['Mcmurdo', 'McMurdo'], ['Denoronha', 'DeNoronha'], ['Easterisland', 'EasterIsland'], ['Bajanorte', 'BajaNorte'], ['Bajasur', 'BajaSur']]);
    segments[1] = (_specialCases$get = specialCases.get(segments[1])) !== null && _specialCases$get !== void 0 ? _specialCases$get : segments[1];
    if (segments.length > 2) segments[2] = (_specialCases$get2 = specialCases.get(segments[2])) !== null && _specialCases$get2 !== void 0 ? _specialCases$get2 : segments[2];
    return {
      identifier: segments.join('/'),
      primaryIdentifier: primaryIdentifier
    };
  }
  function GetNamedTimeZoneOffsetNanosecondsImpl(id, epochMilliseconds) {
    var _GetFormatterParts = GetFormatterParts(id, epochMilliseconds),
      year = _GetFormatterParts.year,
      month = _GetFormatterParts.month,
      day = _GetFormatterParts.day,
      hour = _GetFormatterParts.hour,
      minute = _GetFormatterParts.minute,
      second = _GetFormatterParts.second;
    var millisecond = epochMilliseconds % 1000;
    if (millisecond < 0) millisecond += 1000;
    var utc = GetUTCEpochMilliseconds({
      isoDate: {
        year: year,
        month: month,
        day: day
      },
      time: {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond
      }
    });
    return (utc - epochMilliseconds) * 1e6;
  }
  function GetNamedTimeZoneOffsetNanoseconds(id, epochNanoseconds) {
    // Optimization: We get the offset nanoseconds only with millisecond
    // resolution, assuming that time zone offset changes don't happen in the
    // middle of a millisecond
    return GetNamedTimeZoneOffsetNanosecondsImpl(id, epochNsToMs(epochNanoseconds, 'floor'));
  }
  function FormatOffsetTimeZoneIdentifier(offsetMinutes) {
    var sign = offsetMinutes < 0 ? '-' : '+';
    var absoluteMinutes = Math.abs(offsetMinutes);
    var hour = Math.floor(absoluteMinutes / 60);
    var minute = absoluteMinutes % 60;
    var timeString = FormatTimeString(hour, minute, 0, 0, 'minute');
    return "".concat(sign).concat(timeString);
  }
  function FormatDateTimeUTCOffsetRounded(offsetNanosecondsParam) {
    var offsetNanoseconds = RoundNumberToIncrement(offsetNanosecondsParam, MINUTE_NANOS, 'halfExpand');
    return FormatOffsetTimeZoneIdentifier(offsetNanoseconds / 60e9);
  }
  function GetUTCEpochMilliseconds(_ref20) {
    var _ref20$isoDate = _ref20.isoDate,
      year = _ref20$isoDate.year,
      month = _ref20$isoDate.month,
      day = _ref20$isoDate.day,
      _ref20$time = _ref20.time,
      hour = _ref20$time.hour,
      minute = _ref20$time.minute,
      second = _ref20$time.second,
      millisecond = _ref20$time.millisecond;
    // The pattern of leap years in the ISO 8601 calendar repeats every 400
    // years. To avoid overflowing at the edges of the range, we reduce the year
    // to the remainder after dividing by 400, and then add back all the
    // nanoseconds from the multiples of 400 years at the end.
    var reducedYear = year % 400;
    var yearCycles = (year - reducedYear) / 400;
    // Note: Date.UTC() interprets one and two-digit years as being in the
    // 20th century, so don't use it
    var legacyDate = new Date();
    legacyDate.setUTCHours(hour, minute, second, millisecond);
    legacyDate.setUTCFullYear(reducedYear, month - 1, day);
    var ms = legacyDate.getTime();
    return ms + MS_IN_400_YEAR_CYCLE * yearCycles;
  }
  function GetUTCEpochNanoseconds(isoDateTime) {
    var ms = GetUTCEpochMilliseconds(isoDateTime);
    var subMs = isoDateTime.time.microsecond * 1e3 + isoDateTime.time.nanosecond;
    return JSBI.add(epochMsToNs(ms), JSBI.BigInt(subMs));
  }
  function GetISOPartsFromEpoch(epochNanoseconds) {
    var epochMilliseconds = epochNsToMs(epochNanoseconds, 'trunc');
    var nanos = JSBI.toNumber(JSBI.remainder(epochNanoseconds, MILLION));
    if (nanos < 0) {
      nanos += 1e6;
      epochMilliseconds -= 1;
    }
    var microsecond = Math.floor(nanos / 1e3) % 1e3;
    var nanosecond = nanos % 1e3;
    var item = new Date(epochMilliseconds);
    var year = item.getUTCFullYear();
    var month = item.getUTCMonth() + 1;
    var day = item.getUTCDate();
    var hour = item.getUTCHours();
    var minute = item.getUTCMinutes();
    var second = item.getUTCSeconds();
    var millisecond = item.getUTCMilliseconds();
    return {
      epochMilliseconds: epochMilliseconds,
      isoDate: {
        year: year,
        month: month,
        day: day
      },
      time: {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      }
    };
  }
  // ts-prune-ignore-next TODO: remove this after tests are converted to TS
  function GetNamedTimeZoneDateTimeParts(id, epochNanoseconds) {
    var _GetISOPartsFromEpoch4 = GetISOPartsFromEpoch(epochNanoseconds),
      epochMilliseconds = _GetISOPartsFromEpoch4.epochMilliseconds,
      _GetISOPartsFromEpoch5 = _GetISOPartsFromEpoch4.time,
      millisecond = _GetISOPartsFromEpoch5.millisecond,
      microsecond = _GetISOPartsFromEpoch5.microsecond,
      nanosecond = _GetISOPartsFromEpoch5.nanosecond;
    var _GetFormatterParts2 = GetFormatterParts(id, epochMilliseconds),
      year = _GetFormatterParts2.year,
      month = _GetFormatterParts2.month,
      day = _GetFormatterParts2.day,
      hour = _GetFormatterParts2.hour,
      minute = _GetFormatterParts2.minute,
      second = _GetFormatterParts2.second;
    return BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
  }
  // Most time zones never transition twice within a short span of days. We still
  // accommodate twitchy zones, albeit at a performance penalty. 19 days is the
  // default window, past which we'd need to start adding many more special cases.
  function searchWindowForTransitions(id) {
    if (id === 'Africa/El_Aaiun') return DAY_MS * 17;
    if (id === 'America/Argentina/Tucuman') return DAY_MS * 12;
    if (id === 'Europe/Tirane') return DAY_MS * 11;
    if (id === 'Europe/Riga') return DAY_MS * 10;
    if (id === 'Europe/Simferopol' || id === 'Europe/Vienna') return DAY_MS * 9;
    if (id === 'Africa/Tunis') return DAY_MS * 8;
    if (id === 'America/Boa_Vista' || id === 'America/Fortaleza' || id === 'America/Maceio' || id === 'America/Noronha' || id === 'America/Recife' || id === 'Asia/Gaza' ||
    // dubious, only in future calculations
    id === 'Asia/Hebron' ||
    // ditto
    id === 'Brazil/DeNoronha') {
      return DAY_MS * 6;
    }
    return DAY_MS * 19;
  }
  function GetNamedTimeZoneNextTransition(id, epochNanoseconds) {
    if (id === 'UTC') return null; // UTC fast path
    // Optimization: we floor the instant to the previous millisecond boundary
    // so that we can do Number math instead of BigInt math. This assumes that
    // time zone transitions don't happen in the middle of a millisecond.
    var epochMilliseconds = epochNsToMs(epochNanoseconds, 'floor');
    if (epochMilliseconds < BEFORE_FIRST_DST) {
      return GetNamedTimeZoneNextTransition(id, epochMsToNs(BEFORE_FIRST_DST));
    }
    // Optimization: the farthest that we'll look for a next transition is 3 years
    // after the later of epochNanoseconds or the current time. If there are no
    // transitions found before then, we'll assume that there will not be any more
    // transitions after that.
    var now = Date.now();
    var base = Math.max(epochMilliseconds, now);
    var uppercap = base + DAY_MS * 366 * 3;
    var leftMs = epochMilliseconds;
    var leftOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, leftMs);
    var rightMs = leftMs;
    var rightOffsetNs = leftOffsetNs;
    var searchWindow = searchWindowForTransitions(id);
    while (leftOffsetNs === rightOffsetNs && leftMs < uppercap) {
      rightMs = leftMs + searchWindow;
      if (rightMs > MS_MAX) return null;
      rightOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, rightMs);
      if (leftOffsetNs === rightOffsetNs) {
        leftMs = rightMs;
      }
    }
    if (leftOffsetNs === rightOffsetNs) return null;
    var result = bisect(function (epochMs) {
      return GetNamedTimeZoneOffsetNanosecondsImpl(id, epochMs);
    }, leftMs, rightMs, leftOffsetNs, rightOffsetNs);
    return epochMsToNs(result);
  }
  function GetNamedTimeZonePreviousTransition(id, epochNanoseconds) {
    if (id === 'UTC') return null; // UTC fast path
    // Optimization: we raise the instant to the next millisecond boundary so
    // that we can do Number math instead of BigInt math. This assumes that time
    // zone transitions don't happen in the middle of a millisecond.
    var epochMilliseconds = epochNsToMs(epochNanoseconds, 'ceil');
    // Optimization: if the instant is more than 3 years in the future and there
    // are no transitions between the present day and 3 years from now, assume
    // there are none after.
    var now = Date.now();
    var lookahead = now + DAY_MS * 366 * 3;
    if (epochMilliseconds > lookahead) {
      var prevBeforeLookahead = GetNamedTimeZonePreviousTransition(id, epochMsToNs(lookahead));
      if (prevBeforeLookahead === null || JSBI.lessThan(prevBeforeLookahead, epochMsToNs(now))) {
        return prevBeforeLookahead;
      }
    }
    // We assume most time zones either have regular DST rules that extend
    // indefinitely into the future, or they have no DST transitions between now
    // and next year. Africa/Casablanca and Africa/El_Aaiun are unique cases
    // that fit neither of these. Their irregular DST transitions are
    // precomputed until 2087 in the current time zone database, so requesting
    // the previous transition for an instant far in the future may take an
    // extremely long time as it loops backward 2 weeks at a time.
    if (id === 'Africa/Casablanca' || id === 'Africa/El_Aaiun') {
      var lastPrecomputed = Date.UTC(2088, 0, 1); // 2088-01-01T00Z
      if (lastPrecomputed < epochMilliseconds) {
        return GetNamedTimeZonePreviousTransition(id, epochMsToNs(lastPrecomputed));
      }
    }
    var rightMs = epochMilliseconds - 1;
    if (rightMs < BEFORE_FIRST_DST) return null;
    var rightOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, rightMs);
    var leftMs = rightMs;
    var leftOffsetNs = rightOffsetNs;
    var searchWindow = searchWindowForTransitions(id);
    while (rightOffsetNs === leftOffsetNs && rightMs > BEFORE_FIRST_DST) {
      leftMs = rightMs - searchWindow;
      if (leftMs < BEFORE_FIRST_DST) return null;
      leftOffsetNs = GetNamedTimeZoneOffsetNanosecondsImpl(id, leftMs);
      if (rightOffsetNs === leftOffsetNs) {
        rightMs = leftMs;
      }
    }
    if (rightOffsetNs === leftOffsetNs) return null;
    var result = bisect(function (epochMs) {
      return GetNamedTimeZoneOffsetNanosecondsImpl(id, epochMs);
    }, leftMs, rightMs, leftOffsetNs, rightOffsetNs);
    return epochMsToNs(result);
  }
  // ts-prune-ignore-next TODO: remove this after tests are converted to TS
  function parseFromEnUsFormat(datetime) {
    var splits = datetime.split(/[^\w]+/);
    if (splits.length !== 7) {
      throw new RangeError("expected 7 parts in \"".concat(datetime));
    }
    var month = +splits[0];
    var day = +splits[1];
    var year = +splits[2];
    var era = splits[3];
    if (era[0] === 'b' || era[0] === 'B') {
      year = -year + 1;
    } else if (era[0] !== 'a' && era[0] !== 'A') {
      throw new RangeError("Unknown era ".concat(era, " in \"").concat(datetime));
    }
    var hour = splits[4] === '24' ? 0 : +splits[4]; // bugs.chromium.org/p/chromium/issues/detail?id=1045791
    var minute = +splits[5];
    var second = +splits[6];
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day) || !Number.isFinite(hour) || !Number.isFinite(minute) || !Number.isFinite(second)) {
      throw new RangeError("Invalid number in \"".concat(datetime));
    }
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second
    };
  }
  // ts-prune-ignore-next TODO: remove this after tests are converted to TS
  function GetFormatterParts(timeZone, epochMilliseconds) {
    var formatter = getIntlDateTimeFormatEnUsForTimeZone(timeZone);
    // Using `format` instead of `formatToParts` for compatibility with older
    // clients and because it is twice as fast
    var datetime = formatter.format(epochMilliseconds);
    return parseFromEnUsFormat(datetime);
  }
  // The goal of this function is to find the exact time(s) that correspond to a
  // calendar date and clock time in a particular time zone. Normally there will
  // be only one match. But for repeated clock times after backwards transitions
  // (like when DST ends) there may be two matches. And for skipped clock times
  // after forward transitions, there will be no matches.
  function GetNamedTimeZoneEpochNanoseconds(id, isoDateTime) {
    // Get the offset of one day before and after the requested calendar date and
    // clock time, avoiding overflows if near the edge of the Instant range.
    var ns = GetUTCEpochNanoseconds(isoDateTime);
    var nsEarlier = JSBI.subtract(ns, DAY_NANOS_JSBI);
    if (JSBI.lessThan(nsEarlier, NS_MIN)) nsEarlier = ns;
    var nsLater = JSBI.add(ns, DAY_NANOS_JSBI);
    if (JSBI.greaterThan(nsLater, NS_MAX)) nsLater = ns;
    var earlierOffsetNs = GetNamedTimeZoneOffsetNanoseconds(id, nsEarlier);
    var laterOffsetNs = GetNamedTimeZoneOffsetNanoseconds(id, nsLater);
    // If before and after offsets are the same, then we assume there was no
    // offset transition in between, and therefore only one exact time can
    // correspond to the provided calendar date and clock time. But if they're
    // different, then there was an offset transition in between, so test both
    // offsets to see which one(s) will yield a matching exact time.
    var found = earlierOffsetNs === laterOffsetNs ? [earlierOffsetNs] : [earlierOffsetNs, laterOffsetNs];
    var candidates = found.map(function (offsetNanoseconds) {
      var epochNanoseconds = JSBI.subtract(ns, JSBI.BigInt(offsetNanoseconds));
      var parts = GetNamedTimeZoneDateTimeParts(id, epochNanoseconds);
      if (CompareISODateTime(isoDateTime, parts) !== 0) return undefined;
      ValidateEpochNanoseconds(epochNanoseconds);
      return epochNanoseconds;
    });
    return candidates.filter(function (x) {
      return x !== undefined;
    });
  }
  function LeapYear(year) {
    if (undefined === year) return false;
    var isDiv4 = year % 4 === 0;
    var isDiv100 = year % 100 === 0;
    var isDiv400 = year % 400 === 0;
    return isDiv4 && (!isDiv100 || isDiv400);
  }
  function ISODaysInMonth(year, month) {
    var DoM = {
      standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };
    return DoM[LeapYear(year) ? 'leapyear' : 'standard'][month - 1];
  }
  function DurationSign(duration) {
    var fields = [GetSlot(duration, YEARS), GetSlot(duration, MONTHS), GetSlot(duration, WEEKS), GetSlot(duration, DAYS), GetSlot(duration, HOURS), GetSlot(duration, MINUTES), GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS)];
    for (var index = 0; index < fields.length; index++) {
      var prop = fields[index];
      if (prop !== 0) return prop < 0 ? -1 : 1;
    }
    return 0;
  }
  function DateDurationSign(dateDuration) {
    var fieldNames = ['years', 'months', 'weeks', 'days'];
    for (var index = 0; index < fieldNames.length; index++) {
      var prop = dateDuration[fieldNames[index]];
      if (prop !== 0) return prop < 0 ? -1 : 1;
    }
    return 0;
  }
  function InternalDurationSign(duration) {
    var dateSign = DateDurationSign(duration.date);
    if (dateSign !== 0) return dateSign;
    return duration.time.sign();
  }
  function BalanceISOYearMonth(yearParam, monthParam) {
    var year = yearParam;
    var month = monthParam;
    if (!Number.isFinite(year) || !Number.isFinite(month)) throw new RangeError('infinity is out of range');
    month -= 1;
    year += Math.floor(month / 12);
    month %= 12;
    if (month < 0) month += 12;
    month += 1;
    return {
      year: year,
      month: month
    };
  }
  function BalanceISODate(yearParam, monthParam, dayParam) {
    var year = yearParam;
    var month = monthParam;
    var day = dayParam;
    if (!Number.isFinite(day)) throw new RangeError('infinity is out of range');
    // The pattern of leap years in the ISO 8601 calendar repeats every 400
    // years. So if we have more than 400 years in days, there's no need to
    // convert days to a year 400 times. We can convert a multiple of 400 all at
    // once.
    var _BalanceISOYearMonth = BalanceISOYearMonth(year, month);
    year = _BalanceISOYearMonth.year;
    month = _BalanceISOYearMonth.month;
    var daysIn400YearCycle = 400 * 365 + 97;
    if (Math.abs(day) > daysIn400YearCycle) {
      var nCycles = Math.trunc(day / daysIn400YearCycle);
      year += 400 * nCycles;
      day -= nCycles * daysIn400YearCycle;
    }
    var daysInYear = 0;
    var testYear = month > 2 ? year : year - 1;
    while (daysInYear = LeapYear(testYear) ? 366 : 365, day < -daysInYear) {
      year -= 1;
      testYear -= 1;
      day += daysInYear;
    }
    testYear += 1;
    while (daysInYear = LeapYear(testYear) ? 366 : 365, day > daysInYear) {
      year += 1;
      testYear += 1;
      day -= daysInYear;
    }
    while (day < 1) {
      var _BalanceISOYearMonth2 = BalanceISOYearMonth(year, month - 1);
      year = _BalanceISOYearMonth2.year;
      month = _BalanceISOYearMonth2.month;
      day += ISODaysInMonth(year, month);
    }
    while (day > ISODaysInMonth(year, month)) {
      day -= ISODaysInMonth(year, month);
      var _BalanceISOYearMonth3 = BalanceISOYearMonth(year, month + 1);
      year = _BalanceISOYearMonth3.year;
      month = _BalanceISOYearMonth3.month;
    }
    return {
      year: year,
      month: month,
      day: day
    };
  }
  function BalanceISODateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    var time = BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);
    var isoDate = BalanceISODate(year, month, day + time.deltaDays);
    return CombineISODateAndTimeRecord(isoDate, time);
  }
  function BalanceTime(hourParam, minuteParam, secondParam, millisecondParam, microsecondParam, nanosecondParam) {
    var hour = hourParam;
    var minute = minuteParam;
    var second = secondParam;
    var millisecond = millisecondParam;
    var microsecond = microsecondParam;
    var nanosecond = nanosecondParam;
    var div;
    var _TruncatingDivModByPo = TruncatingDivModByPowerOf10(nanosecond, 3);
    div = _TruncatingDivModByPo.div;
    nanosecond = _TruncatingDivModByPo.mod;
    microsecond += div;
    if (nanosecond < 0) {
      microsecond -= 1;
      nanosecond += 1000;
    }
    var _TruncatingDivModByPo2 = TruncatingDivModByPowerOf10(microsecond, 3);
    div = _TruncatingDivModByPo2.div;
    microsecond = _TruncatingDivModByPo2.mod;
    millisecond += div;
    if (microsecond < 0) {
      millisecond -= 1;
      microsecond += 1000;
    }
    second += Math.trunc(millisecond / 1000);
    millisecond %= 1000;
    if (millisecond < 0) {
      second -= 1;
      millisecond += 1000;
    }
    minute += Math.trunc(second / 60);
    second %= 60;
    if (second < 0) {
      minute -= 1;
      second += 60;
    }
    hour += Math.trunc(minute / 60);
    minute %= 60;
    if (minute < 0) {
      hour -= 1;
      minute += 60;
    }
    var deltaDays = Math.trunc(hour / 24);
    hour %= 24;
    if (hour < 0) {
      deltaDays -= 1;
      hour += 24;
    }
    // Results are possibly -0 at this point, but these are mathematical values in
    // the spec. Force -0 to +0.
    deltaDays += 0;
    hour += 0;
    minute += 0;
    second += 0;
    millisecond += 0;
    microsecond += 0;
    nanosecond += 0;
    return {
      deltaDays: deltaDays,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
      microsecond: microsecond,
      nanosecond: nanosecond
    };
  }
  function DateDurationDays(dateDuration, plainRelativeTo) {
    var yearsMonthsWeeksDuration = AdjustDateDurationRecord(dateDuration, 0);
    if (DateDurationSign(yearsMonthsWeeksDuration) === 0) return dateDuration.days;
    // balance years, months, and weeks down to days
    var isoDate = GetSlot(plainRelativeTo, ISO_DATE);
    var later = CalendarDateAdd(GetSlot(plainRelativeTo, CALENDAR), isoDate, yearsMonthsWeeksDuration, 'constrain');
    var epochDaysEarlier = ISODateToEpochDays(isoDate.year, isoDate.month - 1, isoDate.day);
    var epochDaysLater = ISODateToEpochDays(later.year, later.month - 1, later.day);
    var yearsMonthsWeeksInDays = epochDaysLater - epochDaysEarlier;
    return dateDuration.days + yearsMonthsWeeksInDays;
  }
  function CreateNegatedTemporalDuration(duration) {
    var TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    return new TemporalDuration(-GetSlot(duration, YEARS), -GetSlot(duration, MONTHS), -GetSlot(duration, WEEKS), -GetSlot(duration, DAYS), -GetSlot(duration, HOURS), -GetSlot(duration, MINUTES), -GetSlot(duration, SECONDS), -GetSlot(duration, MILLISECONDS), -GetSlot(duration, MICROSECONDS), -GetSlot(duration, NANOSECONDS));
  }
  function ConstrainToRange(value, min, max) {
    // Math.Max accepts undefined values and returns NaN. Undefined values are
    // used for optional params in the method below.
    return Math.min(max, Math.max(min, value));
  }
  function ConstrainISODate(year, monthParam, dayParam) {
    var month = ConstrainToRange(monthParam, 1, 12);
    var day = ConstrainToRange(dayParam, 1, ISODaysInMonth(year, month));
    return {
      year: year,
      month: month,
      day: day
    };
  }
  function RejectToRange(value, min, max) {
    if (value < min || value > max) throw new RangeError("value out of range: ".concat(min, " <= ").concat(value, " <= ").concat(max));
  }
  function RejectISODate(year, month, day) {
    RejectToRange(month, 1, 12);
    RejectToRange(day, 1, ISODaysInMonth(year, month));
  }
  function RejectDateRange(isoDate) {
    // Noon avoids trouble at edges of DateTime range (excludes midnight)
    RejectDateTimeRange(CombineISODateAndTimeRecord(isoDate, NoonTimeRecord()));
  }
  function RejectTime(hour, minute, second, millisecond, microsecond, nanosecond) {
    RejectToRange(hour, 0, 23);
    RejectToRange(minute, 0, 59);
    RejectToRange(second, 0, 59);
    RejectToRange(millisecond, 0, 999);
    RejectToRange(microsecond, 0, 999);
    RejectToRange(nanosecond, 0, 999);
  }
  function RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) {
    RejectISODate(year, month, day);
    RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
  }
  function RejectDateTimeRange(isoDateTime) {
    var ns = GetUTCEpochNanoseconds(isoDateTime);
    if (JSBI.lessThan(ns, DATETIME_NS_MIN) || JSBI.greaterThan(ns, DATETIME_NS_MAX)) {
      // Because PlainDateTime's range is wider than Instant's range, the line
      // below will always throw. Calling `ValidateEpochNanoseconds` avoids
      // repeating the same error message twice.
      ValidateEpochNanoseconds(ns);
    }
  }
  // Same as above, but throws a different, non-user-facing error
  function AssertISODateTimeWithinLimits(isoDateTime) {
    var ns = GetUTCEpochNanoseconds(isoDateTime);
    assert(JSBI.greaterThanOrEqual(ns, DATETIME_NS_MIN) && JSBI.lessThanOrEqual(ns, DATETIME_NS_MAX), "".concat(ISODateTimeToString(isoDateTime, 'iso8601', 'auto'), " is outside the representable range"));
  }
  // In the spec, IsValidEpochNanoseconds returns a boolean and call sites are
  // responsible for throwing. In the polyfill, ValidateEpochNanoseconds takes its
  // place so that we can DRY the throwing code.
  function ValidateEpochNanoseconds(epochNanoseconds) {
    if (JSBI.lessThan(epochNanoseconds, NS_MIN) || JSBI.greaterThan(epochNanoseconds, NS_MAX)) {
      throw new RangeError('date/time value is outside of supported range');
    }
  }
  function RejectYearMonthRange(_ref21) {
    var year = _ref21.year,
      month = _ref21.month;
    RejectToRange(year, YEAR_MIN, YEAR_MAX);
    if (year === YEAR_MIN) {
      RejectToRange(month, 4, 12);
    } else if (year === YEAR_MAX) {
      RejectToRange(month, 1, 9);
    }
  }
  function RejectDuration(y, mon, w, d, h, min, s, ms, µs, ns) {
    var sign = 0;
    var fields = [y, mon, w, d, h, min, s, ms, µs, ns];
    for (var index = 0; index < fields.length; index++) {
      var prop = fields[index];
      if (prop === Infinity || prop === -Infinity) throw new RangeError('infinite values not allowed as duration fields');
      if (prop !== 0) {
        var propSign = prop < 0 ? -1 : 1;
        if (sign !== 0 && propSign !== sign) throw new RangeError('mixed-sign values not allowed as duration fields');
        sign = propSign;
      }
    }
    if (Math.abs(y) >= Math.pow(2, 32) || Math.abs(mon) >= Math.pow(2, 32) || Math.abs(w) >= Math.pow(2, 32)) {
      throw new RangeError('years, months, and weeks must be < 2³²');
    }
    var msResult = TruncatingDivModByPowerOf10(ms, 3);
    var µsResult = TruncatingDivModByPowerOf10(µs, 6);
    var nsResult = TruncatingDivModByPowerOf10(ns, 9);
    var remainderSec = TruncatingDivModByPowerOf10(msResult.mod * 1e6 + µsResult.mod * 1e3 + nsResult.mod, 9).div;
    var totalSec = d * 86400 + h * 3600 + min * 60 + s + msResult.div + µsResult.div + nsResult.div + remainderSec;
    if (!Number.isSafeInteger(totalSec)) {
      throw new RangeError('total of duration time units cannot exceed 9007199254740991.999999999 s');
    }
  }
  function ToInternalDurationRecord(duration) {
    var date = {
      years: GetSlot(duration, YEARS),
      months: GetSlot(duration, MONTHS),
      weeks: GetSlot(duration, WEEKS),
      days: GetSlot(duration, DAYS)
    };
    var time = TimeDuration.fromComponents(GetSlot(duration, HOURS), GetSlot(duration, MINUTES), GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS));
    return {
      date: date,
      time: time
    };
  }
  function ToInternalDurationRecordWith24HourDays(duration) {
    var time = TimeDuration.fromComponents(GetSlot(duration, HOURS), GetSlot(duration, MINUTES), GetSlot(duration, SECONDS), GetSlot(duration, MILLISECONDS), GetSlot(duration, MICROSECONDS), GetSlot(duration, NANOSECONDS)).add24HourDays(GetSlot(duration, DAYS));
    var date = {
      years: GetSlot(duration, YEARS),
      months: GetSlot(duration, MONTHS),
      weeks: GetSlot(duration, WEEKS),
      days: 0
    };
    return {
      date: date,
      time: time
    };
  }
  function ToDateDurationRecordWithoutTime(duration) {
    var internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    var days = Math.trunc(internalDuration.time.sec / 86400);
    RejectDuration(internalDuration.date.years, internalDuration.date.months, internalDuration.date.weeks, days, 0, 0, 0, 0, 0, 0);
    return _objectSpread2(_objectSpread2({}, internalDuration.date), {}, {
      days: days
    });
  }
  function TemporalDurationFromInternal(internalDuration, largestUnit) {
    var sign = internalDuration.time.sign();
    var nanoseconds = internalDuration.time.abs().subsec;
    var microseconds = 0;
    var milliseconds = 0;
    var seconds = internalDuration.time.abs().sec;
    var minutes = 0;
    var hours = 0;
    var days = 0;
    switch (largestUnit) {
      case 'year':
      case 'month':
      case 'week':
      case 'day':
        microseconds = Math.trunc(nanoseconds / 1000);
        nanoseconds %= 1000;
        milliseconds = Math.trunc(microseconds / 1000);
        microseconds %= 1000;
        seconds += Math.trunc(milliseconds / 1000);
        milliseconds %= 1000;
        minutes = Math.trunc(seconds / 60);
        seconds %= 60;
        hours = Math.trunc(minutes / 60);
        minutes %= 60;
        days = Math.trunc(hours / 24);
        hours %= 24;
        break;
      case 'hour':
        microseconds = Math.trunc(nanoseconds / 1000);
        nanoseconds %= 1000;
        milliseconds = Math.trunc(microseconds / 1000);
        microseconds %= 1000;
        seconds += Math.trunc(milliseconds / 1000);
        milliseconds %= 1000;
        minutes = Math.trunc(seconds / 60);
        seconds %= 60;
        hours = Math.trunc(minutes / 60);
        minutes %= 60;
        break;
      case 'minute':
        microseconds = Math.trunc(nanoseconds / 1000);
        nanoseconds %= 1000;
        milliseconds = Math.trunc(microseconds / 1000);
        microseconds %= 1000;
        seconds += Math.trunc(milliseconds / 1000);
        milliseconds %= 1000;
        minutes = Math.trunc(seconds / 60);
        seconds %= 60;
        break;
      case 'second':
        microseconds = Math.trunc(nanoseconds / 1000);
        nanoseconds %= 1000;
        milliseconds = Math.trunc(microseconds / 1000);
        microseconds %= 1000;
        seconds += Math.trunc(milliseconds / 1000);
        milliseconds %= 1000;
        break;
      case 'millisecond':
        microseconds = Math.trunc(nanoseconds / 1000);
        nanoseconds %= 1000;
        milliseconds = FMAPowerOf10(seconds, 3, Math.trunc(microseconds / 1000));
        microseconds %= 1000;
        seconds = 0;
        break;
      case 'microsecond':
        microseconds = FMAPowerOf10(seconds, 6, Math.trunc(nanoseconds / 1000));
        nanoseconds %= 1000;
        seconds = 0;
        break;
      case 'nanosecond':
        nanoseconds = FMAPowerOf10(seconds, 9, nanoseconds);
        seconds = 0;
        break;
      default:
        /* c8 ignore next */assertNotReached();
    }
    var TemporalDuration = GetIntrinsic('%Temporal.Duration%');
    return new TemporalDuration(internalDuration.date.years, internalDuration.date.months, internalDuration.date.weeks, internalDuration.date.days + sign * days, sign * hours, sign * minutes, sign * seconds, sign * milliseconds, sign * microseconds, sign * nanoseconds);
  }
  function CombineDateAndTimeDuration(dateDuration, timeDuration) {
    var dateSign = DateDurationSign(dateDuration);
    var timeSign = timeDuration.sign();
    assert(dateSign === 0 || timeSign === 0 || dateSign === timeSign, 'should not be able to create mixed sign duration fields here');
    return {
      date: dateDuration,
      time: timeDuration
    };
  }
  // Caution: month is 0-based
  function ISODateToEpochDays(year, month, day) {
    return GetUTCEpochMilliseconds({
      isoDate: {
        year: year,
        month: month + 1,
        day: day
      },
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      }
    }) / DAY_MS;
  }
  // This is needed before calling GetUTCEpochNanoseconds, because it uses MakeDay
  // which is ill-defined in how it handles large year numbers. If the issue
  // https://github.com/tc39/ecma262/issues/1087 is fixed, this can be removed
  // with no observable changes.
  function CheckISODaysRange(_ref22) {
    var year = _ref22.year,
      month = _ref22.month,
      day = _ref22.day;
    if (Math.abs(ISODateToEpochDays(year, month - 1, day)) > 1e8) {
      throw new RangeError('date/time value is outside the supported range');
    }
  }
  function DifferenceTime(time1, time2) {
    var hours = time2.hour - time1.hour;
    var minutes = time2.minute - time1.minute;
    var seconds = time2.second - time1.second;
    var milliseconds = time2.millisecond - time1.millisecond;
    var microseconds = time2.microsecond - time1.microsecond;
    var nanoseconds = time2.nanosecond - time1.nanosecond;
    var timeDuration = TimeDuration.fromComponents(hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    assert(timeDuration.abs().sec < 86400, '_bt_.[[Days]] should be 0');
    return timeDuration;
  }
  function DifferenceInstant(ns1, ns2, increment, smallestUnit, roundingMode) {
    var timeDuration = TimeDuration.fromEpochNsDiff(ns2, ns1);
    timeDuration = RoundTimeDuration(timeDuration, increment, smallestUnit, roundingMode);
    return CombineDateAndTimeDuration(ZeroDateDuration(), timeDuration);
  }
  function DifferenceISODateTime(isoDateTime1, isoDateTime2, calendar, largestUnit) {
    AssertISODateTimeWithinLimits(isoDateTime1);
    AssertISODateTimeWithinLimits(isoDateTime2);
    var timeDuration = DifferenceTime(isoDateTime1.time, isoDateTime2.time);
    var timeSign = timeDuration.sign();
    var dateSign = CompareISODate(isoDateTime1.isoDate, isoDateTime2.isoDate);
    // back-off a day from date2 so that the signs of the date and time diff match
    var adjustedDate = isoDateTime2.isoDate;
    if (dateSign === timeSign) {
      adjustedDate = BalanceISODate(adjustedDate.year, adjustedDate.month, adjustedDate.day + timeSign);
      timeDuration = timeDuration.add24HourDays(-timeSign);
    }
    var dateLargestUnit = LargerOfTwoTemporalUnits('day', largestUnit);
    var dateDifference = CalendarDateUntil(calendar, isoDateTime1.isoDate, adjustedDate, dateLargestUnit);
    if (largestUnit !== dateLargestUnit) {
      // largestUnit < days, so add the days in to the internal duration
      timeDuration = timeDuration.add24HourDays(dateDifference.days);
      dateDifference.days = 0;
    }
    return CombineDateAndTimeDuration(dateDifference, timeDuration);
  }
  function DifferenceZonedDateTime(ns1, ns2, timeZone, calendar, largestUnit) {
    var nsDiff = JSBI.subtract(ns2, ns1);
    if (JSBI.equal(nsDiff, ZERO)) return {
      date: ZeroDateDuration(),
      time: TimeDuration.ZERO
    };
    var sign = JSBI.lessThan(nsDiff, ZERO) ? -1 : 1;
    // Convert start/end instants to datetimes
    var isoDtStart = GetISODateTimeFor(timeZone, ns1);
    var isoDtEnd = GetISODateTimeFor(timeZone, ns2);
    // Simulate moving ns1 as many years/months/weeks/days as possible without
    // surpassing ns2. This value is stored in intermediateDateTime/intermediateInstant/intermediateNs.
    // We do not literally move years/months/weeks/days with calendar arithmetic,
    // but rather assume intermediateDateTime will have the same time-parts as
    // dtStart and the date-parts from dtEnd, and move backward from there.
    // The number of days we move backward is stored in dayCorrection.
    // Credit to Adam Shaw for devising this algorithm.
    var dayCorrection = 0;
    var intermediateDateTime;
    // The max number of allowed day corrections depends on the direction of travel.
    // Both directions allow for 1 day correction due to an ISO wall-clock overshoot (see below).
    // Only the forward direction allows for an additional 1 day correction caused by a push-forward
    // 'compatible' DST transition causing the wall-clock to overshoot again.
    // This max value is inclusive.
    var maxDayCorrection = sign === 1 ? 2 : 1;
    // Detect ISO wall-clock overshoot.
    // If the diff of the ISO wall-clock times is opposite to the overall diff's sign,
    // we are guaranteed to need at least one day correction.
    var timeDuration = DifferenceTime(isoDtStart.time, isoDtEnd.time);
    if (timeDuration.sign() === -sign) {
      dayCorrection++;
    }
    for (; dayCorrection <= maxDayCorrection; dayCorrection++) {
      var intermediateDate = BalanceISODate(isoDtEnd.isoDate.year, isoDtEnd.isoDate.month, isoDtEnd.isoDate.day - dayCorrection * sign);
      // Incorporate time parts from dtStart
      intermediateDateTime = CombineISODateAndTimeRecord(intermediateDate, isoDtStart.time);
      // Convert intermediate datetime to epoch-nanoseconds (may disambiguate)
      var intermediateNs = GetEpochNanosecondsFor(timeZone, intermediateDateTime, 'compatible');
      // Compute the nanosecond diff between the intermediate instant and the final destination
      timeDuration = TimeDuration.fromEpochNsDiff(ns2, intermediateNs);
      // Did intermediateNs NOT surpass ns2?
      // If so, exit the loop with success (without incrementing dayCorrection past maxDayCorrection)
      if (timeDuration.sign() !== -sign) {
        break;
      }
    }
    assert(dayCorrection <= maxDayCorrection, "more than ".concat(maxDayCorrection, " day correction needed"));
    // Output of the above loop
    assertExists(intermediateDateTime);
    // Similar to what happens in DifferenceISODateTime with date parts only:
    var dateLargestUnit = LargerOfTwoTemporalUnits('day', largestUnit);
    var dateDifference = CalendarDateUntil(calendar, isoDtStart.isoDate, intermediateDateTime.isoDate, dateLargestUnit);
    return CombineDateAndTimeDuration(dateDifference, timeDuration);
  }
  // Epoch-nanosecond bounding technique where the start/end of the calendar-unit
  // interval are converted to epoch-nanosecond times and destEpochNs is nudged to
  // either one.
  function NudgeToCalendarUnit(sign, durationParam, destEpochNs, isoDateTime, timeZone, calendar, increment, unit, roundingMode) {
    // unit must be day, week, month, or year
    // timeZone may be undefined
    var duration = durationParam;
    // Create a duration with smallestUnit trunc'd towards zero
    // Create a separate duration that incorporates roundingIncrement
    var r1, r2, startDuration, endDuration;
    switch (unit) {
      case 'year':
        {
          var years = RoundNumberToIncrement(duration.date.years, increment, 'trunc');
          r1 = years;
          r2 = years + increment * sign;
          startDuration = {
            years: r1,
            months: 0,
            weeks: 0,
            days: 0
          };
          endDuration = _objectSpread2(_objectSpread2({}, startDuration), {}, {
            years: r2
          });
          break;
        }
      case 'month':
        {
          var months = RoundNumberToIncrement(duration.date.months, increment, 'trunc');
          r1 = months;
          r2 = months + increment * sign;
          startDuration = AdjustDateDurationRecord(duration.date, 0, 0, r1);
          endDuration = AdjustDateDurationRecord(duration.date, 0, 0, r2);
          break;
        }
      case 'week':
        {
          var yearsMonths = AdjustDateDurationRecord(duration.date, 0, 0);
          var weeksStart = CalendarDateAdd(calendar, isoDateTime.isoDate, yearsMonths, 'constrain');
          var weeksEnd = BalanceISODate(weeksStart.year, weeksStart.month, weeksStart.day + duration.date.days);
          var untilResult = CalendarDateUntil(calendar, weeksStart, weeksEnd, 'week');
          var weeks = RoundNumberToIncrement(duration.date.weeks + untilResult.weeks, increment, 'trunc');
          r1 = weeks;
          r2 = weeks + increment * sign;
          startDuration = AdjustDateDurationRecord(duration.date, 0, r1);
          endDuration = AdjustDateDurationRecord(duration.date, 0, r2);
          break;
        }
      case 'day':
        {
          var days = RoundNumberToIncrement(duration.date.days, increment, 'trunc');
          r1 = days;
          r2 = days + increment * sign;
          startDuration = AdjustDateDurationRecord(duration.date, r1);
          endDuration = AdjustDateDurationRecord(duration.date, r2);
          break;
        }
      default:
        /* c8 ignore next */assertNotReached();
    }
    if (sign === 1) assert(r1 >= 0 && r1 < r2, "positive ordering of r1, r2: 0 \u2264 ".concat(r1, " < ").concat(r2));
    if (sign === -1) assert(r1 <= 0 && r1 > r2, "negative ordering of r1, r2: 0 \u2265 ".concat(r1, " > ").concat(r2));
    // Apply to origin, output PlainDateTimes
    var start = CalendarDateAdd(calendar, isoDateTime.isoDate, startDuration, 'constrain');
    var end = CalendarDateAdd(calendar, isoDateTime.isoDate, endDuration, 'constrain');
    // Convert to epoch-nanoseconds
    var startEpochNs, endEpochNs;
    var startDateTime = CombineISODateAndTimeRecord(start, isoDateTime.time);
    var endDateTime = CombineISODateAndTimeRecord(end, isoDateTime.time);
    if (timeZone) {
      startEpochNs = GetEpochNanosecondsFor(timeZone, startDateTime, 'compatible');
      endEpochNs = GetEpochNanosecondsFor(timeZone, endDateTime, 'compatible');
    } else {
      startEpochNs = GetUTCEpochNanoseconds(startDateTime);
      endEpochNs = GetUTCEpochNanoseconds(endDateTime);
    }
    // Round the smallestUnit within the epoch-nanosecond span
    if (sign === 1) {
      assert(JSBI.lessThanOrEqual(startEpochNs, destEpochNs) && JSBI.lessThanOrEqual(destEpochNs, endEpochNs), "".concat(unit, " was 0 days long"));
    }
    if (sign === -1) {
      assert(JSBI.lessThanOrEqual(endEpochNs, destEpochNs) && JSBI.lessThanOrEqual(destEpochNs, startEpochNs), "".concat(unit, " was 0 days long"));
    }
    assert(!JSBI.equal(endEpochNs, startEpochNs), 'startEpochNs must ≠ endEpochNs');
    var numerator = TimeDuration.fromEpochNsDiff(destEpochNs, startEpochNs);
    var denominator = TimeDuration.fromEpochNsDiff(endEpochNs, startEpochNs);
    var unsignedRoundingMode = GetUnsignedRoundingMode(roundingMode, sign < 0 ? 'negative' : 'positive');
    var cmp = numerator.add(numerator).abs().subtract(denominator.abs()).sign();
    var even = Math.abs(r1) / increment % 2 === 0;
    // prettier-ignore
    var roundedUnit = numerator.isZero() ? Math.abs(r1) : !numerator.cmp(denominator) // equal?
    ? Math.abs(r2) : ApplyUnsignedRoundingMode(Math.abs(r1), Math.abs(r2), cmp, even, unsignedRoundingMode);
    // Trick to minimize rounding error, due to the lack of fma() in JS
    var fakeNumerator = new TimeDuration(JSBI.add(JSBI.multiply(denominator.totalNs, JSBI.BigInt(r1)), JSBI.multiply(numerator.totalNs, JSBI.BigInt(increment * sign))));
    var total = fakeNumerator.fdiv(denominator.totalNs);
    assert(Math.abs(r1) <= Math.abs(total) && Math.abs(total) <= Math.abs(r2), 'r1 ≤ total ≤ r2');
    // Determine whether expanded or contracted
    var didExpandCalendarUnit = roundedUnit === Math.abs(r2);
    duration = {
      date: didExpandCalendarUnit ? endDuration : startDuration,
      time: TimeDuration.ZERO
    };
    var nudgeResult = {
      duration: duration,
      nudgedEpochNs: didExpandCalendarUnit ? endEpochNs : startEpochNs,
      didExpandCalendarUnit: didExpandCalendarUnit
    };
    return {
      nudgeResult: nudgeResult,
      total: total
    };
  }
  // Attempts rounding of time units within a time zone's day, but if the rounding
  // causes time to exceed the total time within the day, rerun rounding in next
  // day.
  function NudgeToZonedTime(sign, durationParam, isoDateTime, timeZone, calendar, increment, unit, roundingMode) {
    // unit must be hour or smaller
    var duration = durationParam;
    // Apply to origin, output start/end of the day as PlainDateTimes
    var start = CalendarDateAdd(calendar, isoDateTime.isoDate, duration.date, 'constrain');
    var startDateTime = CombineISODateAndTimeRecord(start, isoDateTime.time);
    var endDate = BalanceISODate(start.year, start.month, start.day + sign);
    var endDateTime = CombineISODateAndTimeRecord(endDate, isoDateTime.time);
    // Compute the epoch-nanosecond start/end of the final whole-day interval
    // If duration has negative sign, startEpochNs will be after endEpochNs
    var startEpochNs = GetEpochNanosecondsFor(timeZone, startDateTime, 'compatible');
    var endEpochNs = GetEpochNanosecondsFor(timeZone, endDateTime, 'compatible');
    // The signed amount of time from the start of the whole-day interval to the end
    var daySpan = TimeDuration.fromEpochNsDiff(endEpochNs, startEpochNs);
    if (daySpan.sign() !== sign) throw new RangeError('time zone returned inconsistent Instants');
    // Compute time parts of the duration to nanoseconds and round
    // Result could be negative
    var unitIncrement = JSBI.BigInt(NS_PER_TIME_UNIT[unit] * increment);
    var roundedTimeDuration = duration.time.round(unitIncrement, roundingMode);
    // Does the rounded time exceed the time-in-day?
    var beyondDaySpan = roundedTimeDuration.subtract(daySpan);
    var didRoundBeyondDay = beyondDaySpan.sign() !== -sign;
    var dayDelta, nudgedEpochNs;
    if (didRoundBeyondDay) {
      // If rounded into next day, use the day-end as the local origin and rerun
      // the rounding
      dayDelta = sign;
      roundedTimeDuration = beyondDaySpan.round(unitIncrement, roundingMode);
      nudgedEpochNs = roundedTimeDuration.addToEpochNs(endEpochNs);
    } else {
      // Otherwise, if time not rounded beyond day, use the day-start as the local
      // origin
      dayDelta = 0;
      nudgedEpochNs = roundedTimeDuration.addToEpochNs(startEpochNs);
    }
    var dateDuration = AdjustDateDurationRecord(duration.date, duration.date.days + dayDelta);
    var resultDuration = CombineDateAndTimeDuration(dateDuration, roundedTimeDuration);
    return {
      duration: resultDuration,
      nudgedEpochNs: nudgedEpochNs,
      didExpandCalendarUnit: didRoundBeyondDay
    };
  }
  // Converts all fields to nanoseconds and does integer rounding.
  function NudgeToDayOrTime(durationParam, destEpochNs, largestUnit, increment, smallestUnit, roundingMode) {
    // unit must be day or smaller
    var duration = durationParam;
    var timeDuration = duration.time.add24HourDays(duration.date.days);
    // Convert to nanoseconds and round
    var roundedTime = timeDuration.round(JSBI.BigInt(increment * NS_PER_TIME_UNIT[smallestUnit]), roundingMode);
    var diffTime = roundedTime.subtract(timeDuration);
    // Determine if whole days expanded
    var _timeDuration$divmod = timeDuration.divmod(DAY_NANOS),
      wholeDays = _timeDuration$divmod.quotient;
    var _roundedTime$divmod = roundedTime.divmod(DAY_NANOS),
      roundedWholeDays = _roundedTime$divmod.quotient;
    var didExpandDays = Math.sign(roundedWholeDays - wholeDays) === timeDuration.sign();
    var nudgedEpochNs = diffTime.addToEpochNs(destEpochNs);
    var days = 0;
    var remainder = roundedTime;
    if (TemporalUnitCategory(largestUnit) === 'date') {
      days = roundedWholeDays;
      remainder = roundedTime.add(TimeDuration.fromComponents(-roundedWholeDays * 24, 0, 0, 0, 0, 0));
    }
    var dateDuration = AdjustDateDurationRecord(duration.date, days);
    return {
      duration: {
        date: dateDuration,
        time: remainder
      },
      nudgedEpochNs: nudgedEpochNs,
      didExpandCalendarUnit: didExpandDays
    };
  }
  // Given a potentially bottom-heavy duration, bubble up smaller units to larger
  // units. Any units smaller than smallestUnit are already zeroed-out.
  function BubbleRelativeDuration(sign, durationParam, nudgedEpochNs, isoDateTime, timeZone, calendar, largestUnit, smallestUnit) {
    // smallestUnit is day or larger
    var duration = durationParam;
    if (smallestUnit === largestUnit) return duration;
    // Check to see if nudgedEpochNs has hit the boundary of any units higher than
    // smallestUnit, in which case increment the higher unit and clear smaller
    // units.
    var largestUnitIndex = UNITS_DESCENDING.indexOf(largestUnit);
    var smallestUnitIndex = UNITS_DESCENDING.indexOf(smallestUnit);
    for (var unitIndex = smallestUnitIndex - 1; unitIndex >= largestUnitIndex; unitIndex--) {
      // The only situation where days and smaller bubble-up into weeks is when
      // largestUnit is 'week' (not to be confused with the situation where
      // smallestUnit is 'week', in which case days and smaller are ROUNDED-up
      // into weeks, but that has already happened by the time this function
      // executes)
      // So, if days and smaller are NOT bubbled-up into weeks, and the current
      // unit is weeks, skip.
      var unit = UNITS_DESCENDING[unitIndex];
      if (unit === 'week' && largestUnit !== 'week') {
        continue;
      }
      var endDuration = void 0;
      switch (unit) {
        case 'year':
          {
            var years = duration.date.years + sign;
            endDuration = {
              years: years,
              months: 0,
              weeks: 0,
              days: 0
            };
            break;
          }
        case 'month':
          {
            var months = duration.date.months + sign;
            endDuration = AdjustDateDurationRecord(duration.date, 0, 0, months);
            break;
          }
        case 'week':
          {
            var weeks = duration.date.weeks + sign;
            endDuration = AdjustDateDurationRecord(duration.date, 0, weeks);
            break;
          }
        default:
          /* c8 ignore next */assertNotReached();
      }
      // Compute end-of-unit in epoch-nanoseconds
      var end = CalendarDateAdd(calendar, isoDateTime.isoDate, endDuration, 'constrain');
      var endDateTime = CombineISODateAndTimeRecord(end, isoDateTime.time);
      var endEpochNs = void 0;
      if (timeZone) {
        endEpochNs = GetEpochNanosecondsFor(timeZone, endDateTime, 'compatible');
      } else {
        endEpochNs = GetUTCEpochNanoseconds(endDateTime);
      }
      var didExpandToEnd = compare(nudgedEpochNs, endEpochNs) !== -sign;
      // Is nudgedEpochNs at the end-of-unit? This means it should bubble-up to
      // the next highest unit (and possibly further...)
      if (didExpandToEnd) {
        duration = {
          date: endDuration,
          time: TimeDuration.ZERO
        };
      } else {
        // NOT at end-of-unit. Stop looking for bubbling
        break;
      }
    }
    return duration;
  }
  function RoundRelativeDuration(durationParam, destEpochNs, isoDateTime, timeZone, calendar, largestUnitParam, increment, smallestUnit, roundingMode) {
    var duration = durationParam;
    // The duration must already be balanced. This should be achieved by calling
    // one of the non-rounding since/until internal methods prior. It's okay to
    // have a bottom-heavy weeks because weeks don't bubble-up into months. It's
    // okay to have >24 hour day assuming the final day of relativeTo+duration has
    // >24 hours in its timezone. (should automatically end up like this if using
    // non-rounding since/until internal methods prior)
    var irregularLengthUnit = IsCalendarUnit(smallestUnit) || timeZone && smallestUnit === 'day';
    var sign = InternalDurationSign(duration) < 0 ? -1 : 1;
    var nudgeResult;
    if (irregularLengthUnit) {
      // Rounding an irregular-length unit? Use epoch-nanosecond-bounding technique
      var _NudgeToCalendarUnit = NudgeToCalendarUnit(sign, duration, destEpochNs, isoDateTime, timeZone, calendar, increment, smallestUnit, roundingMode);
      nudgeResult = _NudgeToCalendarUnit.nudgeResult;
    } else if (timeZone) {
      nudgeResult = NudgeToZonedTime(sign, duration, isoDateTime, timeZone, calendar, increment, smallestUnit, roundingMode);
    } else {
      // Rounding uniform-length days/hours/minutes/etc units. Simple nanosecond
      // math. years/months/weeks unchanged
      nudgeResult = NudgeToDayOrTime(duration, destEpochNs, largestUnitParam, increment, smallestUnit, roundingMode);
    }
    duration = nudgeResult.duration;
    // Did nudging cause the duration to expand to the next day or larger?
    // Bubble-up smaller calendar units into higher ones, except for weeks, which
    // don't balance up into months
    if (nudgeResult.didExpandCalendarUnit && smallestUnit !== 'week') {
      duration = BubbleRelativeDuration(sign, duration, nudgeResult.nudgedEpochNs,
      // The destEpochNs after expanding/contracting
      isoDateTime, timeZone, calendar, largestUnitParam,
      // where to STOP bubbling
      LargerOfTwoTemporalUnits(smallestUnit, 'day') // where to START bubbling-up from
      );
    }
    return duration;
  }
  function TotalRelativeDuration(duration, destEpochNs, isoDateTime, timeZone, calendar, unit) {
    // The duration must already be balanced. This should be achieved by calling
    // one of the non-rounding since/until internal methods prior. It's okay to
    // have a bottom-heavy weeks because weeks don't bubble-up into months. It's
    // okay to have >24 hour day assuming the final day of relativeTo+duration has
    // >24 hours in its timezone. (should automatically end up like this if using
    // non-rounding since/until internal methods prior)
    if (IsCalendarUnit(unit) || timeZone && unit === 'day') {
      // Rounding an irregular-length unit? Use epoch-nanosecond-bounding technique
      var sign = InternalDurationSign(duration) < 0 ? -1 : 1;
      return NudgeToCalendarUnit(sign, duration, destEpochNs, isoDateTime, timeZone, calendar, 1, unit, 'trunc').total;
    }
    // Rounding uniform-length days/hours/minutes/etc units. Simple nanosecond
    // math. years/months/weeks unchanged
    var timeDuration = duration.time.add24HourDays(duration.date.days);
    return TotalTimeDuration(timeDuration, unit);
  }
  function DifferencePlainDateTimeWithRounding(isoDateTime1, isoDateTime2, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode) {
    if (CompareISODateTime(isoDateTime1, isoDateTime2) == 0) {
      return {
        date: ZeroDateDuration(),
        time: TimeDuration.ZERO
      };
    }
    RejectDateTimeRange(isoDateTime1);
    RejectDateTimeRange(isoDateTime2);
    var duration = DifferenceISODateTime(isoDateTime1, isoDateTime2, calendar, largestUnit);
    if (smallestUnit === 'nanosecond' && roundingIncrement === 1) return duration;
    var destEpochNs = GetUTCEpochNanoseconds(isoDateTime2);
    return RoundRelativeDuration(duration, destEpochNs, isoDateTime1, null, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
  }
  function DifferencePlainDateTimeWithTotal(isoDateTime1, isoDateTime2, calendar, unit) {
    if (CompareISODateTime(isoDateTime1, isoDateTime2) == 0) return 0;
    RejectDateTimeRange(isoDateTime1);
    RejectDateTimeRange(isoDateTime2);
    var duration = DifferenceISODateTime(isoDateTime1, isoDateTime2, calendar, unit);
    if (unit === 'nanosecond') return JSBI.toNumber(duration.time.totalNs);
    var destEpochNs = GetUTCEpochNanoseconds(isoDateTime2);
    return TotalRelativeDuration(duration, destEpochNs, isoDateTime1, null, calendar, unit);
  }
  function DifferenceZonedDateTimeWithRounding(ns1, ns2, timeZone, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode) {
    if (TemporalUnitCategory(largestUnit) === 'time') {
      // The user is only asking for a time difference, so return difference of instants.
      return DifferenceInstant(ns1, ns2, roundingIncrement, smallestUnit, roundingMode);
    }
    var duration = DifferenceZonedDateTime(ns1, ns2, timeZone, calendar, largestUnit);
    if (smallestUnit === 'nanosecond' && roundingIncrement === 1) return duration;
    var dateTime = GetISODateTimeFor(timeZone, ns1);
    return RoundRelativeDuration(duration, ns2, dateTime, timeZone, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
  }
  function DifferenceZonedDateTimeWithTotal(ns1, ns2, timeZone, calendar, unit) {
    if (TemporalUnitCategory(unit) === 'time') {
      // The user is only asking for a time difference, so return difference of instants.
      return TotalTimeDuration(TimeDuration.fromEpochNsDiff(ns2, ns1), unit);
    }
    var duration = DifferenceZonedDateTime(ns1, ns2, timeZone, calendar, unit);
    var dateTime = GetISODateTimeFor(timeZone, ns1);
    return TotalRelativeDuration(duration, ns2, dateTime, timeZone, calendar, unit);
  }
  function GetDifferenceSettings(op, options, group, disallowed, fallbackSmallest, smallestLargestDefaultUnit) {
    var ALLOWED_UNITS = TEMPORAL_UNITS.reduce(function (allowed, unitInfo) {
      var p = unitInfo[0];
      var s = unitInfo[1];
      var c = unitInfo[2];
      if ((group === 'datetime' || c === group) && !disallowed.includes(s)) {
        allowed.push(s, p);
      }
      return allowed;
    }, []);
    var largestUnit = GetTemporalUnitValuedOption(options, 'largestUnit', group, 'auto');
    if (disallowed.includes(largestUnit)) {
      throw new RangeError("largestUnit must be one of ".concat(ALLOWED_UNITS.join(', '), ", not ").concat(largestUnit));
    }
    var roundingIncrement = GetTemporalRoundingIncrementOption(options);
    var roundingMode = GetRoundingModeOption(options, 'trunc');
    if (op === 'since') roundingMode = NegateRoundingMode(roundingMode);
    var smallestUnit = GetTemporalUnitValuedOption(options, 'smallestUnit', group, fallbackSmallest);
    if (disallowed.includes(smallestUnit)) {
      throw new RangeError("smallestUnit must be one of ".concat(ALLOWED_UNITS.join(', '), ", not ").concat(smallestUnit));
    }
    var defaultLargestUnit = LargerOfTwoTemporalUnits(smallestLargestDefaultUnit, smallestUnit);
    if (largestUnit === 'auto') largestUnit = defaultLargestUnit;
    if (LargerOfTwoTemporalUnits(largestUnit, smallestUnit) !== largestUnit) {
      throw new RangeError("largestUnit ".concat(largestUnit, " cannot be smaller than smallestUnit ").concat(smallestUnit));
    }
    var MAX_DIFFERENCE_INCREMENTS = {
      hour: 24,
      minute: 60,
      second: 60,
      millisecond: 1000,
      microsecond: 1000,
      nanosecond: 1000
    };
    var maximum = MAX_DIFFERENCE_INCREMENTS[smallestUnit];
    if (maximum !== undefined) ValidateTemporalRoundingIncrement(roundingIncrement, maximum, false);
    return {
      largestUnit: largestUnit,
      roundingIncrement: roundingIncrement,
      roundingMode: roundingMode,
      smallestUnit: smallestUnit
    };
  }
  function DifferenceTemporalInstant(operation, instant, otherParam, options) {
    var other = ToTemporalInstant(otherParam);
    var resolvedOptions = GetOptionsObject(options);
    var settings = GetDifferenceSettings(operation, resolvedOptions, 'time', [], 'nanosecond', 'second');
    var onens = GetSlot(instant, EPOCHNANOSECONDS);
    var twons = GetSlot(other, EPOCHNANOSECONDS);
    var duration = DifferenceInstant(onens, twons, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    var result = TemporalDurationFromInternal(duration, settings.largestUnit);
    if (operation === 'since') result = CreateNegatedTemporalDuration(result);
    return result;
  }
  function DifferenceTemporalPlainDate(operation, plainDate, otherParam, options) {
    var other = ToTemporalDate(otherParam);
    var calendar = GetSlot(plainDate, CALENDAR);
    var otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
      throw new RangeError("cannot compute difference between dates of ".concat(calendar, " and ").concat(otherCalendar, " calendars"));
    }
    var resolvedOptions = GetOptionsObject(options);
    var settings = GetDifferenceSettings(operation, resolvedOptions, 'date', [], 'day', 'day');
    var Duration = GetIntrinsic('%Temporal.Duration%');
    var isoDate = GetSlot(plainDate, ISO_DATE);
    var isoOther = GetSlot(other, ISO_DATE);
    if (CompareISODate(isoDate, isoOther) === 0) return new Duration();
    var dateDifference = CalendarDateUntil(calendar, isoDate, isoOther, settings.largestUnit);
    var duration = {
      date: dateDifference,
      time: TimeDuration.ZERO
    };
    var roundingIsNoop = settings.smallestUnit === 'day' && settings.roundingIncrement === 1;
    if (!roundingIsNoop) {
      var isoDateTime = CombineISODateAndTimeRecord(isoDate, MidnightTimeRecord());
      var isoDateTimeOther = CombineISODateAndTimeRecord(isoOther, MidnightTimeRecord());
      var destEpochNs = GetUTCEpochNanoseconds(isoDateTimeOther);
      duration = RoundRelativeDuration(duration, destEpochNs, isoDateTime, null, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    }
    var result = TemporalDurationFromInternal(duration, 'day');
    if (operation === 'since') result = CreateNegatedTemporalDuration(result);
    return result;
  }
  function DifferenceTemporalPlainDateTime(operation, plainDateTime, otherParam, options) {
    var other = ToTemporalDateTime(otherParam);
    var calendar = GetSlot(plainDateTime, CALENDAR);
    var otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
      throw new RangeError("cannot compute difference between dates of ".concat(calendar, " and ").concat(otherCalendar, " calendars"));
    }
    var resolvedOptions = GetOptionsObject(options);
    var settings = GetDifferenceSettings(operation, resolvedOptions, 'datetime', [], 'nanosecond', 'day');
    var Duration = GetIntrinsic('%Temporal.Duration%');
    var isoDateTime1 = GetSlot(plainDateTime, ISO_DATE_TIME);
    var isoDateTime2 = GetSlot(other, ISO_DATE_TIME);
    if (CompareISODateTime(isoDateTime1, isoDateTime2) === 0) return new Duration();
    var duration = DifferencePlainDateTimeWithRounding(isoDateTime1, isoDateTime2, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    var result = TemporalDurationFromInternal(duration, settings.largestUnit);
    if (operation === 'since') result = CreateNegatedTemporalDuration(result);
    return result;
  }
  function DifferenceTemporalPlainTime(operation, plainTime, otherParam, options) {
    var other = ToTemporalTime(otherParam);
    var resolvedOptions = GetOptionsObject(options);
    var settings = GetDifferenceSettings(operation, resolvedOptions, 'time', [], 'nanosecond', 'hour');
    var timeDuration = DifferenceTime(GetSlot(plainTime, TIME), GetSlot(other, TIME));
    timeDuration = RoundTimeDuration(timeDuration, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    var duration = CombineDateAndTimeDuration(ZeroDateDuration(), timeDuration);
    var result = TemporalDurationFromInternal(duration, settings.largestUnit);
    if (operation === 'since') result = CreateNegatedTemporalDuration(result);
    return result;
  }
  function DifferenceTemporalPlainYearMonth(operation, yearMonth, otherParam, options) {
    var other = ToTemporalYearMonth(otherParam);
    var calendar = GetSlot(yearMonth, CALENDAR);
    var otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
      throw new RangeError("cannot compute difference between months of ".concat(calendar, " and ").concat(otherCalendar, " calendars"));
    }
    var resolvedOptions = GetOptionsObject(options);
    var settings = GetDifferenceSettings(operation, resolvedOptions, 'date', ['week', 'day'], 'month', 'year');
    var Duration = GetIntrinsic('%Temporal.Duration%');
    if (CompareISODate(GetSlot(yearMonth, ISO_DATE), GetSlot(other, ISO_DATE)) == 0) {
      return new Duration();
    }
    var thisFields = ISODateToFields(calendar, GetSlot(yearMonth, ISO_DATE), 'year-month');
    thisFields.day = 1;
    var thisDate = CalendarDateFromFields(calendar, thisFields, 'constrain');
    var otherFields = ISODateToFields(calendar, GetSlot(other, ISO_DATE), 'year-month');
    otherFields.day = 1;
    var otherDate = CalendarDateFromFields(calendar, otherFields, 'constrain');
    var dateDifference = CalendarDateUntil(calendar, thisDate, otherDate, settings.largestUnit);
    var duration = {
      date: AdjustDateDurationRecord(dateDifference, 0, 0),
      time: TimeDuration.ZERO
    };
    if (settings.smallestUnit !== 'month' || settings.roundingIncrement !== 1) {
      var isoDateTime = CombineISODateAndTimeRecord(thisDate, MidnightTimeRecord());
      var isoDateTimeOther = CombineISODateAndTimeRecord(otherDate, MidnightTimeRecord());
      var destEpochNs = GetUTCEpochNanoseconds(isoDateTimeOther);
      duration = RoundRelativeDuration(duration, destEpochNs, isoDateTime, null, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
    }
    var result = TemporalDurationFromInternal(duration, 'day');
    if (operation === 'since') result = CreateNegatedTemporalDuration(result);
    return result;
  }
  function DifferenceTemporalZonedDateTime(operation, zonedDateTime, otherParam, options) {
    var other = ToTemporalZonedDateTime(otherParam);
    var calendar = GetSlot(zonedDateTime, CALENDAR);
    var otherCalendar = GetSlot(other, CALENDAR);
    if (!CalendarEquals(calendar, otherCalendar)) {
      throw new RangeError("cannot compute difference between dates of ".concat(calendar, " and ").concat(otherCalendar, " calendars"));
    }
    var resolvedOptions = GetOptionsObject(options);
    var settings = GetDifferenceSettings(operation, resolvedOptions, 'datetime', [], 'nanosecond', 'hour');
    var ns1 = GetSlot(zonedDateTime, EPOCHNANOSECONDS);
    var ns2 = GetSlot(other, EPOCHNANOSECONDS);
    var Duration = GetIntrinsic('%Temporal.Duration%');
    var result;
    if (TemporalUnitCategory(settings.largestUnit) !== 'date') {
      // The user is only asking for a time difference, so return difference of instants.
      var duration = DifferenceInstant(ns1, ns2, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
      result = TemporalDurationFromInternal(duration, settings.largestUnit);
    } else {
      var timeZone = GetSlot(zonedDateTime, TIME_ZONE);
      if (!TimeZoneEquals(timeZone, GetSlot(other, TIME_ZONE))) {
        throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' " + 'or smaller because day lengths can vary between time zones due to DST or time zone offset changes.');
      }
      if (JSBI.equal(ns1, ns2)) return new Duration();
      var _duration = DifferenceZonedDateTimeWithRounding(ns1, ns2, timeZone, calendar, settings.largestUnit, settings.roundingIncrement, settings.smallestUnit, settings.roundingMode);
      result = TemporalDurationFromInternal(_duration, 'hour');
    }
    if (operation === 'since') result = CreateNegatedTemporalDuration(result);
    return result;
  }
  function AddTime(_ref23, timeDuration) {
    var hour = _ref23.hour,
      minute = _ref23.minute,
      secondParam = _ref23.second,
      millisecond = _ref23.millisecond,
      microsecond = _ref23.microsecond,
      nanosecondParam = _ref23.nanosecond;
    var second = secondParam;
    var nanosecond = nanosecondParam;
    second += timeDuration.sec;
    nanosecond += timeDuration.subsec;
    return BalanceTime(hour, minute, second, millisecond, microsecond, nanosecond);
  }
  function AddInstant(epochNanoseconds, timeDuration) {
    var result = timeDuration.addToEpochNs(epochNanoseconds);
    ValidateEpochNanoseconds(result);
    return result;
  }
  function AddZonedDateTime(epochNs, timeZone, calendar, duration) {
    var overflow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'constrain';
    // If only time is to be added, then use Instant math. It's not OK to fall
    // through to the date/time code below because compatible disambiguation in
    // the PlainDateTime=>Instant conversion will change the offset of any
    // ZonedDateTime in the repeated clock time after a backwards transition.
    // When adding/subtracting time units and not dates, this disambiguation is
    // not expected and so is avoided below via a fast path for time-only
    // arithmetic.
    // BTW, this behavior is similar in spirit to offset: 'prefer' in `with`.
    if (DateDurationSign(duration.date) === 0) return AddInstant(epochNs, duration.time);
    // RFC 5545 requires the date portion to be added in calendar days and the
    // time portion to be added in exact time.
    var dt = GetISODateTimeFor(timeZone, epochNs);
    var addedDate = CalendarDateAdd(calendar, dt.isoDate, duration.date, overflow);
    var dtIntermediate = CombineISODateAndTimeRecord(addedDate, dt.time);
    // Note that 'compatible' is used below because this disambiguation behavior
    // is required by RFC 5545.
    var intermediateNs = GetEpochNanosecondsFor(timeZone, dtIntermediate, 'compatible');
    return AddInstant(intermediateNs, duration.time);
  }
  function AddDurations(operation, duration, otherParam) {
    var other = ToTemporalDuration(otherParam);
    if (operation === 'subtract') other = CreateNegatedTemporalDuration(other);
    var largestUnit1 = DefaultTemporalLargestUnit(duration);
    var largestUnit2 = DefaultTemporalLargestUnit(other);
    var largestUnit = LargerOfTwoTemporalUnits(largestUnit1, largestUnit2);
    if (IsCalendarUnit(largestUnit)) {
      throw new RangeError('For years, months, or weeks arithmetic, use date arithmetic relative to a starting point');
    }
    var d1 = ToInternalDurationRecordWith24HourDays(duration);
    var d2 = ToInternalDurationRecordWith24HourDays(other);
    var result = CombineDateAndTimeDuration(ZeroDateDuration(), d1.time.add(d2.time));
    return TemporalDurationFromInternal(result, largestUnit);
  }
  function AddDurationToInstant(operation, instant, durationLike) {
    var duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract') duration = CreateNegatedTemporalDuration(duration);
    var largestUnit = DefaultTemporalLargestUnit(duration);
    if (TemporalUnitCategory(largestUnit) === 'date') {
      throw new RangeError("Duration field ".concat(largestUnit, " not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead."));
    }
    var internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    var ns = AddInstant(GetSlot(instant, EPOCHNANOSECONDS), internalDuration.time);
    return CreateTemporalInstant(ns);
  }
  function AddDurationToDate(operation, plainDate, durationLike, options) {
    var calendar = GetSlot(plainDate, CALENDAR);
    var duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract') duration = CreateNegatedTemporalDuration(duration);
    var dateDuration = ToDateDurationRecordWithoutTime(duration);
    var resolvedOptions = GetOptionsObject(options);
    var overflow = GetTemporalOverflowOption(resolvedOptions);
    var addedDate = CalendarDateAdd(calendar, GetSlot(plainDate, ISO_DATE), dateDuration, overflow);
    return CreateTemporalDate(addedDate, calendar);
  }
  function AddDurationToDateTime(operation, dateTime, durationLike, options) {
    var duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract') duration = CreateNegatedTemporalDuration(duration);
    var resolvedOptions = GetOptionsObject(options);
    var overflow = GetTemporalOverflowOption(resolvedOptions);
    var calendar = GetSlot(dateTime, CALENDAR);
    var internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    // Add the time part
    var isoDateTime = GetSlot(dateTime, ISO_DATE_TIME);
    var timeResult = AddTime(isoDateTime.time, internalDuration.time);
    var dateDuration = AdjustDateDurationRecord(internalDuration.date, timeResult.deltaDays);
    // Delegate the date part addition to the calendar
    RejectDuration(dateDuration.years, dateDuration.months, dateDuration.weeks, dateDuration.days, 0, 0, 0, 0, 0, 0);
    var addedDate = CalendarDateAdd(calendar, isoDateTime.isoDate, dateDuration, overflow);
    var result = CombineISODateAndTimeRecord(addedDate, timeResult);
    return CreateTemporalDateTime(result, calendar);
  }
  function AddDurationToTime(operation, temporalTime, durationLike) {
    var duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract') duration = CreateNegatedTemporalDuration(duration);
    var internalDuration = ToInternalDurationRecordWith24HourDays(duration);
    var _AddTime = AddTime(GetSlot(temporalTime, TIME), internalDuration.time),
      hour = _AddTime.hour,
      minute = _AddTime.minute,
      second = _AddTime.second,
      millisecond = _AddTime.millisecond,
      microsecond = _AddTime.microsecond,
      nanosecond = _AddTime.nanosecond;
    var time = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, 'reject');
    return CreateTemporalTime(time);
  }
  function AddDurationToYearMonth(operation, yearMonth, durationLike, options) {
    var duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract') duration = CreateNegatedTemporalDuration(duration);
    var resolvedOptions = GetOptionsObject(options);
    var overflow = GetTemporalOverflowOption(resolvedOptions);
    var sign = DurationSign(duration);
    var calendar = GetSlot(yearMonth, CALENDAR);
    var fields = ISODateToFields(calendar, GetSlot(yearMonth, ISO_DATE), 'year-month');
    fields.day = 1;
    var startDate = CalendarDateFromFields(calendar, fields, 'constrain');
    if (sign < 0) {
      var nextMonth = CalendarDateAdd(calendar, startDate, {
        months: 1
      }, 'constrain');
      startDate = BalanceISODate(nextMonth.year, nextMonth.month, nextMonth.day - 1);
    }
    var durationToAdd = ToDateDurationRecordWithoutTime(duration);
    RejectDateRange(startDate);
    var addedDate = CalendarDateAdd(calendar, startDate, durationToAdd, overflow);
    var addedDateFields = ISODateToFields(calendar, addedDate, 'year-month');
    var isoDate = CalendarYearMonthFromFields(calendar, addedDateFields, overflow);
    return CreateTemporalYearMonth(isoDate, calendar);
  }
  function AddDurationToZonedDateTime(operation, zonedDateTime, durationLike, options) {
    var duration = ToTemporalDuration(durationLike);
    if (operation === 'subtract') duration = CreateNegatedTemporalDuration(duration);
    var resolvedOptions = GetOptionsObject(options);
    var overflow = GetTemporalOverflowOption(resolvedOptions);
    var timeZone = GetSlot(zonedDateTime, TIME_ZONE);
    var calendar = GetSlot(zonedDateTime, CALENDAR);
    var internalDuration = ToInternalDurationRecord(duration);
    var epochNanoseconds = AddZonedDateTime(GetSlot(zonedDateTime, EPOCHNANOSECONDS), timeZone, calendar, internalDuration, overflow);
    return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar);
  }
  // ts-prune-ignore-next TODO: remove this after tests are converted to TS
  function RoundNumberToIncrement(quantity, increment, mode) {
    var quotient = Math.trunc(quantity / increment);
    var remainder = quantity % increment;
    var sign = quantity < 0 ? 'negative' : 'positive';
    var r1 = Math.abs(quotient);
    var r2 = r1 + 1;
    var cmp = ComparisonResult(Math.abs(remainder * 2) - increment);
    var even = r1 % 2 === 0;
    var unsignedRoundingMode = GetUnsignedRoundingMode(mode, sign);
    var rounded = remainder === 0 ? r1 : ApplyUnsignedRoundingMode(r1, r2, cmp, even, unsignedRoundingMode);
    return increment * (sign === 'positive' ? rounded : -rounded);
  }
  // ts-prune-ignore-next TODO: remove this after tests are converted to TS
  function RoundNumberToIncrementAsIfPositive(quantityParam, incrementParam, mode) {
    var quantity = ensureJSBI(quantityParam);
    var increment = ensureJSBI(incrementParam);
    var quotient = JSBI.divide(quantity, increment);
    var remainder = JSBI.remainder(quantity, increment);
    var unsignedRoundingMode = GetUnsignedRoundingMode(mode, 'positive');
    var r1, r2;
    if (JSBI.lessThan(quantity, ZERO)) {
      r1 = JSBI.subtract(quotient, ONE);
      r2 = quotient;
    } else {
      r1 = quotient;
      r2 = JSBI.add(quotient, ONE);
    }
    // Similar to the comparison in RoundNumberToIncrement, but multiplied by an
    // extra sign to make sure we treat it as positive
    var cmp = compare(abs(JSBI.multiply(remainder, TWO)), increment) * (JSBI.lessThan(quantity, ZERO) ? -1 : 1) + 0;
    var rounded = JSBI.equal(remainder, ZERO) ? quotient : ApplyUnsignedRoundingMode(r1, r2, cmp, isEven(r1), unsignedRoundingMode);
    return JSBI.multiply(rounded, increment);
  }
  function RoundTemporalInstant(epochNs, increment, unit, roundingMode) {
    var incrementNs = NS_PER_TIME_UNIT[unit] * increment;
    return RoundNumberToIncrementAsIfPositive(epochNs, JSBI.BigInt(incrementNs), roundingMode);
  }
  function RoundISODateTime(isoDateTime, increment, unit, roundingMode) {
    AssertISODateTimeWithinLimits(isoDateTime);
    var _isoDateTime$isoDate2 = isoDateTime.isoDate,
      year = _isoDateTime$isoDate2.year,
      month = _isoDateTime$isoDate2.month,
      day = _isoDateTime$isoDate2.day;
    var time = RoundTime(isoDateTime.time, increment, unit, roundingMode);
    var isoDate = BalanceISODate(year, month, day + time.deltaDays);
    return CombineISODateAndTimeRecord(isoDate, time);
  }
  function RoundTime(_ref24, increment, unit, roundingMode) {
    var hour = _ref24.hour,
      minute = _ref24.minute,
      second = _ref24.second,
      millisecond = _ref24.millisecond,
      microsecond = _ref24.microsecond,
      nanosecond = _ref24.nanosecond;
    var quantity;
    switch (unit) {
      case 'day':
      case 'hour':
        quantity = ((((hour * 60 + minute) * 60 + second) * 1000 + millisecond) * 1000 + microsecond) * 1000 + nanosecond;
        break;
      case 'minute':
        quantity = (((minute * 60 + second) * 1000 + millisecond) * 1000 + microsecond) * 1000 + nanosecond;
        break;
      case 'second':
        quantity = ((second * 1000 + millisecond) * 1000 + microsecond) * 1000 + nanosecond;
        break;
      case 'millisecond':
        quantity = (millisecond * 1000 + microsecond) * 1000 + nanosecond;
        break;
      case 'microsecond':
        quantity = microsecond * 1000 + nanosecond;
        break;
      case 'nanosecond':
        quantity = nanosecond;
    }
    var nsPerUnit = NS_PER_TIME_UNIT[unit];
    var result = RoundNumberToIncrement(quantity, nsPerUnit * increment, roundingMode) / nsPerUnit;
    switch (unit) {
      case 'day':
        return {
          deltaDays: result,
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
          microsecond: 0,
          nanosecond: 0
        };
      case 'hour':
        return BalanceTime(result, 0, 0, 0, 0, 0);
      case 'minute':
        return BalanceTime(hour, result, 0, 0, 0, 0);
      case 'second':
        return BalanceTime(hour, minute, result, 0, 0, 0);
      case 'millisecond':
        return BalanceTime(hour, minute, second, result, 0, 0);
      case 'microsecond':
        return BalanceTime(hour, minute, second, millisecond, result, 0);
      case 'nanosecond':
        return BalanceTime(hour, minute, second, millisecond, microsecond, result);
      default:
        throw new Error("Invalid unit ".concat(unit));
    }
  }
  function RoundTimeDuration(timeDuration, increment, unit, roundingMode) {
    // unit must be a time unit
    var divisor = NS_PER_TIME_UNIT[unit];
    return timeDuration.round(JSBI.BigInt(divisor * increment), roundingMode);
  }
  function TotalTimeDuration(timeDuration, unit) {
    var divisor = NS_PER_TIME_UNIT[unit];
    return timeDuration.fdiv(JSBI.BigInt(divisor));
  }
  function CompareISODate(isoDate1, isoDate2) {
    if (isoDate1.year !== isoDate2.year) return ComparisonResult(isoDate1.year - isoDate2.year);
    if (isoDate1.month !== isoDate2.month) return ComparisonResult(isoDate1.month - isoDate2.month);
    if (isoDate1.day !== isoDate2.day) return ComparisonResult(isoDate1.day - isoDate2.day);
    return 0;
  }
  function CompareTimeRecord(time1, time2) {
    if (time1.hour !== time2.hour) return ComparisonResult(time1.hour - time2.hour);
    if (time1.minute !== time2.minute) return ComparisonResult(time1.minute - time2.minute);
    if (time1.second !== time2.second) return ComparisonResult(time1.second - time2.second);
    if (time1.millisecond !== time2.millisecond) return ComparisonResult(time1.millisecond - time2.millisecond);
    if (time1.microsecond !== time2.microsecond) return ComparisonResult(time1.microsecond - time2.microsecond);
    if (time1.nanosecond !== time2.nanosecond) return ComparisonResult(time1.nanosecond - time2.nanosecond);
    return 0;
  }
  function CompareISODateTime(isoDateTime1, isoDateTime2) {
    var dateResult = CompareISODate(isoDateTime1.isoDate, isoDateTime2.isoDate);
    if (dateResult !== 0) return dateResult;
    return CompareTimeRecord(isoDateTime1.time, isoDateTime2.time);
  }
  function ToBigIntExternal(arg) {
    var jsbiBI = ToBigInt(arg);
    if (typeof globalThis.BigInt !== 'undefined') return globalThis.BigInt(jsbiBI.toString(10));
    return jsbiBI;
  }
  // rounding modes supported: floor, ceil, trunc
  function epochNsToMs(epochNanosecondsParam, mode) {
    var epochNanoseconds = ensureJSBI(epochNanosecondsParam);
    var _divmod = divmod(epochNanoseconds, MILLION),
      quotient = _divmod.quotient,
      remainder = _divmod.remainder;
    var epochMilliseconds = JSBI.toNumber(quotient);
    if (mode === 'floor' && JSBI.toNumber(remainder) < 0) epochMilliseconds -= 1;
    if (mode === 'ceil' && JSBI.toNumber(remainder) > 0) epochMilliseconds += 1;
    return epochMilliseconds;
  }
  function epochMsToNs(epochMilliseconds) {
    if (!Number.isInteger(epochMilliseconds)) throw new RangeError('epoch milliseconds must be an integer');
    return JSBI.multiply(JSBI.BigInt(epochMilliseconds), MILLION);
  }
  function ToBigInt(arg) {
    var prim = arg;
    if (_typeof(arg) === 'object') {
      var toPrimFn = arg[Symbol.toPrimitive];
      if (toPrimFn && typeof toPrimFn === 'function') {
        prim = toPrimFn.call(arg, 'number');
      }
    }
    // The AO ToBigInt throws on numbers because it does not allow implicit
    // conversion between number and bigint (unlike the bigint constructor).
    if (typeof prim === 'number') {
      throw new TypeError('cannot convert number to bigint');
    }
    if (typeof prim === 'bigint') {
      // JSBI doesn't know anything about the bigint type, and intentionally
      // assumes it doesn't exist. Passing one to the BigInt function will throw
      // an error.
      return JSBI.BigInt(prim.toString(10));
    }
    // JSBI will properly coerce types into a BigInt the same as the native BigInt
    // constructor will, with the exception of native bigint which is handled
    // above.
    // As of 2023-04-07, the only runtime type that neither of those can handle is
    // 'symbol', and both native bigint and the JSBI.BigInt function will throw an
    // error if they are given a Symbol.
    return JSBI.BigInt(prim);
  }
  // Note: This method returns values with bogus nanoseconds based on the previous iteration's
  // milliseconds. That way there is a guarantee that the full nanoseconds are always going to be
  // increasing at least and that the microsecond and nanosecond fields are likely to be non-zero.
  var SystemUTCEpochNanoSeconds = function () {
    var ns = JSBI.BigInt(Date.now() % 1e6);
    return function () {
      var now = Date.now();
      var ms = JSBI.BigInt(now);
      var result = JSBI.add(epochMsToNs(now), ns);
      ns = JSBI.remainder(ms, MILLION);
      if (JSBI.greaterThan(result, NS_MAX)) return NS_MAX;
      if (JSBI.lessThan(result, NS_MIN)) return NS_MIN;
      return result;
    };
  }();
  function DefaultTimeZone() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  function ComparisonResult(value) {
    return value < 0 ? -1 : value > 0 ? 1 : value;
  }
  function GetOptionsObject(options) {
    if (options === undefined) return Object.create(null);
    if (IsObject(options) && options !== null) return options;
    throw new TypeError("Options parameter must be an object, not ".concat(options === null ? 'null' : "".concat(_typeof(options))));
  }
  function CreateOnePropObject(propName, propValue) {
    var o = Object.create(null);
    o[propName] = propValue;
    return o;
  }
  function GetOption(options, property, allowedValues, fallback) {
    var value = options[property];
    if (value !== undefined) {
      value = ToString(value);
      if (!allowedValues.includes(value)) {
        throw new RangeError("".concat(property, " must be one of ").concat(allowedValues.join(', '), ", not ").concat(value));
      }
      return value;
    }
    if (fallback === REQUIRED) throw new RangeError("".concat(property, " option is required"));
    return fallback;
  }
  // This is a temporary implementation. Ideally we'd rely on Intl.DateTimeFormat
  // here, to provide the latest CLDR alias data, when implementations catch up to
  // the ECMA-402 change. The aliases below are taken from
  // https://github.com/unicode-org/cldr/blob/main/common/bcp47/calendar.xml
  function CanonicalizeCalendar(idParam) {
    var id = ASCIILowercase(idParam);
    if (!BUILTIN_CALENDAR_IDS.includes(ASCIILowercase(id))) {
      throw new RangeError("invalid calendar identifier ".concat(id));
    }
    switch (id) {
      case 'ethiopic-amete-alem':
        // May need to be removed in the future.
        // See https://github.com/tc39/ecma402/issues/285
        return 'ethioaa';
      // case 'gregorian':
      // (Skip 'gregorian'. It isn't a valid identifier as it's a single
      // subcomponent longer than 8 letters. It can only be used with the old
      // @key=value syntax.)
      case 'islamicc':
        return 'islamic-civil';
    }
    return id;
  }
  function ASCIILowercase(str) {
    // The spec defines this operation distinct from String.prototype.lowercase,
    // so we'll follow the spec here. Note that nasty security issues that can
    // happen for some use cases if you're comparing case-modified non-ASCII
    // values. For example, Turkish's "I" character was the source of a security
    // issue involving "file://" URLs. See
    // https://haacked.com/archive/2012/07/05/turkish-i-problem-and-why-you-should-care.aspx/.
    var lowercase = '';
    for (var ix = 0; ix < str.length; ix++) {
      var code = str.charCodeAt(ix);
      if (code >= 0x41 && code <= 0x5a) {
        lowercase += String.fromCharCode(code + 0x20);
      } else {
        lowercase += String.fromCharCode(code);
      }
    }
    return lowercase;
  }
  // This function isn't in the spec, but we put it in the polyfill to avoid
  // repeating the same (long) error message in many files.
  function ValueOfThrows(constructorName) {
    var compareCode = constructorName === 'PlainMonthDay' ? 'Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))' : "Temporal.".concat(constructorName, ".compare(obj1, obj2)");
    throw new TypeError('Do not use built-in arithmetic operators with Temporal objects. ' + "When comparing, use ".concat(compareCode, ", not obj1 > obj2. ") + "When coercing to strings, use `${obj}` or String(obj), not '' + obj. " + 'When coercing to numbers, use properties or methods of the object, not `+obj`. ' + 'When concatenating with strings, use `${str}${obj}` or str.concat(obj), not str + obj. ' + 'In React, coerce to a string before rendering a Temporal object.');
  }
  var OFFSET = new RegExp("^".concat(offset.source, "$"));
  var OFFSET_WITH_PARTS = new RegExp("^".concat(offsetWithParts.source, "$"));
  function bisect(getState, leftParam, rightParam) {
    var lstateParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getState(leftParam);
    var rstateParam = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getState(rightParam);
    var left = leftParam;
    var right = rightParam;
    var lstate = lstateParam;
    var rstate = rstateParam;
    while (right - left > 1) {
      var middle = Math.trunc((left + right) / 2);
      var mstate = getState(middle);
      if (mstate === lstate) {
        left = middle;
        lstate = mstate;
      } else if (mstate === rstate) {
        right = middle;
        rstate = mstate;
      } else {
        /* c8 ignore next */assertNotReached("invalid state in bisection ".concat(lstate, " - ").concat(mstate, " - ").concat(rstate));
      }
    }
    return right;
  }

  function arrayFromSet(src) {
    return _toConsumableArray(src);
  }
  function calendarDateWeekOfYear(id, isoDate) {
    // Supports only ISO8601 calendar; can be updated to add support for other calendars.
    // Returns undefined for calendars without a well-defined week calendar system.
    // eslint-disable-next-line max-len
    // Also see: https://github.com/unicode-org/icu/blob/ab72ab1d4a3c3f9beeb7d92b0c7817ca93dfdb04/icu4c/source/i18n/calendar.cpp#L1606
    if (id !== 'iso8601') return undefined;
    var calendar = impl[id];
    var yow = isoDate.year;
    var _calendar$isoToDate = calendar.isoToDate(isoDate, {
        dayOfWeek: true,
        dayOfYear: true,
        daysInYear: true
      }),
      dayOfWeek = _calendar$isoToDate.dayOfWeek,
      dayOfYear = _calendar$isoToDate.dayOfYear,
      daysInYear = _calendar$isoToDate.daysInYear;
    var fdow = calendar.getFirstDayOfWeek();
    var mdow = calendar.getMinimalDaysInFirstWeek();
    // For both the input date and the first day of its calendar year, calculate the day of week
    // relative to first day of week in the relevant calendar (e.g., in iso8601, relative to Monday).
    var relDow = (dayOfWeek + 7 - fdow) % 7;
    // Assuming the year length is less than 7000 days.
    var relDowJan1 = (dayOfWeek - dayOfYear + 7001 - fdow) % 7;
    var woy = Math.floor((dayOfYear - 1 + relDowJan1) / 7);
    if (7 - relDowJan1 >= mdow) {
      ++woy;
    }
    // Adjust for weeks at the year end that overlap into the previous or next calendar year.
    if (woy == 0) {
      // Check for last week of previous year; if true, handle the case for
      // first week of next year
      var prevYearCalendar = calendar.isoToDate(calendar.dateAdd(isoDate, {
        years: -1
      }, 'constrain'), {
        daysInYear: true
      });
      var prevDoy = dayOfYear + prevYearCalendar.daysInYear;
      woy = weekNumber(fdow, mdow, prevDoy, dayOfWeek);
      yow--;
    } else {
      // For it to be week 1 of the next year, dayOfYear must be >= lastDoy - 5
      //          L-5                  L
      // doy: 359 360 361 362 363 364 365 001
      // dow:      1   2   3   4   5   6   7
      var lastDoy = daysInYear;
      if (dayOfYear >= lastDoy - 5) {
        var lastRelDow = (relDow + lastDoy - dayOfYear) % 7;
        if (lastRelDow < 0) {
          lastRelDow += 7;
        }
        if (6 - lastRelDow >= mdow && dayOfYear + 7 - relDow > lastDoy) {
          woy = 1;
          yow++;
        }
      }
    }
    return {
      week: woy,
      year: yow
    };
  }
  function ISODateSurpasses(sign, y1, m1, d1, isoDate2) {
    if (y1 !== isoDate2.year) {
      if (sign * (y1 - isoDate2.year) > 0) return true;
    } else if (m1 !== isoDate2.month) {
      if (sign * (m1 - isoDate2.month) > 0) return true;
    } else if (d1 !== isoDate2.day) {
      if (sign * (d1 - isoDate2.day) > 0) return true;
    }
    return false;
  }
  /**
   * Implementations for each calendar.
   * Registration for each of these calendars happens throughout this file. The ISO and non-ISO calendars are registered
   * separately - look for 'iso8601' for the ISO calendar registration, and all non-ISO calendar registrations happens
   * at the bottom of the file.
   */
  var impl = {};
  /**
   * Implementation for the ISO 8601 calendar. This is the only calendar that's
   * guaranteed to be supported by all ECMAScript implementations, including those
   * without Intl (ECMA-402) support.
   */
  impl['iso8601'] = {
    resolveFields: function resolveFields(fields, type) {
      if ((type === 'date' || type === 'year-month') && fields.year === undefined) {
        throw new TypeError('year is required');
      }
      if ((type === 'date' || type === 'month-day') && fields.day === undefined) {
        throw new TypeError('day is required');
      }
      Object.assign(fields, resolveNonLunisolarMonth(fields));
    },
    dateToISO: function dateToISO(fields, overflow) {
      return RegulateISODate(fields.year, fields.month, fields.day, overflow);
    },
    monthDayToISOReferenceDate: function monthDayToISOReferenceDate(fields, overflow) {
      var _fields$year;
      var referenceISOYear = 1972;
      var _ES$RegulateISODate = RegulateISODate((_fields$year = fields.year) !== null && _fields$year !== void 0 ? _fields$year : referenceISOYear, fields.month, fields.day, overflow),
        month = _ES$RegulateISODate.month,
        day = _ES$RegulateISODate.day;
      return {
        month: month,
        day: day,
        year: referenceISOYear
      };
    },
    extraFields: function extraFields() {
      return [];
    },
    fieldKeysToIgnore: function fieldKeysToIgnore(keys) {
      var result = new Set();
      for (var ix = 0; ix < keys.length; ix++) {
        var key = keys[ix];
        result.add(key);
        if (key === 'month') {
          result.add('monthCode');
        } else if (key === 'monthCode') {
          result.add('month');
        }
      }
      return arrayFromSet(result);
    },
    dateAdd: function dateAdd(isoDate, _ref, overflow) {
      var _ref$years = _ref.years,
        years = _ref$years === void 0 ? 0 : _ref$years,
        _ref$months = _ref.months,
        months = _ref$months === void 0 ? 0 : _ref$months,
        _ref$weeks = _ref.weeks,
        weeks = _ref$weeks === void 0 ? 0 : _ref$weeks,
        _ref$days = _ref.days,
        days = _ref$days === void 0 ? 0 : _ref$days;
      var year = isoDate.year,
        month = isoDate.month,
        day = isoDate.day;
      year += years;
      month += months;
      var _ES$BalanceISOYearMon = BalanceISOYearMonth(year, month);
      year = _ES$BalanceISOYearMon.year;
      month = _ES$BalanceISOYearMon.month;
      var _ES$RegulateISODate2 = RegulateISODate(year, month, day, overflow);
      year = _ES$RegulateISODate2.year;
      month = _ES$RegulateISODate2.month;
      day = _ES$RegulateISODate2.day;
      day += days + 7 * weeks;
      return BalanceISODate(year, month, day);
    },
    dateUntil: function dateUntil(one, two, largestUnit) {
      var sign = -CompareISODate(one, two);
      if (sign === 0) return {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0
      };
      var years = 0;
      var months = 0;
      var intermediate;
      if (largestUnit === 'year' || largestUnit === 'month') {
        // We can skip right to the neighbourhood of the correct number of years,
        // it'll be at least one less than two.year - one.year (unless it's zero)
        var candidateYears = two.year - one.year;
        if (candidateYears !== 0) candidateYears -= sign;
        // loops at most twice
        while (!ISODateSurpasses(sign, one.year + candidateYears, one.month, one.day, two)) {
          years = candidateYears;
          candidateYears += sign;
        }
        var candidateMonths = sign;
        intermediate = BalanceISOYearMonth(one.year + years, one.month + candidateMonths);
        // loops at most 12 times
        while (!ISODateSurpasses(sign, intermediate.year, intermediate.month, one.day, two)) {
          months = candidateMonths;
          candidateMonths += sign;
          intermediate = BalanceISOYearMonth(intermediate.year, intermediate.month + sign);
        }
        if (largestUnit === 'month') {
          months += years * 12;
          years = 0;
        }
      }
      intermediate = BalanceISOYearMonth(one.year + years, one.month + months);
      var constrained = ConstrainISODate(intermediate.year, intermediate.month, one.day);
      var weeks = 0;
      var days = ISODateToEpochDays(two.year, two.month - 1, two.day) - ISODateToEpochDays(constrained.year, constrained.month - 1, constrained.day);
      if (largestUnit === 'week') {
        weeks = Math.trunc(days / 7);
        days %= 7;
      }
      return {
        years: years,
        months: months,
        weeks: weeks,
        days: days
      };
    },
    isoToDate: function isoToDate(_ref2, requestedFields) {
      var year = _ref2.year,
        month = _ref2.month,
        day = _ref2.day;
      // requestedFields parameter is not part of the spec text. It's an
      // illustration of one way implementations may choose to optimize this
      // operation.
      var date = {
        era: undefined,
        eraYear: undefined,
        year: year,
        month: month,
        day: day,
        daysInWeek: 7,
        monthsInYear: 12
      };
      if (requestedFields.monthCode) date.monthCode = buildMonthCode(month);
      if (requestedFields.dayOfWeek) {
        // https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Disparate_variation
        var shiftedMonth = month + (month < 3 ? 10 : -2);
        var shiftedYear = year - (month < 3 ? 1 : 0);
        var century = Math.floor(shiftedYear / 100);
        var yearInCentury = shiftedYear - century * 100;
        var monthTerm = Math.floor(2.6 * shiftedMonth - 0.2);
        var yearTerm = yearInCentury + Math.floor(yearInCentury / 4);
        var centuryTerm = Math.floor(century / 4) - 2 * century;
        var dow = (day + monthTerm + yearTerm + centuryTerm) % 7;
        date.dayOfWeek = dow + (dow <= 0 ? 7 : 0);
      }
      if (requestedFields.dayOfYear) {
        var days = day;
        for (var m = month - 1; m > 0; m--) {
          days += ISODaysInMonth(year, m);
        }
        date.dayOfYear = days;
      }
      if (requestedFields.weekOfYear) date.weekOfYear = calendarDateWeekOfYear('iso8601', {
        year: year,
        month: month,
        day: day
      });
      if (requestedFields.daysInMonth) date.daysInMonth = ISODaysInMonth(year, month);
      if (requestedFields.daysInYear || requestedFields.inLeapYear) {
        date.inLeapYear = LeapYear(year);
        date.daysInYear = date.inLeapYear ? 366 : 365;
      }
      return date;
    },
    getFirstDayOfWeek: function getFirstDayOfWeek() {
      return 1;
    },
    getMinimalDaysInFirstWeek: function getMinimalDaysInFirstWeek() {
      return 4;
    }
  };
  function nonLeapMonthCodeNumberPart(monthCode) {
    if (!monthCode.startsWith('M')) {
      throw new RangeError("Invalid month code: ".concat(monthCode, ".  Month codes must start with M."));
    }
    var month = +monthCode.slice(1);
    if (Number.isNaN(month)) throw new RangeError("Invalid month code: ".concat(monthCode));
    return month;
  }
  function buildMonthCode(month) {
    var leap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var digitPart = "".concat(month).padStart(2, '0');
    var leapMarker = leap ? 'L' : '';
    return "M".concat(digitPart).concat(leapMarker);
  }
  /**
   * Safely merge a month, monthCode pair into an integer month.
   * If both are present, make sure they match.
   * This logic doesn't work for lunisolar calendars!
   * */
  function resolveNonLunisolarMonth(calendarDate) {
    var overflow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var monthsPerYear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 12;
    var month = calendarDate.month,
      monthCode = calendarDate.monthCode;
    if (monthCode === undefined) {
      if (month === undefined) throw new TypeError('Either month or monthCode are required');
      // The ISO calendar uses the default (undefined) value because it does
      // constrain/reject after this method returns. Non-ISO calendars, however,
      // rely on this function to constrain/reject out-of-range `month` values.
      if (overflow === 'reject') RejectToRange(month, 1, monthsPerYear);
      if (overflow === 'constrain') month = ConstrainToRange(month, 1, monthsPerYear);
      monthCode = buildMonthCode(month);
    } else {
      var numberPart = nonLeapMonthCodeNumberPart(monthCode);
      if (monthCode !== buildMonthCode(numberPart)) {
        throw new RangeError("Invalid month code: ".concat(monthCode));
      }
      if (month !== undefined && month !== numberPart) {
        throw new RangeError("monthCode ".concat(monthCode, " and month ").concat(month, " must match if both are present"));
      }
      month = numberPart;
      if (month < 1 || month > monthsPerYear) throw new RangeError("Invalid monthCode: ".concat(monthCode));
    }
    return _objectSpread2(_objectSpread2({}, calendarDate), {}, {
      month: month,
      monthCode: monthCode
    });
  }
  function weekNumber(firstDayOfWeek, minimalDaysInFirstWeek, desiredDay, dayOfWeek) {
    var periodStartDayOfWeek = (dayOfWeek - firstDayOfWeek - desiredDay + 1) % 7;
    if (periodStartDayOfWeek < 0) periodStartDayOfWeek += 7;
    var weekNo = Math.floor((desiredDay + periodStartDayOfWeek - 1) / 7);
    if (7 - periodStartDayOfWeek >= minimalDaysInFirstWeek) {
      ++weekNo;
    }
    return weekNo;
  }
  /**
   * This prototype implementation of non-ISO calendars makes many repeated calls
   * to Intl APIs which may be slow (e.g. >0.2ms). This trivial cache will speed
   * up these repeat accesses. Each cache instance is associated (via a WeakMap)
   * to a specific Temporal object, which speeds up multiple calendar calls on the
   * same Temporal object instance.  No invalidation or pruning is necessary
   * because each object's cache is thrown away when the object is GC-ed.
   */
  var OneObjectCache = /*#__PURE__*/function () {
    // static monotonicTimestamp() {
    //   return performance?.now() ?? Date.now();
    // }
    function OneObjectCache(cacheToClone) {
      _classCallCheck(this, OneObjectCache);
      this.map = new Map();
      this.calls = 0;
      // now = OneObjectCache.monotonicTimestamp();
      this.hits = 0;
      this.misses = 0;
      if (cacheToClone !== undefined) {
        var i = 0;
        var _iterator = _createForOfIteratorHelper(cacheToClone.map.entries()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _this$map;
            var entry = _step.value;
            if (++i > OneObjectCache.MAX_CACHE_ENTRIES) break;
            (_this$map = this.map).set.apply(_this$map, _toConsumableArray(entry));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
    _createClass(OneObjectCache, [{
      key: "get",
      value: function get(key) {
        var result = this.map.get(key);
        if (result) {
          this.hits++;
          this.report();
        }
        this.calls++;
        return result;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        this.map.set(key, value);
        this.misses++;
        this.report();
      }
    }, {
      key: "report",
      value: function report() {
        // if (this.calls === 0) return;
        // const ms = OneObjectCache.monotonicTimestamp() - this.now;
        // const hitRate = ((100 * this.hits) / this.calls).toFixed(0);
        // const t = `${ms.toFixed(2)}ms`;
        // // eslint-disable-next-line no-console
        // console.log(`${this.calls} calls in ${t}. Hits: ${this.hits} (${hitRate}%). Misses: ${this.misses}.`);
      }
    }, {
      key: "setObject",
      value: function setObject(obj) {
        if (OneObjectCache.objectMap.get(obj)) throw new RangeError('object already cached');
        OneObjectCache.objectMap.set(obj, this);
        this.report();
      }
      /**
       * Returns a WeakMap-backed cache that's used to store expensive results
       * that are associated with a particular Temporal object instance.
       *
       * @param obj - object to associate with the cache
       */
    }], [{
      key: "getCacheForObject",
      value: function getCacheForObject(obj) {
        var cache = OneObjectCache.objectMap.get(obj);
        if (!cache) {
          cache = new OneObjectCache();
          OneObjectCache.objectMap.set(obj, cache);
        }
        return cache;
      }
    }]);
    return OneObjectCache;
  }();
  OneObjectCache.objectMap = new WeakMap();
  OneObjectCache.MAX_CACHE_ENTRIES = 1000;
  function toUtcIsoDateString(_ref3) {
    var isoYear = _ref3.isoYear,
      isoMonth = _ref3.isoMonth,
      isoDay = _ref3.isoDay;
    var yearString = ISOYearString(isoYear);
    var monthString = ISODateTimePartString(isoMonth);
    var dayString = ISODateTimePartString(isoDay);
    return "".concat(yearString, "-").concat(monthString, "-").concat(dayString, "T00:00Z");
  }
  function simpleDateDiff(one, two) {
    return {
      years: one.year - two.year,
      months: one.month - two.month,
      days: one.day - two.day
    };
  }
  /**
   * Implementation helper that's common to all non-ISO calendars
   */
  var HelperBase = /*#__PURE__*/function () {
    function HelperBase() {
      _classCallCheck(this, HelperBase);
      this.eras = [];
      // Override if calendar uses eras
      this.hasEra = false;
      // See https://github.com/tc39/proposal-temporal/issues/1784
      this.erasBeginMidYear = false;
    }
    _createClass(HelperBase, [{
      key: "getFormatter",
      value: function getFormatter() {
        // `new Intl.DateTimeFormat()` is amazingly slow and chews up RAM. Per
        // https://bugs.chromium.org/p/v8/issues/detail?id=6528#c4, we cache one
        // DateTimeFormat instance per calendar. Caching is lazy so we only pay for
        // calendars that are used. Note that the HelperBase class is extended to
        // create each calendar's implementation before any cache is created, so
        // each calendar gets its own separate cached formatter.
        if (typeof this.formatter === 'undefined') {
          this.formatter = new Intl.DateTimeFormat("en-US-u-ca-".concat(this.id), {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            era: 'short',
            timeZone: 'UTC'
          });
        }
        return this.formatter;
      }
    }, {
      key: "getCalendarParts",
      value: function getCalendarParts(isoString) {
        var dateTimeFormat = this.getFormatter();
        var legacyDate = new Date(isoString);
        // PlainDate's minimum date -271821-04-19 is one day beyond legacy Date's
        // minimum -271821-04-20, because of accommodating all Instants in all time
        // zones. If we have -271821-04-19, instead format -271821-04-20 in a time
        // zone that pushes the result into the previous day. This is a slow path
        // because we create a new Intl.DateTimeFormat.
        if (isoString === '-271821-04-19T00:00Z') {
          var options = dateTimeFormat.resolvedOptions();
          dateTimeFormat = new Intl.DateTimeFormat(options.locale, _objectSpread2(_objectSpread2({}, options), {}, {
            timeZone: 'Etc/GMT+1'
          }));
          legacyDate = new Date('-271821-04-20T00:00Z');
        }
        try {
          return dateTimeFormat.formatToParts(legacyDate);
        } catch (e) {
          throw new RangeError("Invalid ISO date: ".concat(isoString));
        }
      }
    }, {
      key: "isoToCalendarDate",
      value: function isoToCalendarDate(isoDate, cache) {
        var _this = this;
        var isoYear = isoDate.year,
          isoMonth = isoDate.month,
          isoDay = isoDate.day;
        var key = JSON.stringify({
          func: 'isoToCalendarDate',
          isoYear: isoYear,
          isoMonth: isoMonth,
          isoDay: isoDay,
          id: this.id
        });
        var cached = cache.get(key);
        if (cached) return cached;
        var isoString = toUtcIsoDateString({
          isoYear: isoYear,
          isoMonth: isoMonth,
          isoDay: isoDay
        });
        var parts = this.getCalendarParts(isoString);
        var result = {};
        for (var i = 0; i < parts.length; i++) {
          var _parts$i = parts[i],
            type = _parts$i.type,
            value = _parts$i.value;
          // TODO: remove this type annotation when `relatedYear` gets into TS lib types
          if (type === 'year' || type === 'relatedYear') {
            if (this.hasEra) {
              result.eraYear = +value;
            } else {
              result.year = +value;
            }
          }
          if (type === 'month') {
            var matches = /^([0-9]*)(.*?)$/.exec(value);
            if (!matches || matches.length != 3 || !matches[1] && !matches[2]) {
              throw new RangeError("Unexpected month: ".concat(value));
            }
            // If the month has no numeric part (should only see this for the Hebrew
            // calendar with newer FF / Chromium versions; see
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1751833) then set a
            // placeholder month index of `1` and rely on the derived class to
            // calculate the correct month index from the month name stored in
            // `monthExtra`.
            result.month = matches[1] ? +matches[1] : 1;
            if (result.month < 1) {
              throw new RangeError("Invalid month ".concat(value, " from ").concat(isoString, "[u-ca-").concat(this.id, "]") + ' (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)');
            }
            if (result.month > 13) {
              throw new RangeError("Invalid month ".concat(value, " from ").concat(isoString, "[u-ca-").concat(this.id, "]") + ' (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)');
            }
            // The ICU formats for the Hebrew calendar no longer support a numeric
            // month format. So we'll rely on the derived class to interpret it.
            // `monthExtra` is also used on the Chinese calendar to handle a suffix
            // "bis" indicating a leap month.
            if (matches[2]) result.monthExtra = matches[2];
          }
          if (type === 'day') result.day = +value;
          if (this.hasEra && type === 'era' && value != null && value !== '') {
            // The convention for Temporal era values is lowercase, so following
            // that convention in this prototype. Punctuation is removed, accented
            // letters are normalized, and spaces are replaced with dashes.
            // E.g.: "ERA0" => "era0", "Before R.O.C." => "before-roc", "En’ō" => "eno"
            // The call to normalize() and the replacement regex deals with era
            // names that contain non-ASCII characters like Japanese eras. Also
            // ignore extra content in parentheses like JPN era date ranges.
            result.era = value.split(' (')[0].normalize('NFD').replace(/(?:[\0-\x1F!-,\.\/:-@\[-`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u036F\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482-\u0489\u0530\u0557\u0558\u055A-\u055F\u0589-\u05CF\u05EB-\u05EE\u05F3-\u061F\u064B-\u066D\u0670\u06D4\u06D6-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u06FD\u06FE\u0700-\u070F\u0711\u0730-\u074C\u07A6-\u07B0\u07B2-\u07C9\u07EB-\u07F3\u07F6-\u07F9\u07FB-\u07FF\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u083F\u0859-\u085F\u086B-\u086F\u0888\u088F-\u089F\u08CA-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0970\u0981-\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA-\u09BC\u09BE-\u09CD\u09CF-\u09DB\u09DE\u09E2-\u09EF\u09F2-\u09FB\u09FD-\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A-\u0A58\u0A5D\u0A5F-\u0A71\u0A75-\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA-\u0ABC\u0ABE-\u0ACF\u0AD1-\u0ADF\u0AE2-\u0AF8\u0AFA-\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A-\u0B3C\u0B3E-\u0B5B\u0B5E\u0B62-\u0B70\u0B72-\u0B82\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BCF\u0BD1-\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C3E-\u0C57\u0C5B\u0C5C\u0C5E\u0C5F\u0C62-\u0C7F\u0C81-\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA-\u0CBC\u0CBE-\u0CDC\u0CDF\u0CE2-\u0CF0\u0CF3-\u0D03\u0D0D\u0D11\u0D3B\u0D3C\u0D3E-\u0D4D\u0D4F-\u0D53\u0D57-\u0D5E\u0D62-\u0D79\u0D80-\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0E00\u0E31\u0E34-\u0E3F\u0E47-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EB1\u0EB4-\u0EBC\u0EBE\u0EBF\u0EC5\u0EC7-\u0EDB\u0EE0-\u0EFF\u0F01-\u0F3F\u0F48\u0F6D-\u0F87\u0F8D-\u0FFF\u102B-\u103E\u1040-\u104F\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16F0\u16F9-\u16FF\u1712-\u171E\u1732-\u173F\u1752-\u175F\u176D\u1771-\u177F\u17B4-\u17D6\u17D8-\u17DB\u17DD-\u181F\u1879-\u187F\u1885\u1886\u18A9\u18AB-\u18AF\u18F6-\u18FF\u191F-\u194F\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19FF\u1A17-\u1A1F\u1A55-\u1AA6\u1AA8-\u1B04\u1B34-\u1B44\u1B4D-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BFF\u1C24-\u1C4C\u1C50-\u1C59\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1CFB-\u1CFF\u1DC0-\u1DFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u2182\u2185-\u2BFF\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7F\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF-\u2E2E\u2E30-\u3004\u3007-\u3030\u3036-\u303A\u303D-\u3040\u3097-\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA620-\uA629\uA62C-\uA63F\uA66F-\uA67E\uA69E\uA69F\uA6E6-\uA716\uA720\uA721\uA789\uA78A\uA7CB-\uA7CF\uA7D2\uA7D4\uA7DA-\uA7F1\uA802\uA806\uA80B\uA823-\uA83F\uA874-\uA881\uA8B4-\uA8F1\uA8F8-\uA8FA\uA8FC\uA8FF-\uA909\uA926-\uA92F\uA947-\uA95F\uA97D-\uA983\uA9B3-\uA9CE\uA9D0-\uA9DF\uA9E5\uA9F0-\uA9F9\uA9FF\uAA29-\uAA3F\uAA43\uAA4C-\uAA5F\uAA77-\uAA79\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAC3-\uAADA\uAADE\uAADF\uAAEB-\uAAF1\uAAF5-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABE3-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB1E\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFE6F\uFE75\uFEFD-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEFF\uDF20-\uDF2C\uDF41\uDF4A-\uDF4F\uDF76-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0-\uDFFF]|\uD801[\uDC9E-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6F\uDD7B\uDD8B\uDD93\uDD96\uDDA2\uDDB2\uDDBA\uDDBD-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDF7F\uDF86\uDFB1\uDFBB-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE01-\uDE0F\uDE14\uDE18\uDE36-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE5-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD24-\uDE7F\uDEAA-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF46-\uDF6F\uDF82-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC00-\uDC02\uDC38-\uDC70\uDC73\uDC74\uDC76-\uDC82\uDCB0-\uDCCF\uDCE9-\uDD02\uDD27-\uDD43\uDD45\uDD46\uDD48-\uDD4F\uDD73-\uDD75\uDD77-\uDD82\uDDB3-\uDDC0\uDDC5-\uDDD9\uDDDB\uDDDD-\uDDFF\uDE12\uDE2C-\uDE3E\uDE41-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEDF-\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A-\uDF3C\uDF3E-\uDF4F\uDF51-\uDF5C\uDF62-\uDFFF]|\uD805[\uDC35-\uDC46\uDC4B-\uDC5E\uDC62-\uDC7F\uDCB0-\uDCC3\uDCC6\uDCC8-\uDD7F\uDDAF-\uDDD7\uDDDC-\uDDFF\uDE30-\uDE43\uDE45-\uDE7F\uDEAB-\uDEB7\uDEB9-\uDEFF\uDF1B-\uDF3F\uDF47-\uDFFF]|\uD806[\uDC2C-\uDC9F\uDCE0-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD30-\uDD3E\uDD40\uDD42-\uDD9F\uDDA8\uDDA9\uDDD1-\uDDE0\uDDE2\uDDE4-\uDDFF\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE4F\uDE51-\uDE5B\uDE8A-\uDE9C\uDE9E-\uDEAF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC2F-\uDC3F\uDC41-\uDC71\uDC90-\uDCFF\uDD07\uDD0A\uDD31-\uDD45\uDD47-\uDD5F\uDD66\uDD69\uDD8A-\uDD97\uDD99-\uDEDF\uDEF3-\uDF01\uDF03\uDF11\uDF34-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC00-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80E-\uD810\uD812-\uD819\uD824-\uD82A\uD82D\uD82E\uD830-\uD834\uD836\uD83C-\uD83F\uD87B-\uD87D\uD87F\uD889-\uDBFF][\uDC00-\uDFFF]|\uD80B[\uDC00-\uDF8F\uDFF1-\uDFFF]|\uD80D[\uDC30-\uDC40\uDC47-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F-\uDE6F\uDEBF-\uDECF\uDEEE-\uDEFF\uDF30-\uDF3F\uDF44-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4F\uDF51-\uDF92\uDFA0-\uDFDF\uDFE2\uDFE4-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82B[\uDC00-\uDFEF\uDFF4\uDFFC\uDFFF]|\uD82C[\uDD23-\uDD31\uDD33-\uDD4F\uDD53\uDD54\uDD56-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC-\uDFFF]|\uD837[\uDC00-\uDEFF\uDF1F-\uDF24\uDF2B-\uDFFF]|\uD838[\uDC00-\uDC2F\uDC6E-\uDCFF\uDD2D-\uDD36\uDD3E-\uDD4D\uDD4F-\uDE8F\uDEAE-\uDEBF\uDEEC-\uDFFF]|\uD839[\uDC00-\uDCCF\uDCEC-\uDFDF\uDFE7\uDFEC\uDFEF\uDFFF]|\uD83A[\uDCC5-\uDCFF\uDD44-\uDD4A\uDD4C-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD869[\uDEE0-\uDEFF]|\uD86D[\uDF3A-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDF4F]|\uD888[\uDFB0-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, '').replace(/ /g, '-').toLowerCase();
          }
        }
        if (this.hasEra && result.eraYear === undefined) {
          // Node 12 has outdated ICU data that lacks the `relatedYear` field in the
          // output of Intl.DateTimeFormat.formatToParts.
          throw new RangeError("Intl.DateTimeFormat.formatToParts lacks relatedYear in ".concat(this.id, " calendar. Try Node 14+ or modern browsers."));
        }
        // Translate old ICU era codes "ERA0" etc. into canonical era names.
        if (this.hasEra) {
          var replacement = this.eras.find(function (e) {
            return result.era === e.genericName;
          });
          if (replacement) result.era = replacement.code;
        }
        // Translate eras that may be handled differently by Temporal vs. by Intl
        // (e.g. Japanese pre-Meiji eras). See https://github.com/tc39/proposal-temporal/issues/526.
        if (this.reviseIntlEra) {
          var _this$reviseIntlEra = this.reviseIntlEra(result, isoDate),
            era = _this$reviseIntlEra.era,
            eraYear = _this$reviseIntlEra.eraYear;
          result.era = era;
          result.eraYear = eraYear;
        }
        if (this.checkIcuBugs) this.checkIcuBugs(isoDate);
        var calendarDate = this.adjustCalendarDate(result, cache, 'constrain', true);
        if (calendarDate.year === undefined) throw new RangeError("Missing year converting ".concat(JSON.stringify(isoDate)));
        if (calendarDate.month === undefined) {
          throw new RangeError("Missing month converting ".concat(JSON.stringify(isoDate)));
        }
        if (calendarDate.day === undefined) throw new RangeError("Missing day converting ".concat(JSON.stringify(isoDate)));
        cache.set(key, calendarDate);
        // Also cache the reverse mapping
        var cacheReverse = function cacheReverse(overflow) {
          var keyReverse = JSON.stringify({
            func: 'calendarToIsoDate',
            year: calendarDate.year,
            month: calendarDate.month,
            day: calendarDate.day,
            overflow: overflow,
            id: _this.id
          });
          cache.set(keyReverse, isoDate);
        };
        ['constrain', 'reject'].forEach(cacheReverse);
        return calendarDate;
      }
    }, {
      key: "validateCalendarDate",
      value: function validateCalendarDate(calendarDate) {
        var month = calendarDate.month,
          year = calendarDate.year,
          day = calendarDate.day,
          eraYear = calendarDate.eraYear,
          monthCode = calendarDate.monthCode,
          monthExtra = calendarDate.monthExtra;
        // When there's a suffix (e.g. "5bis" for a leap month in Chinese calendar)
        // the derived class must deal with it.
        if (monthExtra !== undefined) throw new RangeError('Unexpected `monthExtra` value');
        if (year === undefined && eraYear === undefined) throw new TypeError('year or eraYear is required');
        if (month === undefined && monthCode === undefined) throw new TypeError('month or monthCode is required');
        if (day === undefined) throw new RangeError('Missing day');
        if (monthCode !== undefined) {
          if (typeof monthCode !== 'string') {
            throw new RangeError("monthCode must be a string, not ".concat(_typeof(monthCode)));
          }
          if (!/^M([01]?\d)(L?)$/.test(monthCode)) {
            throw new RangeError("Invalid monthCode: ".concat(monthCode));
          }
        }
        if (this.hasEra) {
          if (calendarDate['era'] === undefined !== (calendarDate['eraYear'] === undefined)) {
            throw new TypeError('properties era and eraYear must be provided together');
          }
        }
      }
      /**
       * Allows derived calendars to add additional fields and/or to make
       * adjustments e.g. to set the era based on the date or to revise the month
       * number in lunisolar calendars per
       * https://github.com/tc39/proposal-temporal/issues/1203.
       *
       * The base implementation fills in missing values by assuming the simplest
       * possible calendar:
       * - no eras
       * - non-lunisolar calendar (no leap months)
       * */
    }, {
      key: "adjustCalendarDate",
      value: function adjustCalendarDate(calendarDateParam) {
        var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var overflow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'constrain';
        if (this.calendarType === 'lunisolar') throw new RangeError('Override required for lunisolar calendars');
        var calendarDate = calendarDateParam;
        this.validateCalendarDate(calendarDate);
        var largestMonth = this.monthsInYear(calendarDate, cache);
        var month = calendarDate.month,
          monthCode = calendarDate.monthCode;
        var _resolveNonLunisolarM = resolveNonLunisolarMonth(calendarDate, overflow, largestMonth);
        month = _resolveNonLunisolarM.month;
        monthCode = _resolveNonLunisolarM.monthCode;
        return _objectSpread2(_objectSpread2({}, calendarDate), {}, {
          month: month,
          monthCode: monthCode
        });
      }
    }, {
      key: "regulateMonthDayNaive",
      value: function regulateMonthDayNaive(calendarDate, overflow, cache) {
        var largestMonth = this.monthsInYear(calendarDate, cache);
        var month = calendarDate.month,
          day = calendarDate.day;
        if (overflow === 'reject') {
          RejectToRange(month, 1, largestMonth);
          RejectToRange(day, 1, this.maximumMonthLength(calendarDate));
        } else {
          month = ConstrainToRange(month, 1, largestMonth);
          day = ConstrainToRange(day, 1, this.maximumMonthLength(_objectSpread2(_objectSpread2({}, calendarDate), {}, {
            month: month
          })));
        }
        return _objectSpread2(_objectSpread2({}, calendarDate), {}, {
          month: month,
          day: day
        });
      }
    }, {
      key: "calendarToIsoDate",
      value: function calendarToIsoDate(dateParam) {
        var _this2 = this;
        var overflow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'constrain';
        var cache = arguments.length > 2 ? arguments[2] : undefined;
        var originalDate = dateParam;
        // First, normalize the calendar date to ensure that (year, month, day)
        // are all present, converting monthCode and eraYear if needed.
        var date = this.adjustCalendarDate(dateParam, cache, overflow, false);
        // Fix obviously out-of-bounds values. Values that are valid generally, but
        // not in this particular year, may not be caught here for some calendars.
        // If so, these will be handled lower below.
        date = this.regulateMonthDayNaive(date, overflow, cache);
        var _date = date,
          year = _date.year,
          month = _date.month,
          day = _date.day;
        var key = JSON.stringify({
          func: 'calendarToIsoDate',
          year: year,
          month: month,
          day: day,
          overflow: overflow,
          id: this.id
        });
        var cached = cache.get(key);
        if (cached) return cached;
        // If YMD are present in the input but the input has been constrained
        // already, then cache both the original value and the constrained value.
        var keyOriginal;
        if (originalDate.year !== undefined && originalDate.month !== undefined && originalDate.day !== undefined && (originalDate.year !== date.year || originalDate.month !== date.month || originalDate.day !== date.day)) {
          keyOriginal = JSON.stringify({
            func: 'calendarToIsoDate',
            year: originalDate.year,
            month: originalDate.month,
            day: originalDate.day,
            overflow: overflow,
            id: this.id
          });
          cached = cache.get(keyOriginal);
          if (cached) return cached;
        }
        // First, try to roughly guess the result
        var isoEstimate = this.estimateIsoDate({
          year: year,
          month: month,
          day: day
        });
        var calculateSameMonthResult = function calculateSameMonthResult(diffDays) {
          // If the estimate is in the same year & month as the target, then we can
          // calculate the result exactly and short-circuit any additional logic.
          // This optimization assumes that months are continuous. It would break if
          // a calendar skipped days, like the Julian->Gregorian switchover. But
          // current ICU calendars only skip days (japanese/roc/buddhist) because of
          // a bug (https://bugs.chromium.org/p/chromium/issues/detail?id=1173158)
          // that's currently worked around by a custom calendarToIsoDate
          // implementation in those calendars. So this optimization should be safe
          // for all ICU calendars.
          var testIsoEstimate = _this2.addDaysIso(isoEstimate, diffDays);
          if (date.day > _this2.minimumMonthLength(date)) {
            // There's a chance that the calendar date is out of range. Throw or
            // constrain if so.
            var testCalendarDate = _this2.isoToCalendarDate(testIsoEstimate, cache);
            while (testCalendarDate.month !== month || testCalendarDate.year !== year) {
              if (overflow === 'reject') {
                throw new RangeError("day ".concat(day, " does not exist in month ").concat(month, " of year ").concat(year));
              }
              // Back up a day at a time until we're not hanging over the month end
              testIsoEstimate = _this2.addDaysIso(testIsoEstimate, -1);
              testCalendarDate = _this2.isoToCalendarDate(testIsoEstimate, cache);
            }
          }
          return testIsoEstimate;
        };
        var sign = 0;
        var roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
        var diff = simpleDateDiff(date, roundtripEstimate);
        if (diff.years !== 0 || diff.months !== 0 || diff.days !== 0) {
          var diffTotalDaysEstimate = diff.years * 365 + diff.months * 30 + diff.days;
          isoEstimate = this.addDaysIso(isoEstimate, diffTotalDaysEstimate);
          roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
          diff = simpleDateDiff(date, roundtripEstimate);
          if (diff.years === 0 && diff.months === 0) {
            isoEstimate = calculateSameMonthResult(diff.days);
          } else {
            sign = this.compareCalendarDates(date, roundtripEstimate);
          }
        }
        // If the initial guess is not in the same month, then bisect the
        // distance to the target, starting with 8 days per step.
        var increment = 8;
        while (sign) {
          isoEstimate = this.addDaysIso(isoEstimate, sign * increment);
          var oldRoundtripEstimate = roundtripEstimate;
          roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
          var oldSign = sign;
          sign = this.compareCalendarDates(date, roundtripEstimate);
          if (sign) {
            diff = simpleDateDiff(date, roundtripEstimate);
            if (diff.years === 0 && diff.months === 0) {
              isoEstimate = calculateSameMonthResult(diff.days);
              // Signal the loop condition that there's a match.
              sign = 0;
            } else if (oldSign && sign !== oldSign) {
              if (increment > 1) {
                // If the estimate overshot the target, try again with a smaller increment
                // in the reverse direction.
                increment /= 2;
              } else {
                // Increment is 1, and neither the previous estimate nor the new
                // estimate is correct. The only way that can happen is if the
                // original date was an invalid value that will be constrained or
                // rejected here.
                if (overflow === 'reject') {
                  throw new RangeError("Can't find ISO date from calendar date: ".concat(JSON.stringify(_objectSpread2({}, originalDate))));
                } else {
                  // To constrain, pick the earliest value
                  var order = this.compareCalendarDates(roundtripEstimate, oldRoundtripEstimate);
                  // If current value is larger, then back up to the previous value.
                  if (order > 0) isoEstimate = this.addDaysIso(isoEstimate, -1);
                  sign = 0;
                }
              }
            }
          }
        }
        cache.set(key, isoEstimate);
        if (keyOriginal) cache.set(keyOriginal, isoEstimate);
        if (date.year === undefined || date.month === undefined || date.day === undefined || date.monthCode === undefined || this.hasEra && (date.era === undefined || date.eraYear === undefined)) {
          throw new RangeError('Unexpected missing property');
        }
        return isoEstimate;
      }
    }, {
      key: "compareCalendarDates",
      value: function compareCalendarDates(date1, date2) {
        if (date1.year !== date2.year) return ComparisonResult(date1.year - date2.year);
        if (date1.month !== date2.month) return ComparisonResult(date1.month - date2.month);
        if (date1.day !== date2.day) return ComparisonResult(date1.day - date2.day);
        return 0;
      }
      /** Ensure that a calendar date actually exists. If not, return the closest earlier date. */
    }, {
      key: "regulateDate",
      value: function regulateDate(calendarDate) {
        var overflow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'constrain';
        var cache = arguments.length > 2 ? arguments[2] : undefined;
        var isoDate = this.calendarToIsoDate(calendarDate, overflow, cache);
        return this.isoToCalendarDate(isoDate, cache);
      }
    }, {
      key: "addDaysIso",
      value: function addDaysIso(isoDate, days) {
        var added = BalanceISODate(isoDate.year, isoDate.month, isoDate.day + days);
        return added;
      }
    }, {
      key: "addDaysCalendar",
      value: function addDaysCalendar(calendarDate, days, cache) {
        var isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
        var addedIso = this.addDaysIso(isoDate, days);
        var addedCalendar = this.isoToCalendarDate(addedIso, cache);
        return addedCalendar;
      }
    }, {
      key: "addMonthsCalendar",
      value: function addMonthsCalendar(calendarDateParam, months, overflow, cache) {
        var calendarDate = calendarDateParam;
        var _calendarDate = calendarDate,
          day = _calendarDate.day;
        for (var i = 0, absMonths = Math.abs(months); i < absMonths; i++) {
          var _calendarDate2 = calendarDate,
            month = _calendarDate2.month;
          var oldCalendarDate = calendarDate;
          var days = months < 0 ? -Math.max(day, this.daysInPreviousMonth(calendarDate, cache)) : this.daysInMonth(calendarDate, cache);
          var isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
          var addedIso = this.addDaysIso(isoDate, days);
          calendarDate = this.isoToCalendarDate(addedIso, cache);
          // Normally, we can advance one month by adding the number of days in the
          // current month. However, if we're at the end of the current month and
          // the next month has fewer days, then we rolled over to the after-next
          // month. Below we detect this condition and back up until we're back in
          // the desired month.
          if (months > 0) {
            var monthsInOldYear = this.monthsInYear(oldCalendarDate, cache);
            while (calendarDate.month - 1 !== month % monthsInOldYear) {
              addedIso = this.addDaysIso(addedIso, -1);
              calendarDate = this.isoToCalendarDate(addedIso, cache);
            }
          }
          if (calendarDate.day !== day) {
            // try to retain the original day-of-month, if possible
            calendarDate = this.regulateDate(_objectSpread2(_objectSpread2({}, calendarDate), {}, {
              day: day
            }), 'constrain', cache);
          }
        }
        if (overflow === 'reject' && calendarDate.day !== day) {
          throw new RangeError("Day ".concat(day, " does not exist in resulting calendar month"));
        }
        return calendarDate;
      }
    }, {
      key: "addCalendar",
      value: function addCalendar(calendarDate, _ref4, overflow, cache) {
        var _ref4$years = _ref4.years,
          years = _ref4$years === void 0 ? 0 : _ref4$years,
          _ref4$months = _ref4.months,
          months = _ref4$months === void 0 ? 0 : _ref4$months,
          _ref4$weeks = _ref4.weeks,
          weeks = _ref4$weeks === void 0 ? 0 : _ref4$weeks,
          _ref4$days = _ref4.days,
          days = _ref4$days === void 0 ? 0 : _ref4$days;
        var year = calendarDate.year,
          day = calendarDate.day,
          monthCode = calendarDate.monthCode;
        var addedYears = this.adjustCalendarDate({
          year: year + years,
          monthCode: monthCode,
          day: day
        }, cache);
        var addedMonths = this.addMonthsCalendar(addedYears, months, overflow, cache);
        var initialDays = days + weeks * 7;
        var addedDays = this.addDaysCalendar(addedMonths, initialDays, cache);
        return addedDays;
      }
    }, {
      key: "untilCalendar",
      value: function untilCalendar(calendarOne, calendarTwo, largestUnit, cache) {
        var days = 0;
        var weeks = 0;
        var months = 0;
        var years = 0;
        switch (largestUnit) {
          case 'day':
            days = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
            break;
          case 'week':
            {
              var totalDays = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
              days = totalDays % 7;
              weeks = (totalDays - days) / 7;
              break;
            }
          case 'month':
          case 'year':
            {
              var sign = this.compareCalendarDates(calendarTwo, calendarOne);
              if (!sign) {
                return {
                  years: 0,
                  months: 0,
                  weeks: 0,
                  days: 0
                };
              }
              var diffYears = calendarTwo.year - calendarOne.year;
              var diffDays = calendarTwo.day - calendarOne.day;
              if (largestUnit === 'year' && diffYears) {
                var diffInYearSign = 0;
                if (calendarTwo.monthCode > calendarOne.monthCode) diffInYearSign = 1;
                if (calendarTwo.monthCode < calendarOne.monthCode) diffInYearSign = -1;
                if (!diffInYearSign) diffInYearSign = Math.sign(diffDays);
                var isOneFurtherInYear = diffInYearSign * sign < 0;
                years = isOneFurtherInYear ? diffYears - sign : diffYears;
              }
              var yearsAdded = years ? this.addCalendar(calendarOne, {
                years: years
              }, 'constrain', cache) : calendarOne;
              // Now we have less than one year remaining. Add one month at a time
              // until we go over the target, then back up one month and calculate
              // remaining days and weeks.
              var current;
              var next = yearsAdded;
              do {
                months += sign;
                current = next;
                next = this.addMonthsCalendar(current, sign, 'constrain', cache);
                if (next.day !== calendarOne.day) {
                  // In case the day was constrained down, try to un-constrain it
                  next = this.regulateDate(_objectSpread2(_objectSpread2({}, next), {}, {
                    day: calendarOne.day
                  }), 'constrain', cache);
                }
              } while (this.compareCalendarDates(calendarTwo, next) * sign >= 0);
              months -= sign; // correct for loop above which overshoots by 1
              var remainingDays = this.calendarDaysUntil(current, calendarTwo, cache);
              days = remainingDays;
              break;
            }
        }
        return {
          years: years,
          months: months,
          weeks: weeks,
          days: days
        };
      }
    }, {
      key: "daysInMonth",
      value: function daysInMonth(calendarDate, cache) {
        // Add enough days to roll over to the next month. One we're in the next
        // month, we can calculate the length of the current month. NOTE: This
        // algorithm assumes that months are continuous. It would break if a
        // calendar skipped days, like the Julian->Gregorian switchover. But current
        // ICU calendars only skip days (japanese/roc/buddhist) because of a bug
        // (https://bugs.chromium.org/p/chromium/issues/detail?id=1173158) that's
        // currently worked around by a custom calendarToIsoDate implementation in
        // those calendars. So this code should be safe for all ICU calendars.
        var day = calendarDate.day;
        var max = this.maximumMonthLength(calendarDate);
        var min = this.minimumMonthLength(calendarDate);
        // easiest case: we already know the month length if min and max are the same.
        if (min === max) return min;
        // Add enough days to get into the next month, without skipping it
        var increment = day <= max - min ? max : min;
        var isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
        var addedIsoDate = this.addDaysIso(isoDate, increment);
        var addedCalendarDate = this.isoToCalendarDate(addedIsoDate, cache);
        // Now back up to the last day of the original month
        var endOfMonthIso = this.addDaysIso(addedIsoDate, -addedCalendarDate.day);
        var endOfMonthCalendar = this.isoToCalendarDate(endOfMonthIso, cache);
        return endOfMonthCalendar.day;
      }
    }, {
      key: "daysInPreviousMonth",
      value: function daysInPreviousMonth(calendarDate, cache) {
        var day = calendarDate.day,
          month = calendarDate.month,
          year = calendarDate.year;
        // Check to see if we already know the month length, and return it if so
        var previousMonthYear = month > 1 ? year : year - 1;
        var previousMonthDate = {
          year: previousMonthYear,
          month: month,
          day: 1
        };
        var previousMonth = month > 1 ? month - 1 : this.monthsInYear(previousMonthDate, cache);
        previousMonthDate = _objectSpread2(_objectSpread2({}, previousMonthDate), {}, {
          month: previousMonth
        });
        var min = this.minimumMonthLength(previousMonthDate);
        var max = this.maximumMonthLength(previousMonthDate);
        if (min === max) return max;
        var isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
        var lastDayOfPreviousMonthIso = this.addDaysIso(isoDate, -day);
        var lastDayOfPreviousMonthCalendar = this.isoToCalendarDate(lastDayOfPreviousMonthIso, cache);
        return lastDayOfPreviousMonthCalendar.day;
      }
    }, {
      key: "startOfCalendarYear",
      value: function startOfCalendarYear(calendarDate) {
        return {
          year: calendarDate.year,
          month: 1,
          monthCode: 'M01',
          day: 1
        };
      }
    }, {
      key: "startOfCalendarMonth",
      value: function startOfCalendarMonth(calendarDate) {
        return {
          year: calendarDate.year,
          month: calendarDate.month,
          day: 1
        };
      }
    }, {
      key: "calendarDaysUntil",
      value: function calendarDaysUntil(calendarOne, calendarTwo, cache) {
        var oneIso = this.calendarToIsoDate(calendarOne, 'constrain', cache);
        var twoIso = this.calendarToIsoDate(calendarTwo, 'constrain', cache);
        return ISODateToEpochDays(twoIso.year, twoIso.month - 1, twoIso.day) - ISODateToEpochDays(oneIso.year, oneIso.month - 1, oneIso.day);
      }
      // Override this to shortcut the search space if certain month codes only
      // occur long in the past
    }, {
      key: "monthDaySearchStartYear",
      value: function monthDaySearchStartYear(monthCode, day) {
        return 1972;
      }
    }, {
      key: "monthDayFromFields",
      value: function monthDayFromFields(fields, overflow, cache) {
        var era = fields.era,
          eraYear = fields.eraYear,
          year = fields.year,
          month = fields.month,
          monthCode = fields.monthCode,
          day = fields.day;
        if (month !== undefined && year === undefined && (!this.hasEra || era === undefined || eraYear === undefined)) {
          throw new TypeError('when month is present, year (or era and eraYear) are required');
        }
        if (monthCode === undefined || year !== undefined || this.hasEra && eraYear !== undefined) {
          // Apply overflow behaviour to year/month/day, to get correct monthCode/day
          var _this$isoToCalendarDa = this.isoToCalendarDate(this.calendarToIsoDate(fields, overflow, cache), cache);
          monthCode = _this$isoToCalendarDa.monthCode;
          day = _this$isoToCalendarDa.day;
        }
        var isoYear, isoMonth, isoDay;
        var closestCalendar, closestIso;
        // Look backwards starting from one of the calendar years spanning ISO year
        // 1972, up to 20 calendar years prior, to find a year that has this month
        // and day. Normal months and days will match immediately, but for leap days
        // and leap months we may have to look for a while. For searches longer than
        // 20 years, override the start date in monthDaySearchStartYear.
        var startDateIso = {
          year: this.monthDaySearchStartYear(monthCode, day),
          month: 12,
          day: 31
        };
        var calendarOfStartDateIso = this.isoToCalendarDate(startDateIso, cache);
        // Note: relies on lexicographical ordering of monthCodes
        var calendarYear = calendarOfStartDateIso.monthCode > monthCode || calendarOfStartDateIso.monthCode === monthCode && calendarOfStartDateIso.day >= day ? calendarOfStartDateIso.year : calendarOfStartDateIso.year - 1;
        for (var i = 0; i < 20; i++) {
          var testCalendarDate = this.adjustCalendarDate({
            day: day,
            monthCode: monthCode,
            year: calendarYear - i
          }, cache);
          var isoDate = this.calendarToIsoDate(testCalendarDate, 'constrain', cache);
          var roundTripCalendarDate = this.isoToCalendarDate(isoDate, cache);
          isoYear = isoDate.year;
          isoMonth = isoDate.month;
          isoDay = isoDate.day;
          if (roundTripCalendarDate.monthCode === monthCode && roundTripCalendarDate.day === day) {
            return {
              month: isoMonth,
              day: isoDay,
              year: isoYear
            };
          } else if (overflow === 'constrain') {
            // If the requested day is never present in any instance of this month
            // code, and the round trip date is an instance of this month code with
            // the most possible days, we are as close as we can get.
            var maxDayForMonthCode = this.maxLengthOfMonthCodeInAnyYear(roundTripCalendarDate.monthCode);
            if (roundTripCalendarDate.monthCode === monthCode && roundTripCalendarDate.day === maxDayForMonthCode && day > maxDayForMonthCode) {
              return {
                month: isoMonth,
                day: isoDay,
                year: isoYear
              };
            }
            // non-ISO constrain algorithm tries to find the closest date in a matching month
            if (closestCalendar === undefined || roundTripCalendarDate.monthCode === closestCalendar.monthCode && roundTripCalendarDate.day > closestCalendar.day) {
              closestCalendar = roundTripCalendarDate;
              closestIso = isoDate;
            }
          }
        }
        if (overflow === 'constrain' && closestIso !== undefined) return closestIso;
        throw new RangeError("No recent ".concat(this.id, " year with monthCode ").concat(monthCode, " and day ").concat(day));
      }
    }, {
      key: "getFirstDayOfWeek",
      value: function getFirstDayOfWeek() {
        return undefined;
      }
    }, {
      key: "getMinimalDaysInFirstWeek",
      value: function getMinimalDaysInFirstWeek() {
        return undefined;
      }
    }]);
    return HelperBase;
  }();
  var HebrewHelper = /*#__PURE__*/function (_HelperBase) {
    _inherits(HebrewHelper, _HelperBase);
    var _super = _createSuper(HebrewHelper);
    function HebrewHelper() {
      var _this3;
      _classCallCheck(this, HebrewHelper);
      _this3 = _super.apply(this, arguments);
      _this3.id = 'hebrew';
      _this3.calendarType = 'lunisolar';
      _this3.months = {
        Tishri: {
          leap: 1,
          regular: 1,
          monthCode: 'M01',
          days: 30
        },
        Heshvan: {
          leap: 2,
          regular: 2,
          monthCode: 'M02',
          days: {
            min: 29,
            max: 30
          }
        },
        Kislev: {
          leap: 3,
          regular: 3,
          monthCode: 'M03',
          days: {
            min: 29,
            max: 30
          }
        },
        Tevet: {
          leap: 4,
          regular: 4,
          monthCode: 'M04',
          days: 29
        },
        Shevat: {
          leap: 5,
          regular: 5,
          monthCode: 'M05',
          days: 30
        },
        Adar: {
          leap: undefined,
          regular: 6,
          monthCode: 'M06',
          days: 29
        },
        'Adar I': {
          leap: 6,
          regular: undefined,
          monthCode: 'M05L',
          days: 30
        },
        'Adar II': {
          leap: 7,
          regular: undefined,
          monthCode: 'M06',
          days: 29
        },
        Nisan: {
          leap: 8,
          regular: 7,
          monthCode: 'M07',
          days: 30
        },
        Iyar: {
          leap: 9,
          regular: 8,
          monthCode: 'M08',
          days: 29
        },
        Sivan: {
          leap: 10,
          regular: 9,
          monthCode: 'M09',
          days: 30
        },
        Tamuz: {
          leap: 11,
          regular: 10,
          monthCode: 'M10',
          days: 29
        },
        Av: {
          leap: 12,
          regular: 11,
          monthCode: 'M11',
          days: 30
        },
        Elul: {
          leap: 13,
          regular: 12,
          monthCode: 'M12',
          days: 29
        }
      };
      return _this3;
    }
    _createClass(HebrewHelper, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate) {
        var year = calendarDate.year;
        // FYI: In addition to adding a month in leap years, the Hebrew calendar
        // also has per-year changes to the number of days of Heshvan and Kislev.
        // Given that these can be calculated by counting the number of days in
        // those months, I assume that these DO NOT need to be exposed as
        // Hebrew-only prototype fields or methods.
        return (7 * year + 1) % 19 < 7;
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear(calendarDate) {
        return this.inLeapYear(calendarDate) ? 13 : 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength(calendarDate) {
        return this.minMaxMonthLength(calendarDate, 'min');
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength(calendarDate) {
        return this.minMaxMonthLength(calendarDate, 'max');
      }
    }, {
      key: "minMaxMonthLength",
      value: function minMaxMonthLength(calendarDate, minOrMax) {
        var month = calendarDate.month,
          year = calendarDate.year;
        var monthCode = this.getMonthCode(year, month);
        var monthInfo = Object.entries(this.months).find(function (m) {
          return m[1].monthCode === monthCode;
        });
        if (monthInfo === undefined) throw new RangeError("unmatched Hebrew month: ".concat(month));
        var daysInMonth = monthInfo[1].days;
        return typeof daysInMonth === 'number' ? daysInMonth : daysInMonth[minOrMax];
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear(monthCode) {
        return ['M04', 'M06', 'M08', 'M10', 'M12'].includes(monthCode) ? 29 : 30;
      }
      /** Take a guess at what ISO date a particular calendar date corresponds to */
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDate) {
        var year = calendarDate.year;
        return {
          year: year - 3760,
          month: 1,
          day: 1
        };
      }
    }, {
      key: "getMonthCode",
      value: function getMonthCode(year, month) {
        if (this.inLeapYear({
          year: year
        })) {
          return month === 6 ? buildMonthCode(5, true) : buildMonthCode(month < 6 ? month : month - 1);
        } else {
          return buildMonthCode(month);
        }
      }
    }, {
      key: "adjustCalendarDate",
      value: function adjustCalendarDate(calendarDate, cache) {
        var overflow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'constrain';
        var fromLegacyDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var year = calendarDate.year,
          month = calendarDate.month,
          monthCode = calendarDate.monthCode,
          day = calendarDate.day,
          monthExtra = calendarDate.monthExtra;
        if (year === undefined) throw new TypeError('Missing property: year');
        if (fromLegacyDate) {
          // In Pre Node-14 V8, DateTimeFormat.formatToParts `month: 'numeric'`
          // output returns the numeric equivalent of `month` as a string, meaning
          // that `'6'` in a leap year is Adar I, while `'6'` in a non-leap year
          // means Adar. In this case, `month` will already be correct and no action
          // is needed. However, in Node 14 and later formatToParts returns the name
          // of the Hebrew month (e.g. "Tevet"), so we'll need to look up the
          // correct `month` using the string name as a key.
          if (monthExtra) {
            var monthInfo = this.months[monthExtra];
            if (!monthInfo) throw new RangeError("Unrecognized month from formatToParts: ".concat(monthExtra));
            month = this.inLeapYear({
              year: year
            }) ? monthInfo.leap : monthInfo.regular;
          }
          // Because we're getting data from legacy Date, then `month` will always be present
          monthCode = this.getMonthCode(year, month);
          return {
            year: year,
            month: month,
            day: day,
            monthCode: monthCode
          };
        } else {
          // When called without input coming from legacy Date output, simply ensure
          // that all fields are present.
          this.validateCalendarDate(calendarDate);
          if (month === undefined) {
            assertExists(monthCode);
            if (monthCode.endsWith('L')) {
              if (monthCode !== 'M05L') {
                throw new RangeError("Hebrew leap month must have monthCode M05L, not ".concat(monthCode));
              }
              month = 6;
              if (!this.inLeapYear({
                year: year
              })) {
                if (overflow === 'reject') {
                  throw new RangeError("Hebrew monthCode M05L is invalid in year ".concat(year, " which is not a leap year"));
                } else {
                  // constrain to same day of next month (Adar)
                  month = 6;
                  monthCode = 'M06';
                }
              }
            } else {
              month = nonLeapMonthCodeNumberPart(monthCode);
              // if leap month is before this one, the month index is one more than the month code
              if (this.inLeapYear({
                year: year
              }) && month >= 6) month++;
              var largestMonth = this.monthsInYear({
                year: year
              });
              if (month < 1 || month > largestMonth) throw new RangeError("Invalid monthCode: ".concat(monthCode));
            }
          } else {
            if (overflow === 'reject') {
              RejectToRange(month, 1, this.monthsInYear({
                year: year
              }));
              RejectToRange(day, 1, this.maximumMonthLength({
                year: year,
                month: month
              }));
            } else {
              month = ConstrainToRange(month, 1, this.monthsInYear({
                year: year
              }));
              day = ConstrainToRange(day, 1, this.maximumMonthLength({
                year: year,
                month: month
              }));
            }
            if (monthCode === undefined) {
              monthCode = this.getMonthCode(year, month);
            } else {
              var calculatedMonthCode = this.getMonthCode(year, month);
              if (calculatedMonthCode !== monthCode) {
                throw new RangeError("monthCode ".concat(monthCode, " doesn't correspond to month ").concat(month, " in Hebrew year ").concat(year));
              }
            }
          }
          return _objectSpread2(_objectSpread2({}, calendarDate), {}, {
            day: day,
            month: month,
            monthCode: monthCode,
            year: year
          });
        }
      }
    }]);
    return HebrewHelper;
  }(HelperBase);
  /**
   * For Temporal purposes, the Islamic calendar is simple because it's always the
   * same 12 months in the same order.
   */
  var IslamicBaseHelper = /*#__PURE__*/function (_HelperBase2) {
    _inherits(IslamicBaseHelper, _HelperBase2);
    var _super2 = _createSuper(IslamicBaseHelper);
    function IslamicBaseHelper() {
      var _this4;
      _classCallCheck(this, IslamicBaseHelper);
      _this4 = _super2.apply(this, arguments);
      _this4.calendarType = 'lunar';
      _this4.DAYS_PER_ISLAMIC_YEAR = 354 + 11 / 30;
      _this4.DAYS_PER_ISO_YEAR = 365.2425;
      return _this4;
    }
    _createClass(IslamicBaseHelper, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate, cache) {
        var startOfYearCalendar = {
          year: calendarDate.year,
          month: 1,
          monthCode: 'M01',
          day: 1
        };
        var startOfNextYearCalendar = {
          year: calendarDate.year + 1,
          month: 1,
          monthCode: 'M01',
          day: 1
        };
        var result = this.calendarDaysUntil(startOfYearCalendar, startOfNextYearCalendar, cache);
        return result === 355;
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear( /* calendarYear, cache */
      ) {
        return 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength( /* calendarDate */
      ) {
        return 29;
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength( /* calendarDate */
      ) {
        return 30;
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear( /* monthCode */
      ) {
        return 30;
      }
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDate) {
        var _this$adjustCalendarD = this.adjustCalendarDate(calendarDate),
          year = _this$adjustCalendarD.year;
        return {
          year: Math.floor(year * this.DAYS_PER_ISLAMIC_YEAR / this.DAYS_PER_ISO_YEAR) + 622,
          month: 1,
          day: 1
        };
      }
    }]);
    return IslamicBaseHelper;
  }(HelperBase); // There are 6 Islamic calendars with the same implementation in this polyfill.
  // They vary only in their ID. They do emit different output from the underlying
  // Intl implementation, but our code for each of them is identical.
  var IslamicHelper = /*#__PURE__*/function (_IslamicBaseHelper) {
    _inherits(IslamicHelper, _IslamicBaseHelper);
    var _super3 = _createSuper(IslamicHelper);
    function IslamicHelper() {
      var _this5;
      _classCallCheck(this, IslamicHelper);
      _this5 = _super3.apply(this, arguments);
      _this5.id = 'islamic';
      return _this5;
    }
    return _createClass(IslamicHelper);
  }(IslamicBaseHelper);
  var IslamicUmalquraHelper = /*#__PURE__*/function (_IslamicBaseHelper2) {
    _inherits(IslamicUmalquraHelper, _IslamicBaseHelper2);
    var _super4 = _createSuper(IslamicUmalquraHelper);
    function IslamicUmalquraHelper() {
      var _this6;
      _classCallCheck(this, IslamicUmalquraHelper);
      _this6 = _super4.apply(this, arguments);
      _this6.id = 'islamic-umalqura';
      return _this6;
    }
    return _createClass(IslamicUmalquraHelper);
  }(IslamicBaseHelper);
  var IslamicTblaHelper = /*#__PURE__*/function (_IslamicBaseHelper3) {
    _inherits(IslamicTblaHelper, _IslamicBaseHelper3);
    var _super5 = _createSuper(IslamicTblaHelper);
    function IslamicTblaHelper() {
      var _this7;
      _classCallCheck(this, IslamicTblaHelper);
      _this7 = _super5.apply(this, arguments);
      _this7.id = 'islamic-tbla';
      return _this7;
    }
    return _createClass(IslamicTblaHelper);
  }(IslamicBaseHelper);
  var IslamicCivilHelper = /*#__PURE__*/function (_IslamicBaseHelper4) {
    _inherits(IslamicCivilHelper, _IslamicBaseHelper4);
    var _super6 = _createSuper(IslamicCivilHelper);
    function IslamicCivilHelper() {
      var _this8;
      _classCallCheck(this, IslamicCivilHelper);
      _this8 = _super6.apply(this, arguments);
      _this8.id = 'islamic-civil';
      return _this8;
    }
    return _createClass(IslamicCivilHelper);
  }(IslamicBaseHelper);
  var IslamicRgsaHelper = /*#__PURE__*/function (_IslamicBaseHelper5) {
    _inherits(IslamicRgsaHelper, _IslamicBaseHelper5);
    var _super7 = _createSuper(IslamicRgsaHelper);
    function IslamicRgsaHelper() {
      var _this9;
      _classCallCheck(this, IslamicRgsaHelper);
      _this9 = _super7.apply(this, arguments);
      _this9.id = 'islamic-rgsa';
      return _this9;
    }
    return _createClass(IslamicRgsaHelper);
  }(IslamicBaseHelper);
  var IslamicCcHelper = /*#__PURE__*/function (_IslamicBaseHelper6) {
    _inherits(IslamicCcHelper, _IslamicBaseHelper6);
    var _super8 = _createSuper(IslamicCcHelper);
    function IslamicCcHelper() {
      var _this10;
      _classCallCheck(this, IslamicCcHelper);
      _this10 = _super8.apply(this, arguments);
      _this10.id = 'islamicc';
      return _this10;
    }
    return _createClass(IslamicCcHelper);
  }(IslamicBaseHelper);
  var PersianHelper = /*#__PURE__*/function (_HelperBase3) {
    _inherits(PersianHelper, _HelperBase3);
    var _super9 = _createSuper(PersianHelper);
    function PersianHelper() {
      var _this11;
      _classCallCheck(this, PersianHelper);
      _this11 = _super9.apply(this, arguments);
      _this11.id = 'persian';
      _this11.calendarType = 'solar';
      return _this11;
    }
    _createClass(PersianHelper, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate, cache) {
        // If the last month has 30 days, it's a leap year.
        return this.daysInMonth({
          year: calendarDate.year,
          month: 12,
          day: 1
        }, cache) === 30;
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear( /* calendarYear, cache */
      ) {
        return 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength(calendarDate) {
        var month = calendarDate.month;
        if (month === 12) return 29;
        return month <= 6 ? 31 : 30;
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength(calendarDate) {
        var month = calendarDate.month;
        if (month === 12) return 30;
        return month <= 6 ? 31 : 30;
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear(monthCode) {
        var month = nonLeapMonthCodeNumberPart(monthCode);
        return month <= 6 ? 31 : 30;
      }
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDate) {
        var _this$adjustCalendarD2 = this.adjustCalendarDate(calendarDate),
          year = _this$adjustCalendarD2.year;
        return {
          year: year + 621,
          month: 1,
          day: 1
        };
      }
    }]);
    return PersianHelper;
  }(HelperBase);
  var IndianHelper = /*#__PURE__*/function (_HelperBase4) {
    _inherits(IndianHelper, _HelperBase4);
    var _super10 = _createSuper(IndianHelper);
    function IndianHelper() {
      var _this12;
      _classCallCheck(this, IndianHelper);
      _this12 = _super10.apply(this, arguments);
      _this12.id = 'indian';
      _this12.calendarType = 'solar';
      // Indian months always start at the same well-known Gregorian month and
      // day. So this conversion is easy and fast. See
      // https://en.wikipedia.org/wiki/Indian_national_calendar
      _this12.months = {
        1: {
          length: 30,
          month: 3,
          day: 22,
          leap: {
            length: 31,
            month: 3,
            day: 21
          }
        },
        2: {
          length: 31,
          month: 4,
          day: 21
        },
        3: {
          length: 31,
          month: 5,
          day: 22
        },
        4: {
          length: 31,
          month: 6,
          day: 22
        },
        5: {
          length: 31,
          month: 7,
          day: 23
        },
        6: {
          length: 31,
          month: 8,
          day: 23
        },
        7: {
          length: 30,
          month: 9,
          day: 23
        },
        8: {
          length: 30,
          month: 10,
          day: 23
        },
        9: {
          length: 30,
          month: 11,
          day: 22
        },
        10: {
          length: 30,
          month: 12,
          day: 22
        },
        11: {
          length: 30,
          month: 1,
          nextYear: true,
          day: 21
        },
        12: {
          length: 30,
          month: 2,
          nextYear: true,
          day: 20
        }
      };
      // https://bugs.chromium.org/p/v8/issues/detail?id=10529 causes Intl's Indian
      // calendar output to fail for all dates before 0001-01-01 ISO.  For example,
      // in Node 12 0000-01-01 is calculated as 6146/12/-583 instead of 10/11/-79 as
      // expected.
      _this12.vulnerableToBceBug = new Date('0000-01-01T00:00Z').toLocaleDateString('en-US-u-ca-indian', {
        timeZone: 'UTC'
      }) !== '10/11/-79 Saka';
      return _this12;
    }
    _createClass(IndianHelper, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate) {
        // From https://en.wikipedia.org/wiki/Indian_national_calendar:
        // Years are counted in the Saka era, which starts its year 0 in the year 78
        // of the Common Era. To determine leap years, add 78 to the Saka year – if
        // the result is a leap year in the Gregorian calendar, then the Saka year
        // is a leap year as well.
        return isGregorianLeapYear(calendarDate.year + 78);
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear( /* calendarYear, cache */
      ) {
        return 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength(calendarDate) {
        return this.getMonthInfo(calendarDate).length;
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength(calendarDate) {
        return this.getMonthInfo(calendarDate).length;
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear(monthCode) {
        var _monthInfo$leap;
        var month = nonLeapMonthCodeNumberPart(monthCode);
        var monthInfo = this.months[month];
        monthInfo = (_monthInfo$leap = monthInfo.leap) !== null && _monthInfo$leap !== void 0 ? _monthInfo$leap : monthInfo;
        return monthInfo.length;
      }
    }, {
      key: "getMonthInfo",
      value: function getMonthInfo(calendarDate) {
        var month = calendarDate.month;
        var monthInfo = this.months[month];
        if (monthInfo === undefined) throw new RangeError("Invalid month: ".concat(month));
        if (this.inLeapYear(calendarDate) && monthInfo.leap) monthInfo = monthInfo.leap;
        return monthInfo;
      }
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDateParam) {
        // FYI, this "estimate" is always the exact ISO date, which makes the Indian
        // calendar fast!
        var calendarDate = this.adjustCalendarDate(calendarDateParam);
        var monthInfo = this.getMonthInfo(calendarDate);
        var isoYear = calendarDate.year + 78 + (monthInfo.nextYear ? 1 : 0);
        var isoMonth = monthInfo.month;
        var isoDay = monthInfo.day;
        var isoDate = BalanceISODate(isoYear, isoMonth, isoDay + calendarDate.day - 1);
        return isoDate;
      }
    }, {
      key: "checkIcuBugs",
      value: function checkIcuBugs(isoDate) {
        if (this.vulnerableToBceBug && isoDate.year < 1) {
          throw new RangeError("calendar '".concat(this.id, "' is broken for ISO dates before 0001-01-01") + ' (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)');
        }
      }
    }]);
    return IndianHelper;
  }(HelperBase);
  /**
   * This function adds additional metadata that makes it easier to work with
   * eras. Note that it mutates and normalizes the original era objects, which is
   * OK because this is non-observable, internal-only metadata.
   *
   * The result is an array of eras with the shape defined above.
   * */
  function adjustEras(erasParam) {
    var eras = erasParam;
    if (eras.length === 0) {
      throw new RangeError('Invalid era data: eras are required');
    }
    if (eras.length === 1 && eras[0].reverseOf) {
      throw new RangeError('Invalid era data: anchor era cannot count years backwards');
    }
    if (eras.length === 1 && !eras[0].code) {
      throw new RangeError('Invalid era data: at least one named era is required');
    }
    if (eras.filter(function (e) {
      return e.reverseOf != null;
    }).length > 1) {
      throw new RangeError('Invalid era data: only one era can count years backwards');
    }
    // Find the "anchor era" which is the era used for (era-less) `year`. Reversed
    // eras can never be anchors. The era without an `anchorEpoch` property is the
    // anchor.
    var anchorEra;
    eras.forEach(function (e) {
      if (e.isAnchor || !e.anchorEpoch && !e.reverseOf) {
        if (anchorEra) throw new RangeError('Invalid era data: cannot have multiple anchor eras');
        anchorEra = e;
        e.anchorEpoch = {
          year: e.hasYearZero ? 0 : 1
        };
      } else if (!e.code) {
        throw new RangeError('If era name is blank, it must be the anchor era');
      }
    });
    // If the era name is undefined, then it's an anchor that doesn't interact
    // with eras at all. For example, Japanese `year` is always the same as ISO
    // `year`.  So this "era" is the anchor era but isn't used for era matching.
    // Strip it from the list that's returned.
    eras = eras.filter(function (e) {
      return e.code;
    });
    eras.forEach(function (e) {
      // Some eras are mirror images of another era e.g. B.C. is the reverse of A.D.
      // Replace the string-valued "reverseOf" property with the actual era object
      // that's reversed.
      var reverseOf = e.reverseOf;
      if (reverseOf) {
        var reversedEra = eras.find(function (era) {
          return era.code === reverseOf;
        });
        if (reversedEra === undefined) {
          throw new RangeError("Invalid era data: unmatched reverseOf era: ".concat(reverseOf));
        }
        e.reverseOf = reversedEra; // genericName property added later
        e.anchorEpoch = reversedEra.anchorEpoch;
        e.isoEpoch = reversedEra.isoEpoch;
      }
      if (e.anchorEpoch.month === undefined) e.anchorEpoch.month = 1;
      if (e.anchorEpoch.day === undefined) e.anchorEpoch.day = 1;
    });
    // Ensure that the latest epoch is first in the array. This lets us try to
    // match eras in index order, with the last era getting the remaining older
    // years. Any reverse-signed era must be at the end.
    eras.sort(function (e1, e2) {
      if (e1.reverseOf) return 1;
      if (e2.reverseOf) return -1;
      if (!e1.isoEpoch || !e2.isoEpoch) throw new RangeError('Invalid era data: missing ISO epoch');
      return e2.isoEpoch.year - e1.isoEpoch.year;
    });
    // If there's a reversed era, then the one before it must be the era that's
    // being reversed.
    var lastEraReversed = eras[eras.length - 1].reverseOf;
    if (lastEraReversed) {
      if (lastEraReversed !== eras[eras.length - 2]) {
        throw new RangeError('Invalid era data: invalid reverse-sign era');
      }
    }
    // Finally, add a "genericName" property in the format "era{n} where `n` is
    // zero-based index, with the oldest era being zero. This format is used by
    // older versions of ICU data.
    eras.forEach(function (e, i) {
      e.genericName = "era".concat(eras.length - 1 - i);
    });
    return {
      eras: eras,
      anchorEra: anchorEra || eras[0]
    };
  }
  function isGregorianLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  /** Base for all Gregorian-like calendars. */
  var GregorianBaseHelperFixedEpoch = /*#__PURE__*/function (_HelperBase5) {
    _inherits(GregorianBaseHelperFixedEpoch, _HelperBase5);
    var _super11 = _createSuper(GregorianBaseHelperFixedEpoch);
    function GregorianBaseHelperFixedEpoch(id, isoEpoch) {
      var _this13;
      _classCallCheck(this, GregorianBaseHelperFixedEpoch);
      _this13 = _super11.call(this);
      _this13.calendarType = 'solar';
      _this13.id = id;
      _this13.isoEpoch = isoEpoch;
      return _this13;
    }
    _createClass(GregorianBaseHelperFixedEpoch, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate) {
        var _this$estimateIsoDate = this.estimateIsoDate({
            month: 1,
            day: 1,
            year: calendarDate.year
          }),
          year = _this$estimateIsoDate.year;
        return isGregorianLeapYear(year);
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear( /* calendarDate */
      ) {
        return 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength(calendarDate) {
        var month = calendarDate.month;
        if (month === 2) return this.inLeapYear(calendarDate) ? 29 : 28;
        return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength(calendarDate) {
        return this.minimumMonthLength(calendarDate);
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear(monthCode) {
        var month = nonLeapMonthCodeNumberPart(monthCode);
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
      }
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDateParam) {
        var calendarDate = this.adjustCalendarDate(calendarDateParam);
        return RegulateISODate(calendarDate.year + this.isoEpoch.year, calendarDate.month + this.isoEpoch.month, calendarDate.day + this.isoEpoch.day, 'constrain');
      }
    }]);
    return GregorianBaseHelperFixedEpoch;
  }(HelperBase);
  /** Base for Gregorian-like calendars with eras. */
  var GregorianBaseHelper = /*#__PURE__*/function (_HelperBase6) {
    _inherits(GregorianBaseHelper, _HelperBase6);
    var _super12 = _createSuper(GregorianBaseHelper);
    function GregorianBaseHelper(id, originalEras) {
      var _this14;
      _classCallCheck(this, GregorianBaseHelper);
      _this14 = _super12.call(this);
      _this14.hasEra = true;
      _this14.calendarType = 'solar';
      _this14.id = id;
      var _adjustEras = adjustEras(originalEras),
        eras = _adjustEras.eras,
        anchorEra = _adjustEras.anchorEra;
      _this14.anchorEra = anchorEra;
      _this14.eras = eras;
      return _this14;
    }
    _createClass(GregorianBaseHelper, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate) {
        // Calendars that don't override this method use the same months and leap
        // years as Gregorian. Once we know the ISO year corresponding to the
        // calendar year, we'll know if it's a leap year or not.
        var _this$estimateIsoDate2 = this.estimateIsoDate({
            month: 1,
            day: 1,
            year: calendarDate.year
          }),
          year = _this$estimateIsoDate2.year;
        return isGregorianLeapYear(year);
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear( /* calendarDate */
      ) {
        return 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength(calendarDate) {
        var month = calendarDate.month;
        if (month === 2) return this.inLeapYear(calendarDate) ? 29 : 28;
        return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength(calendarDate) {
        return this.minimumMonthLength(calendarDate);
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear(monthCode) {
        var month = nonLeapMonthCodeNumberPart(monthCode);
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
      }
      /** Fill in missing parts of the (year, era, eraYear) tuple */
    }, {
      key: "completeEraYear",
      value: function completeEraYear(calendarDate) {
        var _this15 = this;
        var checkField = function checkField(property, value, names) {
          var currentValue = calendarDate[property];
          if (currentValue != null && currentValue != value && !(names || []).includes(currentValue)) {
            // Prefer displaying an era alias, instead of "gregory-inverse"
            var preferredName = names === null || names === void 0 ? void 0 : names[0];
            var expected = preferredName ? "".concat(value, " (also called ").concat(preferredName, ")") : value;
            throw new RangeError("Input ".concat(property, " ").concat(currentValue, " doesn't match calculated value ").concat(expected));
          }
        };
        var eraFromYear = function eraFromYear(year) {
          var eraYear;
          var adjustedCalendarDate = _objectSpread2(_objectSpread2({}, calendarDate), {}, {
            year: year
          });
          var matchingEra = _this15.eras.find(function (e, i) {
            if (i === _this15.eras.length - 1) {
              if (e.reverseOf) {
                // This is a reverse-sign era (like BCE) which must be the oldest
                // era. Count years backwards.
                if (year > 0) throw new RangeError("Signed year ".concat(year, " is invalid for era ").concat(e.code));
                eraYear = e.anchorEpoch.year - year;
                return true;
              }
              // last era always gets all "leftover" (older than epoch) years,
              // so no need for a comparison like below.
              eraYear = year - e.anchorEpoch.year + (e.hasYearZero ? 0 : 1);
              return true;
            }
            var comparison = _this15.compareCalendarDates(adjustedCalendarDate, e.anchorEpoch);
            if (comparison >= 0) {
              eraYear = year - e.anchorEpoch.year + (e.hasYearZero ? 0 : 1);
              return true;
            }
            return false;
          });
          if (!matchingEra) throw new RangeError("Year ".concat(year, " was not matched by any era"));
          return {
            eraYear: eraYear,
            era: matchingEra.code,
            eraNames: matchingEra.names
          };
        };
        var year = calendarDate.year,
          eraYear = calendarDate.eraYear,
          era = calendarDate.era;
        if (year != null) {
          var matchData = eraFromYear(year);
          eraYear = matchData.eraYear;
          era = matchData.era;
          checkField('era', era, matchData === null || matchData === void 0 ? void 0 : matchData.eraNames);
          checkField('eraYear', eraYear);
        } else if (eraYear != null) {
          if (era === undefined) throw new RangeError('era and eraYear must be provided together');
          // TS limitation: https://github.com/microsoft/TypeScript/issues/11498
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var matchingEra = this.eras.find(function (_ref5) {
            var code = _ref5.code,
              _ref5$names = _ref5.names,
              names = _ref5$names === void 0 ? [] : _ref5$names;
            return code === era || names.includes(era);
          });
          if (!matchingEra) throw new RangeError("Era ".concat(era, " (ISO year ").concat(eraYear, ") was not matched by any era"));
          if (matchingEra.reverseOf) {
            year = matchingEra.anchorEpoch.year - eraYear;
          } else {
            year = eraYear + matchingEra.anchorEpoch.year - (matchingEra.hasYearZero ? 0 : 1);
          }
          checkField('year', year);
          // We'll accept dates where the month/day is earlier than the start of
          // the era or after its end as long as it's in the same year. If that
          // happens, we'll adjust the era/eraYear pair to be the correct era for
          // the `year`.
          var _eraFromYear = eraFromYear(year);
          eraYear = _eraFromYear.eraYear;
          era = _eraFromYear.era;
        } else {
          throw new RangeError('Either year or eraYear and era are required');
        }
        return _objectSpread2(_objectSpread2({}, calendarDate), {}, {
          year: year,
          eraYear: eraYear,
          era: era
        });
      }
    }, {
      key: "adjustCalendarDate",
      value: function adjustCalendarDate(calendarDateParam, cache) {
        var overflow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'constrain';
        var calendarDate = calendarDateParam;
        // Because this is not a lunisolar calendar, it's safe to convert monthCode to a number
        var _calendarDate3 = calendarDate,
          month = _calendarDate3.month,
          monthCode = _calendarDate3.monthCode;
        if (month === undefined) calendarDate = _objectSpread2(_objectSpread2({}, calendarDate), {}, {
          month: nonLeapMonthCodeNumberPart(monthCode)
        });
        this.validateCalendarDate(calendarDate);
        calendarDate = this.completeEraYear(calendarDate);
        return _get(_getPrototypeOf(GregorianBaseHelper.prototype), "adjustCalendarDate", this).call(this, calendarDate, cache, overflow);
      }
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDateParam) {
        var calendarDate = this.adjustCalendarDate(calendarDateParam);
        var year = calendarDate.year,
          month = calendarDate.month,
          day = calendarDate.day;
        var anchorEra = this.anchorEra;
        var isoYearEstimate = year + anchorEra.isoEpoch.year - (anchorEra.hasYearZero ? 0 : 1);
        return RegulateISODate(isoYearEstimate, month, day, 'constrain');
      }
    }]);
    return GregorianBaseHelper;
  }(HelperBase);
  /**
   * Some calendars are identical to Gregorian except era and year. For these
   * calendars, we can avoid using Intl.DateTimeFormat and just calculate the
   * year, era, and eraYear. This is faster (because Intl.DateTimeFormat is slow
   * and uses a huge amount of RAM), and it avoids ICU bugs like
   * https://bugs.chromium.org/p/chromium/issues/detail?id=1173158.
   */
  var SameMonthDayAsGregorianBaseHelper = /*#__PURE__*/function (_GregorianBaseHelper) {
    _inherits(SameMonthDayAsGregorianBaseHelper, _GregorianBaseHelper);
    var _super13 = _createSuper(SameMonthDayAsGregorianBaseHelper);
    function SameMonthDayAsGregorianBaseHelper(id, originalEras) {
      _classCallCheck(this, SameMonthDayAsGregorianBaseHelper);
      return _super13.call(this, id, originalEras);
    }
    _createClass(SameMonthDayAsGregorianBaseHelper, [{
      key: "isoToCalendarDate",
      value: function isoToCalendarDate(isoDate) {
        // Month and day are same as ISO, so bypass Intl.DateTimeFormat and
        // calculate the year, era, and eraYear here.
        var isoYear = isoDate.year,
          month = isoDate.month,
          day = isoDate.day;
        var monthCode = buildMonthCode(month);
        var year = isoYear - this.anchorEra.isoEpoch.year + 1;
        return this.completeEraYear({
          year: year,
          month: month,
          monthCode: monthCode,
          day: day
        });
      }
    }]);
    return SameMonthDayAsGregorianBaseHelper;
  }(GregorianBaseHelper);
  var OrthodoxOps = {
    inLeapYear: function inLeapYear(calendarDate) {
      // Leap years happen one year before the Julian leap year. Note that this
      // calendar is based on the Julian calendar which has a leap year every 4
      // years, unlike the Gregorian calendar which doesn't have leap years on
      // years divisible by 100 except years divisible by 400.
      //
      // Note that we're assuming that leap years in before-epoch times match
      // how leap years are defined now. This is probably not accurate but I'm
      // not sure how better to do it.
      var year = calendarDate.year;
      return (year + 1) % 4 === 0;
    },
    monthsInYear: function monthsInYear() {
      return 13;
    } /* calendarDate */,
    minimumMonthLength: function minimumMonthLength(calendarDate) {
      var month = calendarDate.month;
      // Ethiopian/Coptic calendars have 12 30-day months and an extra 5-6 day 13th month.
      if (month === 13) return this.inLeapYear(calendarDate) ? 6 : 5;
      return 30;
    },
    maximumMonthLength: function maximumMonthLength(calendarDate) {
      return this.minimumMonthLength(calendarDate);
    },
    maxLengthOfMonthCodeInAnyYear: function maxLengthOfMonthCodeInAnyYear(monthCode) {
      return monthCode === 'M13' ? 6 : 30;
    }
  };
  var OrthodoxBaseHelperFixedEpoch = /*#__PURE__*/function (_GregorianBaseHelperF) {
    _inherits(OrthodoxBaseHelperFixedEpoch, _GregorianBaseHelperF);
    var _super14 = _createSuper(OrthodoxBaseHelperFixedEpoch);
    function OrthodoxBaseHelperFixedEpoch(id, isoEpoch) {
      var _this16;
      _classCallCheck(this, OrthodoxBaseHelperFixedEpoch);
      _this16 = _super14.call(this, id, isoEpoch);
      _this16.inLeapYear = OrthodoxOps.inLeapYear;
      _this16.monthsInYear = OrthodoxOps.monthsInYear;
      _this16.minimumMonthLength = OrthodoxOps.minimumMonthLength;
      _this16.maximumMonthLength = OrthodoxOps.maximumMonthLength;
      _this16.maxLengthOfMonthCodeInAnyYear = OrthodoxOps.maxLengthOfMonthCodeInAnyYear;
      return _this16;
    }
    return _createClass(OrthodoxBaseHelperFixedEpoch);
  }(GregorianBaseHelperFixedEpoch);
  var OrthodoxBaseHelper = /*#__PURE__*/function (_GregorianBaseHelper2) {
    _inherits(OrthodoxBaseHelper, _GregorianBaseHelper2);
    var _super15 = _createSuper(OrthodoxBaseHelper);
    function OrthodoxBaseHelper(id, originalEras) {
      var _this17;
      _classCallCheck(this, OrthodoxBaseHelper);
      _this17 = _super15.call(this, id, originalEras);
      _this17.inLeapYear = OrthodoxOps.inLeapYear;
      _this17.monthsInYear = OrthodoxOps.monthsInYear;
      _this17.minimumMonthLength = OrthodoxOps.minimumMonthLength;
      _this17.maximumMonthLength = OrthodoxOps.maximumMonthLength;
      _this17.maxLengthOfMonthCodeInAnyYear = OrthodoxOps.maxLengthOfMonthCodeInAnyYear;
      return _this17;
    }
    return _createClass(OrthodoxBaseHelper);
  }(GregorianBaseHelper); // `coptic` and `ethiopic` calendars are very similar to `ethioaa` calendar,
  // with the following differences:
  // - Coptic uses BCE-like positive numbers for years before its epoch (the other
  //   two use negative year numbers before epoch)
  // - Coptic has a different epoch date
  // - Ethiopic has an additional second era that starts at the same date as the
  //   zero era of ethioaa.
  var EthioaaHelper = /*#__PURE__*/function (_OrthodoxBaseHelperFi) {
    _inherits(EthioaaHelper, _OrthodoxBaseHelperFi);
    var _super16 = _createSuper(EthioaaHelper);
    function EthioaaHelper() {
      _classCallCheck(this, EthioaaHelper);
      return _super16.call(this, 'ethioaa', {
        year: -5492,
        month: 7,
        day: 17
      });
    }
    return _createClass(EthioaaHelper);
  }(OrthodoxBaseHelperFixedEpoch);
  var CopticHelper = /*#__PURE__*/function (_OrthodoxBaseHelper) {
    _inherits(CopticHelper, _OrthodoxBaseHelper);
    var _super17 = _createSuper(CopticHelper);
    function CopticHelper() {
      _classCallCheck(this, CopticHelper);
      return _super17.call(this, 'coptic', [{
        code: 'coptic',
        isoEpoch: {
          year: 284,
          month: 8,
          day: 29
        }
      }, {
        code: 'coptic-inverse',
        reverseOf: 'coptic'
      }]);
    }
    return _createClass(CopticHelper);
  }(OrthodoxBaseHelper); // Anchor is currently the older era to match ethioaa, but should it be the newer era?
  // See https://github.com/tc39/ecma402/issues/534 for discussion.
  var EthiopicHelper = /*#__PURE__*/function (_OrthodoxBaseHelper2) {
    _inherits(EthiopicHelper, _OrthodoxBaseHelper2);
    var _super18 = _createSuper(EthiopicHelper);
    function EthiopicHelper() {
      _classCallCheck(this, EthiopicHelper);
      return _super18.call(this, 'ethiopic', [{
        code: 'ethioaa',
        names: ['ethiopic-amete-alem', 'mundi'],
        isoEpoch: {
          year: -5492,
          month: 7,
          day: 17
        }
      }, {
        code: 'ethiopic',
        names: ['incar'],
        isoEpoch: {
          year: 8,
          month: 8,
          day: 27
        },
        anchorEpoch: {
          year: 5501
        }
      }]);
    }
    return _createClass(EthiopicHelper);
  }(OrthodoxBaseHelper);
  var RocHelper = /*#__PURE__*/function (_SameMonthDayAsGregor) {
    _inherits(RocHelper, _SameMonthDayAsGregor);
    var _super19 = _createSuper(RocHelper);
    function RocHelper() {
      _classCallCheck(this, RocHelper);
      return _super19.call(this, 'roc', [{
        code: 'roc',
        names: ['minguo'],
        isoEpoch: {
          year: 1912,
          month: 1,
          day: 1
        }
      }, {
        code: 'roc-inverse',
        names: ['before-roc'],
        reverseOf: 'roc'
      }]);
    }
    return _createClass(RocHelper);
  }(SameMonthDayAsGregorianBaseHelper);
  var BuddhistHelper = /*#__PURE__*/function (_GregorianBaseHelperF2) {
    _inherits(BuddhistHelper, _GregorianBaseHelperF2);
    var _super20 = _createSuper(BuddhistHelper);
    function BuddhistHelper() {
      _classCallCheck(this, BuddhistHelper);
      return _super20.call(this, 'buddhist', {
        year: -543,
        month: 1,
        day: 1
      });
    }
    return _createClass(BuddhistHelper);
  }(GregorianBaseHelperFixedEpoch);
  var GregoryHelper = /*#__PURE__*/function (_SameMonthDayAsGregor2) {
    _inherits(GregoryHelper, _SameMonthDayAsGregor2);
    var _super21 = _createSuper(GregoryHelper);
    function GregoryHelper() {
      _classCallCheck(this, GregoryHelper);
      return _super21.call(this, 'gregory', [{
        code: 'gregory',
        names: ['ad', 'ce'],
        isoEpoch: {
          year: 1,
          month: 1,
          day: 1
        }
      }, {
        code: 'gregory-inverse',
        names: ['be', 'bce'],
        reverseOf: 'gregory'
      }]);
    }
    _createClass(GregoryHelper, [{
      key: "reviseIntlEra",
      value: function reviseIntlEra(calendarDate /*, isoDate: IsoDate*/) {
        var era = calendarDate.era,
          eraYear = calendarDate.eraYear;
        // Firefox 96 introduced a bug where the `'short'` format of the era
        // option mistakenly returns the one-letter (narrow) format instead. The
        // code below handles either the correct or Firefox-buggy format. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1752253
        if (era === 'b') era = 'gregory-inverse';
        if (era === 'a') era = 'gregory';
        return {
          era: era,
          eraYear: eraYear
        };
      }
    }]);
    return GregoryHelper;
  }(SameMonthDayAsGregorianBaseHelper); // NOTE: Only the 5 modern eras (Meiji and later) are included. For dates
  // before Meiji 1, the `ce` and `bce` eras are used. Challenges with pre-Meiji
  // eras include:
  // - Start/end dates of older eras are not precisely defined, which is
  //   challenging given Temporal's need for precision
  // - Some era dates and/or names are disputed by historians
  // - As historical research proceeds, new eras are discovered and existing era
  //   dates are modified, leading to considerable churn which is not good for
  //   Temporal use.
  //  - The earliest era (in 645 CE) may not end up being the earliest depending
  //    on future historical scholarship
  //  - Before Meiji, Japan used a lunar (or lunisolar?) calendar but AFAIK
  //    that's not reflected in the ICU implementation.
  //
  // For more discussion: https://github.com/tc39/proposal-temporal/issues/526.
  //
  // Here's a full list of CLDR/ICU eras:
  // https://github.com/unicode-org/icu/blob/master/icu4c/source/data/locales/root.txt#L1582-L1818
  // https://github.com/unicode-org/cldr/blob/master/common/supplemental/supplementalData.xml#L4310-L4546
  //
  // NOTE: Japan started using the Gregorian calendar in 6 Meiji, replacing a
  // lunisolar calendar. So the day before January 1 of 6 Meiji (1873) was not
  // December 31, but December 2, of 5 Meiji (1872). The existing Ecma-402
  // Japanese calendar doesn't seem to take this into account, so neither do we:
  // > args = ['en-ca-u-ca-japanese', { era: 'short' }]
  // > new Date('1873-01-01T12:00').toLocaleString(...args)
  // '1 1, 6 Meiji, 12:00:00 PM'
  // > new Date('1872-12-31T12:00').toLocaleString(...args)
  // '12 31, 5 Meiji, 12:00:00 PM'
  var JapaneseHelper = /*#__PURE__*/function (_SameMonthDayAsGregor3) {
    _inherits(JapaneseHelper, _SameMonthDayAsGregor3);
    var _super22 = _createSuper(JapaneseHelper);
    function JapaneseHelper() {
      var _this18;
      _classCallCheck(this, JapaneseHelper);
      _this18 = _super22.call(this, 'japanese', [
      // The Japanese calendar `year` is just the ISO year, because (unlike other
      // ICU calendars) there's no obvious "default era", we use the ISO year.
      {
        code: 'reiwa',
        isoEpoch: {
          year: 2019,
          month: 5,
          day: 1
        },
        anchorEpoch: {
          year: 2019,
          month: 5,
          day: 1
        }
      }, {
        code: 'heisei',
        isoEpoch: {
          year: 1989,
          month: 1,
          day: 8
        },
        anchorEpoch: {
          year: 1989,
          month: 1,
          day: 8
        }
      }, {
        code: 'showa',
        isoEpoch: {
          year: 1926,
          month: 12,
          day: 25
        },
        anchorEpoch: {
          year: 1926,
          month: 12,
          day: 25
        }
      }, {
        code: 'taisho',
        isoEpoch: {
          year: 1912,
          month: 7,
          day: 30
        },
        anchorEpoch: {
          year: 1912,
          month: 7,
          day: 30
        }
      }, {
        code: 'meiji',
        isoEpoch: {
          year: 1868,
          month: 9,
          day: 8
        },
        anchorEpoch: {
          year: 1868,
          month: 9,
          day: 8
        }
      }, {
        code: 'japanese',
        names: ['japanese', 'gregory', 'ad', 'ce'],
        isoEpoch: {
          year: 1,
          month: 1,
          day: 1
        }
      }, {
        code: 'japanese-inverse',
        names: ['japanese-inverse', 'gregory-inverse', 'bc', 'bce'],
        reverseOf: 'japanese'
      }]);
      _this18.erasBeginMidYear = true;
      return _this18;
    }
    _createClass(JapaneseHelper, [{
      key: "reviseIntlEra",
      value: function reviseIntlEra(calendarDate, isoDate) {
        var era = calendarDate.era,
          eraYear = calendarDate.eraYear;
        var isoYear = isoDate.year;
        if (this.eras.find(function (e) {
          return e.code === era;
        })) return {
          era: era,
          eraYear: eraYear
        };
        return isoYear < 1 ? {
          era: 'japanese-inverse',
          eraYear: 1 - isoYear
        } : {
          era: 'japanese',
          eraYear: isoYear
        };
      }
    }]);
    return JapaneseHelper;
  }(SameMonthDayAsGregorianBaseHelper);
  var ChineseBaseHelper = /*#__PURE__*/function (_HelperBase7) {
    _inherits(ChineseBaseHelper, _HelperBase7);
    var _super23 = _createSuper(ChineseBaseHelper);
    function ChineseBaseHelper() {
      var _this19;
      _classCallCheck(this, ChineseBaseHelper);
      _this19 = _super23.apply(this, arguments);
      _this19.calendarType = 'lunisolar';
      return _this19;
    }
    _createClass(ChineseBaseHelper, [{
      key: "inLeapYear",
      value: function inLeapYear(calendarDate, cache) {
        var months = this.getMonthList(calendarDate.year, cache);
        return Object.entries(months).length === 13;
      }
    }, {
      key: "monthsInYear",
      value: function monthsInYear(calendarDate, cache) {
        return this.inLeapYear(calendarDate, cache) ? 13 : 12;
      }
    }, {
      key: "minimumMonthLength",
      value: function minimumMonthLength( /* calendarDate */
      ) {
        return 29;
      }
    }, {
      key: "maximumMonthLength",
      value: function maximumMonthLength( /* calendarDate */
      ) {
        return 30;
      }
    }, {
      key: "maxLengthOfMonthCodeInAnyYear",
      value: function maxLengthOfMonthCodeInAnyYear(monthCode) {
        // See note below about ICU4C vs ICU4X. It is possible this override should
        // always return 30.
        return ['M01L', 'M09L', 'M10L', 'M11L', 'M12L'].includes(monthCode) ? 29 : 30;
      }
    }, {
      key: "monthDaySearchStartYear",
      value: function monthDaySearchStartYear(monthCode, day) {
        var _monthMap$monthCode;
        // Note that ICU4C actually has _no_ years in which leap months M01L and
        // M09L through M12L have 30 days. The values marked with (*) here are years
        // in which the leap month occurs with 29 days. ICU4C disagrees with ICU4X
        // here and it is not clear which is correct.
        var monthMap = {
          M01L: [1651, 1651],
          M02L: [1947, 1765],
          M03L: [1966, 1955],
          M04L: [1963, 1944],
          M05L: [1971, 1952],
          M06L: [1960, 1941],
          M07L: [1968, 1938],
          M08L: [1957, 1718],
          M09L: [1832, 1832],
          M10L: [1870, 1870],
          M11L: [1814, 1814],
          M12L: [1890, 1890] // *
        };
        var years = (_monthMap$monthCode = monthMap[monthCode]) !== null && _monthMap$monthCode !== void 0 ? _monthMap$monthCode : [1972, 1972];
        return day < 30 ? years[0] : years[1];
      }
    }, {
      key: "getMonthList",
      value: function getMonthList(calendarYear, cache) {
        var _this20 = this;
        if (calendarYear === undefined) {
          throw new TypeError('Missing year');
        }
        var key = JSON.stringify({
          func: 'getMonthList',
          calendarYear: calendarYear,
          id: this.id
        });
        var cached = cache.get(key);
        if (cached) return cached;
        var dateTimeFormat = this.getFormatter();
        var getCalendarDate = function getCalendarDate(isoYear, daysPastFeb1) {
          var isoStringFeb1 = toUtcIsoDateString({
            isoYear: isoYear,
            isoMonth: 2,
            isoDay: 1
          });
          var legacyDate = new Date(isoStringFeb1);
          // Now add the requested number of days, which may wrap to the next month.
          legacyDate.setUTCDate(daysPastFeb1 + 1);
          var newYearGuess = dateTimeFormat.formatToParts(legacyDate);
          // The 'month' and 'day' parts are guaranteed to be present because the
          // formatter was created with month and day options.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var calendarMonthString = newYearGuess.find(function (tv) {
            return tv.type === 'month';
          }).value;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var calendarDay = +newYearGuess.find(function (tv) {
            return tv.type === 'day';
          }).value;
          var calendarYearPartToVerify = newYearGuess.find(function (tv) {
            return tv.type === 'relatedYear';
          });
          var calendarYearToVerify;
          if (calendarYearPartToVerify !== undefined) {
            calendarYearToVerify = +calendarYearPartToVerify.value;
          } else {
            // Node 12 has outdated ICU data that lacks the `relatedYear` field in the
            // output of Intl.DateTimeFormat.formatToParts.
            throw new RangeError("Intl.DateTimeFormat.formatToParts lacks relatedYear in ".concat(_this20.id, " calendar. Try Node 14+ or modern browsers."));
          }
          return {
            calendarMonthString: calendarMonthString,
            calendarDay: calendarDay,
            calendarYearToVerify: calendarYearToVerify
          };
        };
        // First, find a date close to Chinese New Year. Feb 17 will either be in
        // the first month or near the end of the last month of the previous year.
        var isoDaysDelta = 17;
        var _getCalendarDate = getCalendarDate(calendarYear, isoDaysDelta),
          calendarMonthString = _getCalendarDate.calendarMonthString,
          calendarDay = _getCalendarDate.calendarDay,
          calendarYearToVerify = _getCalendarDate.calendarYearToVerify;
        // If we didn't guess the first month correctly, add (almost in some months)
        // a lunar month
        if (calendarMonthString !== '1') {
          isoDaysDelta += 29;
          var _getCalendarDate2 = getCalendarDate(calendarYear, isoDaysDelta);
          calendarMonthString = _getCalendarDate2.calendarMonthString;
          calendarDay = _getCalendarDate2.calendarDay;
        }
        // Now back up to near the start of the first month, but not too near that
        // off-by-one issues matter.
        isoDaysDelta -= calendarDay - 5;
        var result = {};
        var monthIndex = 1;
        var oldCalendarDay;
        var oldMonthString;
        var done = false;
        do {
          var _getCalendarDate3 = getCalendarDate(calendarYear, isoDaysDelta);
          calendarMonthString = _getCalendarDate3.calendarMonthString;
          calendarDay = _getCalendarDate3.calendarDay;
          calendarYearToVerify = _getCalendarDate3.calendarYearToVerify;
          if (oldCalendarDay) {
            result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
          }
          if (calendarYearToVerify !== calendarYear) {
            done = true;
          } else {
            result[calendarMonthString] = {
              monthIndex: monthIndex++
            };
            // Move to the next month. Because months are sometimes 29 days, the day of the
            // calendar month will move forward slowly but not enough to flip over to a new
            // month before the loop ends at 12-13 months.
            isoDaysDelta += 30;
          }
          oldCalendarDay = calendarDay;
          oldMonthString = calendarMonthString;
        } while (!done);
        result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
        cache.set(key, result);
        return result;
      }
    }, {
      key: "estimateIsoDate",
      value: function estimateIsoDate(calendarDate) {
        var year = calendarDate.year,
          month = calendarDate.month;
        return {
          year: year,
          month: month >= 12 ? 12 : month + 1,
          day: 1
        };
      }
    }, {
      key: "adjustCalendarDate",
      value: function adjustCalendarDate(calendarDate, cache) {
        var overflow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'constrain';
        var fromLegacyDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var year = calendarDate.year,
          month = calendarDate.month,
          monthExtra = calendarDate.monthExtra,
          day = calendarDate.day,
          monthCode = calendarDate.monthCode;
        if (year === undefined) throw new TypeError('Missing property: year');
        if (fromLegacyDate) {
          // Legacy Date output returns a string that's an integer with an optional
          // "bis" suffix used only by the Chinese/Dangi calendar to indicate a leap
          // month. Below we'll normalize the output.
          if (monthExtra && monthExtra !== 'bis') throw new RangeError("Unexpected leap month suffix: ".concat(monthExtra));
          var _monthCode = buildMonthCode(month, monthExtra !== undefined);
          var monthString = "".concat(month).concat(monthExtra || '');
          var months = this.getMonthList(year, cache);
          var monthInfo = months[monthString];
          if (monthInfo === undefined) throw new RangeError("Unmatched month ".concat(monthString, " in Chinese year ").concat(year));
          month = monthInfo.monthIndex;
          return {
            year: year,
            month: month,
            day: day,
            monthCode: _monthCode
          };
        } else {
          // When called without input coming from legacy Date output,
          // simply ensure that all fields are present.
          this.validateCalendarDate(calendarDate);
          if (month === undefined) {
            assertExists(monthCode);
            var _months = this.getMonthList(year, cache);
            var numberPart = monthCode.replace(/^M|L$/g, function (ch) {
              return ch === 'L' ? 'bis' : '';
            });
            if (numberPart[0] === '0') numberPart = numberPart.slice(1);
            var _monthInfo = _months[numberPart];
            month = _monthInfo && _monthInfo.monthIndex;
            // If this leap month isn't present in this year, constrain to the same
            // day of the previous month.
            if (month === undefined && monthCode.endsWith('L') && monthCode != 'M13L' && overflow === 'constrain') {
              var withoutML = +monthCode.replace(/^M0?|L$/g, '');
              _monthInfo = _months[withoutML];
              if (_monthInfo) {
                month = _monthInfo.monthIndex;
                monthCode = buildMonthCode(withoutML);
              }
            }
            if (month === undefined) {
              throw new RangeError("Unmatched month ".concat(monthCode, " in Chinese year ").concat(year));
            }
          } else if (monthCode === undefined) {
            var _months2 = this.getMonthList(year, cache);
            var monthEntries = Object.entries(_months2);
            var largestMonth = monthEntries.length;
            if (overflow === 'reject') {
              RejectToRange(month, 1, largestMonth);
              RejectToRange(day, 1, this.maximumMonthLength());
            } else {
              month = ConstrainToRange(month, 1, largestMonth);
              day = ConstrainToRange(day, 1, this.maximumMonthLength());
            }
            var matchingMonthEntry = monthEntries.find(function (entry) {
              return entry[1].monthIndex === month;
            });
            if (matchingMonthEntry === undefined) {
              throw new RangeError("Invalid month ".concat(month, " in Chinese year ").concat(year));
            }
            monthCode = buildMonthCode(+matchingMonthEntry[0].replace('bis', ''), matchingMonthEntry[0].indexOf('bis') !== -1);
          } else {
            // Both month and monthCode are present. Make sure they don't conflict.
            var _months3 = this.getMonthList(year, cache);
            var _numberPart = monthCode.replace(/^M|L$/g, function (ch) {
              return ch === 'L' ? 'bis' : '';
            });
            if (_numberPart[0] === '0') _numberPart = _numberPart.slice(1);
            var _monthInfo2 = _months3[_numberPart];
            if (!_monthInfo2) throw new RangeError("Unmatched monthCode ".concat(monthCode, " in Chinese year ").concat(year));
            if (month !== _monthInfo2.monthIndex) {
              throw new RangeError("monthCode ".concat(monthCode, " doesn't correspond to month ").concat(month, " in Chinese year ").concat(year));
            }
          }
          return _objectSpread2(_objectSpread2({}, calendarDate), {}, {
            year: year,
            month: month,
            monthCode: monthCode,
            day: day
          });
        }
      }
    }]);
    return ChineseBaseHelper;
  }(HelperBase);
  var ChineseHelper = /*#__PURE__*/function (_ChineseBaseHelper) {
    _inherits(ChineseHelper, _ChineseBaseHelper);
    var _super24 = _createSuper(ChineseHelper);
    function ChineseHelper() {
      var _this21;
      _classCallCheck(this, ChineseHelper);
      _this21 = _super24.apply(this, arguments);
      _this21.id = 'chinese';
      return _this21;
    }
    return _createClass(ChineseHelper);
  }(ChineseBaseHelper); // Dangi (Korean) calendar has same implementation as Chinese
  var DangiHelper = /*#__PURE__*/function (_ChineseBaseHelper2) {
    _inherits(DangiHelper, _ChineseBaseHelper2);
    var _super25 = _createSuper(DangiHelper);
    function DangiHelper() {
      var _this22;
      _classCallCheck(this, DangiHelper);
      _this22 = _super25.apply(this, arguments);
      _this22.id = 'dangi';
      return _this22;
    }
    return _createClass(DangiHelper);
  }(ChineseBaseHelper);
  /**
   * Common implementation of all non-ISO calendars.
   * Per-calendar id and logic live in `id` and `helper` properties attached later.
   * This split allowed an easy separation between code that was similar between
   * ISO and non-ISO implementations vs. code that was very different.
   */
  var NonIsoCalendar = /*#__PURE__*/function () {
    function NonIsoCalendar(helper) {
      _classCallCheck(this, NonIsoCalendar);
      this.helper = helper;
    }
    _createClass(NonIsoCalendar, [{
      key: "extraFields",
      value: function extraFields(fields) {
        if (this.helper.hasEra && fields.includes('year')) {
          return ['era', 'eraYear'];
        }
        return [];
      }
    }, {
      key: "resolveFields",
      value: function resolveFields(fields /* , type */) {
        if (this.helper.calendarType !== 'lunisolar') {
          var _fields$year2;
          var cache = new OneObjectCache();
          var largestMonth = this.helper.monthsInYear({
            year: (_fields$year2 = fields.year) !== null && _fields$year2 !== void 0 ? _fields$year2 : 1972
          }, cache);
          resolveNonLunisolarMonth(fields, undefined, largestMonth);
        }
      }
    }, {
      key: "dateToISO",
      value: function dateToISO(fields, overflow) {
        var cache = new OneObjectCache();
        var result = this.helper.calendarToIsoDate(fields, overflow, cache);
        cache.setObject(result);
        return result;
      }
    }, {
      key: "monthDayToISOReferenceDate",
      value: function monthDayToISOReferenceDate(fields, overflow) {
        var cache = new OneObjectCache();
        var result = this.helper.monthDayFromFields(fields, overflow, cache);
        // result.year is a reference year where this month/day exists in this calendar
        cache.setObject(result);
        return result;
      }
    }, {
      key: "fieldKeysToIgnore",
      value: function fieldKeysToIgnore(keys) {
        var result = new Set();
        for (var ix = 0; ix < keys.length; ix++) {
          var key = keys[ix];
          result.add(key);
          switch (key) {
            case 'era':
              result.add('eraYear');
              result.add('year');
              break;
            case 'eraYear':
              result.add('era');
              result.add('year');
              break;
            case 'year':
              result.add('era');
              result.add('eraYear');
              break;
            case 'month':
              result.add('monthCode');
              // See https://github.com/tc39/proposal-temporal/issues/1784
              if (this.helper.erasBeginMidYear) {
                result.add('era');
                result.add('eraYear');
              }
              break;
            case 'monthCode':
              result.add('month');
              if (this.helper.erasBeginMidYear) {
                result.add('era');
                result.add('eraYear');
              }
              break;
            case 'day':
              if (this.helper.erasBeginMidYear) {
                result.add('era');
                result.add('eraYear');
              }
              break;
          }
        }
        return arrayFromSet(result);
      }
    }, {
      key: "dateAdd",
      value: function dateAdd(isoDate, _ref6, overflow) {
        var years = _ref6.years,
          months = _ref6.months,
          weeks = _ref6.weeks,
          days = _ref6.days;
        var cache = OneObjectCache.getCacheForObject(isoDate);
        var calendarDate = this.helper.isoToCalendarDate(isoDate, cache);
        var added = this.helper.addCalendar(calendarDate, {
          years: years,
          months: months,
          weeks: weeks,
          days: days
        }, overflow, cache);
        var isoAdded = this.helper.calendarToIsoDate(added, 'constrain', cache);
        // The new object's cache starts with the cache of the old object
        if (!OneObjectCache.getCacheForObject(isoAdded)) {
          var newCache = new OneObjectCache(cache);
          newCache.setObject(isoAdded);
        }
        return isoAdded;
      }
    }, {
      key: "dateUntil",
      value: function dateUntil(one, two, largestUnit) {
        var cacheOne = OneObjectCache.getCacheForObject(one);
        var cacheTwo = OneObjectCache.getCacheForObject(two);
        var calendarOne = this.helper.isoToCalendarDate(one, cacheOne);
        var calendarTwo = this.helper.isoToCalendarDate(two, cacheTwo);
        var result = this.helper.untilCalendar(calendarOne, calendarTwo, largestUnit, cacheOne);
        return result;
      }
    }, {
      key: "isoToDate",
      value: function isoToDate(isoDate, requestedFields) {
        var cache = OneObjectCache.getCacheForObject(isoDate);
        var calendarDate = this.helper.isoToCalendarDate(isoDate, cache);
        if (requestedFields.dayOfWeek) {
          calendarDate.dayOfWeek = impl['iso8601'].isoToDate(isoDate, {
            dayOfWeek: true
          }).dayOfWeek;
        }
        if (requestedFields.dayOfYear) {
          var startOfYear = this.helper.startOfCalendarYear(calendarDate);
          var diffDays = this.helper.calendarDaysUntil(startOfYear, calendarDate, cache);
          calendarDate.dayOfYear = diffDays + 1;
        }
        if (requestedFields.weekOfYear) calendarDate.weekOfYear = calendarDateWeekOfYear(this.helper.id, isoDate);
        calendarDate.daysInWeek = 7;
        if (requestedFields.daysInMonth) calendarDate.daysInMonth = this.helper.daysInMonth(calendarDate, cache);
        if (requestedFields.daysInYear) {
          var startOfYearCalendar = this.helper.startOfCalendarYear(calendarDate);
          var startOfNextYearCalendar = this.helper.addCalendar(startOfYearCalendar, {
            years: 1
          }, 'constrain', cache);
          calendarDate.daysInYear = this.helper.calendarDaysUntil(startOfYearCalendar, startOfNextYearCalendar, cache);
        }
        if (requestedFields.monthsInYear) calendarDate.monthsInYear = this.helper.monthsInYear(calendarDate, cache);
        if (requestedFields.inLeapYear) calendarDate.inLeapYear = this.helper.inLeapYear(calendarDate, cache);
        return calendarDate;
      }
    }, {
      key: "getFirstDayOfWeek",
      value: function getFirstDayOfWeek() {
        return this.helper.getFirstDayOfWeek();
      }
    }, {
      key: "getMinimalDaysInFirstWeek",
      value: function getMinimalDaysInFirstWeek() {
        return this.helper.getMinimalDaysInFirstWeek();
      }
    }]);
    return NonIsoCalendar;
  }();
  for (var _i$1 = 0, _arr = [HebrewHelper, PersianHelper, EthiopicHelper, EthioaaHelper, CopticHelper, ChineseHelper, DangiHelper, RocHelper, IndianHelper, BuddhistHelper, GregoryHelper, JapaneseHelper, IslamicHelper, IslamicUmalquraHelper, IslamicTblaHelper, IslamicCivilHelper, IslamicRgsaHelper, IslamicCcHelper]; _i$1 < _arr.length; _i$1++) {
    var Helper = _arr[_i$1];
    var helper = new Helper();
    // Construct a new NonIsoCalendar instance with the given Helper implementation that contains
    // per-calendar logic.
    impl[helper.id] = new NonIsoCalendar(helper);
  }
  function calendarImpl(calendar) {
    return impl[calendar];
  }
  // Probably not what the intrinsics mechanism was intended for, but view this as
  // an export of calendarImpl while avoiding circular dependencies
  DefineIntrinsic('calendarImpl', calendarImpl);

  var _Intl$DurationFormat$, _Intl$DurationFormat, _Intl$DurationFormat2;
  // Save the original Intl.DateTimeFormat, it will likely be overwritten
  var OriginalIntlDateTimeFormat = Intl.DateTimeFormat;
  // Construction of built-in Intl.DateTimeFormat objects is sloooooow,
  // so we'll only create those instances when we need them.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=6528
  function getSlotLazy(obj, slot) {
    var val = GetSlot(obj, slot);
    if (typeof val === 'function') {
      // If we get here, `val` is an "amender function". It will take the user's
      // options and transform them into suitable options to be passed into the
      // built-in (non-polyfill) Intl.DateTimeFormat constructor. These options
      // will vary depending on the Temporal type, so that's why we store separate
      // formatters in separate props on the polyfill's DateTimeFormat instances.
      // The efficiency happens because we don't create an (expensive) formatter
      // until the user calls toLocaleString for that Temporal type.
      val = new OriginalIntlDateTimeFormat(GetSlot(obj, LOCALE), val(GetSlot(obj, OPTIONS)));
      ResetSlot(obj, slot, val);
    }
    return val;
  }
  function createDateTimeFormat(dtf, locale, optionsParam) {
    var hasOptions = typeof optionsParam !== 'undefined';
    var options;
    if (hasOptions) {
      // Read all the options in the expected order and copy them to a
      // null-prototype object with which we can do further operations
      // unobservably
      var props = ['localeMatcher', 'calendar', 'numberingSystem', 'hour12', 'hourCycle', 'timeZone', 'weekday', 'era', 'year', 'month', 'day', 'dayPeriod', 'hour', 'minute', 'second', 'fractionalSecondDigits', 'timeZoneName', 'formatMatcher', 'dateStyle', 'timeStyle'];
      options = ToObject(optionsParam);
      var newOptions = Object.create(null);
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
          newOptions[prop] = options[prop];
        }
      }
      options = newOptions;
    } else {
      options = Object.create(null);
    }
    var original = new OriginalIntlDateTimeFormat(locale, options);
    var ro = original.resolvedOptions();
    CreateSlots(dtf);
    // DateTimeFormat instances are very expensive to create. Therefore, they will
    // be lazily created only when needed, using the locale and options provided.
    // But it's possible for callers to mutate those inputs before lazy creation
    // happens. For this reason, we clone the inputs instead of caching the
    // original objects. To avoid the complexity of deep cloning any inputs that
    // are themselves objects (e.g. the locales array, or options property values
    // that will be coerced to strings), we rely on `resolvedOptions()` to do the
    // coercion and cloning for us. Unfortunately, we can't just use the resolved
    // options as-is because our options-amending logic adds additional fields if
    // the user doesn't supply any unit fields like year, month, day, hour, etc.
    // Therefore, we limit the properties in the clone to properties that were
    // present in the original input.
    if (hasOptions) {
      var clonedResolved = Object.assign(Object.create(null), ro);
      for (var _prop in clonedResolved) {
        if (!Object.prototype.hasOwnProperty.call(options, _prop)) {
          delete clonedResolved[_prop];
        }
      }
      // hour12/hourCycle don't show up in resolvedOptions() unless the chosen
      // format includes an hour component, so copy them explicitly in case they
      // would otherwise be lost
      clonedResolved.hour12 = options.hour12;
      clonedResolved.hourCycle = options.hourCycle;
      SetSlot(dtf, OPTIONS, clonedResolved);
    } else {
      SetSlot(dtf, OPTIONS, options);
    }
    SetSlot(dtf, LOCALE, ro.locale);
    SetSlot(dtf, ORIGINAL, original);
    SetSlot(dtf, TZ_CANONICAL, ro.timeZone);
    SetSlot(dtf, CAL_ID, ro.calendar);
    SetSlot(dtf, DATE, dateAmend);
    SetSlot(dtf, YM, yearMonthAmend);
    SetSlot(dtf, MD, monthDayAmend);
    SetSlot(dtf, TIME_FMT, timeAmend);
    SetSlot(dtf, DATETIME, datetimeAmend);
    SetSlot(dtf, INST, instantAmend);
    // Save the original time zone, for a few reasons:
    // - Clearer error messages
    // - More clearly follows the spec for InitializeDateTimeFormat
    // - Because it follows the spec more closely, will make it easier to integrate
    //   support of offset strings and other potential changes like proposal-canonical-tz.
    var timeZoneOption = hasOptions ? options.timeZone : undefined;
    if (timeZoneOption === undefined) {
      SetSlot(dtf, TZ_ORIGINAL, ro.timeZone);
    } else {
      var id = ToString(timeZoneOption);
      if (id.startsWith('−')) {
        // The initial (Node 23) implementation of offset time zones allowed use
        // of the Unicode minus sign, which was disallowed by a later spec change.
        throw new RangeError('Unicode minus (U+2212) is not supported in time zone offsets');
      }
      // store a normalized identifier
      SetSlot(dtf, TZ_ORIGINAL, ToTemporalTimeZoneIdentifier(id));
    }
    return undefined; // TODO: I couldn't satisfy TS without adding this. Is there another way?
  }
  function IsPatchedDateTimeFormat(item) {
    return HasSlot(item, ORIGINAL);
  }
  var DateTimeFormatImpl = /*#__PURE__*/function () {
    function DateTimeFormatImpl() {
      var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      _classCallCheck(this, DateTimeFormatImpl);
      createDateTimeFormat(this, locales, options);
    }
    _createClass(DateTimeFormatImpl, [{
      key: "format",
      get: function get() {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        var boundFormat = format.bind(this);
        Object.defineProperties(boundFormat, {
          length: {
            value: 1,
            enumerable: false,
            writable: false,
            configurable: true
          },
          name: {
            value: '',
            enumerable: false,
            writable: false,
            configurable: true
          }
        });
        return boundFormat;
      }
    }, {
      key: "formatRange",
      value: function formatRange(a, b) {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return _formatRange.call(this, a, b);
      }
    }, {
      key: "formatToParts",
      value: function formatToParts(datetime) {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }
        return _formatToParts.call.apply(_formatToParts, [this, datetime].concat(rest));
      }
    }, {
      key: "formatRangeToParts",
      value: function formatRangeToParts(a, b) {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return _formatRangeToParts.call(this, a, b);
      }
    }, {
      key: "resolvedOptions",
      value: function resolvedOptions() {
        CheckReceiver(this, IsPatchedDateTimeFormat);
        return _resolvedOptions.call(this);
      }
    }]);
    return DateTimeFormatImpl;
  }();
  if (!('formatToParts' in OriginalIntlDateTimeFormat.prototype)) {
    delete DateTimeFormatImpl.prototype.formatToParts;
  }
  if (!('formatRangeToParts' in OriginalIntlDateTimeFormat.prototype)) {
    delete DateTimeFormatImpl.prototype.formatRangeToParts;
  }
  // A non-class constructor is needed because Intl.DateTimeFormat must be able to
  // be called without 'new'
  var DateTimeFormat = function DateTimeFormat() {
    var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return new DateTimeFormatImpl(locales, options);
  };
  DateTimeFormatImpl.prototype.constructor = DateTimeFormat;
  Object.defineProperty(DateTimeFormat, 'prototype', {
    value: DateTimeFormatImpl.prototype,
    writable: false,
    enumerable: false,
    configurable: false
  });
  DateTimeFormat.supportedLocalesOf = OriginalIntlDateTimeFormat.supportedLocalesOf;
  MakeIntrinsicClass(DateTimeFormat, 'Intl.DateTimeFormat');
  function _resolvedOptions() {
    var resolved = GetSlot(this, ORIGINAL).resolvedOptions();
    resolved.timeZone = GetSlot(this, TZ_ORIGINAL);
    return resolved;
  }
  // TODO: investigate why there's a rest parameter here. Does this function really need to accept extra params?
  // And if so, why doesn't formatRange also accept extra params?
  function format(datetime) {
    var _formatter;
    var overrides = extractOverrides(datetime, this);
    var formatter, formatArgs;
    if (overrides.formatter) {
      formatter = overrides.formatter;
      formatArgs = [epochNsToMs(overrides.epochNs, 'floor')];
    } else {
      formatter = GetSlot(this, ORIGINAL);
      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }
      formatArgs = [datetime].concat(rest);
    }
    return (_formatter = formatter).format.apply(_formatter, _toConsumableArray(formatArgs));
  }
  function _formatToParts(datetime) {
    var _formatter2;
    var overrides = extractOverrides(datetime, this);
    var formatter, formatArgs;
    if (overrides.formatter) {
      formatter = overrides.formatter;
      formatArgs = [epochNsToMs(overrides.epochNs, 'floor')];
    } else {
      formatter = GetSlot(this, ORIGINAL);
      for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        rest[_key3 - 1] = arguments[_key3];
      }
      formatArgs = [datetime].concat(rest);
    }
    return (_formatter2 = formatter).formatToParts.apply(_formatter2, _toConsumableArray(formatArgs));
  }
  function _formatRange(aParam, bParam) {
    var _formatter3;
    if (aParam === undefined || bParam === undefined) {
      throw new TypeError('Intl.DateTimeFormat.formatRange requires two values');
    }
    var a = toDateTimeFormattable(aParam);
    var b = toDateTimeFormattable(bParam);
    var formatArgs = [a, b];
    var formatter;
    if (isTemporalObject(a) !== isTemporalObject(b)) {
      throw new TypeError('Intl.DateTimeFormat.formatRange accepts two values of the same type');
    }
    if (isTemporalObject(a)) {
      if (!sameTemporalType(a, b)) {
        throw new TypeError('Intl.DateTimeFormat.formatRange accepts two values of the same type');
      }
      var _extractOverrides = extractOverrides(a, this),
        aa = _extractOverrides.epochNs,
        aformatter = _extractOverrides.formatter;
      var _extractOverrides2 = extractOverrides(b, this),
        bb = _extractOverrides2.epochNs,
        bformatter = _extractOverrides2.formatter;
      if (aformatter) {
        assert(bformatter == aformatter, 'formatters for same Temporal type should be identical');
        formatter = aformatter;
        formatArgs = [epochNsToMs(aa, 'floor'), epochNsToMs(bb, 'floor')];
      }
    }
    if (!formatter) {
      formatter = GetSlot(this, ORIGINAL);
    }
    return (_formatter3 = formatter).formatRange.apply(_formatter3, _toConsumableArray(formatArgs));
  }
  function _formatRangeToParts(aParam, bParam) {
    var _formatter4;
    if (aParam === undefined || bParam === undefined) {
      throw new TypeError('Intl.DateTimeFormat.formatRange requires two values');
    }
    var a = toDateTimeFormattable(aParam);
    var b = toDateTimeFormattable(bParam);
    var formatArgs = [a, b];
    var formatter;
    if (isTemporalObject(a) !== isTemporalObject(b)) {
      throw new TypeError('Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type');
    }
    if (isTemporalObject(a)) {
      if (!sameTemporalType(a, b)) {
        throw new TypeError('Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type');
      }
      var _extractOverrides3 = extractOverrides(a, this),
        aa = _extractOverrides3.epochNs,
        aformatter = _extractOverrides3.formatter;
      var _extractOverrides4 = extractOverrides(b, this),
        bb = _extractOverrides4.epochNs,
        bformatter = _extractOverrides4.formatter;
      if (aformatter) {
        assert(bformatter == aformatter, 'formatters for same Temporal type should be identical');
        formatter = aformatter;
        formatArgs = [epochNsToMs(aa, 'floor'), epochNsToMs(bb, 'floor')];
      }
    }
    if (!formatter) {
      formatter = GetSlot(this, ORIGINAL);
    }
    return (_formatter4 = formatter).formatRangeToParts.apply(_formatter4, _toConsumableArray(formatArgs));
  }
  function amend() {
    var optionsParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var amended = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = Object.assign({}, optionsParam);
    var props = ['year', 'month', 'day', 'hour', 'minute', 'second', 'weekday', 'dayPeriod', 'timeZoneName', 'dateStyle', 'timeStyle'];
    for (var i = 0; i < props.length; i++) {
      var opt = props[i];
      options[opt] = opt in amended ? amended[opt] : options[opt];
      if (options[opt] === false || options[opt] === undefined) delete options[opt];
    }
    return options;
  }
  function timeAmend(originalOptions) {
    var options = amend(originalOptions, {
      year: false,
      month: false,
      day: false,
      weekday: false,
      timeZoneName: false,
      dateStyle: false
    });
    if (options.timeStyle === 'long' || options.timeStyle === 'full') {
      // Try to fake what timeStyle should do if not printing the time zone name
      delete options.timeStyle;
      Object.assign(options, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    if (!hasTimeOptions(options)) {
      if (hasAnyDateTimeOptions(originalOptions)) {
        throw new TypeError("cannot format Temporal.PlainTime with options [".concat(Object.keys(originalOptions), "]"));
      }
      Object.assign(options, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
    }
    return options;
  }
  function yearMonthAmend(originalOptions) {
    // Try to fake what dateStyle should do for dates without a day. This is not
    // accurate for locales that always print the era
    var dateStyleHacks = {
      short: {
        year: '2-digit',
        month: 'numeric'
      },
      medium: {
        year: 'numeric',
        month: 'short'
      },
      long: {
        year: 'numeric',
        month: 'long'
      },
      full: {
        year: 'numeric',
        month: 'long'
      }
    };
    var options = amend(originalOptions, {
      day: false,
      hour: false,
      minute: false,
      second: false,
      weekday: false,
      dayPeriod: false,
      timeZoneName: false,
      timeStyle: false
    });
    if ('dateStyle' in options && options.dateStyle) {
      var style = options.dateStyle;
      delete options.dateStyle;
      Object.assign(options, dateStyleHacks[style]);
    }
    if (!('year' in options || 'month' in options || 'era' in options)) {
      if (hasAnyDateTimeOptions(originalOptions)) {
        throw new TypeError("cannot format PlainYearMonth with options [".concat(Object.keys(originalOptions), "]"));
      }
      Object.assign(options, {
        year: 'numeric',
        month: 'numeric'
      });
    }
    return options;
  }
  function monthDayAmend(originalOptions) {
    // Try to fake what dateStyle should do for dates without a day
    var dateStyleHacks = {
      short: {
        month: 'numeric',
        day: 'numeric'
      },
      medium: {
        month: 'short',
        day: 'numeric'
      },
      long: {
        month: 'long',
        day: 'numeric'
      },
      full: {
        month: 'long',
        day: 'numeric'
      }
    };
    var options = amend(originalOptions, {
      year: false,
      hour: false,
      minute: false,
      second: false,
      weekday: false,
      dayPeriod: false,
      timeZoneName: false,
      timeStyle: false
    });
    if ('dateStyle' in options && options.dateStyle) {
      var style = options.dateStyle;
      delete options.dateStyle;
      Object.assign(options, dateStyleHacks[style]);
    }
    if (!('month' in options || 'day' in options)) {
      if (hasAnyDateTimeOptions(originalOptions)) {
        throw new TypeError("cannot format PlainMonthDay with options [".concat(Object.keys(originalOptions), "]"));
      }
      Object.assign(options, {
        month: 'numeric',
        day: 'numeric'
      });
    }
    return options;
  }
  function dateAmend(originalOptions) {
    var options = amend(originalOptions, {
      hour: false,
      minute: false,
      second: false,
      dayPeriod: false,
      timeZoneName: false,
      timeStyle: false
    });
    if (!hasDateOptions(options)) {
      if (hasAnyDateTimeOptions(originalOptions)) {
        throw new TypeError("cannot format PlainDate with options [".concat(Object.keys(originalOptions), "]"));
      }
      Object.assign(options, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
    }
    return options;
  }
  function datetimeAmend(originalOptions) {
    var options = amend(originalOptions, {
      timeZoneName: false
    });
    if (options.timeStyle === 'long' || options.timeStyle === 'full') {
      // Try to fake what timeStyle should do if not printing the time zone name
      delete options.timeStyle;
      Object.assign(options, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });
      // If moving to a fake timeStyle while dateStyle is present, we also have to
      // move to a fake dateStyle. dateStyle is mutually exclusive with hour etc.
      if (options.dateStyle) {
        var dateStyleHacks = {
          short: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          },
          medium: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          },
          full: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          }
        };
        Object.assign(options, dateStyleHacks[options.dateStyle]);
        delete options.dateStyle;
      }
    }
    if (!hasTimeOptions(options) && !hasDateOptions(options)) {
      if (hasAnyDateTimeOptions(originalOptions)) {
        throw new TypeError("cannot format PlainDateTime with options [".concat(Object.keys(originalOptions), "]"));
      }
      Object.assign(options, {
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
  function instantAmend(optionsParam) {
    var options = optionsParam;
    if (!hasTimeOptions(options) && !hasDateOptions(options)) {
      options = Object.assign({}, options, {
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
    return 'year' in options || 'month' in options || 'day' in options || 'weekday' in options || 'dateStyle' in options || 'era' in options;
  }
  function hasTimeOptions(options) {
    return 'hour' in options || 'minute' in options || 'second' in options || 'timeStyle' in options || 'dayPeriod' in options || 'fractionalSecondDigits' in options;
  }
  function hasAnyDateTimeOptions(originalOptions) {
    return hasDateOptions(originalOptions) || hasTimeOptions(originalOptions) || 'dateStyle' in originalOptions || 'timeStyle' in originalOptions || 'timeZoneName' in originalOptions;
  }
  function isTemporalObject(obj) {
    return IsTemporalDate(obj) || IsTemporalTime(obj) || IsTemporalDateTime(obj) || IsTemporalZonedDateTime(obj) || IsTemporalYearMonth(obj) || IsTemporalMonthDay(obj) || IsTemporalInstant(obj);
  }
  function toDateTimeFormattable(value) {
    if (isTemporalObject(value)) return value;
    return ToNumber(value);
  }
  function sameTemporalType(x, y) {
    if (!isTemporalObject(x) || !isTemporalObject(y)) return false;
    if (IsTemporalTime(x) && !IsTemporalTime(y)) return false;
    if (IsTemporalDate(x) && !IsTemporalDate(y)) return false;
    if (IsTemporalDateTime(x) && !IsTemporalDateTime(y)) return false;
    if (IsTemporalZonedDateTime(x) && !IsTemporalZonedDateTime(y)) return false;
    if (IsTemporalYearMonth(x) && !IsTemporalYearMonth(y)) return false;
    if (IsTemporalMonthDay(x) && !IsTemporalMonthDay(y)) return false;
    if (IsTemporalInstant(x) && !IsTemporalInstant(y)) return false;
    return true;
  }
  function extractOverrides(temporalObj, main) {
    if (IsTemporalTime(temporalObj)) {
      var isoDateTime = {
        isoDate: {
          year: 1970,
          month: 1,
          day: 1
        },
        time: GetSlot(temporalObj, TIME)
      };
      return {
        epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), isoDateTime, 'compatible'),
        formatter: getSlotLazy(main, TIME_FMT)
      };
    }
    if (IsTemporalYearMonth(temporalObj)) {
      var calendar = GetSlot(temporalObj, CALENDAR);
      var mainCalendar = GetSlot(main, CAL_ID);
      if (calendar !== mainCalendar) {
        throw new RangeError("cannot format PlainYearMonth with calendar ".concat(calendar, " in locale with calendar ").concat(mainCalendar));
      }
      var _isoDateTime = CombineISODateAndTimeRecord(GetSlot(temporalObj, ISO_DATE), NoonTimeRecord());
      return {
        epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), _isoDateTime, 'compatible'),
        formatter: getSlotLazy(main, YM)
      };
    }
    if (IsTemporalMonthDay(temporalObj)) {
      var _calendar = GetSlot(temporalObj, CALENDAR);
      var _mainCalendar = GetSlot(main, CAL_ID);
      if (_calendar !== _mainCalendar) {
        throw new RangeError("cannot format PlainMonthDay with calendar ".concat(_calendar, " in locale with calendar ").concat(_mainCalendar));
      }
      var _isoDateTime2 = CombineISODateAndTimeRecord(GetSlot(temporalObj, ISO_DATE), NoonTimeRecord());
      return {
        epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), _isoDateTime2, 'compatible'),
        formatter: getSlotLazy(main, MD)
      };
    }
    if (IsTemporalDate(temporalObj)) {
      var _calendar2 = GetSlot(temporalObj, CALENDAR);
      var _mainCalendar2 = GetSlot(main, CAL_ID);
      if (_calendar2 !== 'iso8601' && _calendar2 !== _mainCalendar2) {
        throw new RangeError("cannot format PlainDate with calendar ".concat(_calendar2, " in locale with calendar ").concat(_mainCalendar2));
      }
      var _isoDateTime3 = CombineISODateAndTimeRecord(GetSlot(temporalObj, ISO_DATE), NoonTimeRecord());
      return {
        epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), _isoDateTime3, 'compatible'),
        formatter: getSlotLazy(main, DATE)
      };
    }
    if (IsTemporalDateTime(temporalObj)) {
      var _calendar3 = GetSlot(temporalObj, CALENDAR);
      var _mainCalendar3 = GetSlot(main, CAL_ID);
      if (_calendar3 !== 'iso8601' && _calendar3 !== _mainCalendar3) {
        throw new RangeError("cannot format PlainDateTime with calendar ".concat(_calendar3, " in locale with calendar ").concat(_mainCalendar3));
      }
      var _isoDateTime4 = GetSlot(temporalObj, ISO_DATE_TIME);
      return {
        epochNs: GetEpochNanosecondsFor(GetSlot(main, TZ_CANONICAL), _isoDateTime4, 'compatible'),
        formatter: getSlotLazy(main, DATETIME)
      };
    }
    if (IsTemporalZonedDateTime(temporalObj)) {
      throw new TypeError('Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.');
    }
    if (IsTemporalInstant(temporalObj)) {
      return {
        epochNs: GetSlot(temporalObj, EPOCHNANOSECONDS),
        formatter: getSlotLazy(main, INST)
      };
    }
    return {};
  }
  function temporalDurationToCompatibilityRecord(duration) {
    var record = Object.create(null);
    record.years = GetSlot(duration, YEARS);
    record.months = GetSlot(duration, MONTHS);
    record.weeks = GetSlot(duration, WEEKS);
    record.days = GetSlot(duration, DAYS);
    record.hours = GetSlot(duration, HOURS);
    record.minutes = GetSlot(duration, MINUTES);
    record.seconds = GetSlot(duration, SECONDS);
    record.milliseconds = GetSlot(duration, MILLISECONDS);
    record.microseconds = GetSlot(duration, MICROSECONDS);
    record.nanoseconds = GetSlot(duration, NANOSECONDS);
    return record;
  }
  var _ref = (_Intl$DurationFormat$ = (_Intl$DurationFormat = Intl.DurationFormat) === null || _Intl$DurationFormat === void 0 ? void 0 : _Intl$DurationFormat.prototype) !== null && _Intl$DurationFormat$ !== void 0 ? _Intl$DurationFormat$ : Object.create(null),
    IntlDurationFormatPrototypeFormat = _ref.format,
    IntlDurationFormatPrototypeFormatToParts = _ref.formatToParts;
  function ModifiedIntlDurationFormatPrototypeFormat(durationLike) {
    Intl.DurationFormat.prototype.resolvedOptions.call(this); // brand check
    var duration = ToTemporalDuration(durationLike);
    var record = temporalDurationToCompatibilityRecord(duration);
    return IntlDurationFormatPrototypeFormat.call(this, record);
  }
  if ((_Intl$DurationFormat2 = Intl.DurationFormat) !== null && _Intl$DurationFormat2 !== void 0 && _Intl$DurationFormat2.prototype) {
    Intl.DurationFormat.prototype.format = ModifiedIntlDurationFormatPrototypeFormat;
    Intl.DurationFormat.prototype.formatToParts = function formatToParts(durationLike) {
      Intl.DurationFormat.prototype.resolvedOptions.call(this); // brand check
      var duration = ToTemporalDuration(durationLike);
      var record = temporalDurationToCompatibilityRecord(duration);
      return IntlDurationFormatPrototypeFormatToParts.call(this, record);
    };
  }

  var intl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DateTimeFormat: DateTimeFormat,
    ModifiedIntlDurationFormatPrototypeFormat: ModifiedIntlDurationFormatPrototypeFormat
  });

  var Instant = /*#__PURE__*/function () {
    function Instant(epochNanoseconds) {
      _classCallCheck(this, Instant);
      // Note: if the argument is not passed, ToBigInt(undefined) will throw. This check exists only
      //       to improve the error message.
      if (arguments.length < 1) {
        throw new TypeError('missing argument: epochNanoseconds is required');
      }
      var ns = ToBigInt(epochNanoseconds);
      CreateTemporalInstantSlots(this, ns);
    }
    _createClass(Instant, [{
      key: "epochMilliseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalInstant);
        var value = GetSlot(this, EPOCHNANOSECONDS);
        return epochNsToMs(value, 'floor');
      }
    }, {
      key: "epochNanoseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalInstant);
        return ToBigIntExternal(JSBI.BigInt(GetSlot(this, EPOCHNANOSECONDS)));
      }
    }, {
      key: "add",
      value: function add(temporalDurationLike) {
        CheckReceiver(this, IsTemporalInstant);
        return AddDurationToInstant('add', this, temporalDurationLike);
      }
    }, {
      key: "subtract",
      value: function subtract(temporalDurationLike) {
        CheckReceiver(this, IsTemporalInstant);
        return AddDurationToInstant('subtract', this, temporalDurationLike);
      }
    }, {
      key: "until",
      value: function until(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalInstant);
        return DifferenceTemporalInstant('until', this, other, options);
      }
    }, {
      key: "since",
      value: function since(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalInstant);
        return DifferenceTemporalInstant('since', this, other, options);
      }
    }, {
      key: "round",
      value: function round(roundToParam) {
        CheckReceiver(this, IsTemporalInstant);
        if (roundToParam === undefined) throw new TypeError('options parameter is required');
        var roundTo = typeof roundToParam === 'string' ? CreateOnePropObject('smallestUnit', roundToParam) : GetOptionsObject(roundToParam);
        var roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        var roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        var smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED);
        var maximumIncrements = {
          hour: 24,
          minute: 1440,
          second: 86400,
          millisecond: 86400e3,
          microsecond: 86400e6,
          nanosecond: 86400e9
        };
        ValidateTemporalRoundingIncrement(roundingIncrement, maximumIncrements[smallestUnit], true);
        var ns = GetSlot(this, EPOCHNANOSECONDS);
        var roundedNs = RoundTemporalInstant(ns, roundingIncrement, smallestUnit, roundingMode);
        return CreateTemporalInstant(roundedNs);
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalInstant);
        var other = ToTemporalInstant(otherParam);
        var one = GetSlot(this, EPOCHNANOSECONDS);
        var two = GetSlot(other, EPOCHNANOSECONDS);
        return JSBI.equal(JSBI.BigInt(one), JSBI.BigInt(two));
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalInstant);
        var resolvedOptions = GetOptionsObject(options);
        var digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        var roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        var smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour') throw new RangeError('smallestUnit must be a time unit other than "hour"');
        var timeZone = resolvedOptions.timeZone;
        if (timeZone !== undefined) timeZone = ToTemporalTimeZoneIdentifier(timeZone);
        var _ES$ToSecondsStringPr = ToSecondsStringPrecisionRecord(smallestUnit, digits),
          precision = _ES$ToSecondsStringPr.precision,
          unit = _ES$ToSecondsStringPr.unit,
          increment = _ES$ToSecondsStringPr.increment;
        var ns = GetSlot(this, EPOCHNANOSECONDS);
        var roundedNs = RoundTemporalInstant(ns, increment, unit, roundingMode);
        var roundedInstant = CreateTemporalInstant(roundedNs);
        return TemporalInstantToString(roundedInstant, timeZone, precision);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalInstant);
        return TemporalInstantToString(this, undefined, 'auto');
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalInstant);
        return new DateTimeFormat(locales, options).format(this);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('Instant');
      }
    }, {
      key: "toZonedDateTimeISO",
      value: function toZonedDateTimeISO(timeZoneParam) {
        CheckReceiver(this, IsTemporalInstant);
        var timeZone = ToTemporalTimeZoneIdentifier(timeZoneParam);
        return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone, 'iso8601');
      }
    }], [{
      key: "fromEpochMilliseconds",
      value: function fromEpochMilliseconds(epochMilliseconds) {
        var epochNanoseconds = epochMsToNs(ToNumber(epochMilliseconds));
        return CreateTemporalInstant(epochNanoseconds);
      }
    }, {
      key: "fromEpochNanoseconds",
      value: function fromEpochNanoseconds(epochNanosecondsParam) {
        var epochNanoseconds = ToBigInt(epochNanosecondsParam);
        return CreateTemporalInstant(epochNanoseconds);
      }
    }, {
      key: "from",
      value: function from(item) {
        return ToTemporalInstant(item);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var one = ToTemporalInstant(oneParam);
        var two = ToTemporalInstant(twoParam);
        var oneNs = GetSlot(one, EPOCHNANOSECONDS);
        var twoNs = GetSlot(two, EPOCHNANOSECONDS);
        if (JSBI.lessThan(oneNs, twoNs)) return -1;
        if (JSBI.greaterThan(oneNs, twoNs)) return 1;
        return 0;
      }
    }]);
    return Instant;
  }();
  MakeIntrinsicClass(Instant, 'Temporal.Instant');

  var PlainDate = /*#__PURE__*/function () {
    function PlainDate(isoYear, isoMonth, isoDay) {
      var calendarParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'iso8601';
      _classCallCheck(this, PlainDate);
      var year = ToIntegerWithTruncation(isoYear);
      var month = ToIntegerWithTruncation(isoMonth);
      var day = ToIntegerWithTruncation(isoDay);
      var calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
      RejectISODate(year, month, day);
      CreateTemporalDateSlots(this, {
        year: year,
        month: month,
        day: day
      }, calendar);
    }
    _createClass(PlainDate, [{
      key: "calendarId",
      get: function get() {
        CheckReceiver(this, IsTemporalDate);
        return GetSlot(this, CALENDAR);
      }
    }, {
      key: "era",
      get: function get() {
        return getCalendarProperty$4(this, 'era');
      }
    }, {
      key: "eraYear",
      get: function get() {
        return getCalendarProperty$4(this, 'eraYear');
      }
    }, {
      key: "year",
      get: function get() {
        return getCalendarProperty$4(this, 'year');
      }
    }, {
      key: "month",
      get: function get() {
        return getCalendarProperty$4(this, 'month');
      }
    }, {
      key: "monthCode",
      get: function get() {
        return getCalendarProperty$4(this, 'monthCode');
      }
    }, {
      key: "day",
      get: function get() {
        return getCalendarProperty$4(this, 'day');
      }
    }, {
      key: "dayOfWeek",
      get: function get() {
        return getCalendarProperty$4(this, 'dayOfWeek');
      }
    }, {
      key: "dayOfYear",
      get: function get() {
        return getCalendarProperty$4(this, 'dayOfYear');
      }
    }, {
      key: "weekOfYear",
      get: function get() {
        var _getCalendarProperty;
        return (_getCalendarProperty = getCalendarProperty$4(this, 'weekOfYear')) === null || _getCalendarProperty === void 0 ? void 0 : _getCalendarProperty.week;
      }
    }, {
      key: "yearOfWeek",
      get: function get() {
        var _getCalendarProperty2;
        return (_getCalendarProperty2 = getCalendarProperty$4(this, 'weekOfYear')) === null || _getCalendarProperty2 === void 0 ? void 0 : _getCalendarProperty2.year;
      }
    }, {
      key: "daysInWeek",
      get: function get() {
        return getCalendarProperty$4(this, 'daysInWeek');
      }
    }, {
      key: "daysInMonth",
      get: function get() {
        return getCalendarProperty$4(this, 'daysInMonth');
      }
    }, {
      key: "daysInYear",
      get: function get() {
        return getCalendarProperty$4(this, 'daysInYear');
      }
    }, {
      key: "monthsInYear",
      get: function get() {
        return getCalendarProperty$4(this, 'monthsInYear');
      }
    }, {
      key: "inLeapYear",
      get: function get() {
        return getCalendarProperty$4(this, 'inLeapYear');
      }
    }, {
      key: "with",
      value: function _with(temporalDateLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDate);
        if (!IsObject(temporalDateLike)) {
          throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalDateLike);
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE));
        var partialDate = PrepareCalendarFields(calendar, temporalDateLike, ['year', 'month', 'monthCode', 'day'], [], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialDate);
        var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        var isoDate = CalendarDateFromFields(calendar, fields, overflow);
        return CreateTemporalDate(isoDate, calendar);
      }
    }, {
      key: "withCalendar",
      value: function withCalendar(calendarParam) {
        CheckReceiver(this, IsTemporalDate);
        var calendar = ToTemporalCalendarIdentifier(calendarParam);
        return CreateTemporalDate(GetSlot(this, ISO_DATE), calendar);
      }
    }, {
      key: "add",
      value: function add(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDate);
        return AddDurationToDate('add', this, temporalDurationLike, options);
      }
    }, {
      key: "subtract",
      value: function subtract(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDate);
        return AddDurationToDate('subtract', this, temporalDurationLike, options);
      }
    }, {
      key: "until",
      value: function until(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDate);
        return DifferenceTemporalPlainDate('until', this, other, options);
      }
    }, {
      key: "since",
      value: function since(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDate);
        return DifferenceTemporalPlainDate('since', this, other, options);
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalDate);
        var other = ToTemporalDate(otherParam);
        if (CompareISODate(GetSlot(this, ISO_DATE), GetSlot(other, ISO_DATE)) !== 0) return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalDate);
        var resolvedOptions = GetOptionsObject(options);
        var showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        return TemporalDateToString(this, showCalendar);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalDate);
        return TemporalDateToString(this);
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDate);
        return new DateTimeFormat(locales, options).format(this);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('PlainDate');
      }
    }, {
      key: "toPlainDateTime",
      value: function toPlainDateTime() {
        var temporalTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalDate);
        var time = ToTimeRecordOrMidnight(temporalTime);
        var isoDateTime = CombineISODateAndTimeRecord(GetSlot(this, ISO_DATE), time);
        return CreateTemporalDateTime(isoDateTime, GetSlot(this, CALENDAR));
      }
    }, {
      key: "toZonedDateTime",
      value: function toZonedDateTime(item) {
        CheckReceiver(this, IsTemporalDate);
        var timeZone, temporalTime;
        if (IsObject(item)) {
          var timeZoneLike = item.timeZone;
          if (timeZoneLike === undefined) {
            timeZone = ToTemporalTimeZoneIdentifier(item);
          } else {
            timeZone = ToTemporalTimeZoneIdentifier(timeZoneLike);
            temporalTime = item.plainTime;
          }
        } else {
          timeZone = ToTemporalTimeZoneIdentifier(item);
        }
        var isoDate = GetSlot(this, ISO_DATE);
        var epochNs;
        if (temporalTime === undefined) {
          epochNs = GetStartOfDay(timeZone, isoDate);
        } else {
          temporalTime = ToTemporalTime(temporalTime);
          var isoDateTime = CombineISODateAndTimeRecord(isoDate, GetSlot(temporalTime, TIME));
          epochNs = GetEpochNanosecondsFor(timeZone, isoDateTime, 'compatible');
        }
        return CreateTemporalZonedDateTime(epochNs, timeZone, GetSlot(this, CALENDAR));
      }
    }, {
      key: "toPlainYearMonth",
      value: function toPlainYearMonth() {
        CheckReceiver(this, IsTemporalDate);
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE));
        var isoDate = CalendarYearMonthFromFields(calendar, fields, 'constrain');
        return CreateTemporalYearMonth(isoDate, calendar);
      }
    }, {
      key: "toPlainMonthDay",
      value: function toPlainMonthDay() {
        CheckReceiver(this, IsTemporalDate);
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE));
        var isoDate = CalendarMonthDayFromFields(calendar, fields, 'constrain');
        return CreateTemporalMonthDay(isoDate, calendar);
      }
    }], [{
      key: "from",
      value: function from(item) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return ToTemporalDate(item, options);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var one = ToTemporalDate(oneParam);
        var two = ToTemporalDate(twoParam);
        return CompareISODate(GetSlot(one, ISO_DATE), GetSlot(two, ISO_DATE));
      }
    }]);
    return PlainDate;
  }();
  MakeIntrinsicClass(PlainDate, 'Temporal.PlainDate');
  function getCalendarProperty$4(date, prop) {
    CheckReceiver(date, IsTemporalDate);
    var isoDate = GetSlot(date, ISO_DATE);
    return calendarImplForObj(date).isoToDate(isoDate, _defineProperty({}, prop, true))[prop];
  }

  var PlainDateTime = /*#__PURE__*/function () {
    function PlainDateTime(isoYear, isoMonth, isoDay) {
      var hourParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var minuteParam = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var secondParam = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var millisecondParam = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var microsecondParam = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var nanosecondParam = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      var calendarParam = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 'iso8601';
      _classCallCheck(this, PlainDateTime);
      var year = ToIntegerWithTruncation(isoYear);
      var month = ToIntegerWithTruncation(isoMonth);
      var day = ToIntegerWithTruncation(isoDay);
      var hour = hourParam === undefined ? 0 : ToIntegerWithTruncation(hourParam);
      var minute = minuteParam === undefined ? 0 : ToIntegerWithTruncation(minuteParam);
      var second = secondParam === undefined ? 0 : ToIntegerWithTruncation(secondParam);
      var millisecond = millisecondParam === undefined ? 0 : ToIntegerWithTruncation(millisecondParam);
      var microsecond = microsecondParam === undefined ? 0 : ToIntegerWithTruncation(microsecondParam);
      var nanosecond = nanosecondParam === undefined ? 0 : ToIntegerWithTruncation(nanosecondParam);
      var calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
      RejectDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond);
      CreateTemporalDateTimeSlots(this, {
        isoDate: {
          year: year,
          month: month,
          day: day
        },
        time: {
          hour: hour,
          minute: minute,
          second: second,
          millisecond: millisecond,
          microsecond: microsecond,
          nanosecond: nanosecond
        }
      }, calendar);
    }
    _createClass(PlainDateTime, [{
      key: "calendarId",
      get: function get() {
        CheckReceiver(this, IsTemporalDateTime);
        return GetSlot(this, CALENDAR);
      }
    }, {
      key: "year",
      get: function get() {
        return getCalendarProperty$3(this, 'year');
      }
    }, {
      key: "month",
      get: function get() {
        return getCalendarProperty$3(this, 'month');
      }
    }, {
      key: "monthCode",
      get: function get() {
        return getCalendarProperty$3(this, 'monthCode');
      }
    }, {
      key: "day",
      get: function get() {
        return getCalendarProperty$3(this, 'day');
      }
    }, {
      key: "hour",
      get: function get() {
        return getTimeProperty$1(this, 'hour');
      }
    }, {
      key: "minute",
      get: function get() {
        return getTimeProperty$1(this, 'minute');
      }
    }, {
      key: "second",
      get: function get() {
        return getTimeProperty$1(this, 'second');
      }
    }, {
      key: "millisecond",
      get: function get() {
        return getTimeProperty$1(this, 'millisecond');
      }
    }, {
      key: "microsecond",
      get: function get() {
        return getTimeProperty$1(this, 'microsecond');
      }
    }, {
      key: "nanosecond",
      get: function get() {
        return getTimeProperty$1(this, 'nanosecond');
      }
    }, {
      key: "era",
      get: function get() {
        return getCalendarProperty$3(this, 'era');
      }
    }, {
      key: "eraYear",
      get: function get() {
        return getCalendarProperty$3(this, 'eraYear');
      }
    }, {
      key: "dayOfWeek",
      get: function get() {
        return getCalendarProperty$3(this, 'dayOfWeek');
      }
    }, {
      key: "dayOfYear",
      get: function get() {
        return getCalendarProperty$3(this, 'dayOfYear');
      }
    }, {
      key: "weekOfYear",
      get: function get() {
        var _getCalendarProperty;
        return (_getCalendarProperty = getCalendarProperty$3(this, 'weekOfYear')) === null || _getCalendarProperty === void 0 ? void 0 : _getCalendarProperty.week;
      }
    }, {
      key: "yearOfWeek",
      get: function get() {
        var _getCalendarProperty2;
        return (_getCalendarProperty2 = getCalendarProperty$3(this, 'weekOfYear')) === null || _getCalendarProperty2 === void 0 ? void 0 : _getCalendarProperty2.year;
      }
    }, {
      key: "daysInWeek",
      get: function get() {
        return getCalendarProperty$3(this, 'daysInWeek');
      }
    }, {
      key: "daysInYear",
      get: function get() {
        return getCalendarProperty$3(this, 'daysInYear');
      }
    }, {
      key: "daysInMonth",
      get: function get() {
        return getCalendarProperty$3(this, 'daysInMonth');
      }
    }, {
      key: "monthsInYear",
      get: function get() {
        return getCalendarProperty$3(this, 'monthsInYear');
      }
    }, {
      key: "inLeapYear",
      get: function get() {
        return getCalendarProperty$3(this, 'inLeapYear');
      }
    }, {
      key: "with",
      value: function _with(temporalDateTimeLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        if (!IsObject(temporalDateTimeLike)) {
          throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalDateTimeLike);
        var calendar = GetSlot(this, CALENDAR);
        var isoDateTime = GetSlot(this, ISO_DATE_TIME);
        var fields = _objectSpread2(_objectSpread2({}, ISODateToFields(calendar, isoDateTime.isoDate)), isoDateTime.time);
        var partialDateTime = PrepareCalendarFields(calendar, temporalDateTimeLike, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond'], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialDateTime);
        var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        var newDateTime = InterpretTemporalDateTimeFields(calendar, fields, overflow);
        return CreateTemporalDateTime(newDateTime, calendar);
      }
    }, {
      key: "withPlainTime",
      value: function withPlainTime() {
        var temporalTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        var time = ToTimeRecordOrMidnight(temporalTime);
        var isoDateTime = CombineISODateAndTimeRecord(GetSlot(this, ISO_DATE_TIME).isoDate, time);
        return CreateTemporalDateTime(isoDateTime, GetSlot(this, CALENDAR));
      }
    }, {
      key: "withCalendar",
      value: function withCalendar(calendarParam) {
        CheckReceiver(this, IsTemporalDateTime);
        var calendar = ToTemporalCalendarIdentifier(calendarParam);
        return CreateTemporalDateTime(GetSlot(this, ISO_DATE_TIME), calendar);
      }
    }, {
      key: "add",
      value: function add(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        return AddDurationToDateTime('add', this, temporalDurationLike, options);
      }
    }, {
      key: "subtract",
      value: function subtract(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        return AddDurationToDateTime('subtract', this, temporalDurationLike, options);
      }
    }, {
      key: "until",
      value: function until(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        return DifferenceTemporalPlainDateTime('until', this, other, options);
      }
    }, {
      key: "since",
      value: function since(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        return DifferenceTemporalPlainDateTime('since', this, other, options);
      }
    }, {
      key: "round",
      value: function round(roundToParam) {
        CheckReceiver(this, IsTemporalDateTime);
        if (roundToParam === undefined) throw new TypeError('options parameter is required');
        var roundTo = typeof roundToParam === 'string' ? CreateOnePropObject('smallestUnit', roundToParam) : GetOptionsObject(roundToParam);
        var roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        var roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        var smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED, ['day']);
        var maximumIncrements = {
          day: 1,
          hour: 24,
          minute: 60,
          second: 60,
          millisecond: 1000,
          microsecond: 1000,
          nanosecond: 1000
        };
        var maximum = maximumIncrements[smallestUnit];
        var inclusive = maximum === 1;
        ValidateTemporalRoundingIncrement(roundingIncrement, maximum, inclusive);
        var isoDateTime = GetSlot(this, ISO_DATE_TIME);
        if (roundingIncrement === 1 && smallestUnit === 'nanosecond') {
          return CreateTemporalDateTime(isoDateTime, GetSlot(this, CALENDAR));
        }
        var result = RoundISODateTime(isoDateTime, roundingIncrement, smallestUnit, roundingMode);
        return CreateTemporalDateTime(result, GetSlot(this, CALENDAR));
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalDateTime);
        var other = ToTemporalDateTime(otherParam);
        if (CompareISODateTime(GetSlot(this, ISO_DATE_TIME), GetSlot(other, ISO_DATE_TIME)) !== 0) return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        var resolvedOptions = GetOptionsObject(options);
        var showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        var digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        var roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        var smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour') throw new RangeError('smallestUnit must be a time unit other than "hour"');
        var _ES$ToSecondsStringPr = ToSecondsStringPrecisionRecord(smallestUnit, digits),
          precision = _ES$ToSecondsStringPr.precision,
          unit = _ES$ToSecondsStringPr.unit,
          increment = _ES$ToSecondsStringPr.increment;
        var result = RoundISODateTime(GetSlot(this, ISO_DATE_TIME), increment, unit, roundingMode);
        RejectDateTimeRange(result);
        return ISODateTimeToString(result, GetSlot(this, CALENDAR), precision, showCalendar);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalDateTime);
        return ISODateTimeToString(GetSlot(this, ISO_DATE_TIME), GetSlot(this, CALENDAR), 'auto');
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        return new DateTimeFormat(locales, options).format(this);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('PlainDateTime');
      }
    }, {
      key: "toZonedDateTime",
      value: function toZonedDateTime(temporalTimeZoneLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDateTime);
        var timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
        var resolvedOptions = GetOptionsObject(options);
        var disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
        var epochNs = GetEpochNanosecondsFor(timeZone, GetSlot(this, ISO_DATE_TIME), disambiguation);
        return CreateTemporalZonedDateTime(epochNs, timeZone, GetSlot(this, CALENDAR));
      }
    }, {
      key: "toPlainDate",
      value: function toPlainDate() {
        CheckReceiver(this, IsTemporalDateTime);
        return CreateTemporalDate(GetSlot(this, ISO_DATE_TIME).isoDate, GetSlot(this, CALENDAR));
      }
    }, {
      key: "toPlainTime",
      value: function toPlainTime() {
        CheckReceiver(this, IsTemporalDateTime);
        return CreateTemporalTime(GetSlot(this, ISO_DATE_TIME).time);
      }
    }], [{
      key: "from",
      value: function from(item) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return ToTemporalDateTime(item, options);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var one = ToTemporalDateTime(oneParam);
        var two = ToTemporalDateTime(twoParam);
        return CompareISODateTime(GetSlot(one, ISO_DATE_TIME), GetSlot(two, ISO_DATE_TIME));
      }
    }]);
    return PlainDateTime;
  }();
  MakeIntrinsicClass(PlainDateTime, 'Temporal.PlainDateTime');
  function getCalendarProperty$3(dt, prop) {
    CheckReceiver(dt, IsTemporalDateTime);
    var isoDate = GetSlot(dt, ISO_DATE_TIME).isoDate;
    return calendarImplForObj(dt).isoToDate(isoDate, _defineProperty({}, prop, true))[prop];
  }
  function getTimeProperty$1(dt, prop) {
    CheckReceiver(dt, IsTemporalDateTime);
    return GetSlot(dt, ISO_DATE_TIME).time[prop];
  }

  var Duration = /*#__PURE__*/function () {
    function Duration() {
      var yearsParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var monthsParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var weeksParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var daysParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var hoursParam = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var minutesParam = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var secondsParam = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var millisecondsParam = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var microsecondsParam = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      var nanosecondsParam = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
      _classCallCheck(this, Duration);
      var years = yearsParam === undefined ? 0 : ToIntegerIfIntegral(yearsParam);
      var months = monthsParam === undefined ? 0 : ToIntegerIfIntegral(monthsParam);
      var weeks = weeksParam === undefined ? 0 : ToIntegerIfIntegral(weeksParam);
      var days = daysParam === undefined ? 0 : ToIntegerIfIntegral(daysParam);
      var hours = hoursParam === undefined ? 0 : ToIntegerIfIntegral(hoursParam);
      var minutes = minutesParam === undefined ? 0 : ToIntegerIfIntegral(minutesParam);
      var seconds = secondsParam === undefined ? 0 : ToIntegerIfIntegral(secondsParam);
      var milliseconds = millisecondsParam === undefined ? 0 : ToIntegerIfIntegral(millisecondsParam);
      var microseconds = microsecondsParam === undefined ? 0 : ToIntegerIfIntegral(microsecondsParam);
      var nanoseconds = nanosecondsParam === undefined ? 0 : ToIntegerIfIntegral(nanosecondsParam);
      RejectDuration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
      CreateSlots(this);
      SetSlot(this, YEARS, years);
      SetSlot(this, MONTHS, months);
      SetSlot(this, WEEKS, weeks);
      SetSlot(this, DAYS, days);
      SetSlot(this, HOURS, hours);
      SetSlot(this, MINUTES, minutes);
      SetSlot(this, SECONDS, seconds);
      SetSlot(this, MILLISECONDS, milliseconds);
      SetSlot(this, MICROSECONDS, microseconds);
      SetSlot(this, NANOSECONDS, nanoseconds);
      {
        Object.defineProperty(this, '_repr_', {
          value: "Temporal.Duration <".concat(TemporalDurationToString(this, 'auto'), ">"),
          writable: false,
          enumerable: false,
          configurable: false
        });
      }
    }
    _createClass(Duration, [{
      key: "years",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, YEARS);
      }
    }, {
      key: "months",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MONTHS);
      }
    }, {
      key: "weeks",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, WEEKS);
      }
    }, {
      key: "days",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, DAYS);
      }
    }, {
      key: "hours",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, HOURS);
      }
    }, {
      key: "minutes",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MINUTES);
      }
    }, {
      key: "seconds",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, SECONDS);
      }
    }, {
      key: "milliseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MILLISECONDS);
      }
    }, {
      key: "microseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, MICROSECONDS);
      }
    }, {
      key: "nanoseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return GetSlot(this, NANOSECONDS);
      }
    }, {
      key: "sign",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return DurationSign(this);
      }
    }, {
      key: "blank",
      get: function get() {
        CheckReceiver(this, IsTemporalDuration);
        return DurationSign(this) === 0;
      }
    }, {
      key: "with",
      value: function _with(durationLike) {
        CheckReceiver(this, IsTemporalDuration);
        var partialDuration = ToTemporalPartialDurationRecord(durationLike);
        var _partialDuration$year = partialDuration.years,
          years = _partialDuration$year === void 0 ? GetSlot(this, YEARS) : _partialDuration$year,
          _partialDuration$mont = partialDuration.months,
          months = _partialDuration$mont === void 0 ? GetSlot(this, MONTHS) : _partialDuration$mont,
          _partialDuration$week = partialDuration.weeks,
          weeks = _partialDuration$week === void 0 ? GetSlot(this, WEEKS) : _partialDuration$week,
          _partialDuration$days = partialDuration.days,
          days = _partialDuration$days === void 0 ? GetSlot(this, DAYS) : _partialDuration$days,
          _partialDuration$hour = partialDuration.hours,
          hours = _partialDuration$hour === void 0 ? GetSlot(this, HOURS) : _partialDuration$hour,
          _partialDuration$minu = partialDuration.minutes,
          minutes = _partialDuration$minu === void 0 ? GetSlot(this, MINUTES) : _partialDuration$minu,
          _partialDuration$seco = partialDuration.seconds,
          seconds = _partialDuration$seco === void 0 ? GetSlot(this, SECONDS) : _partialDuration$seco,
          _partialDuration$mill = partialDuration.milliseconds,
          milliseconds = _partialDuration$mill === void 0 ? GetSlot(this, MILLISECONDS) : _partialDuration$mill,
          _partialDuration$micr = partialDuration.microseconds,
          microseconds = _partialDuration$micr === void 0 ? GetSlot(this, MICROSECONDS) : _partialDuration$micr,
          _partialDuration$nano = partialDuration.nanoseconds,
          nanoseconds = _partialDuration$nano === void 0 ? GetSlot(this, NANOSECONDS) : _partialDuration$nano;
        return new Duration(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
      }
    }, {
      key: "negated",
      value: function negated() {
        CheckReceiver(this, IsTemporalDuration);
        return CreateNegatedTemporalDuration(this);
      }
    }, {
      key: "abs",
      value: function abs() {
        CheckReceiver(this, IsTemporalDuration);
        return new Duration(Math.abs(GetSlot(this, YEARS)), Math.abs(GetSlot(this, MONTHS)), Math.abs(GetSlot(this, WEEKS)), Math.abs(GetSlot(this, DAYS)), Math.abs(GetSlot(this, HOURS)), Math.abs(GetSlot(this, MINUTES)), Math.abs(GetSlot(this, SECONDS)), Math.abs(GetSlot(this, MILLISECONDS)), Math.abs(GetSlot(this, MICROSECONDS)), Math.abs(GetSlot(this, NANOSECONDS)));
      }
    }, {
      key: "add",
      value: function add(other) {
        CheckReceiver(this, IsTemporalDuration);
        return AddDurations('add', this, other);
      }
    }, {
      key: "subtract",
      value: function subtract(other) {
        CheckReceiver(this, IsTemporalDuration);
        return AddDurations('subtract', this, other);
      }
    }, {
      key: "round",
      value: function round(roundToParam) {
        CheckReceiver(this, IsTemporalDuration);
        if (roundToParam === undefined) throw new TypeError('options parameter is required');
        var existingLargestUnit = DefaultTemporalLargestUnit(this);
        var roundTo = typeof roundToParam === 'string' ? CreateOnePropObject('smallestUnit', roundToParam) : GetOptionsObject(roundToParam);
        var largestUnit = GetTemporalUnitValuedOption(roundTo, 'largestUnit', 'datetime', undefined, ['auto']);
        var _ES$GetTemporalRelati = GetTemporalRelativeToOption(roundTo),
          plainRelativeTo = _ES$GetTemporalRelati.plainRelativeTo,
          zonedRelativeTo = _ES$GetTemporalRelati.zonedRelativeTo;
        var roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        var roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        var smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'datetime', undefined);
        var smallestUnitPresent = true;
        if (!smallestUnit) {
          smallestUnitPresent = false;
          smallestUnit = 'nanosecond';
        }
        var defaultLargestUnit = LargerOfTwoTemporalUnits(existingLargestUnit, smallestUnit);
        var largestUnitPresent = true;
        if (!largestUnit) {
          largestUnitPresent = false;
          largestUnit = defaultLargestUnit;
        }
        if (largestUnit === 'auto') largestUnit = defaultLargestUnit;
        if (!smallestUnitPresent && !largestUnitPresent) {
          throw new RangeError('at least one of smallestUnit or largestUnit is required');
        }
        if (LargerOfTwoTemporalUnits(largestUnit, smallestUnit) !== largestUnit) {
          throw new RangeError("largestUnit ".concat(largestUnit, " cannot be smaller than smallestUnit ").concat(smallestUnit));
        }
        var maximumIncrements = {
          hour: 24,
          minute: 60,
          second: 60,
          millisecond: 1000,
          microsecond: 1000,
          nanosecond: 1000
        };
        var maximum = maximumIncrements[smallestUnit];
        if (maximum !== undefined) ValidateTemporalRoundingIncrement(roundingIncrement, maximum, false);
        if (roundingIncrement > 1 && TemporalUnitCategory(smallestUnit) === 'date' && largestUnit !== smallestUnit) {
          throw new RangeError('For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit');
        }
        if (zonedRelativeTo) {
          var duration = ToInternalDurationRecord(this);
          var timeZone = GetSlot(zonedRelativeTo, TIME_ZONE);
          var calendar = GetSlot(zonedRelativeTo, CALENDAR);
          var relativeEpochNs = GetSlot(zonedRelativeTo, EPOCHNANOSECONDS);
          var targetEpochNs = AddZonedDateTime(relativeEpochNs, timeZone, calendar, duration);
          duration = DifferenceZonedDateTimeWithRounding(relativeEpochNs, targetEpochNs, timeZone, calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
          if (TemporalUnitCategory(largestUnit) === 'date') largestUnit = 'hour';
          return TemporalDurationFromInternal(duration, largestUnit);
        }
        if (plainRelativeTo) {
          var _duration = ToInternalDurationRecordWith24HourDays(this);
          var targetTime = AddTime(MidnightTimeRecord(), _duration.time);
          // Delegate the date part addition to the calendar
          var isoRelativeToDate = GetSlot(plainRelativeTo, ISO_DATE);
          var _calendar = GetSlot(plainRelativeTo, CALENDAR);
          var dateDuration = AdjustDateDurationRecord(_duration.date, targetTime.deltaDays);
          var targetDate = CalendarDateAdd(_calendar, isoRelativeToDate, dateDuration, 'constrain');
          var isoDateTime = CombineISODateAndTimeRecord(isoRelativeToDate, MidnightTimeRecord());
          var targetDateTime = CombineISODateAndTimeRecord(targetDate, targetTime);
          _duration = DifferencePlainDateTimeWithRounding(isoDateTime, targetDateTime, _calendar, largestUnit, roundingIncrement, smallestUnit, roundingMode);
          return TemporalDurationFromInternal(_duration, largestUnit);
        }
        // No reference date to calculate difference relative to
        if (IsCalendarUnit(existingLargestUnit)) {
          throw new RangeError("a starting point is required for ".concat(existingLargestUnit, "s balancing"));
        }
        if (IsCalendarUnit(largestUnit)) {
          throw new RangeError("a starting point is required for ".concat(largestUnit, "s balancing"));
        }
        assert(!IsCalendarUnit(smallestUnit), 'smallestUnit was larger than largestUnit');
        var internalDuration = ToInternalDurationRecordWith24HourDays(this);
        if (smallestUnit === 'day') {
          // First convert time units up to days
          var _internalDuration$tim = internalDuration.time.divmod(DAY_NANOS),
            quotient = _internalDuration$tim.quotient,
            remainder = _internalDuration$tim.remainder;
          var days = internalDuration.date.days + quotient + TotalTimeDuration(remainder, 'day');
          days = RoundNumberToIncrement(days, roundingIncrement, roundingMode);
          var _dateDuration = {
            years: 0,
            months: 0,
            weeks: 0,
            days: days
          };
          internalDuration = CombineDateAndTimeDuration(_dateDuration, TimeDuration.ZERO);
        } else {
          var timeDuration = RoundTimeDuration(internalDuration.time, roundingIncrement, smallestUnit, roundingMode);
          internalDuration = CombineDateAndTimeDuration(ZeroDateDuration(), timeDuration);
        }
        return TemporalDurationFromInternal(internalDuration, largestUnit);
      }
    }, {
      key: "total",
      value: function total(optionsParam) {
        CheckReceiver(this, IsTemporalDuration);
        if (optionsParam === undefined) throw new TypeError('options argument is required');
        var options = typeof optionsParam === 'string' ? CreateOnePropObject('unit', optionsParam) : GetOptionsObject(optionsParam);
        var _ES$GetTemporalRelati2 = GetTemporalRelativeToOption(options),
          plainRelativeTo = _ES$GetTemporalRelati2.plainRelativeTo,
          zonedRelativeTo = _ES$GetTemporalRelati2.zonedRelativeTo;
        var unit = GetTemporalUnitValuedOption(options, 'unit', 'datetime', REQUIRED);
        if (zonedRelativeTo) {
          var _duration2 = ToInternalDurationRecord(this);
          var timeZone = GetSlot(zonedRelativeTo, TIME_ZONE);
          var calendar = GetSlot(zonedRelativeTo, CALENDAR);
          var relativeEpochNs = GetSlot(zonedRelativeTo, EPOCHNANOSECONDS);
          var targetEpochNs = AddZonedDateTime(relativeEpochNs, timeZone, calendar, _duration2);
          return DifferenceZonedDateTimeWithTotal(relativeEpochNs, targetEpochNs, timeZone, calendar, unit);
        }
        if (plainRelativeTo) {
          var _duration3 = ToInternalDurationRecordWith24HourDays(this);
          var targetTime = AddTime(MidnightTimeRecord(), _duration3.time);
          // Delegate the date part addition to the calendar
          var isoRelativeToDate = GetSlot(plainRelativeTo, ISO_DATE);
          var _calendar2 = GetSlot(plainRelativeTo, CALENDAR);
          var dateDuration = AdjustDateDurationRecord(_duration3.date, targetTime.deltaDays);
          var targetDate = CalendarDateAdd(_calendar2, isoRelativeToDate, dateDuration, 'constrain');
          var isoDateTime = CombineISODateAndTimeRecord(isoRelativeToDate, MidnightTimeRecord());
          var targetDateTime = CombineISODateAndTimeRecord(targetDate, targetTime);
          return DifferencePlainDateTimeWithTotal(isoDateTime, targetDateTime, _calendar2, unit);
        }
        // No reference date to calculate difference relative to
        var largestUnit = DefaultTemporalLargestUnit(this);
        if (IsCalendarUnit(largestUnit)) {
          throw new RangeError("a starting point is required for ".concat(largestUnit, "s total"));
        }
        if (IsCalendarUnit(unit)) {
          throw new RangeError("a starting point is required for ".concat(unit, "s total"));
        }
        var duration = ToInternalDurationRecordWith24HourDays(this);
        return TotalTimeDuration(duration.time, unit);
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalDuration);
        var resolvedOptions = GetOptionsObject(options);
        var digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        var roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        var smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour' || smallestUnit === 'minute') {
          throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');
        }
        var _ES$ToSecondsStringPr = ToSecondsStringPrecisionRecord(smallestUnit, digits),
          precision = _ES$ToSecondsStringPr.precision,
          unit = _ES$ToSecondsStringPr.unit,
          increment = _ES$ToSecondsStringPr.increment;
        if (unit === 'nanosecond' && increment === 1) return TemporalDurationToString(this, precision);
        var largestUnit = DefaultTemporalLargestUnit(this);
        var internalDuration = ToInternalDurationRecord(this);
        var timeDuration = RoundTimeDuration(internalDuration.time, increment, unit, roundingMode);
        internalDuration = CombineDateAndTimeDuration(internalDuration.date, timeDuration);
        var roundedDuration = TemporalDurationFromInternal(internalDuration, LargerOfTwoTemporalUnits(largestUnit, 'second'));
        return TemporalDurationToString(roundedDuration, precision);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalDuration);
        return TemporalDurationToString(this, 'auto');
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalDuration);
        if (typeof Intl.DurationFormat === 'function') {
          var formatter = new Intl.DurationFormat(locales, options);
          return ModifiedIntlDurationFormatPrototypeFormat.call(formatter, this);
        }
        console.warn('Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat.');
        return TemporalDurationToString(this, 'auto');
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('Duration');
      }
    }], [{
      key: "from",
      value: function from(item) {
        return ToTemporalDuration(item);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var one = ToTemporalDuration(oneParam);
        var two = ToTemporalDuration(twoParam);
        var resolvedOptions = GetOptionsObject(options);
        var _ES$GetTemporalRelati3 = GetTemporalRelativeToOption(resolvedOptions),
          plainRelativeTo = _ES$GetTemporalRelati3.plainRelativeTo,
          zonedRelativeTo = _ES$GetTemporalRelati3.zonedRelativeTo;
        if (GetSlot(one, YEARS) === GetSlot(two, YEARS) && GetSlot(one, MONTHS) === GetSlot(two, MONTHS) && GetSlot(one, WEEKS) === GetSlot(two, WEEKS) && GetSlot(one, DAYS) === GetSlot(two, DAYS) && GetSlot(one, HOURS) === GetSlot(two, HOURS) && GetSlot(one, MINUTES) === GetSlot(two, MINUTES) && GetSlot(one, SECONDS) === GetSlot(two, SECONDS) && GetSlot(one, MILLISECONDS) === GetSlot(two, MILLISECONDS) && GetSlot(one, MICROSECONDS) === GetSlot(two, MICROSECONDS) && GetSlot(one, NANOSECONDS) === GetSlot(two, NANOSECONDS)) {
          return 0;
        }
        var largestUnit1 = DefaultTemporalLargestUnit(one);
        var largestUnit2 = DefaultTemporalLargestUnit(two);
        var duration1 = ToInternalDurationRecord(one);
        var duration2 = ToInternalDurationRecord(two);
        if (zonedRelativeTo && (TemporalUnitCategory(largestUnit1) === 'date' || TemporalUnitCategory(largestUnit2) === 'date')) {
          var timeZone = GetSlot(zonedRelativeTo, TIME_ZONE);
          var calendar = GetSlot(zonedRelativeTo, CALENDAR);
          var epochNs = GetSlot(zonedRelativeTo, EPOCHNANOSECONDS);
          var after1 = AddZonedDateTime(epochNs, timeZone, calendar, duration1);
          var after2 = AddZonedDateTime(epochNs, timeZone, calendar, duration2);
          return ComparisonResult(JSBI.toNumber(JSBI.subtract(after1, after2)));
        }
        var d1 = duration1.date.days;
        var d2 = duration2.date.days;
        if (IsCalendarUnit(largestUnit1) || IsCalendarUnit(largestUnit2)) {
          if (!plainRelativeTo) {
            throw new RangeError('A starting point is required for years, months, or weeks comparison');
          }
          d1 = DateDurationDays(duration1.date, plainRelativeTo);
          d2 = DateDurationDays(duration2.date, plainRelativeTo);
        }
        var timeDuration1 = duration1.time.add24HourDays(d1);
        var timeDuration2 = duration2.time.add24HourDays(d2);
        return timeDuration1.cmp(timeDuration2);
      }
    }]);
    return Duration;
  }();
  MakeIntrinsicClass(Duration, 'Temporal.Duration');

  var PlainMonthDay = /*#__PURE__*/function () {
    function PlainMonthDay(isoMonth, isoDay) {
      var calendarParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iso8601';
      var referenceISOYear = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1972;
      _classCallCheck(this, PlainMonthDay);
      var month = ToIntegerWithTruncation(isoMonth);
      var day = ToIntegerWithTruncation(isoDay);
      var calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
      var year = ToIntegerWithTruncation(referenceISOYear);
      RejectISODate(year, month, day);
      CreateTemporalMonthDaySlots(this, {
        year: year,
        month: month,
        day: day
      }, calendar);
    }
    _createClass(PlainMonthDay, [{
      key: "monthCode",
      get: function get() {
        return getCalendarProperty$2(this, 'monthCode');
      }
    }, {
      key: "day",
      get: function get() {
        return getCalendarProperty$2(this, 'day');
      }
    }, {
      key: "calendarId",
      get: function get() {
        CheckReceiver(this, IsTemporalMonthDay);
        return GetSlot(this, CALENDAR);
      }
    }, {
      key: "with",
      value: function _with(temporalMonthDayLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalMonthDay);
        if (!IsObject(temporalMonthDayLike)) {
          throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalMonthDayLike);
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'month-day');
        var partialMonthDay = PrepareCalendarFields(calendar, temporalMonthDayLike, ['year', 'month', 'monthCode', 'day'], [], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialMonthDay);
        var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        var isoDate = CalendarMonthDayFromFields(calendar, fields, overflow);
        return CreateTemporalMonthDay(isoDate, calendar);
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalMonthDay);
        var other = ToTemporalMonthDay(otherParam);
        if (CompareISODate(GetSlot(this, ISO_DATE), GetSlot(other, ISO_DATE)) !== 0) return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalMonthDay);
        var resolvedOptions = GetOptionsObject(options);
        var showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        return TemporalMonthDayToString(this, showCalendar);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalMonthDay);
        return TemporalMonthDayToString(this);
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalMonthDay);
        return new DateTimeFormat(locales, options).format(this);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('PlainMonthDay');
      }
    }, {
      key: "toPlainDate",
      value: function toPlainDate(item) {
        CheckReceiver(this, IsTemporalMonthDay);
        if (!IsObject(item)) throw new TypeError('argument should be an object');
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'month-day');
        var inputFields = PrepareCalendarFields(calendar, item, ['year'], [], []);
        var mergedFields = CalendarMergeFields(calendar, fields, inputFields);
        var isoDate = CalendarDateFromFields(calendar, mergedFields, 'constrain');
        return CreateTemporalDate(isoDate, calendar);
      }
    }], [{
      key: "from",
      value: function from(item) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return ToTemporalMonthDay(item, options);
      }
    }]);
    return PlainMonthDay;
  }();
  MakeIntrinsicClass(PlainMonthDay, 'Temporal.PlainMonthDay');
  function getCalendarProperty$2(md, prop) {
    CheckReceiver(md, IsTemporalMonthDay);
    var isoDate = GetSlot(md, ISO_DATE);
    return calendarImplForObj(md).isoToDate(isoDate, _defineProperty({}, prop, true))[prop];
  }

  function SystemDateTime(timeZone) {
    return GetISODateTimeFor(timeZone, SystemUTCEpochNanoSeconds());
  }
  var instant = function instant() {
    return CreateTemporalInstant(SystemUTCEpochNanoSeconds());
  };
  var plainDateTimeISO = function plainDateTimeISO() {
    var temporalTimeZoneLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultTimeZone();
    var timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    var isoDateTime = SystemDateTime(timeZone);
    return CreateTemporalDateTime(isoDateTime, 'iso8601');
  };
  var zonedDateTimeISO = function zonedDateTimeISO() {
    var temporalTimeZoneLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultTimeZone();
    var timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    return CreateTemporalZonedDateTime(SystemUTCEpochNanoSeconds(), timeZone, 'iso8601');
  };
  var plainDateISO = function plainDateISO() {
    var temporalTimeZoneLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultTimeZone();
    var timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    var isoDateTime = SystemDateTime(timeZone);
    return CreateTemporalDate(isoDateTime.isoDate, 'iso8601');
  };
  var plainTimeISO = function plainTimeISO() {
    var temporalTimeZoneLike = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultTimeZone();
    var timeZone = ToTemporalTimeZoneIdentifier(temporalTimeZoneLike);
    var isoDateTime = SystemDateTime(timeZone);
    return CreateTemporalTime(isoDateTime.time);
  };
  var timeZoneId = function timeZoneId() {
    return DefaultTimeZone();
  };
  var Now = _defineProperty({
    instant: instant,
    plainDateTimeISO: plainDateTimeISO,
    plainDateISO: plainDateISO,
    plainTimeISO: plainTimeISO,
    timeZoneId: timeZoneId,
    zonedDateTimeISO: zonedDateTimeISO
  }, Symbol.toStringTag, 'Temporal.Now');
  Object.defineProperty(Now, Symbol.toStringTag, {
    value: 'Temporal.Now',
    writable: false,
    enumerable: false,
    configurable: true
  });

  var PlainTime = /*#__PURE__*/function () {
    function PlainTime() {
      var isoHour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var isoMinute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var isoSecond = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var isoMillisecond = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var isoMicrosecond = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var isoNanosecond = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      _classCallCheck(this, PlainTime);
      var hour = isoHour === undefined ? 0 : ToIntegerWithTruncation(isoHour);
      var minute = isoMinute === undefined ? 0 : ToIntegerWithTruncation(isoMinute);
      var second = isoSecond === undefined ? 0 : ToIntegerWithTruncation(isoSecond);
      var millisecond = isoMillisecond === undefined ? 0 : ToIntegerWithTruncation(isoMillisecond);
      var microsecond = isoMicrosecond === undefined ? 0 : ToIntegerWithTruncation(isoMicrosecond);
      var nanosecond = isoNanosecond === undefined ? 0 : ToIntegerWithTruncation(isoNanosecond);
      RejectTime(hour, minute, second, millisecond, microsecond, nanosecond);
      var time = {
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond,
        microsecond: microsecond,
        nanosecond: nanosecond
      };
      CreateTemporalTimeSlots(this, time);
    }
    _createClass(PlainTime, [{
      key: "hour",
      get: function get() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).hour;
      }
    }, {
      key: "minute",
      get: function get() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).minute;
      }
    }, {
      key: "second",
      get: function get() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).second;
      }
    }, {
      key: "millisecond",
      get: function get() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).millisecond;
      }
    }, {
      key: "microsecond",
      get: function get() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).microsecond;
      }
    }, {
      key: "nanosecond",
      get: function get() {
        CheckReceiver(this, IsTemporalTime);
        return GetSlot(this, TIME).nanosecond;
      }
    }, {
      key: "with",
      value: function _with(temporalTimeLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalTime);
        if (!IsObject(temporalTimeLike)) {
          throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalTimeLike);
        var partialTime = ToTemporalTimeRecord(temporalTimeLike, 'partial');
        var fields = ToTemporalTimeRecord(this);
        var _Object$assign = Object.assign(fields, partialTime),
          hour = _Object$assign.hour,
          minute = _Object$assign.minute,
          second = _Object$assign.second,
          millisecond = _Object$assign.millisecond,
          microsecond = _Object$assign.microsecond,
          nanosecond = _Object$assign.nanosecond;
        var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        var _ES$RegulateTime = RegulateTime(hour, minute, second, millisecond, microsecond, nanosecond, overflow);
        hour = _ES$RegulateTime.hour;
        minute = _ES$RegulateTime.minute;
        second = _ES$RegulateTime.second;
        millisecond = _ES$RegulateTime.millisecond;
        microsecond = _ES$RegulateTime.microsecond;
        nanosecond = _ES$RegulateTime.nanosecond;
        return new PlainTime(hour, minute, second, millisecond, microsecond, nanosecond);
      }
    }, {
      key: "add",
      value: function add(temporalDurationLike) {
        CheckReceiver(this, IsTemporalTime);
        return AddDurationToTime('add', this, temporalDurationLike);
      }
    }, {
      key: "subtract",
      value: function subtract(temporalDurationLike) {
        CheckReceiver(this, IsTemporalTime);
        return AddDurationToTime('subtract', this, temporalDurationLike);
      }
    }, {
      key: "until",
      value: function until(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalTime);
        return DifferenceTemporalPlainTime('until', this, other, options);
      }
    }, {
      key: "since",
      value: function since(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalTime);
        return DifferenceTemporalPlainTime('since', this, other, options);
      }
    }, {
      key: "round",
      value: function round(roundToParam) {
        CheckReceiver(this, IsTemporalTime);
        if (roundToParam === undefined) throw new TypeError('options parameter is required');
        var roundTo = typeof roundToParam === 'string' ? CreateOnePropObject('smallestUnit', roundToParam) : GetOptionsObject(roundToParam);
        var roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        var roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        var smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED);
        var MAX_INCREMENTS = {
          hour: 24,
          minute: 60,
          second: 60,
          millisecond: 1000,
          microsecond: 1000,
          nanosecond: 1000
        };
        ValidateTemporalRoundingIncrement(roundingIncrement, MAX_INCREMENTS[smallestUnit], false);
        var time = RoundTime(GetSlot(this, TIME), roundingIncrement, smallestUnit, roundingMode);
        return CreateTemporalTime(time);
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalTime);
        var other = ToTemporalTime(otherParam);
        return CompareTimeRecord(GetSlot(this, TIME), GetSlot(other, TIME)) === 0;
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalTime);
        var resolvedOptions = GetOptionsObject(options);
        var digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        var roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        var smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour') throw new RangeError('smallestUnit must be a time unit other than "hour"');
        var _ES$ToSecondsStringPr = ToSecondsStringPrecisionRecord(smallestUnit, digits),
          precision = _ES$ToSecondsStringPr.precision,
          unit = _ES$ToSecondsStringPr.unit,
          increment = _ES$ToSecondsStringPr.increment;
        var time = RoundTime(GetSlot(this, TIME), increment, unit, roundingMode);
        return TimeRecordToString(time, precision);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalTime);
        return TimeRecordToString(GetSlot(this, TIME), 'auto');
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalTime);
        return new DateTimeFormat(locales, options).format(this);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('PlainTime');
      }
    }], [{
      key: "from",
      value: function from(item) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return ToTemporalTime(item, options);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var one = ToTemporalTime(oneParam);
        var two = ToTemporalTime(twoParam);
        return CompareTimeRecord(GetSlot(one, TIME), GetSlot(two, TIME));
      }
    }]);
    return PlainTime;
  }();
  MakeIntrinsicClass(PlainTime, 'Temporal.PlainTime');

  var PlainYearMonth = /*#__PURE__*/function () {
    function PlainYearMonth(isoYear, isoMonth) {
      var calendarParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iso8601';
      var referenceISODay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      _classCallCheck(this, PlainYearMonth);
      var year = ToIntegerWithTruncation(isoYear);
      var month = ToIntegerWithTruncation(isoMonth);
      var calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
      var day = ToIntegerWithTruncation(referenceISODay);
      RejectISODate(year, month, day);
      CreateTemporalYearMonthSlots(this, {
        year: year,
        month: month,
        day: day
      }, calendar);
    }
    _createClass(PlainYearMonth, [{
      key: "year",
      get: function get() {
        return getCalendarProperty$1(this, 'year');
      }
    }, {
      key: "month",
      get: function get() {
        return getCalendarProperty$1(this, 'month');
      }
    }, {
      key: "monthCode",
      get: function get() {
        return getCalendarProperty$1(this, 'monthCode');
      }
    }, {
      key: "calendarId",
      get: function get() {
        CheckReceiver(this, IsTemporalYearMonth);
        return GetSlot(this, CALENDAR);
      }
    }, {
      key: "era",
      get: function get() {
        return getCalendarProperty$1(this, 'era');
      }
    }, {
      key: "eraYear",
      get: function get() {
        return getCalendarProperty$1(this, 'eraYear');
      }
    }, {
      key: "daysInMonth",
      get: function get() {
        return getCalendarProperty$1(this, 'daysInMonth');
      }
    }, {
      key: "daysInYear",
      get: function get() {
        return getCalendarProperty$1(this, 'daysInYear');
      }
    }, {
      key: "monthsInYear",
      get: function get() {
        return getCalendarProperty$1(this, 'monthsInYear');
      }
    }, {
      key: "inLeapYear",
      get: function get() {
        return getCalendarProperty$1(this, 'inLeapYear');
      }
    }, {
      key: "with",
      value: function _with(temporalYearMonthLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        if (!IsObject(temporalYearMonthLike)) {
          throw new TypeError('invalid argument');
        }
        RejectTemporalLikeObject(temporalYearMonthLike);
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'year-month');
        var partialYearMonth = PrepareCalendarFields(calendar, temporalYearMonthLike, ['year', 'month', 'monthCode'], [], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialYearMonth);
        var overflow = GetTemporalOverflowOption(GetOptionsObject(options));
        var isoDate = CalendarYearMonthFromFields(calendar, fields, overflow);
        return CreateTemporalYearMonth(isoDate, calendar);
      }
    }, {
      key: "add",
      value: function add(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        return AddDurationToYearMonth('add', this, temporalDurationLike, options);
      }
    }, {
      key: "subtract",
      value: function subtract(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        return AddDurationToYearMonth('subtract', this, temporalDurationLike, options);
      }
    }, {
      key: "until",
      value: function until(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        return DifferenceTemporalPlainYearMonth('until', this, other, options);
      }
    }, {
      key: "since",
      value: function since(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        return DifferenceTemporalPlainYearMonth('since', this, other, options);
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalYearMonth);
        var other = ToTemporalYearMonth(otherParam);
        if (CompareISODate(GetSlot(this, ISO_DATE), GetSlot(other, ISO_DATE)) !== 0) return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        var resolvedOptions = GetOptionsObject(options);
        var showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        return TemporalYearMonthToString(this, showCalendar);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalYearMonth);
        return TemporalYearMonthToString(this);
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalYearMonth);
        return new DateTimeFormat(locales, options).format(this);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('PlainYearMonth');
      }
    }, {
      key: "toPlainDate",
      value: function toPlainDate(item) {
        CheckReceiver(this, IsTemporalYearMonth);
        if (!IsObject(item)) throw new TypeError('argument should be an object');
        var calendar = GetSlot(this, CALENDAR);
        var fields = ISODateToFields(calendar, GetSlot(this, ISO_DATE), 'year-month');
        var inputFields = PrepareCalendarFields(calendar, item, ['day'], [], []);
        var mergedFields = CalendarMergeFields(calendar, fields, inputFields);
        var isoDate = CalendarDateFromFields(calendar, mergedFields, 'constrain');
        return CreateTemporalDate(isoDate, calendar);
      }
    }], [{
      key: "from",
      value: function from(item) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return ToTemporalYearMonth(item, options);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var one = ToTemporalYearMonth(oneParam);
        var two = ToTemporalYearMonth(twoParam);
        return CompareISODate(GetSlot(one, ISO_DATE), GetSlot(two, ISO_DATE));
      }
    }]);
    return PlainYearMonth;
  }();
  MakeIntrinsicClass(PlainYearMonth, 'Temporal.PlainYearMonth');
  function getCalendarProperty$1(ym, prop) {
    CheckReceiver(ym, IsTemporalYearMonth);
    var isoDate = GetSlot(ym, ISO_DATE);
    return calendarImplForObj(ym).isoToDate(isoDate, _defineProperty({}, prop, true))[prop];
  }

  var customResolvedOptions = DateTimeFormat.prototype.resolvedOptions;
  var ZonedDateTime = /*#__PURE__*/function () {
    function ZonedDateTime(epochNanosecondsParam, timeZoneParam) {
      var calendarParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iso8601';
      _classCallCheck(this, ZonedDateTime);
      // Note: if the argument is not passed, ToBigInt(undefined) will throw. This check exists only
      //       to improve the error message.
      if (arguments.length < 1) {
        throw new TypeError('missing argument: epochNanoseconds is required');
      }
      var epochNanoseconds = ToBigInt(epochNanosecondsParam);
      var timeZone = RequireString(timeZoneParam);
      var _ES$ParseTimeZoneIden = ParseTimeZoneIdentifier(timeZone),
        tzName = _ES$ParseTimeZoneIden.tzName,
        offsetMinutes = _ES$ParseTimeZoneIden.offsetMinutes;
      if (offsetMinutes === undefined) {
        // if offsetMinutes is undefined, then tzName must be present
        var record = GetAvailableNamedTimeZoneIdentifier(tzName);
        if (!record) throw new RangeError("unknown time zone ".concat(tzName));
        timeZone = record.identifier;
      } else {
        timeZone = FormatOffsetTimeZoneIdentifier(offsetMinutes);
      }
      var calendar = CanonicalizeCalendar(calendarParam === undefined ? 'iso8601' : RequireString(calendarParam));
      CreateTemporalZonedDateTimeSlots(this, epochNanoseconds, timeZone, calendar);
    }
    _createClass(ZonedDateTime, [{
      key: "calendarId",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return GetSlot(this, CALENDAR);
      }
    }, {
      key: "timeZoneId",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return GetSlot(this, TIME_ZONE);
      }
    }, {
      key: "year",
      get: function get() {
        return getCalendarProperty(this, 'year');
      }
    }, {
      key: "month",
      get: function get() {
        return getCalendarProperty(this, 'month');
      }
    }, {
      key: "monthCode",
      get: function get() {
        return getCalendarProperty(this, 'monthCode');
      }
    }, {
      key: "day",
      get: function get() {
        return getCalendarProperty(this, 'day');
      }
    }, {
      key: "hour",
      get: function get() {
        return getTimeProperty(this, 'hour');
      }
    }, {
      key: "minute",
      get: function get() {
        return getTimeProperty(this, 'minute');
      }
    }, {
      key: "second",
      get: function get() {
        return getTimeProperty(this, 'second');
      }
    }, {
      key: "millisecond",
      get: function get() {
        return getTimeProperty(this, 'millisecond');
      }
    }, {
      key: "microsecond",
      get: function get() {
        return getTimeProperty(this, 'microsecond');
      }
    }, {
      key: "nanosecond",
      get: function get() {
        return getTimeProperty(this, 'nanosecond');
      }
    }, {
      key: "era",
      get: function get() {
        return getCalendarProperty(this, 'era');
      }
    }, {
      key: "eraYear",
      get: function get() {
        return getCalendarProperty(this, 'eraYear');
      }
    }, {
      key: "epochMilliseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var value = GetSlot(this, EPOCHNANOSECONDS);
        return epochNsToMs(value, 'floor');
      }
    }, {
      key: "epochNanoseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return ToBigIntExternal(GetSlot(this, EPOCHNANOSECONDS));
      }
    }, {
      key: "dayOfWeek",
      get: function get() {
        return getCalendarProperty(this, 'dayOfWeek');
      }
    }, {
      key: "dayOfYear",
      get: function get() {
        return getCalendarProperty(this, 'dayOfYear');
      }
    }, {
      key: "weekOfYear",
      get: function get() {
        var _getCalendarProperty;
        return (_getCalendarProperty = getCalendarProperty(this, 'weekOfYear')) === null || _getCalendarProperty === void 0 ? void 0 : _getCalendarProperty.week;
      }
    }, {
      key: "yearOfWeek",
      get: function get() {
        var _getCalendarProperty2;
        return (_getCalendarProperty2 = getCalendarProperty(this, 'weekOfYear')) === null || _getCalendarProperty2 === void 0 ? void 0 : _getCalendarProperty2.year;
      }
    }, {
      key: "hoursInDay",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var timeZone = GetSlot(this, TIME_ZONE);
        var today = dateTime(this).isoDate;
        var tomorrow = BalanceISODate(today.year, today.month, today.day + 1);
        var todayNs = GetStartOfDay(timeZone, today);
        var tomorrowNs = GetStartOfDay(timeZone, tomorrow);
        var diff = TimeDuration.fromEpochNsDiff(tomorrowNs, todayNs);
        return TotalTimeDuration(diff, 'hour');
      }
    }, {
      key: "daysInWeek",
      get: function get() {
        return getCalendarProperty(this, 'daysInWeek');
      }
    }, {
      key: "daysInMonth",
      get: function get() {
        return getCalendarProperty(this, 'daysInMonth');
      }
    }, {
      key: "daysInYear",
      get: function get() {
        return getCalendarProperty(this, 'daysInYear');
      }
    }, {
      key: "monthsInYear",
      get: function get() {
        return getCalendarProperty(this, 'monthsInYear');
      }
    }, {
      key: "inLeapYear",
      get: function get() {
        return getCalendarProperty(this, 'inLeapYear');
      }
    }, {
      key: "offset",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var offsetNs = GetOffsetNanosecondsFor(GetSlot(this, TIME_ZONE), GetSlot(this, EPOCHNANOSECONDS));
        return FormatUTCOffsetNanoseconds(offsetNs);
      }
    }, {
      key: "offsetNanoseconds",
      get: function get() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return GetOffsetNanosecondsFor(GetSlot(this, TIME_ZONE), GetSlot(this, EPOCHNANOSECONDS));
      }
    }, {
      key: "with",
      value: function _with(temporalZonedDateTimeLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        if (!IsObject(temporalZonedDateTimeLike)) {
          throw new TypeError('invalid zoned-date-time-like');
        }
        RejectTemporalLikeObject(temporalZonedDateTimeLike);
        var calendar = GetSlot(this, CALENDAR);
        var timeZone = GetSlot(this, TIME_ZONE);
        var epochNs = GetSlot(this, EPOCHNANOSECONDS);
        var offsetNs = GetOffsetNanosecondsFor(timeZone, epochNs);
        var isoDateTime = dateTime(this);
        var fields = _objectSpread2(_objectSpread2(_objectSpread2({}, ISODateToFields(calendar, isoDateTime.isoDate)), isoDateTime.time), {}, {
          offset: FormatUTCOffsetNanoseconds(offsetNs)
        });
        var partialZonedDateTime = PrepareCalendarFields(calendar, temporalZonedDateTimeLike, ['year', 'month', 'monthCode', 'day'], ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond', 'offset'], 'partial');
        fields = CalendarMergeFields(calendar, fields, partialZonedDateTime);
        var resolvedOptions = GetOptionsObject(options);
        var disambiguation = GetTemporalDisambiguationOption(resolvedOptions);
        var offset = GetTemporalOffsetOption(resolvedOptions, 'prefer');
        var overflow = GetTemporalOverflowOption(resolvedOptions);
        var newDateTime = InterpretTemporalDateTimeFields(calendar, fields, overflow);
        var newOffsetNs = ParseDateTimeUTCOffset(fields.offset);
        var epochNanoseconds = InterpretISODateTimeOffset(newDateTime.isoDate, newDateTime.time, 'option', newOffsetNs, timeZone, disambiguation, offset, /* matchMinute = */false);
        return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, calendar);
      }
    }, {
      key: "withPlainTime",
      value: function withPlainTime() {
        var temporalTimeParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        var timeZone = GetSlot(this, TIME_ZONE);
        var calendar = GetSlot(this, CALENDAR);
        var iso = dateTime(this).isoDate;
        var epochNs;
        if (temporalTimeParam === undefined) {
          epochNs = GetStartOfDay(timeZone, iso);
        } else {
          var temporalTime = ToTemporalTime(temporalTimeParam);
          var dt = CombineISODateAndTimeRecord(iso, GetSlot(temporalTime, TIME));
          epochNs = GetEpochNanosecondsFor(timeZone, dt, 'compatible');
        }
        return CreateTemporalZonedDateTime(epochNs, timeZone, calendar);
      }
    }, {
      key: "withTimeZone",
      value: function withTimeZone(timeZoneParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var timeZone = ToTemporalTimeZoneIdentifier(timeZoneParam);
        return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), timeZone, GetSlot(this, CALENDAR));
      }
    }, {
      key: "withCalendar",
      value: function withCalendar(calendarParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var calendar = ToTemporalCalendarIdentifier(calendarParam);
        return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), GetSlot(this, TIME_ZONE), calendar);
      }
    }, {
      key: "add",
      value: function add(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        return AddDurationToZonedDateTime('add', this, temporalDurationLike, options);
      }
    }, {
      key: "subtract",
      value: function subtract(temporalDurationLike) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        return AddDurationToZonedDateTime('subtract', this, temporalDurationLike, options);
      }
    }, {
      key: "until",
      value: function until(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        return DifferenceTemporalZonedDateTime('until', this, other, options);
      }
    }, {
      key: "since",
      value: function since(other) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        return DifferenceTemporalZonedDateTime('since', this, other, options);
      }
    }, {
      key: "round",
      value: function round(roundToParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        if (roundToParam === undefined) throw new TypeError('options parameter is required');
        var roundTo = typeof roundToParam === 'string' ? CreateOnePropObject('smallestUnit', roundToParam) : GetOptionsObject(roundToParam);
        var roundingIncrement = GetTemporalRoundingIncrementOption(roundTo);
        var roundingMode = GetRoundingModeOption(roundTo, 'halfExpand');
        var smallestUnit = GetTemporalUnitValuedOption(roundTo, 'smallestUnit', 'time', REQUIRED, ['day']);
        var maximumIncrements = {
          day: 1,
          hour: 24,
          minute: 60,
          second: 60,
          millisecond: 1000,
          microsecond: 1000,
          nanosecond: 1000
        };
        var maximum = maximumIncrements[smallestUnit];
        var inclusive = maximum === 1;
        ValidateTemporalRoundingIncrement(roundingIncrement, maximum, inclusive);
        if (smallestUnit === 'nanosecond' && roundingIncrement === 1) {
          return CreateTemporalZonedDateTime(GetSlot(this, EPOCHNANOSECONDS), GetSlot(this, TIME_ZONE), GetSlot(this, CALENDAR));
        }
        // first, round the underlying DateTime fields
        var timeZone = GetSlot(this, TIME_ZONE);
        var thisNs = GetSlot(this, EPOCHNANOSECONDS);
        var iso = dateTime(this);
        var epochNanoseconds;
        if (smallestUnit === 'day') {
          // Compute Instants for start-of-day and end-of-day
          // Determine how far the current instant has progressed through this span.
          var dateStart = iso.isoDate;
          var dateEnd = BalanceISODate(dateStart.year, dateStart.month, dateStart.day + 1);
          var startNs = GetStartOfDay(timeZone, dateStart);
          assert(JSBI.greaterThanOrEqual(thisNs, startNs), 'cannot produce an instant during a day that occurs before start-of-day instant');
          var endNs = GetStartOfDay(timeZone, dateEnd);
          assert(JSBI.lessThan(thisNs, endNs), 'cannot produce an instant during a day that occurs on or after end-of-day instant');
          var dayLengthNs = JSBI.subtract(endNs, startNs);
          var dayProgressNs = TimeDuration.fromEpochNsDiff(thisNs, startNs);
          var roundedDayNs = dayProgressNs.round(dayLengthNs, roundingMode);
          epochNanoseconds = roundedDayNs.addToEpochNs(startNs);
        } else {
          // smallestUnit < day
          // Round based on ISO-calendar time units
          var roundedDateTime = RoundISODateTime(iso, roundingIncrement, smallestUnit, roundingMode);
          // Now reset all DateTime fields but leave the TimeZone. The offset will
          // also be retained if the new date/time values are still OK with the old
          // offset. Otherwise the offset will be changed to be compatible with the
          // new date/time values. If DST disambiguation is required, the `compatible`
          // disambiguation algorithm will be used.
          var offsetNs = GetOffsetNanosecondsFor(timeZone, thisNs);
          epochNanoseconds = InterpretISODateTimeOffset(roundedDateTime.isoDate, roundedDateTime.time, 'option', offsetNs, timeZone, 'compatible', 'prefer', /* matchMinute = */false);
        }
        return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, GetSlot(this, CALENDAR));
      }
    }, {
      key: "equals",
      value: function equals(otherParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var other = ToTemporalZonedDateTime(otherParam);
        var one = GetSlot(this, EPOCHNANOSECONDS);
        var two = GetSlot(other, EPOCHNANOSECONDS);
        if (!JSBI.equal(JSBI.BigInt(one), JSBI.BigInt(two))) return false;
        if (!TimeZoneEquals(GetSlot(this, TIME_ZONE), GetSlot(other, TIME_ZONE))) return false;
        return CalendarEquals(GetSlot(this, CALENDAR), GetSlot(other, CALENDAR));
      }
    }, {
      key: "toString",
      value: function toString() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        var resolvedOptions = GetOptionsObject(options);
        var showCalendar = GetTemporalShowCalendarNameOption(resolvedOptions);
        var digits = GetTemporalFractionalSecondDigitsOption(resolvedOptions);
        var showOffset = GetTemporalShowOffsetOption(resolvedOptions);
        var roundingMode = GetRoundingModeOption(resolvedOptions, 'trunc');
        var smallestUnit = GetTemporalUnitValuedOption(resolvedOptions, 'smallestUnit', 'time', undefined);
        if (smallestUnit === 'hour') throw new RangeError('smallestUnit must be a time unit other than "hour"');
        var showTimeZone = GetTemporalShowTimeZoneNameOption(resolvedOptions);
        var _ES$ToSecondsStringPr = ToSecondsStringPrecisionRecord(smallestUnit, digits),
          precision = _ES$ToSecondsStringPr.precision,
          unit = _ES$ToSecondsStringPr.unit,
          increment = _ES$ToSecondsStringPr.increment;
        return TemporalZonedDateTimeToString(this, precision, showCalendar, showTimeZone, showOffset, {
          unit: unit,
          increment: increment,
          roundingMode: roundingMode
        });
      }
    }, {
      key: "toLocaleString",
      value: function toLocaleString() {
        var locales = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        CheckReceiver(this, IsTemporalZonedDateTime);
        var resolvedOptions = GetOptionsObject(options);
        // This is not quite per specification, but this polyfill's DateTimeFormat
        // already doesn't match the InitializeDateTimeFormat operation, and the
        // access order might change anyway;
        // see https://github.com/tc39/ecma402/issues/747
        var optionsCopy = Object.create(null);
        CopyDataProperties(optionsCopy, resolvedOptions, ['timeZone']);
        if (resolvedOptions.timeZone !== undefined) {
          throw new TypeError('ZonedDateTime toLocaleString does not accept a timeZone option');
        }
        if (optionsCopy.year === undefined && optionsCopy.month === undefined && optionsCopy.day === undefined && optionsCopy.era === undefined && optionsCopy.weekday === undefined && optionsCopy.dateStyle === undefined && optionsCopy.hour === undefined && optionsCopy.minute === undefined && optionsCopy.second === undefined && optionsCopy.fractionalSecondDigits === undefined && optionsCopy.timeStyle === undefined && optionsCopy.dayPeriod === undefined && optionsCopy.timeZoneName === undefined) {
          optionsCopy.timeZoneName = 'short';
          // The rest of the defaults will be filled in by formatting the Instant
        }
        optionsCopy.timeZone = GetSlot(this, TIME_ZONE);
        if (IsOffsetTimeZoneIdentifier(optionsCopy.timeZone)) {
          // Note: https://github.com/tc39/ecma402/issues/683 will remove this
          throw new RangeError('toLocaleString does not currently support offset time zones');
        }
        var formatter = new DateTimeFormat(locales, optionsCopy);
        var localeCalendarIdentifier = customResolvedOptions.call(formatter).calendar;
        var calendarIdentifier = GetSlot(this, CALENDAR);
        if (calendarIdentifier !== 'iso8601' && localeCalendarIdentifier !== 'iso8601' && !CalendarEquals(localeCalendarIdentifier, calendarIdentifier)) {
          throw new RangeError("cannot format ZonedDateTime with calendar ".concat(calendarIdentifier) + " in locale with calendar ".concat(localeCalendarIdentifier));
        }
        return formatter.format(CreateTemporalInstant(GetSlot(this, EPOCHNANOSECONDS)));
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return TemporalZonedDateTimeToString(this, 'auto');
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        ValueOfThrows('ZonedDateTime');
      }
    }, {
      key: "startOfDay",
      value: function startOfDay() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var timeZone = GetSlot(this, TIME_ZONE);
        var isoDate = dateTime(this).isoDate;
        var epochNanoseconds = GetStartOfDay(timeZone, isoDate);
        return CreateTemporalZonedDateTime(epochNanoseconds, timeZone, GetSlot(this, CALENDAR));
      }
    }, {
      key: "getTimeZoneTransition",
      value: function getTimeZoneTransition(directionParam) {
        CheckReceiver(this, IsTemporalZonedDateTime);
        var timeZone = GetSlot(this, TIME_ZONE);
        if (directionParam === undefined) throw new TypeError('options parameter is required');
        var direction = GetDirectionOption(typeof directionParam === 'string' ? CreateOnePropObject('direction', directionParam) : GetOptionsObject(directionParam));
        if (direction === undefined) throw new TypeError('direction option is required');
        // Offset time zones or UTC have no transitions
        if (IsOffsetTimeZoneIdentifier(timeZone) || timeZone === 'UTC') {
          return null;
        }
        var thisEpochNanoseconds = GetSlot(this, EPOCHNANOSECONDS);
        var epochNanoseconds = direction === 'next' ? GetNamedTimeZoneNextTransition(timeZone, thisEpochNanoseconds) : GetNamedTimeZonePreviousTransition(timeZone, thisEpochNanoseconds);
        return epochNanoseconds === null ? null : CreateTemporalZonedDateTime(epochNanoseconds, timeZone, GetSlot(this, CALENDAR));
      }
    }, {
      key: "toInstant",
      value: function toInstant() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalInstant(GetSlot(this, EPOCHNANOSECONDS));
      }
    }, {
      key: "toPlainDate",
      value: function toPlainDate() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalDate(dateTime(this).isoDate, GetSlot(this, CALENDAR));
      }
    }, {
      key: "toPlainTime",
      value: function toPlainTime() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalTime(dateTime(this).time);
      }
    }, {
      key: "toPlainDateTime",
      value: function toPlainDateTime() {
        CheckReceiver(this, IsTemporalZonedDateTime);
        return CreateTemporalDateTime(dateTime(this), GetSlot(this, CALENDAR));
      }
    }], [{
      key: "from",
      value: function from(item) {
        var optionsParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return ToTemporalZonedDateTime(item, optionsParam);
      }
    }, {
      key: "compare",
      value: function compare(oneParam, twoParam) {
        var one = ToTemporalZonedDateTime(oneParam);
        var two = ToTemporalZonedDateTime(twoParam);
        var ns1 = GetSlot(one, EPOCHNANOSECONDS);
        var ns2 = GetSlot(two, EPOCHNANOSECONDS);
        if (JSBI.lessThan(JSBI.BigInt(ns1), JSBI.BigInt(ns2))) return -1;
        if (JSBI.greaterThan(JSBI.BigInt(ns1), JSBI.BigInt(ns2))) return 1;
        return 0;
      }
    }]);
    return ZonedDateTime;
  }();
  MakeIntrinsicClass(ZonedDateTime, 'Temporal.ZonedDateTime');
  function dateTime(zdt) {
    return GetISODateTimeFor(GetSlot(zdt, TIME_ZONE), GetSlot(zdt, EPOCHNANOSECONDS));
  }
  function getCalendarProperty(zdt, prop) {
    CheckReceiver(zdt, IsTemporalZonedDateTime);
    var isoDate = dateTime(zdt).isoDate;
    return calendarImplForObj(zdt).isoToDate(isoDate, _defineProperty({}, prop, true))[prop];
  }
  function getTimeProperty(zdt, prop) {
    CheckReceiver(zdt, IsTemporalZonedDateTime);
    return dateTime(zdt).time[prop];
  }

  var temporal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Duration: Duration,
    Instant: Instant,
    Now: Now,
    PlainDate: PlainDate,
    PlainDateTime: PlainDateTime,
    PlainMonthDay: PlainMonthDay,
    PlainTime: PlainTime,
    PlainYearMonth: PlainYearMonth,
    ZonedDateTime: ZonedDateTime
  });

  // By default, a plain function can be called as a constructor. A method such as
  // Date.prototype.toTemporalInstant should not be able to. We could check
  // new.target in the body of toTemporalInstant, but that is not sufficient for
  // preventing construction when passing it as the newTarget parameter of
  // Reflect.construct. So we create it as a method of an otherwise unused class,
  // and monkeypatch it onto Date.prototype.
  var LegacyDateImpl = /*#__PURE__*/function () {
    function LegacyDateImpl() {
      _classCallCheck(this, LegacyDateImpl);
    }
    _createClass(LegacyDateImpl, [{
      key: "toTemporalInstant",
      value: function toTemporalInstant() {
        var epochNanoseconds = epochMsToNs(Date.prototype.valueOf.call(this));
        return CreateTemporalInstant(epochNanoseconds);
      }
    }]);
    return LegacyDateImpl;
  }();
  var toTemporalInstant = LegacyDateImpl.prototype.toTemporalInstant;

  // This entry point treats Temporal as a library, and does not polyfill it onto
  // the global object.
  // This is in order to avoid breaking the web in the future, if the polyfill
  // gains wide adoption before the API is finalized. We do not want checks such
  // as `if (typeof Temporal === 'undefined')` in the wild, until browsers start
  // shipping the finalized API.
  // Work around https://github.com/babel/babel/issues/2025.
  var types = [Instant, PlainDate, PlainDateTime, Duration, PlainMonthDay,
  // Temporal.Now, // plain object (not a constructor), so no `prototype`
  PlainTime, PlainYearMonth, ZonedDateTime];
  for (var _i = 0, _types = types; _i < _types.length; _i++) {
    var type = _types[_i];
    var descriptor = Object.getOwnPropertyDescriptor(type, 'prototype');
    if (descriptor.configurable || descriptor.enumerable || descriptor.writable) {
      descriptor.configurable = false;
      descriptor.enumerable = false;
      descriptor.writable = false;
      Object.defineProperty(type, 'prototype', descriptor);
    }
  }

  exports.Intl = intl;
  exports.Temporal = temporal;
  exports.toTemporalInstant = toTemporalInstant;

}));
//# sourceMappingURL=index.umd.js.map
