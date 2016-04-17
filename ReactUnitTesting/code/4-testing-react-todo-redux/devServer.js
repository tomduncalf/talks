var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;
var host = '0.0.0.0';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

app.listen(port, host, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Dev server listening at http://${host}:${port}`);
});
