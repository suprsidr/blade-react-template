var fs = require('fs');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var webpackRequire = require('webpack-require');

var webpackConfig = require('../webpack.config.js');
var template = require('../components/OutputTemplate.js');

webpackRequire(webpackConfig, template, function (error, factory) {

  if (error) { console.error(error) }

  var templateComponent = factory();

  var html = ReactDOMServer.renderToStaticMarkup(React.createElement(templateComponent, {}));

  fs.writeFileSync('./index.html', '<!doctype html>' + html);

});
