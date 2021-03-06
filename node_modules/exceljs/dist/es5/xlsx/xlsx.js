"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require('fs');

var ZipStream = require('../utils/zip-stream');

var StreamBuf = require('../utils/stream-buf');

var utils = require('../utils/utils');

var XmlStream = require('../utils/xml-stream');

var StylesXform = require('./xform/style/styles-xform');

var CoreXform = require('./xform/core/core-xform');

var SharedStringsXform = require('./xform/strings/shared-strings-xform');

var RelationshipsXform = require('./xform/core/relationships-xform');

var ContentTypesXform = require('./xform/core/content-types-xform');

var AppXform = require('./xform/core/app-xform');

var WorkbookXform = require('./xform/book/workbook-xform');

var WorksheetXform = require('./xform/sheet/worksheet-xform');

var DrawingXform = require('./xform/drawing/drawing-xform');

var TableXform = require('./xform/table/table-xform');

var CommentsXform = require('./xform/comment/comments-xform');

var VmlNotesXform = require('./xform/comment/vml-notes-xform');

var theme1Xml = require('./xml/theme1.js');

function fsReadFileAsync(filename, options) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, options, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

var XLSX = /*#__PURE__*/function () {
  function XLSX(workbook) {
    _classCallCheck(this, XLSX);

    this.workbook = workbook;
  } // ===============================================================================
  // Workbook
  // =========================================================================
  // Read


  _createClass(XLSX, [{
    key: "readFile",
    value: function () {
      var _readFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filename, options) {
        var stream, workbook;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return utils.fs.exists(filename);

              case 2:
                if (_context.sent) {
                  _context.next = 4;
                  break;
                }

                throw new Error("File not found: ".concat(filename));

              case 4:
                stream = fs.createReadStream(filename);
                _context.prev = 5;
                _context.next = 8;
                return this.read(stream, options);

              case 8:
                workbook = _context.sent;
                stream.close();
                return _context.abrupt("return", workbook);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);
                stream.close();
                throw _context.t0;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 13]]);
      }));

      function readFile(_x, _x2) {
        return _readFile.apply(this, arguments);
      }

      return readFile;
    }()
  }, {
    key: "parseRels",
    value: function parseRels(stream) {
      var xform = new RelationshipsXform();
      return xform.parseStream(stream);
    }
  }, {
    key: "parseWorkbook",
    value: function parseWorkbook(stream) {
      var xform = new WorkbookXform();
      return xform.parseStream(stream);
    }
  }, {
    key: "parseSharedStrings",
    value: function parseSharedStrings(stream) {
      var xform = new SharedStringsXform();
      return xform.parseStream(stream);
    }
  }, {
    key: "reconcile",
    value: function reconcile(model, options) {
      var workbookXform = new WorkbookXform();
      var worksheetXform = new WorksheetXform(options);
      var drawingXform = new DrawingXform();
      var tableXform = new TableXform();
      workbookXform.reconcile(model); // reconcile drawings with their rels

      var drawingOptions = {
        media: model.media,
        mediaIndex: model.mediaIndex
      };
      Object.keys(model.drawings).forEach(function (name) {
        var drawing = model.drawings[name];
        var drawingRel = model.drawingRels[name];

        if (drawingRel) {
          drawingOptions.rels = drawingRel.reduce(function (o, rel) {
            o[rel.Id] = rel;
            return o;
          }, {});
          (drawing.anchors || []).forEach(function (anchor) {
            var hyperlinks = anchor.picture && anchor.picture.hyperlinks;

            if (hyperlinks && drawingOptions.rels[hyperlinks.rId]) {
              hyperlinks.hyperlink = drawingOptions.rels[hyperlinks.rId].Target;
              delete hyperlinks.rId;
            }
          });
          drawingXform.reconcile(drawing, drawingOptions);
        }
      }); // reconcile tables with the default styles

      var tableOptions = {
        styles: model.styles
      };
      Object.values(model.tables).forEach(function (table) {
        tableXform.reconcile(table, tableOptions);
      });
      var sheetOptions = {
        styles: model.styles,
        sharedStrings: model.sharedStrings,
        media: model.media,
        mediaIndex: model.mediaIndex,
        date1904: model.properties && model.properties.date1904,
        drawings: model.drawings,
        comments: model.comments,
        tables: model.tables,
        vmlDrawings: model.vmlDrawings
      };
      model.worksheets.forEach(function (worksheet) {
        worksheet.relationships = model.worksheetRels[worksheet.sheetNo];
        worksheetXform.reconcile(worksheet, sheetOptions);
      }); // delete unnecessary parts

      delete model.worksheetHash;
      delete model.worksheetRels;
      delete model.globalRels;
      delete model.sharedStrings;
      delete model.workbookRels;
      delete model.sheetDefs;
      delete model.styles;
      delete model.mediaIndex;
      delete model.drawings;
      delete model.drawingRels;
      delete model.vmlDrawings;
    }
  }, {
    key: "_processWorksheetEntry",
    value: function () {
      var _processWorksheetEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(entry, model, sheetNo, options) {
        var xform, worksheet;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                xform = new WorksheetXform(options);
                _context2.next = 3;
                return xform.parseStream(entry);

              case 3:
                worksheet = _context2.sent;
                worksheet.sheetNo = sheetNo;
                model.worksheetHash[entry.path] = worksheet;
                model.worksheets.push(worksheet);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _processWorksheetEntry(_x3, _x4, _x5, _x6) {
        return _processWorksheetEntry2.apply(this, arguments);
      }

      return _processWorksheetEntry;
    }()
  }, {
    key: "_processCommentEntry",
    value: function () {
      var _processCommentEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(entry, model, name) {
        var xform, comments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                xform = new CommentsXform();
                _context3.next = 3;
                return xform.parseStream(entry);

              case 3:
                comments = _context3.sent;
                model.comments["../".concat(name, ".xml")] = comments;

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _processCommentEntry(_x7, _x8, _x9) {
        return _processCommentEntry2.apply(this, arguments);
      }

      return _processCommentEntry;
    }()
  }, {
    key: "_processTableEntry",
    value: function () {
      var _processTableEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(entry, model, name) {
        var xform, table;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                xform = new TableXform();
                _context4.next = 3;
                return xform.parseStream(entry);

              case 3:
                table = _context4.sent;
                model.tables["../tables/".concat(name, ".xml")] = table;

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function _processTableEntry(_x10, _x11, _x12) {
        return _processTableEntry2.apply(this, arguments);
      }

      return _processTableEntry;
    }()
  }, {
    key: "_processWorksheetRelsEntry",
    value: function () {
      var _processWorksheetRelsEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(entry, model, sheetNo) {
        var xform, relationships;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                xform = new RelationshipsXform();
                _context5.next = 3;
                return xform.parseStream(entry);

              case 3:
                relationships = _context5.sent;
                model.worksheetRels[sheetNo] = relationships;

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function _processWorksheetRelsEntry(_x13, _x14, _x15) {
        return _processWorksheetRelsEntry2.apply(this, arguments);
      }

      return _processWorksheetRelsEntry;
    }()
  }, {
    key: "_processMediaEntry",
    value: function () {
      var _processMediaEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(entry, model, filename) {
        var lastDot, extension, name;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                lastDot = filename.lastIndexOf('.'); // if we can't determine extension, ignore it

                if (!(lastDot >= 1)) {
                  _context6.next = 6;
                  break;
                }

                extension = filename.substr(lastDot + 1);
                name = filename.substr(0, lastDot);
                _context6.next = 6;
                return new Promise(function (resolve, reject) {
                  var streamBuf = new StreamBuf();
                  streamBuf.on('finish', function () {
                    model.mediaIndex[filename] = model.media.length;
                    model.mediaIndex[name] = model.media.length;
                    var medium = {
                      type: 'image',
                      name: name,
                      extension: extension,
                      buffer: streamBuf.toBuffer()
                    };
                    model.media.push(medium);
                    resolve();
                  });
                  entry.on('error', function (error) {
                    reject(error);
                  });
                  entry.pipe(streamBuf);
                });

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function _processMediaEntry(_x16, _x17, _x18) {
        return _processMediaEntry2.apply(this, arguments);
      }

      return _processMediaEntry;
    }()
  }, {
    key: "_processDrawingEntry",
    value: function () {
      var _processDrawingEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(entry, model, name) {
        var xform, drawing;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                xform = new DrawingXform();
                _context7.next = 3;
                return xform.parseStream(entry);

              case 3:
                drawing = _context7.sent;
                model.drawings[name] = drawing;

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function _processDrawingEntry(_x19, _x20, _x21) {
        return _processDrawingEntry2.apply(this, arguments);
      }

      return _processDrawingEntry;
    }()
  }, {
    key: "_processDrawingRelsEntry",
    value: function () {
      var _processDrawingRelsEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(entry, model, name) {
        var xform, relationships;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                xform = new RelationshipsXform();
                _context8.next = 3;
                return xform.parseStream(entry);

              case 3:
                relationships = _context8.sent;
                model.drawingRels[name] = relationships;

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function _processDrawingRelsEntry(_x22, _x23, _x24) {
        return _processDrawingRelsEntry2.apply(this, arguments);
      }

      return _processDrawingRelsEntry;
    }()
  }, {
    key: "_processVmlDrawingEntry",
    value: function () {
      var _processVmlDrawingEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(entry, model, name) {
        var xform, vmlDrawing;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                xform = new VmlNotesXform();
                _context9.next = 3;
                return xform.parseStream(entry);

              case 3:
                vmlDrawing = _context9.sent;
                model.vmlDrawings["../drawings/".concat(name, ".vml")] = vmlDrawing;

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function _processVmlDrawingEntry(_x25, _x26, _x27) {
        return _processVmlDrawingEntry2.apply(this, arguments);
      }

      return _processVmlDrawingEntry;
    }()
  }, {
    key: "_processThemeEntry",
    value: function () {
      var _processThemeEntry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(entry, model, name) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return new Promise(function (resolve, reject) {
                  // TODO: stream entry into buffer and store the xml in the model.themes[]
                  var stream = new StreamBuf();
                  entry.on('error', reject);
                  stream.on('error', reject);
                  stream.on('finish', function () {
                    model.themes[name] = stream.read().toString();
                    resolve();
                  });
                  entry.pipe(stream);
                });

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function _processThemeEntry(_x28, _x29, _x30) {
        return _processThemeEntry2.apply(this, arguments);
      }

      return _processThemeEntry;
    }()
    /**
    * @deprecated since version 4.0. You should use `#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
    */

  }, {
    key: "createInputStream",
    value: function createInputStream(options) {
      console.warn('`XLSX#createInputStream` is deprecated. You should use `XLSX#read` instead. This method will be removed in version 4.0. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md');
      return this._createInputStream(options);
    }
  }, {
    key: "_createInputStream",
    value: function _createInputStream(options) {
      var _this = this;

      var model = {
        worksheets: [],
        worksheetHash: {},
        worksheetRels: [],
        themes: {},
        media: [],
        mediaIndex: {},
        drawings: {},
        drawingRels: {},
        comments: {},
        tables: {},
        vmlDrawings: {}
      }; // we have to be prepared to read the zip entries in whatever order they arrive

      var promises = [];
      var stream = new ZipStream.ZipReader({
        getEntryType: function getEntryType(path) {
          return path.match(/xl\/media\//) ? 'nodebuffer' : 'string';
        }
      });
      stream.on('entry', function (entry) {
        promises.push(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
          var entryPath, workbook, appXform, appProperties, coreXform, coreProperties, match;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.prev = 0;
                  entryPath = entry.path;

                  if (entryPath[0] === '/') {
                    entryPath = entryPath.substr(1);
                  }

                  _context11.t0 = entryPath;
                  _context11.next = _context11.t0 === '_rels/.rels' ? 6 : _context11.t0 === 'xl/workbook.xml' ? 10 : _context11.t0 === 'xl/_rels/workbook.xml.rels' ? 19 : _context11.t0 === 'xl/sharedStrings.xml' ? 23 : _context11.t0 === 'xl/styles.xml' ? 27 : _context11.t0 === 'docProps/app.xml' ? 31 : _context11.t0 === 'docProps/core.xml' ? 38 : 44;
                  break;

                case 6:
                  _context11.next = 8;
                  return _this.parseRels(entry);

                case 8:
                  model.globalRels = _context11.sent;
                  return _context11.abrupt("break", 90);

                case 10:
                  _context11.next = 12;
                  return _this.parseWorkbook(entry);

                case 12:
                  workbook = _context11.sent;
                  model.sheets = workbook.sheets;
                  model.definedNames = workbook.definedNames;
                  model.views = workbook.views;
                  model.properties = workbook.properties;
                  model.calcProperties = workbook.calcProperties;
                  return _context11.abrupt("break", 90);

                case 19:
                  _context11.next = 21;
                  return _this.parseRels(entry);

                case 21:
                  model.workbookRels = _context11.sent;
                  return _context11.abrupt("break", 90);

                case 23:
                  model.sharedStrings = new SharedStringsXform();
                  _context11.next = 26;
                  return model.sharedStrings.parseStream(entry);

                case 26:
                  return _context11.abrupt("break", 90);

                case 27:
                  model.styles = new StylesXform();
                  _context11.next = 30;
                  return model.styles.parseStream(entry);

                case 30:
                  return _context11.abrupt("break", 90);

                case 31:
                  appXform = new AppXform();
                  _context11.next = 34;
                  return appXform.parseStream(entry);

                case 34:
                  appProperties = _context11.sent;
                  model.company = appProperties.company;
                  model.manager = appProperties.manager;
                  return _context11.abrupt("break", 90);

                case 38:
                  coreXform = new CoreXform();
                  _context11.next = 41;
                  return coreXform.parseStream(entry);

                case 41:
                  coreProperties = _context11.sent;
                  Object.assign(model, coreProperties);
                  return _context11.abrupt("break", 90);

                case 44:
                  match = entry.path.match(/xl\/worksheets\/sheet(\d+)[.]xml/);

                  if (!match) {
                    _context11.next = 49;
                    break;
                  }

                  _context11.next = 48;
                  return _this._processWorksheetEntry(entry, model, match[1], options);

                case 48:
                  return _context11.abrupt("break", 90);

                case 49:
                  match = entry.path.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);

                  if (!match) {
                    _context11.next = 54;
                    break;
                  }

                  _context11.next = 53;
                  return _this._processWorksheetRelsEntry(entry, model, match[1]);

                case 53:
                  return _context11.abrupt("break", 90);

                case 54:
                  match = entry.path.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/);

                  if (!match) {
                    _context11.next = 59;
                    break;
                  }

                  _context11.next = 58;
                  return _this._processThemeEntry(entry, model, match[1]);

                case 58:
                  return _context11.abrupt("break", 90);

                case 59:
                  match = entry.path.match(/xl\/media\/([a-zA-Z0-9]+[.][a-zA-Z0-9]{3,4})$/);

                  if (!match) {
                    _context11.next = 64;
                    break;
                  }

                  _context11.next = 63;
                  return _this._processMediaEntry(entry, model, match[1]);

                case 63:
                  return _context11.abrupt("break", 90);

                case 64:
                  match = entry.path.match(/xl\/drawings\/([a-zA-Z0-9]+)[.]xml/);

                  if (!match) {
                    _context11.next = 69;
                    break;
                  }

                  _context11.next = 68;
                  return _this._processDrawingEntry(entry, model, match[1]);

                case 68:
                  return _context11.abrupt("break", 90);

                case 69:
                  match = entry.path.match(/xl\/(comments\d+)[.]xml/);

                  if (!match) {
                    _context11.next = 74;
                    break;
                  }

                  _context11.next = 73;
                  return _this._processCommentEntry(entry, model, match[1]);

                case 73:
                  return _context11.abrupt("break", 90);

                case 74:
                  match = entry.path.match(/xl\/tables\/(table\d+)[.]xml/);

                  if (!match) {
                    _context11.next = 79;
                    break;
                  }

                  _context11.next = 78;
                  return _this._processTableEntry(entry, model, match[1]);

                case 78:
                  return _context11.abrupt("break", 90);

                case 79:
                  match = entry.path.match(/xl\/drawings\/_rels\/([a-zA-Z0-9]+)[.]xml[.]rels/);

                  if (!match) {
                    _context11.next = 84;
                    break;
                  }

                  _context11.next = 83;
                  return _this._processDrawingRelsEntry(entry, model, match[1]);

                case 83:
                  return _context11.abrupt("break", 90);

                case 84:
                  match = entry.path.match(/xl\/drawings\/(vmlDrawing\d+)[.]vml/);

                  if (!match) {
                    _context11.next = 89;
                    break;
                  }

                  _context11.next = 88;
                  return _this._processVmlDrawingEntry(entry, model, match[1]);

                case 88:
                  return _context11.abrupt("break", 90);

                case 89:
                  entry.autodrain();

                case 90:
                  _context11.next = 95;
                  break;

                case 92:
                  _context11.prev = 92;
                  _context11.t1 = _context11["catch"](0);
                  _this.error = _context11.t1;

                case 95:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11, null, [[0, 92]]);
        }))());
      });
      stream.on('finished', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return Promise.all(promises);

              case 3:
                if (!_this.error) {
                  _context12.next = 5;
                  break;
                }

                throw _this.error;

              case 5:
                _this.reconcile(model, options); // apply model


                _this.workbook.model = model;
                stream.emit('done');
                _context12.next = 13;
                break;

              case 10:
                _context12.prev = 10;
                _context12.t0 = _context12["catch"](0);
                stream.emit('error', _context12.t0);

              case 13:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 10]]);
      })));
      return stream;
    }
  }, {
    key: "read",
    value: function read(stream, options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        options = options || {};

        var zipStream = _this2._createInputStream(options);

        zipStream.on('done', function () {
          resolve(_this2.workbook);
        }).on('error', function (error) {
          reject(error);
        });
        stream.pipe(zipStream);
      });
    }
  }, {
    key: "load",
    value: function load(data, options) {
      var _this3 = this;

      if (options === undefined) {
        options = {};
      }

      var zipStream = this._createInputStream();

      return new Promise(function (resolve, reject) {
        zipStream.on('done', function () {
          resolve(_this3.workbook);
        }).on('error', function (error) {
          reject(error);
        });

        if (options.base64) {
          var buffer = Buffer.from(data.toString(), 'base64');
          zipStream.write(buffer);
        } else {
          zipStream.write(data);
        }

        zipStream.end();
      });
    } // =========================================================================
    // Write

  }, {
    key: "addMedia",
    value: function () {
      var _addMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(zip, model) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return Promise.all(model.media.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(medium) {
                    var filename, data, dataimg64, content;
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            if (!(medium.type === 'image')) {
                              _context13.next = 13;
                              break;
                            }

                            filename = "xl/media/".concat(medium.name, ".").concat(medium.extension);

                            if (!medium.filename) {
                              _context13.next = 7;
                              break;
                            }

                            _context13.next = 5;
                            return fsReadFileAsync(medium.filename);

                          case 5:
                            data = _context13.sent;
                            return _context13.abrupt("return", zip.append(data, {
                              name: filename
                            }));

                          case 7:
                            if (!medium.buffer) {
                              _context13.next = 9;
                              break;
                            }

                            return _context13.abrupt("return", zip.append(medium.buffer, {
                              name: filename
                            }));

                          case 9:
                            if (!medium.base64) {
                              _context13.next = 13;
                              break;
                            }

                            dataimg64 = medium.base64;
                            content = dataimg64.substring(dataimg64.indexOf(',') + 1);
                            return _context13.abrupt("return", zip.append(content, {
                              name: filename,
                              base64: true
                            }));

                          case 13:
                            throw new Error('Unsupported media');

                          case 14:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _callee13);
                  }));

                  return function (_x33) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function addMedia(_x31, _x32) {
        return _addMedia.apply(this, arguments);
      }

      return addMedia;
    }()
  }, {
    key: "addDrawings",
    value: function addDrawings(zip, model) {
      var drawingXform = new DrawingXform();
      var relsXform = new RelationshipsXform();
      model.worksheets.forEach(function (worksheet) {
        var drawing = worksheet.drawing;

        if (drawing) {
          drawingXform.prepare(drawing, {});
          var xml = drawingXform.toXml(drawing);
          zip.append(xml, {
            name: "xl/drawings/".concat(drawing.name, ".xml")
          });
          xml = relsXform.toXml(drawing.rels);
          zip.append(xml, {
            name: "xl/drawings/_rels/".concat(drawing.name, ".xml.rels")
          });
        }
      });
    }
  }, {
    key: "addTables",
    value: function addTables(zip, model) {
      var tableXform = new TableXform();
      model.worksheets.forEach(function (worksheet) {
        var tables = worksheet.tables;
        tables.forEach(function (table) {
          tableXform.prepare(table, {});
          var tableXml = tableXform.toXml(table);
          zip.append(tableXml, {
            name: "xl/tables/".concat(table.target)
          });
        });
      });
    }
  }, {
    key: "addContentTypes",
    value: function () {
      var _addContentTypes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(zip, model) {
        var xform, xml;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                xform = new ContentTypesXform();
                xml = xform.toXml(model);
                zip.append(xml, {
                  name: '[Content_Types].xml'
                });

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function addContentTypes(_x34, _x35) {
        return _addContentTypes.apply(this, arguments);
      }

      return addContentTypes;
    }()
  }, {
    key: "addApp",
    value: function () {
      var _addApp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(zip, model) {
        var xform, xml;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                xform = new AppXform();
                xml = xform.toXml(model);
                zip.append(xml, {
                  name: 'docProps/app.xml'
                });

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function addApp(_x36, _x37) {
        return _addApp.apply(this, arguments);
      }

      return addApp;
    }()
  }, {
    key: "addCore",
    value: function () {
      var _addCore = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(zip, model) {
        var coreXform;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                coreXform = new CoreXform();
                zip.append(coreXform.toXml(model), {
                  name: 'docProps/core.xml'
                });

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function addCore(_x38, _x39) {
        return _addCore.apply(this, arguments);
      }

      return addCore;
    }()
  }, {
    key: "addThemes",
    value: function () {
      var _addThemes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(zip, model) {
        var themes;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                themes = model.themes || {
                  theme1: theme1Xml
                };
                Object.keys(themes).forEach(function (name) {
                  var xml = themes[name];
                  var path = "xl/theme/".concat(name, ".xml");
                  zip.append(xml, {
                    name: path
                  });
                });

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function addThemes(_x40, _x41) {
        return _addThemes.apply(this, arguments);
      }

      return addThemes;
    }()
  }, {
    key: "addOfficeRels",
    value: function () {
      var _addOfficeRels = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(zip) {
        var xform, xml;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                xform = new RelationshipsXform();
                xml = xform.toXml([{
                  Id: 'rId1',
                  Type: XLSX.RelType.OfficeDocument,
                  Target: 'xl/workbook.xml'
                }, {
                  Id: 'rId2',
                  Type: XLSX.RelType.CoreProperties,
                  Target: 'docProps/core.xml'
                }, {
                  Id: 'rId3',
                  Type: XLSX.RelType.ExtenderProperties,
                  Target: 'docProps/app.xml'
                }]);
                zip.append(xml, {
                  name: '_rels/.rels'
                });

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function addOfficeRels(_x42) {
        return _addOfficeRels.apply(this, arguments);
      }

      return addOfficeRels;
    }()
  }, {
    key: "addWorkbookRels",
    value: function () {
      var _addWorkbookRels = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(zip, model) {
        var count, relationships, xform, xml;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                count = 1;
                relationships = [{
                  Id: "rId".concat(count++),
                  Type: XLSX.RelType.Styles,
                  Target: 'styles.xml'
                }, {
                  Id: "rId".concat(count++),
                  Type: XLSX.RelType.Theme,
                  Target: 'theme/theme1.xml'
                }];

                if (model.sharedStrings.count) {
                  relationships.push({
                    Id: "rId".concat(count++),
                    Type: XLSX.RelType.SharedStrings,
                    Target: 'sharedStrings.xml'
                  });
                }

                model.worksheets.forEach(function (worksheet) {
                  worksheet.rId = "rId".concat(count++);
                  relationships.push({
                    Id: worksheet.rId,
                    Type: XLSX.RelType.Worksheet,
                    Target: "worksheets/sheet".concat(worksheet.id, ".xml")
                  });
                });
                xform = new RelationshipsXform();
                xml = xform.toXml(relationships);
                zip.append(xml, {
                  name: 'xl/_rels/workbook.xml.rels'
                });

              case 7:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function addWorkbookRels(_x43, _x44) {
        return _addWorkbookRels.apply(this, arguments);
      }

      return addWorkbookRels;
    }()
  }, {
    key: "addSharedStrings",
    value: function () {
      var _addSharedStrings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(zip, model) {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                if (model.sharedStrings && model.sharedStrings.count) {
                  zip.append(model.sharedStrings.xml, {
                    name: 'xl/sharedStrings.xml'
                  });
                }

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      function addSharedStrings(_x45, _x46) {
        return _addSharedStrings.apply(this, arguments);
      }

      return addSharedStrings;
    }()
  }, {
    key: "addStyles",
    value: function () {
      var _addStyles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(zip, model) {
        var xml;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                xml = model.styles.xml;

                if (xml) {
                  zip.append(xml, {
                    name: 'xl/styles.xml'
                  });
                }

              case 2:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function addStyles(_x47, _x48) {
        return _addStyles.apply(this, arguments);
      }

      return addStyles;
    }()
  }, {
    key: "addWorkbook",
    value: function () {
      var _addWorkbook = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(zip, model) {
        var xform;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                xform = new WorkbookXform();
                zip.append(xform.toXml(model), {
                  name: 'xl/workbook.xml'
                });

              case 2:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }));

      function addWorkbook(_x49, _x50) {
        return _addWorkbook.apply(this, arguments);
      }

      return addWorkbook;
    }()
  }, {
    key: "addWorksheets",
    value: function () {
      var _addWorksheets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(zip, model) {
        var worksheetXform, relationshipsXform, commentsXform, vmlNotesXform;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                // preparation phase
                worksheetXform = new WorksheetXform();
                relationshipsXform = new RelationshipsXform();
                commentsXform = new CommentsXform();
                vmlNotesXform = new VmlNotesXform(); // write sheets

                model.worksheets.forEach(function (worksheet) {
                  var xmlStream = new XmlStream();
                  worksheetXform.render(xmlStream, worksheet);
                  zip.append(xmlStream.xml, {
                    name: "xl/worksheets/sheet".concat(worksheet.id, ".xml")
                  });

                  if (worksheet.rels && worksheet.rels.length) {
                    xmlStream = new XmlStream();
                    relationshipsXform.render(xmlStream, worksheet.rels);
                    zip.append(xmlStream.xml, {
                      name: "xl/worksheets/_rels/sheet".concat(worksheet.id, ".xml.rels")
                    });
                  }

                  if (worksheet.comments.length > 0) {
                    xmlStream = new XmlStream();
                    commentsXform.render(xmlStream, worksheet);
                    zip.append(xmlStream.xml, {
                      name: "xl/comments".concat(worksheet.id, ".xml")
                    });
                    xmlStream = new XmlStream();
                    vmlNotesXform.render(xmlStream, worksheet);
                    zip.append(xmlStream.xml, {
                      name: "xl/drawings/vmlDrawing".concat(worksheet.id, ".vml")
                    });
                  }
                });

              case 5:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      }));

      function addWorksheets(_x51, _x52) {
        return _addWorksheets.apply(this, arguments);
      }

      return addWorksheets;
    }()
  }, {
    key: "_finalize",
    value: function _finalize(zip) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        zip.on('finish', function () {
          resolve(_this4);
        });
        zip.on('error', reject);
        zip.finalize();
      });
    }
  }, {
    key: "prepareModel",
    value: function prepareModel(model, options) {
      // ensure following properties have sane values
      model.creator = model.creator || 'ExcelJS';
      model.lastModifiedBy = model.lastModifiedBy || 'ExcelJS';
      model.created = model.created || new Date();
      model.modified = model.modified || new Date();
      model.useSharedStrings = options.useSharedStrings !== undefined ? options.useSharedStrings : true;
      model.useStyles = options.useStyles !== undefined ? options.useStyles : true; // Manage the shared strings

      model.sharedStrings = new SharedStringsXform(); // add a style manager to handle cell formats, fonts, etc.

      model.styles = model.useStyles ? new StylesXform(true) : new StylesXform.Mock(); // prepare all of the things before the render

      var workbookXform = new WorkbookXform();
      var worksheetXform = new WorksheetXform();
      workbookXform.prepare(model);
      var worksheetOptions = {
        sharedStrings: model.sharedStrings,
        styles: model.styles,
        date1904: model.properties.date1904,
        drawingsCount: 0,
        media: model.media
      };
      worksheetOptions.drawings = model.drawings = [];
      worksheetOptions.commentRefs = model.commentRefs = [];
      var tableCount = 0;
      model.tables = [];
      model.worksheets.forEach(function (worksheet) {
        // assign unique filenames to tables
        worksheet.tables.forEach(function (table) {
          tableCount++;
          table.target = "table".concat(tableCount, ".xml");
          table.id = tableCount;
          model.tables.push(table);
        });
        worksheetXform.prepare(worksheet, worksheetOptions);
      }); // TODO: workbook drawing list
    }
  }, {
    key: "write",
    value: function () {
      var _write = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(stream, options) {
        var model, zip;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                options = options || {};
                model = this.workbook.model;
                zip = new ZipStream.ZipWriter(options.zip);
                zip.pipe(stream);
                this.prepareModel(model, options); // render

                _context25.next = 7;
                return this.addContentTypes(zip, model);

              case 7:
                _context25.next = 9;
                return this.addOfficeRels(zip, model);

              case 9:
                _context25.next = 11;
                return this.addWorkbookRels(zip, model);

              case 11:
                _context25.next = 13;
                return this.addWorksheets(zip, model);

              case 13:
                _context25.next = 15;
                return this.addSharedStrings(zip, model);

              case 15:
                _context25.next = 17;
                return this.addDrawings(zip, model);

              case 17:
                _context25.next = 19;
                return this.addTables(zip, model);

              case 19:
                _context25.next = 21;
                return Promise.all([this.addThemes(zip, model), this.addStyles(zip, model)]);

              case 21:
                _context25.next = 23;
                return this.addMedia(zip, model);

              case 23:
                _context25.next = 25;
                return Promise.all([this.addApp(zip, model), this.addCore(zip, model)]);

              case 25:
                _context25.next = 27;
                return this.addWorkbook(zip, model);

              case 27:
                return _context25.abrupt("return", this._finalize(zip));

              case 28:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function write(_x53, _x54) {
        return _write.apply(this, arguments);
      }

      return write;
    }()
  }, {
    key: "writeFile",
    value: function writeFile(filename, options) {
      var _this5 = this;

      var stream = fs.createWriteStream(filename);
      return new Promise(function (resolve, reject) {
        stream.on('finish', function () {
          resolve();
        });
        stream.on('error', function (error) {
          reject(error);
        });

        _this5.write(stream, options).then(function () {
          stream.end();
        });
      });
    }
  }, {
    key: "writeBuffer",
    value: function () {
      var _writeBuffer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(options) {
        var stream;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                stream = new StreamBuf();
                _context26.next = 3;
                return this.write(stream, options);

              case 3:
                return _context26.abrupt("return", stream.read());

              case 4:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function writeBuffer(_x55) {
        return _writeBuffer.apply(this, arguments);
      }

      return writeBuffer;
    }()
  }]);

  return XLSX;
}();

XLSX.RelType = require('./rel-type');
module.exports = XLSX;
//# sourceMappingURL=xlsx.js.map
