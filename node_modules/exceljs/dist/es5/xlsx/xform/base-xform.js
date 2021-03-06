"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SAXStream = require('../../utils/sax-stream');

var XmlStream = require('../../utils/xml-stream');
/* 'virtual' methods used as a form of documentation */

/* eslint-disable class-methods-use-this */
// Base class for Xforms


var BaseXform = /*#__PURE__*/function () {
  function BaseXform() {
    _classCallCheck(this, BaseXform);
  }

  _createClass(BaseXform, [{
    key: "prepare",
    // constructor(/* model, name */) {}
    // ============================================================
    // Virtual Interface
    value: function prepare()
    /* model, options */
    {// optional preparation (mutation) of model so it is ready for write
    }
  }, {
    key: "render",
    value: function render()
    /* xmlStream, model */
    {// convert model to xml
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {// XML node opened
    }
  }, {
    key: "parseText",
    value: function parseText(text) {// chunk of text encountered for current node
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {// XML node closed
    }
  }, {
    key: "reconcile",
    value: function reconcile(model, options) {} // optional post-parse step (opposite to prepare)
    // ============================================================

  }, {
    key: "reset",
    value: function reset() {
      // to make sure parses don't bleed to next iteration
      this.model = null; // if we have a map - reset them too

      if (this.map) {
        Object.values(this.map).forEach(function (xform) {
          if (xform instanceof BaseXform) {
            xform.reset();
          } else if (xform.xform) {
            xform.xform.reset();
          }
        });
      }
    }
  }, {
    key: "mergeModel",
    value: function mergeModel(obj) {
      // set obj's props to this.model
      this.model = Object.assign(this.model || {}, obj);
    }
  }, {
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(saxStream, stream) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var abort = function abort(error) {
                    if (stream) {
                      stream.unpipe(saxStream);
                    }

                    reject(error);
                  };

                  saxStream.on('data', function (events) {
                    try {
                      var _iterator = _createForOfIteratorHelper(events),
                          _step;

                      try {
                        for (_iterator.s(); !(_step = _iterator.n()).done;) {
                          var _step$value = _step.value,
                              eventType = _step$value.eventType,
                              value = _step$value.value;

                          if (eventType === 'opentag') {
                            _this.parseOpen(value);
                          } else if (eventType === 'text') {
                            _this.parseText(value);
                          } else if (eventType === 'closetag') {
                            if (!_this.parseClose(value.name)) {
                              resolve(_this.model);
                            }
                          }
                        }
                      } catch (err) {
                        _iterator.e(err);
                      } finally {
                        _iterator.f();
                      }
                    } catch (error) {
                      abort(error);
                    }
                  });
                  saxStream.on('error', abort);
                  saxStream.on('end', function () {
                    resolve(_this.model);
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function parse(_x, _x2) {
        return _parse.apply(this, arguments);
      }

      return parse;
    }()
  }, {
    key: "parseStream",
    value: function () {
      var _parseStream = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(stream) {
        var saxStream;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                saxStream = new SAXStream(['opentag', 'text', 'closetag']);
                stream.pipe(saxStream);
                return _context2.abrupt("return", this.parse(saxStream, stream));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function parseStream(_x3) {
        return _parseStream.apply(this, arguments);
      }

      return parseStream;
    }()
  }, {
    key: "toXml",
    value: function toXml(model) {
      var xmlStream = new XmlStream();
      this.render(xmlStream, model);
      return xmlStream.xml;
    } // ============================================================
    // Useful Utilities

  }, {
    key: "xml",
    get: function get() {
      // convenience function to get the xml of this.model
      // useful for manager types that are built during the prepare phase
      return this.toXml(this.model);
    }
  }], [{
    key: "toAttribute",
    value: function toAttribute(value, dflt) {
      var always = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (value === undefined) {
        if (always) {
          return dflt;
        }
      } else if (always || value !== dflt) {
        return value.toString();
      }

      return undefined;
    }
  }, {
    key: "toStringAttribute",
    value: function toStringAttribute(value, dflt) {
      var always = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return BaseXform.toAttribute(value, dflt, always);
    }
  }, {
    key: "toStringValue",
    value: function toStringValue(attr, dflt) {
      return attr === undefined ? dflt : attr;
    }
  }, {
    key: "toBoolAttribute",
    value: function toBoolAttribute(value, dflt) {
      var always = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (value === undefined) {
        if (always) {
          return dflt;
        }
      } else if (always || value !== dflt) {
        return value ? '1' : '0';
      }

      return undefined;
    }
  }, {
    key: "toBoolValue",
    value: function toBoolValue(attr, dflt) {
      return attr === undefined ? dflt : attr === '1';
    }
  }, {
    key: "toIntAttribute",
    value: function toIntAttribute(value, dflt) {
      var always = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return BaseXform.toAttribute(value, dflt, always);
    }
  }, {
    key: "toIntValue",
    value: function toIntValue(attr, dflt) {
      return attr === undefined ? dflt : parseInt(attr, 10);
    }
  }, {
    key: "toFloatAttribute",
    value: function toFloatAttribute(value, dflt) {
      var always = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return BaseXform.toAttribute(value, dflt, always);
    }
  }, {
    key: "toFloatValue",
    value: function toFloatValue(attr, dflt) {
      return attr === undefined ? dflt : parseFloat(attr);
    }
  }]);

  return BaseXform;
}();

module.exports = BaseXform;
//# sourceMappingURL=base-xform.js.map
