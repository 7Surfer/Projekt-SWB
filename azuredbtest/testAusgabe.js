const modifyData = require('./modify');
const sensorData = require("./app"); 

var deviceIdResults = {};

/* sensorData
  .getDeviceIdArray()
  .then(result => {
   console.log("\nDevice Id Array: " + result);
    console.log("Anzahl der Geräte: " + result.length); 
    deviceIdResults.numberOfDevices = result.length;
    console.log('Number of Devices: ' + deviceIdResults.numberOfDevices);
  })
  .catch(error => {
    console.log(error);
  }); */

 sensorData
  .getCurrentData()
  .then(result => {
    let newData = modifyData.getLatestEntries(result);

   console.log("Neue Daten Aktuell: " + newData);
  })
  .catch(error => {
    console.log(error);
  }); 


  /* function getData10Seconds() {
    setInterval(() => {
      var newData = [];
      sensorData
  .getCurrentData()
  .then(result => {
    newData = result;
    //console.log('Result: ' + result);
   console.log("Neue Daten: " + newData);
  })
  .catch(error => {
    console.log(error);
  });
    }, 5000);
  } */

  /* function getData5Seconds() {
    let deviceCount = sensorData.getDeviceIdArray.length;
    //console.log(deviceCount);
    console.log(sensorData.getCurrentData().then((result) => {
      console.log(result);
    }));
  }

  getData5Seconds(); */


  //getData10Seconds();
  
module.exports = {
  numberOfDevices: deviceIdResults.numberOfDevices
}



  