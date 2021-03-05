"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

/* eslint-disable max-classes-per-file */
var events = require('events');

var JSZip = require('jszip');

var StreamBuf = require('./stream-buf'); // The purpose of this module is to wrap the js-zip library into a streaming zip library
// since most of the exceljs code uses streams.
// One day I might find (or build) a properly streaming browser safe zip lib
// =============================================================================
// The ZipReader class
// Unpacks an incoming zip stream


var ZipReader = /*#__PURE__*/function (_events$EventEmitter) {
  _inherits(ZipReader, _events$EventEmitter);

  var _super = _createSuper(ZipReader);

  function ZipReader(options) {
    var _this;

    _classCallCheck(this, ZipReader);

    _this = _super.call(this);
    _this.count = 0;
    _this.jsZip = new JSZip();
    _this.stream = new StreamBuf();

    _this.stream.on('finish', function () {
      _this._process();
    });

    _this.getEntryType = options.getEntryType || function () {
      return 'string';
    };

    return _this;
  }

  _createClass(ZipReader, [{
    key: "_finished",
    value: function _finished() {
      var _this2 = this;

      if (! --this.count) {
        process.nextTick(function () {
          _this2.emit('finished');
        });
      }
    }
  }, {
    key: "_process",
    value: function () {
      var _process2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var content, zip;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                content = this.stream.read();
                _context2.next = 4;
                return this.jsZip.loadAsync(content);

              case 4:
                zip = _context2.sent;
                zip.forEach( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, entry) {
                    var data, entryStream;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (entry.dir) {
                              _context.next = 17;
                              break;
                            }

                            _this3.count++;
                            _context.prev = 2;
                            _context.next = 5;
                            return entry.async(_this3.getEntryType(path));

                          case 5:
                            data = _context.sent;
                            entryStream = new StreamBuf();
                            entryStream.path = path;
                            entryStream.write(data);

                            entryStream.autodrain = function () {
                              _this3._finished();
                            };

                            entryStream.on('finish', function () {
                              _this3._finished();
                            });

                            _this3.emit('entry', entryStream);

                            _context.next = 17;
                            break;

                          case 14:
                            _context.prev = 14;
                            _context.t0 = _context["catch"](2);

                            _this3.emit('error', _context.t0);

                          case 17:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[2, 14]]);
                  }));

                  return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                this.emit('error', _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function _process() {
        return _process2.apply(this, arguments);
      }

      return _process;
    }() // ==========================================================================
    // Stream.Writable interface

  }, {
    key: "write",
    value: function () {
      var _write = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, encoding, callback) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.error) {
                  _context3.next = 5;
                  break;
                }

                if (callback) {
                  callback(this.error);
                }

                throw this.error;

              case 5:
                _context3.prev = 5;
                _context3.next = 8;
                return this.stream.write(data, encoding, callback);

              case 8:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](5);
                this.emit('error', _context3.t0);
                return _context3.abrupt("return", _context3.t0);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 12]]);
      }));

      function write(_x3, _x4, _x5) {
        return _write.apply(this, arguments);
      }

      return write;
    }()
  }, {
    key: "cork",
    value: function cork() {
      return this.stream.cork();
    }
  }, {
    key: "uncork",
    value: function uncork() {
      return this.stream.uncork();
    }
  }, {
    key: "end",
    value: function end() {
      return this.stream.end();
    }
  }, {
    key: "destroy",
    value: function destroy(error) {
      this.emit('finished');
      this.error = error;
    }
  }]);

  return ZipReader;
}(events.EventEmitter); // =============================================================================
// The ZipWriter class
// Packs streamed data into an output zip stream


var ZipWriter = /*#__PURE__*/function (_events$EventEmitter2) {
  _inherits(ZipWriter, _events$EventEmitter2);

  var _super2 = _createSuper(ZipWriter);

  function ZipWriter(options) {
    var _this4;

    _classCallCheck(this, ZipWriter);

    _this4 = _super2.call(this);
    _this4.options = Object.assign({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    }, options);
    _this4.zip = new JSZip();
    _this4.stream = new StreamBuf();
    return _this4;
  }

  _createClass(ZipWriter, [{
    key: "append",
    value: function append(data, options) {
      if (options.hasOwnProperty('base64') && options.base64) {
        this.zip.file(options.name, data, {
          base64: true
        });
      } else {
        this.zip.file(options.name, data);
      }
    }
  }, {
    key: "finalize",
    value: function () {
      var _finalize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var content;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.zip.generateAsync(this.options);

              case 2:
                content = _context4.sent;
                this.stream.end(content);
                this.emit('finish');

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function finalize() {
        return _finalize.apply(this, arguments);
      }

      return finalize;
    }() // ==========================================================================
    // Stream.Readable interface

  }, {
    key: "read",
    value: function read(size) {
      return this.stream.read(size);
    }
  }, {
    key: "setEncoding",
    value: function setEncoding(encoding) {
      return this.stream.setEncoding(encoding);
    }
  }, {
    key: "pause",
    value: function pause() {
      return this.stream.pause();
    }
  }, {
    key: "resume",
    value: function resume() {
      return this.stream.resume();
    }
  }, {
    key: "isPaused",
    value: function isPaused() {
      return this.stream.isPaused();
    }
  }, {
    key: "pipe",
    value: function pipe(destination, options) {
      return this.stream.pipe(destination, options);
    }
  }, {
    key: "unpipe",
    value: function unpipe(destination) {
      return this.stream.unpipe(destination);
    }
  }, {
    key: "unshift",
    value: function unshift(chunk) {
      return this.stream.unshift(chunk);
    }
  }, {
    key: "wrap",
    value: function wrap(stream) {
      return this.stream.wrap(stream);
    }
  }]);

  return ZipWriter;
}(events.EventEmitter); // =============================================================================


module.exports = {
  ZipReader: ZipReader,
  ZipWriter: ZipWriter
};
//# sourceMappingURL=zip-stream.js.map
