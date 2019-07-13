const express = require('express');
const port = process.env.PORT || 80;
// const port = 3000;
const https = require('https');
const app = express();
const path = require('path');
const morgan = require('morgan');
var secure = require('express-force-https');

app.use(secure);
app.use(express.urlencoded({ extended: false })); // Use busboy/connect-busboy instead
app.use(express.json());

app.use(morgan('combined'));
// app.use(https());

app.use(express.static(__dirname + '/dist/'));

// app.get('/', (req, res) => res.send('Hello World!'));
app.get('/health', (req,res) => res.sendStatus(200));

app.get('/ymca/feedback', function(req, res, next) {
  console.log(`[ymca/feedback] req.query: ${JSON.stringify(req.query)}`);

  if (req.query.email) {
    let email = req.query.email;
    res.cookie('ymca_email', email);
  }

  if (req.query.phone_number) {
    let phone_number = req.query.phone_number;
    res.cookie('ymca_phone_number', phone_number);
  }

  // check req.params size
  // if it's > 0, look through it for phone number/other fields. make them cookies (TODO: or access localStorage if possible)
  // then pass on to the catch-all middleware
  next();
});

app.get('*', function(req, res, next) {
  // console.log(`request came through: ${JSON.stringify(req)}`);
  console.log(`req.protocol: ${req.protocol}`);
  console.log(`req.headers: ${JSON.stringify(req.headers)}`);
  console.log(`req.body: ${JSON.stringify(req.body)}`);
  // if (req.protocol === 'http') {
  //   console.log(`attempting a redirect from ${'http://' + req.get('host') + req.url} to https version`);

  //   return res.redirect('https://' + req.get('host') + req.url);
  // }

  return res.sendFile(__dirname + '/dist/index.html');
  // res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(port, () => console.log(`Server running on https://<redacted>.io:${port}/`));
// app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
