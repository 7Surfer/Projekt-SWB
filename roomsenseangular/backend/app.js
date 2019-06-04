const express = require("express");
const bodyParser = require("body-parser");
const sensorData = require("../backend/database/database");
const modifyData = require("./database/utils/modify");

const app = express();

app.use(bodyParser.json());

//verhindert Browser Request nach Favicon, würde middlewares doppelt ausführen
app.get("/favicon.ico", (req, res, next) => {
  res.status(204);
});

app.use((req, res, next) => {
  //egal auf welcher Domain App läuft
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //welche http Methoden für Requests verwendet werden dürfen
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/create-room-yannik", (req, res, next) => {
  const dataToStore = req.body;
  //sensorData.saveRoomData(dataToStore);

  console.log("Data to store: " + JSON.stringify(dataToStore));
  console.log("Accessed Data: " + dataToStore.deviceName);
  res.status(201).json({
    message: "Data added successfully!"
  });
});

let newDataToSend = [];
app.get("/api/data", (req, res, next) => {
  newDataToSend = [];
  // Timestamp bei jedem Aufruf aktualisieren
  let timestampInSeconds15 = Math.floor(Date.now() / 1000 - 7); // war -15
  //console.log(timestampInSeconds15); Timestamp testen
  sensorData.getCurrentData(timestampInSeconds15).then(fetchedData => {
    // Nur neueste Daten der jeweiligen Geräte senden
    let newData = modifyData.getLatestEntries(fetchedData);

    //newDataToSend.splice(0, newDataToSend.length);  Array leeren
    newDataToSend = newData;
    console.log(newDataToSend);
    res.status(201).json(newDataToSend); //fetchedData
  });
});

app.get("/api/room", (req, res, next) => {
  sensorData.getdeviceIdroom().then(fetchedFata => {
    //console.log(fetchedFata);
    res.status(201).json({
      message: "Data fetched!",
      data: fetchedFata
    });
  });
});

// app.get('/api/data', (req, res, next) => {
//   sensorData.getCurrentData().then((fetchedData) => {
//     console.log('\nFetched Data Parsed: ' + fetchedData);
//     res.status(201).send({
//       message: 'Data fetched successfully!',
//       data: fetchedData
//     });
//   }).catch((err) => {
//     console.log(err);
//   });
// });

module.exports = app;
