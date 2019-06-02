let array =  [
  "{\"deviceId\":\"sonja\",\"_ts\":1559309009}",
  "{\"deviceId\":\"yannik-rpi3\",\"_ts\":1559245236}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.86,\"humidity\":42.66,\"_ts\":1559243413}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.66,\"_ts\":1559243408}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.89,\"humidity\":42.66,\"_ts\":1559243403}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.68,\"_ts\":1559243398}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.87,\"humidity\":42.66,\"_ts\":1559243393}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.66,\"_ts\":1559243388}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.89,\"humidity\":42.68,\"_ts\":1559243383}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.66,\"_ts\":1559243378}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.87,\"humidity\":42.68,\"_ts\":1559243373}"
  ];

getLatestEntries(array);

function getLatestEntries(a) {

let dataToDisplay = JSON.parse('[' + a + ']');
let nameArray = [];
let nameCount = dataToDisplay.length;
for(let i = 0; i < nameCount; i++) {
  nameArray.push(dataToDisplay[i].deviceId);
}

//console.log('Name Array: ' + nameArray);
let distinctNameArray = [... new Set(nameArray)];
//console.log('Distinct Names: ' + distinctNameArray);
let distLen = distinctNameArray.length;

let distinctIndexes = [];
for(let i = 0; i < distLen; i++) {
  distinctIndexes.push(nameArray.indexOf(distinctNameArray[i]));
}
//console.log('Distinct Indexes: ' + distinctIndexes);

let newDataArray = [];

let distInLen = distinctIndexes.length;

for(let i = 0; i < distInLen; i++) {
  newDataArray.push(a[i]);
}

//console.log('New Data Array: ' + newDataArray);
return newDataArray;
}


module.exports = {
  getLatestEntries: getLatestEntries,
}
