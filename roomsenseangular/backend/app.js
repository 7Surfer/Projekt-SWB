const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res, next) => {
  res.status(204);
});

app.use((req, res, next) => {
  console.log('First middleware');
  next();
});

app.use((req, res, next) => {
  res.send('Backend Works!');
});



module.exports = app;
