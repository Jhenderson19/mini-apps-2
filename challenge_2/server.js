//import express stuff
const express = require('express');
const app = express();
const port = 3002;

//import libraries
const path = require('path');
const axios = require('axios');

//
app.use(express.json());
app.use(express.static(path.resolve(path.join('.','public'))));

app.get('/api/btc', (req, res) => {
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then((results) => {
    res.status(200).send(results.data);
  });
});

app.listen(port, () => {
  console.log('bitcoin charter running on port', port);
});