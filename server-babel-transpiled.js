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

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpackConfig = require('./webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _apiRoutes = require('./transpiled-server/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var port = process.env.PORT || 8000;
var app = (0, _express2.default)();
var environment = process.env.NODE_ENV || 'development';

var compiler = (0, _webpack2.default)(_webpackConfig2.default);

if (environment === 'development') {
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    noInfo: true,
    publicPath: _webpackConfig2.default.output.publicPath
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_apiRoutes2.default);

app.use(_express2.default.static(_path2.default.join(__dirname, 'dist')));
app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, './dist/views/index.html'));
});

app.listen(port, function (err) {
  err ? _winston2.default.log(err) : console.log('Server listening on PORT ' + port);
});
