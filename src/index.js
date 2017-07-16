import express from 'express';
import path from 'path';
const app = express();

app.use(express.static('src/client'));

app.get('/door', (req, res) => {
  res.send('Hidden doors');
});

app.use('/cat', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/src/client/images/cat.jpg'));
  setTimeout(next, 500)
}, (req, res, next) => {
  console.log('500 ms');
});

app.use((req, res, next) => {
  console.log('Prints for stuff below')
  next();
})

app.get('/cats/:catId', (req, res, next) => {
  console.log('serving up a cat'); //prints
  next(); //calls next function using this same route, below
})

app.get('/cats/:catId', (req, res) => {
  let catId = req.params.catId;
  res.sendFile(__dirname + `/src/client/images/cat${catId}.jpg`)
});

app.get('/json', (req, res) => {
  const obj = { a: 'b', c: 'd', e: {f: 'g', h: 'i'}};
  res.json(obj);
  // res.send(obj);
    //Seems to be no different
})

app.listen(3000, () => {
  console.log('Listening on 3k')
});