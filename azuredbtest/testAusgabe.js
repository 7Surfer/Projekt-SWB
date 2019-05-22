const sensorData = require("./app"); 

sensorData
  .getDeviceIdArray()
  .then(result => {
    console.log("\nDevice Id Array: " + result);
    console.log("Anzahl der Geräte: " + result.length);
  })
  .catch(error => {
    console.log(error);
  });

sensorData
  .getCurrentData()
  .then(result => {
    console.log("Neue Daten: " + result);
  })
  .catch(error => {
    console.log(error);
  });
