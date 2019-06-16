const express = require("express");
const bodyParser = require("body-parser");
const sensorData = require("../backend/database/database");
const modifyData = require("./database/utils/modify");
const chalk = require('chalk');

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

app.post("/api/create-room", (req, res, next) => {
  const dataToStore = req.body;
  res.status(201).json({
    message: "Data added successfully!"
  });
  sensorData.insertRoom(dataToStore);
});

app.post("/api/delete-room", (req, res, next) => {
  const dataToStore = req.body;
  res.status(201).json({
    message: "Data added successfully!"
  });
  sensorData.deleteItem(dataToStore);
});

app.post("/api/update-room", (req, res, next) => {
  const dataToStore = req.body;
  res.status(201).json({
    message: "Data added successfully!"
  });
  sensorData.updateItem(dataToStore);
});

let newDataToSend = [];
app.get("/api/data", (req, res, next) => {
  newDataToSend = [];
  // Timestamp bei jedem Aufruf aktualisieren
  let timestampInSeconds15 = Math.floor(Date.now() / 1000 - 30); // war -15
  //console.log(timestampInSeconds15); Timestamp testen
  sensorData.getCurrentData(timestampInSeconds15).then(fetchedData => {
    // Nur neueste Daten der jeweiligen Geräte senden
    let newData = modifyData.getLatestEntries(fetchedData);

    newDataToSend = newData;
    console.log(newDataToSend);
    res.status(201).json(newDataToSend); //fetchedData
  });
});

app.get("/api/fulldata", (req, res, next) => {
  let fullData = [];
  let fetchedSensorData;
  let fetchedRoomData;
  let timestampInSeconds15 = Math.floor(Date.now() / 1000 - 260000); // 30 260000 ~ 3 Tage
  sensorData.getCurrentData(timestampInSeconds15)
    .then(fetchedData => {
      fetchedSensorData = modifyData.getLatestEntries(fetchedData);

      return fetchedSensorData;
    })
      .then(fetchedSensorData => {

    sensorData.getRoomInfo()
    .then(fetchedRoom => {
      //console.log('IsArray: ' + Array.isArray(fetchedRoom))
      //console.log(chalk.green('RoomData: ') + fetchedRoom);


      // Nur neueste Rauminfo für Sensoren
      let latestRoomData = modifyData.getLatestEntries(fetchedRoom);
      fullData = modifyData.mergeSensorAndRoom(fetchedSensorData, latestRoomData) // war fetchedRoom
      //console.log('Full Data Logged: ' + JSON.stringify(fullData));
      console.log('Query ausgeführt!' + Date.now()/1000);
      res.status(201).json(
        /* {
          sensorData: fetchedSensorData,
          roomData: fetchedRoom
        } */
        {
          fullData: fullData,
        }
      )
    })
    .catch(error => {
      console.log(error);
    });
});

}); //Neu


app.get("/api/devices", (req, res, next) => {
  sensorData.getDeviceIdArray().then(fetchedFata => {
    res.status(201).json({
      message: "Data fetched!",
      data: fetchedFata
    });
  });
});

app.get("/api/roomdevices", (req, res, next) => {
  sensorData.getDeviceIdRoomArray().then(fetchedFata => {
    res.status(201).json({
      message: "Data fetched!",
      data: fetchedFata
    });
  });
});


app.get("/api/allrooms", (req, res, next) => {
  sensorData.getAllRooms().then(fetchedFata => {
    res.status(201).json({
      message: "Data fetched!",
      data: fetchedFata
    });
  });
});


// Daten für Statistiken
app.get("/api/statistic/:id", (req, res, next)=> {
  let clickedDevice = req.params.id;
  sensorData.getStatistic(clickedDevice).then(statisticData => {
   // console.log('Statistic Data: ' + JSON.stringify(statisticData));
    let tempStatistic = modifyData.getEvery20Temp(statisticData.reverse());
    let humStatistic = modifyData.getEvery20Hum(statisticData.reverse());
    let timeStatisticTemp = modifyData.getEvery20Time(statisticData);
    let timeStatistic = timeStatisticTemp.reverse();
    /* console.log(tempStatistic);
    console.log(humStatistic); */
    res.status(200).json({
      tempStatistic: tempStatistic,
      humStatistic: humStatistic,
      timeStatistic: timeStatistic
    });
  })

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
