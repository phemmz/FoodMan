import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import winston from 'winston';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';

import webpackConfig from './webpack.config.dev';
import apiRoutes from './transpiled-server/apiRoutes';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
const environment = process.env.NODE_ENV || 'development';

const compiler = webpack(webpackConfig);

if (environment === 'development') {
  app.use(webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(apiRoutes);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/views/index.html'));
});

app.listen(port, (err) => {
  err ? winston.log(err) : console.log(`Server listening on PORT ${port}`);
});
