const express = require('express');

const app = express();

//verhindert Browser Request nach Favicon, würde middlewares doppelt ausführen
app.get('/favicon.ico', (req, res, next) => {
  res.status(204);
});


app.use((req, res, next) => {
  //egal auf welcher Domain App läuft
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //welche http Methoden für Requests verwendet werden dürfen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});




app.use('/api/data', (req, res, next) => {
  const data = [
    {"deviceId":"raspberryLuca","temperature":25.76, "humidity":35.65,"_ts":1558370924},
    {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.67,"_ts":1558370919},
    {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.68,"_ts":1558370914},
    {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.73,"_ts":1558370908},
    {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.74,"_ts":1558370903},
    {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.78,"_ts":1558370898}
  ];
  res.status(200).json({
    message: 'Data fetched successfully',
    data: data
  });
});



module.exports = app;
