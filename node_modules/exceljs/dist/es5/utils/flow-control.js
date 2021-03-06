"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var _require = require('events'),
    EventEmitter = _require.EventEmitter;

var utils = require('./utils'); // =============================================================================
// FlowControl - Used to slow down streaming to manageable speed
// Implements a subset of Stream.Duplex: pipe() and write()


var FlowControl = /*#__PURE__*/function (_EventEmitter) {
  _inherits(FlowControl, _EventEmitter);

  var _super = _createSuper(FlowControl);

  function FlowControl(options) {
    var _this;

    _classCallCheck(this, FlowControl);

    _this = _super.call(this);
    _this.options = options = options || {}; // Buffer queue

    _this.queue = []; // Consumer streams

    _this.pipes = []; // Down-stream flow-control instances

    _this.children = []; // Up-stream flow-control instances

    _this.parent = options.parent; // Ensure we don't flush more than once at a time

    _this.flushing = false; // determine timeout for flow control delays

    if (options.gc) {
      var _options = options,
          gc = _options.gc;

      if (gc.getTimeout) {
        _this.getTimeout = gc.getTimeout;
      } else {
        // heap size below which we don't bother delaying
        var threshold = gc.threshold !== undefined ? gc.threshold : 150000000; // convert from heapsize to ms timeout

        var divisor = gc.divisor !== undefined ? gc.divisor : 500000;

        _this.getTimeout = function () {
          var memory = process.memoryUsage();
          var heapSize = memory.heapTotal;
          return heapSize < threshold ? 0 : Math.floor(heapSize / divisor);
        };
      }
    } else {
      _this.getTimeout = null;
    }

    return _this;
  }

  _createClass(FlowControl, [{
    key: "_write",
    value: function _write(dst, data, encoding) {
      // Write to a single destination and return a promise
      return new Promise(function (resolve, reject) {
        dst.write(data, encoding, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
  }, {
    key: "_pipe",
    value: function () {
      var _pipe2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(chunk) {
        var _this2 = this;

        var promises;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Write chunk to all pipes. A chunk with no data is the end
                promises = [];
                this.pipes.forEach(function (pipe) {
                  if (chunk.data) {
                    if (pipe.sync) {
                      pipe.stream.write(chunk.data, chunk.encoding);
                    } else {
                      promises.push(_this2._write(pipe.stream, chunk.data, chunk.encoding));
                    }
                  } else {
                    pipe.stream.end();
                  }
                });

                if (!promises.length) {
                  promises.push(Promise.resolve());
                }

                _context.next = 5;
                return Promise.all(promises);

              case 5:
                try {
                  chunk.callback();
                } catch (e) {// quietly ignore
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _pipe(_x) {
        return _pipe2.apply(this, arguments);
      }

      return _pipe;
    }()
  }, {
    key: "_animate",
    value: function _animate() {
      var count = 0;
      var seq = ['|', '/', '-', '\\'];
      var cr = "\x1B[0G"; // was '\033[0G'

      return setInterval(function () {
        process.stdout.write(seq[count++ % 4] + cr);
      }, 100);
    }
  }, {
    key: "_delay",
    value: function _delay() {
      var _this3 = this;

      // in certain situations it may be useful to delay processing (e.g. for GC)
      var timeout = this.getTimeout && this.getTimeout();

      if (timeout) {
        return new Promise(function (resolve) {
          var anime = _this3._animate();

          setTimeout(function () {
            clearInterval(anime);
            resolve();
          }, timeout);
        });
      }

      return Promise.resolve();
    }
  }, {
    key: "_flush",
    value: function () {
      var _flush2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.queue && !this.flushing && !this.corked)) {
                  _context2.next = 9;
                  break;
                }

                if (!this.queue.length) {
                  _context2.next = 8;
                  break;
                }

                this.flushing = true;
                _context2.next = 5;
                return this._delay();

              case 5:
                _context2.next = 7;
                return this._pipe(this.queue.shift());

              case 7:
                setImmediate(function () {
                  _this4.flushing = false;

                  _this4._flush();
                });

              case 8:
                if (!this.stem) {
                  // Signal up-stream that we're ready for more data
                  this.emit('drain');
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _flush() {
        return _flush2.apply(this, arguments);
      }

      return _flush;
    }()
  }, {
    key: "write",
    value: function write(data, encoding, callback) {
      // Called by up-stream pipe
      if (encoding instanceof Function) {
        callback = encoding;
        encoding = 'utf8';
      }

      callback = callback || utils.nop;

      if (!this.queue) {
        throw new Error('Cannot write to stream after end');
      } // Always queue chunks and then flush


      this.queue.push({
        data: data,
        encoding: encoding,
        callback: callback
      });

      this._flush(); // restrict further incoming data if we have backed up buffers or
      // the children are still busy


      var stemFlow = this.corked || this.queue.length > 3;
      return !stemFlow;
    }
  }, {
    key: "end",
    value: function end() {
      var _this5 = this;

      // Signal from up-stream
      this.queue.push({
        callback: function callback() {
          _this5.queue = null;

          _this5.emit('finish');
        }
      });

      this._flush();
    }
  }, {
    key: "pipe",
    value: function pipe(stream, options) {
      options = options || {}; // some streams don't call callbacks

      var sync = options.sync || false;
      this.pipes.push({
        stream: stream,
        sync: sync
      });
    }
  }, {
    key: "unpipe",
    value: function unpipe(stream) {
      this.pipes = this.pipes.filter(function (pipe) {
        return pipe.stream !== stream;
      });
    }
  }, {
    key: "createChild",
    value: function createChild() {
      var _this6 = this;

      // Create a down-stream flow-control
      var options = _objectSpread({
        parent: this
      }, this.options);

      var child = new FlowControl(options);
      this.children.push(child);
      child.on('drain', function () {
        // a child is ready for more
        _this6._flush();
      });
      child.on('finish', function () {
        // One child has finished its stream. Remove it and continue
        _this6.children = _this6.children.filter(function (item) {
          return item !== child;
        });

        _this6._flush();
      });
      return child;
    }
  }, {
    key: "name",
    get: function get() {
      return ['FlowControl', this.parent ? 'Child' : 'Root', this.corked ? 'corked' : 'open'].join(' ');
    }
  }, {
    key: "corked",
    get: function get() {
      // We remain corked while we have children and at least one has data to consume
      return this.children.length > 0 && this.children.some(function (child) {
        return child.queue && child.queue.length;
      });
    }
  }, {
    key: "stem",
    get: function get() {
      // the decision to stem the incoming data depends on whether the children are corked
      // and how many buffers we have backed up
      return this.corked || !this.queue || this.queue.length > 2;
    }
  }]);

  return FlowControl;
}(EventEmitter);

module.exports = FlowControl;
//# sourceMappingURL=flow-control.js.map
