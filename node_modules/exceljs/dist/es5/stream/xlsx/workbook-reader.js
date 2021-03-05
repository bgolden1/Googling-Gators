"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var fs = require('fs');

var _require = require('events'),
    EventEmitter = _require.EventEmitter;

var Stream = require('readable-stream');

var nodeStream = require('stream');

var unzip = require('unzipper');

var tmp = require('tmp');

var SAXStream = require('../../utils/sax-stream');

var FlowControl = require('../../utils/flow-control');

var StyleManager = require('../../xlsx/xform/style/styles-xform');

var WorkbookPropertiesManager = require('../../xlsx/xform/book/workbook-properties-xform');

var WorksheetReader = require('./worksheet-reader');

var HyperlinkReader = require('./hyperlink-reader');

tmp.setGracefulCleanup();

var WorkbookReader = /*#__PURE__*/function (_EventEmitter) {
  _inherits(WorkbookReader, _EventEmitter);

  var _super = _createSuper(WorkbookReader);

  function WorkbookReader(options) {
    var _this;

    _classCallCheck(this, WorkbookReader);

    _this = _super.call(this);
    _this.options = options || {};
    _this.styles = new StyleManager();

    _this.styles.init();

    _this.properties = new WorkbookPropertiesManager(); // worksheet readers, indexed by sheetNo

    _this.worksheetReaders = {}; // hyperlink readers, indexed by sheetNo

    _this.hyperlinkReaders = {}; // count the open readers

    _this.readers = 0; // end of stream check

    _this.atEnd = false; // worksheets, deferred for parsing after shared strings reading

    _this.waitingWorkSheets = []; // callbacks for temp files cleanup

    _this.tempFileCleanupCallbacks = [];
    return _this;
  }

  _createClass(WorkbookReader, [{
    key: "_getStream",
    value: function _getStream(input) {
      if (input instanceof Stream.Readable || input instanceof nodeStream.Readable) {
        return input;
      }

      if (typeof input === 'string') {
        return fs.createReadStream(input);
      }

      throw new Error('Could not recognise input');
    }
  }, {
    key: "read",
    value: function read(input, options) {
      var _this2 = this;

      var stream = this.stream = this._getStream(input);

      var zip = this.zip = unzip.Parse();
      var pendingWorksheetsTmpFiles = [];
      zip.on('entry', function (entry) {
        var match;
        var sheetNo;

        switch (entry.path) {
          case '_rels/.rels':
          case 'xl/_rels/workbook.xml.rels':
            entry.autodrain();
            break;

          case 'xl/workbook.xml':
            _this2._parseWorkbook(entry, options);

            break;

          case 'xl/sharedStrings.xml':
            _this2._parseSharedStrings(entry, options);

            break;

          case 'xl/styles.xml':
            _this2._parseStyles(entry, options);

            break;

          default:
            if (entry.path.match(/xl\/worksheets\/sheet\d+[.]xml/)) {
              match = entry.path.match(/xl\/worksheets\/sheet(\d+)[.]xml/);
              sheetNo = match[1];

              if (_this2.sharedStrings) {
                _this2._parseWorksheet(entry, sheetNo, options);
              } else {
                // create temp file for each worksheet
                pendingWorksheetsTmpFiles.push(new Promise(function (resolve, reject) {
                  tmp.file(function (err, path, fd, cleanupCallback) {
                    if (err) {
                      return reject(err);
                    }

                    var tempStream = fs.createWriteStream(path);

                    _this2.waitingWorkSheets.push({
                      sheetNo: sheetNo,
                      options: options,
                      path: path
                    });

                    entry.pipe(tempStream);

                    _this2.tempFileCleanupCallbacks.push(cleanupCallback);

                    return tempStream.on('finish', function () {
                      return resolve();
                    });
                  });
                }));
              }
            } else if (entry.path.match(/xl\/worksheets\/_rels\/sheet\d+[.]xml.rels/)) {
              match = entry.path.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);
              sheetNo = match[1];

              _this2._parseHyperlinks(entry, sheetNo, options);
            } else {
              entry.autodrain();
            }

            break;
        }
      });
      zip.on('close', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var currentBook, processBooks;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Promise.all(pendingWorksheetsTmpFiles);

              case 3:
                _context.next = 9;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);

                _this2.emit('error', _context.t0);

                return _context.abrupt("return");

              case 9:
                if (_this2.waitingWorkSheets.length) {
                  currentBook = 0;

                  processBooks = function processBooks() {
                    var worksheetInfo = _this2.waitingWorkSheets[currentBook];
                    var entry = fs.createReadStream(worksheetInfo.path);
                    var sheetNo = worksheetInfo.sheetNo;

                    var worksheet = _this2._parseWorksheet(entry, sheetNo, worksheetInfo.options);

                    worksheet.on('finished', function () {
                      ++currentBook;

                      if (currentBook === _this2.waitingWorkSheets.length) {
                        // temp files cleaning up
                        _this2.tempFileCleanupCallbacks.forEach(function (cb) {
                          cb();
                        });

                        _this2.tempFileCleanupCallbacks = [];

                        _this2.emit('end');

                        _this2.atEnd = true;

                        if (!_this2.readers) {
                          _this2.emit('finished');
                        }
                      } else {
                        setImmediate(processBooks);
                      }
                    });
                  };

                  setImmediate(processBooks);
                } else {
                  _this2.emit('end');

                  _this2.atEnd = true;

                  if (!_this2.readers) {
                    _this2.emit('finished');
                  }
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 5]]);
      })));
      zip.on('error', function (err) {
        _this2.emit('error', err);
      }); // Pipe stream into top flow-control
      // this.flowControl.pipe(zip);

      stream.pipe(zip);
    }
  }, {
    key: "_emitEntry",
    value: function _emitEntry(options, payload) {
      if (options.entries === 'emit') {
        this.emit('entry', payload);
      }
    }
  }, {
    key: "_parseWorkbook",
    value: function _parseWorkbook(entry, options) {
      this._emitEntry(options, {
        type: 'workbook'
      });

      this.properties.parseStream(entry);
    }
  }, {
    key: "_parseSharedStrings",
    value: function _parseSharedStrings(entry, options) {
      var _this3 = this;

      this._emitEntry(options, {
        type: 'shared-strings'
      });

      var sharedStrings = null;

      switch (options.sharedStrings) {
        case 'cache':
          sharedStrings = this.sharedStrings = [];
          break;

        case 'emit':
          break;

        default:
          entry.autodrain();
          return;
      }

      var inT = false;
      var t = null;
      var index = 0;
      var saxStream = new SAXStream(['opentag', 'text', 'closetag']);
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

              if (node.name === 't') {
                t = null;
                inT = true;
              }
            } else if (eventType === 'text') {
              t = t ? t + value : value;
            } else if (eventType === 'closetag') {
              var _node = value;

              if (inT && _node.name === 't') {
                if (sharedStrings) {
                  sharedStrings.push(t);
                } else {
                  _this3.emit('shared-string', {
                    index: index++,
                    text: t
                  });
                }

                t = null;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      saxStream.on('error', function (error) {
        _this3.emit('error', error);
      });
      entry.pipe(saxStream);
    }
  }, {
    key: "_parseStyles",
    value: function _parseStyles(entry, options) {
      this._emitEntry(options, {
        type: 'styles'
      });

      if (options.styles !== 'cache') {
        entry.autodrain();
        return;
      }

      this.styles = new StyleManager();
      this.styles.parseStream(entry);
    }
  }, {
    key: "_getReader",
    value: function _getReader(Type, collection, sheetNo) {
      var _this4 = this;

      var reader = collection[sheetNo];

      if (!reader) {
        reader = new Type(this, sheetNo);
        this.readers++;
        reader.on('finished', function () {
          if (! --_this4.readers) {
            if (_this4.atEnd) {
              _this4.emit('finished');
            }
          }
        });
        collection[sheetNo] = reader;
      }

      return reader;
    }
  }, {
    key: "_parseWorksheet",
    value: function _parseWorksheet(entry, sheetNo, options) {
      this._emitEntry(options, {
        type: 'worksheet',
        id: sheetNo
      });

      var worksheetReader = this._getReader(WorksheetReader, this.worksheetReaders, sheetNo);

      if (options.worksheets === 'emit') {
        this.emit('worksheet', worksheetReader);
      }

      worksheetReader.read(entry, options, this.hyperlinkReaders[sheetNo]);
      return worksheetReader;
    }
  }, {
    key: "_parseHyperlinks",
    value: function _parseHyperlinks(entry, sheetNo, options) {
      this._emitEntry(options, {
        type: 'hyerlinks',
        id: sheetNo
      });

      var hyperlinksReader = this._getReader(HyperlinkReader, this.hyperlinkReaders, sheetNo);

      if (options.hyperlinks === 'emit') {
        this.emit('hyperlinks', hyperlinksReader);
      }

      hyperlinksReader.read(entry, options);
    }
  }, {
    key: "flowControl",
    get: function get() {
      if (!this._flowControl) {
        this._flowControl = new FlowControl(this.options);
      }

      return this._flowControl;
    }
  }]);

  return WorkbookReader;
}(EventEmitter); // for reference - these are the valid values for options


WorkbookReader.Options = {
  entries: ['emit'],
  sharedStrings: ['cache', 'emit'],
  styles: ['cache'],
  hyperlinks: ['cache', 'emit'],
  worksheets: ['emit']
};
module.exports = WorkbookReader;
//# sourceMappingURL=workbook-reader.js.map
