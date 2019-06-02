const sensorData = require("../database");
const modifyData = require('./modify');

sensorData
  .getDeviceIdArray()
  .then(result => {
    console.log("\nDevice Id Array (alle Geräte die jemals Daten an DB gesendet haben): " + result);
    console.log("Anzahl der Geräte: " + result.length);
  })
  .catch(error => {
    console.log(error);
  });


  /////////////////////////////////////////////////////////////////////////////////////////////////
  // einkommentieren und in database.js: .items.query(dataQueries.dummyData)  einkommentieren für Dummy Daten
/* sensorData
  .getCurrentData()
  .then(result => {
    console.log("Dummy Daten: " + result);
  })
  .catch(error => {
    console.log(error);
  }); */


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Neueste Daten die aktuell gesendet werden
  sensorData
  .getCurrentData()
  .then(result => {
    let newData = modifyData.getLatestEntries(result);

   console.log("Neue Daten Aktuell: " + newData);
  })
  .catch(error => {
    console.log(error);
  });


