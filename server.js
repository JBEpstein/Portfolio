'use strict';

const bodyParser = require('body-parser').urlencoded({extended: true});
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'))


app.post('/articles', bodyParser, function(request, response) {

  console.log(request.body);
  response.send('Record posted to server!!');
})

app.listen(PORT, function() {
  console.log('The port is ' + PORT);
});
