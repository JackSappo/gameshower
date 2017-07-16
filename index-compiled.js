'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('src/client'));

app.get('/door', function (req, res) {
  res.send('Hidden doors');
});

app.use('/cat', function (req, res, next) {
  res.sendFile(_path2.default.join(__dirname + '/src/client/images/cat.jpg'));
  setTimeout(next, 500);
}, function (req, res, next) {
  console.log('500 ms');
});

app.use(function (req, res, next) {
  console.log('Prints for stuff below');
  next();
});

app.get('/cats/:catId', function (req, res, next) {
  console.log('serving up a cat'); //prints
  next(); //calls next function using this same route, below
});

app.get('/cats/:catId', function (req, res) {
  var catId = req.params.catId;
  res.sendFile(__dirname + ('/src/client/images/cat' + catId + '.jpg'));
});

app.get('/json', function (req, res) {
  var obj = { a: 'b', c: 'd', e: { f: 'g', h: 'i' } };
  res.json(obj);
  // res.send(obj);
  //Seems to be no different
});

app.listen(3000, function () {
  console.log('Listening on 3k');
});
