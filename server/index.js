import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import routes from './api'

const port = 3000;

import config from '../webpack.config'

const compiler = webpack(config);

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'index.html'));
});

app.use('/', routes);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(webpackHotMiddleware(compiler));

const server = app.listen(port, () => {
  const {address, port} = server.address();
  console.log(`Listening at http://${address}:${port}`)
});
