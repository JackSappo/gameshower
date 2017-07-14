const express = require('express');
const app = express();
const path = require('path');

const auth = function (req, res, next) {
  res.send('')
};

/* Playground

//WORKS GIVEN PLACEMENT ABOVE
app.get('/supper1', function (req, res) {
  res.send('Sup B1');
});

// DIRECTS ANY REQUESTS TO CLIENT FOLDER
// app.use('/', express.static('client'))

// SAME AS ABOVE
app.get('/', express.static('client'))

//WORKS GIVEN PLACEMENT BELOW
app.get('/supper2', function (req, res) {
  res.send('Sup B2');
});

//WORKS
app.get('/shower', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/index.html'))
});

//WORKS
app.get('/shower', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
});

*/

app.use(express.static('client'));

app.get('/door', function (req, res) {
  res.send('Hidden doors');
});

app.use('/cat', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/src/client/images/cat.jpg'));
  setTimeout(next, 500)
}, function(req, res, next) {
  console.log('500 ms');
});

app.use(function(req, res, next) {
  console.log('Prints for stuff below')
  next();
})

app.get('/cats/:catId', function (req, res, next) {
  console.log('serving up a cat'); //prints
  next(); //calls next function using this same route, below
})

app.get('/cats/:catId', function (req, res) {
  let catId = req.params.catId;
  res.sendFile(__dirname + `/src/client/images/cat${catId}.jpg`)
});

app.get('/json', function (req, res) {
  const obj = { a: 'b', c: 'd', e: {f: 'g', h: 'i'}};
  res.json(obj);
  // res.send(obj);
    //Seems to be no different
})

app.listen(3000, function() {
  console.log('Listening on 3k')
});