"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('events'),
    EventEmitter = _require.EventEmitter;

var SAXStream = require('../../utils/sax-stream');

var Enums = require('../../doc/enums');

var RelType = require('../../xlsx/rel-type');

var HyperlinkReader = /*#__PURE__*/function (_EventEmitter) {
  _inherits(HyperlinkReader, _EventEmitter);

  var _super = _createSuper(HyperlinkReader);

  function HyperlinkReader(workbook, id) {
    var _this;

    _classCallCheck(this, HyperlinkReader);

    _this = _super.call(this); // in a workbook, each sheet will have a number

    _this.id = id;
    _this._workbook = workbook;
    return _this;
  }

  _createClass(HyperlinkReader, [{
    key: "each",
    value: function each(fn) {
      return this.hyperlinks.forEach(fn);
    }
  }, {
    key: "read",
    value: function read(entry, options) {
      var _this2 = this;

      var emitHyperlinks = false;
      var hyperlinks = null;

      switch (options.hyperlinks) {
        case 'emit':
          emitHyperlinks = true;
          break;

        case 'cache':
          this.hyperlinks = hyperlinks = {};
          break;

        default:
          break;
      }

      if (!emitHyperlinks && !hyperlinks) {
        entry.autodrain();
        this.emit('finished');
        return;
      }

      var saxStream = new SAXStream(['opentag']);
      saxStream.on('data', function (events) {
        var _iterator = _createForOfIteratorHelper(events),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
                eventType = _step$value.eventType,
                value = _step$value.value;

            if (eventType === 'opentag') {
              var node = value;

              if (node.name === 'Relationship') {
                var rId = node.attributes.Id;

                switch (node.attributes.Type) {
                  case RelType.Hyperlink:
                    {
                      var relationship = {
                        type: Enums.RelationshipType.Styles,
                        rId: rId,
                        target: node.attributes.Target,
                        targetMode: node.attributes.TargetMode
                      };

                      if (emitHyperlinks) {
                        _this2.emit('hyperlink', relationship);
                      } else {
                        hyperlinks[relationship.rId] = relationship;
                      }
                    }
                    break;

                  default:
                    break;
                }
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      saxStream.on('end', function () {
        _this2.emit('finished');
      });
      entry.pipe(saxStream);
    }
  }, {
    key: "count",
    get: function get() {
      return this.hyperlinks && this.hyperlinks.length || 0;
    }
  }]);

  return HyperlinkReader;
}(EventEmitter);

module.exports = HyperlinkReader;
//# sourceMappingURL=hyperlink-reader.js.map
