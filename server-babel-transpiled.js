'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8000;
var app = (0, _express2.default)();

app.listen(port, function (err) {
  err ? _winston2.default.log(err) : (0, _open2.default)('http://localhost:' + port);
});
