"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.handleGradient = exports.sortGradient = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */
var sortGradient = function sortGradient(gradients) {
  var tempArr = []; // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _Object$entries = Object.entries(gradients); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    var formatKey = parseFloat(key.replace(/%/g, ''));

    if (isNaN(formatKey)) {
      return {};
    }

    tempArr.push({
      key: formatKey,
      value: value
    });
  }

  tempArr = tempArr.sort(function (a, b) {
    return a.key - b.key;
  });
  return tempArr.map(function (_ref) {
    var key = _ref.key,
        value = _ref.value;
    return "".concat(value, " ").concat(key, "%");
  }).join(', ');
};
/**
 * {
 *   '0%': '#afc163',
 *   '25%': '#66FF00',
 *   '50%': '#00CC00',     ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *   '75%': '#009900',              #00CC00 50%, #009900 75%, #ffffff 100%)
 *   '100%': '#ffffff'
 * }
 *
 * Then this man came to realize the truth:
 * Besides six pence, there is the moon.
 * Besides bread and butter, there is the bug.
 * And...
 * Besides women, there is the code.
 */


exports.sortGradient = sortGradient;

var handleGradient = function handleGradient(strokeColor) {
  var _strokeColor$from = strokeColor.from,
      from = _strokeColor$from === void 0 ? '#1890ff' : _strokeColor$from,
      _strokeColor$to = strokeColor.to,
      to = _strokeColor$to === void 0 ? '#1890ff' : _strokeColor$to,
      _strokeColor$directio = strokeColor.direction,
      direction = _strokeColor$directio === void 0 ? 'to right' : _strokeColor$directio,
      rest = __rest(strokeColor, ["from", "to", "direction"]);

  if (Object.keys(rest).length !== 0) {
    var sortedGradients = sortGradient(rest);
    return {
      backgroundImage: "linear-gradient(".concat(direction, ", ").concat(sortedGradients, ")")
    };
  }

  return {
    backgroundImage: "linear-gradient(".concat(direction, ", ").concat(from, ", ").concat(to, ")")
  };
};

exports.handleGradient = handleGradient;

var Line = function Line(props) {
  var prefixCls = props.prefixCls,
      percent = props.percent,
      successPercent = props.successPercent,
      strokeWidth = props.strokeWidth,
      size = props.size,
      strokeColor = props.strokeColor,
      strokeLinecap = props.strokeLinecap,
      children = props.children;
  var backgroundProps;

  if (strokeColor && typeof strokeColor !== 'string') {
    backgroundProps = handleGradient(strokeColor);
  } else {
    backgroundProps = {
      background: strokeColor
    };
  }

  var percentStyle = _extends({
    width: "".concat((0, _utils.validProgress)(percent), "%"),
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : ''
  }, backgroundProps);

  var successPercentStyle = {
    width: "".concat((0, _utils.validProgress)(successPercent), "%"),
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : ''
  };
  var successSegment = successPercent !== undefined ? React.createElement("div", {
    className: "".concat(prefixCls, "-success-bg"),
    style: successPercentStyle
  }) : null;
  return React.createElement("div", null, React.createElement("div", {
    className: "".concat(prefixCls, "-outer")
  }, React.createElement("div", {
    className: "".concat(prefixCls, "-inner")
  }, React.createElement("div", {
    className: "".concat(prefixCls, "-bg"),
    style: percentStyle
  }), successSegment)), children);
};

var _default = Line;
exports["default"] = _default;
//# sourceMappingURL=Line.js.map
