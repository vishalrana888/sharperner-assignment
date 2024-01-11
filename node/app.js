const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST">' +
    '<input type="text" name="title" placeholder="Product Title">' +
    '<input type="text" name="size" placeholder="Product Size">' +
    '<button type="submit">Add Product</button></form>');
});


app.post('/product', (req, res, next) => {
  const title = req.body.title;
  const size = req.body.size;

  console.log('Product Title:', title);
  console.log('Product Size:', size);

  res.redirect('/');
});


app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);