const sensorData = require('./app');

sensorData.getDeviceIdArray().then((result) => {
    console.log('Result: ' + result)
    console.log(result.length)
}).catch((error) => {
    console.log(error);
});

