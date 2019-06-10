const CosmosClient = require("@azure/cosmos").CosmosClient;
const dataQueries = require("./utils/queries");
const config = require("./databaseConfig");
const endpoint = config.endpoint;
const masterKey = config.primaryKey;
const client = new CosmosClient({
  endpoint: endpoint,
  auth: { masterKey: masterKey }
});
const HttpStatusCodes = { NOTFOUND: 404 };
const databaseId = config.database.id;
const containerId = config.container.id;
const containerIdroom = config.container.idroom;
const containerIdroom2 = config.container.idroom2;

var lastIdArray = [];
var newDataArray = [];
var idroom = [];

// Query
async function getDeviceIdArray() {

  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(dataQueries.deviceCount)
    .toArray();

  var jsonArray = JSON.stringify(results);
  var idArray = JSON.parse(jsonArray);

  lastIdArray = [];
  for (var i = 0; i < idArray.length; i++) {
    lastIdArray.push(idArray[i].deviceId);
    lastIdArray[i] = "'" + lastIdArray[i] + "'";
  }
  return lastIdArray;
}

async function getDeviceIdRoomArray() {
  const { result: results } = await client
    .database(databaseId)
    .container(containerIdroom)
    .items.query(dataQueries.getDeviceIdArray)
    .toArray();

  var jsonArray = JSON.stringify(results);
  var idArray = JSON.parse(jsonArray);

  lastIdArray = [];
  for (var i = 0; i < idArray.length; i++) {
    lastIdArray.push(idArray[i].deviceId);
    lastIdArray[i] = "'" + lastIdArray[i] + "'";
  }
  return lastIdArray;
}

async function getCurrentData(timestamp) {

  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
/*     .items.query(dataQueries.dummyData)        // für Dummy Daten einkommentieren */
/*     .items.query(dataQueries.latestData)       Neuesten Daten die aktuell gesendet werden */
    .items.query(`SELECT c.deviceId, c.temperature, c.humidity , c._ts FROM c c WHERE c._ts >  ${timestamp} ORDER BY c._ts DESC`)
    .toArray();

  //console.log(results);

  newDataArray.length = 0;
  /* for (var queryResult of results) {
    var resultString = JSON.stringify(queryResult);
    newDataArray.push(resultString);
  } */


  //auskommentiert
  /* for(let i = 0; i < results.length; i++) {
    var resultString = JSON.stringify(results[i]);
    newDataArray[i] = resultString;
  } */
  newDataArray = results;
  return newDataArray;
}

// Daten speichern Yannik
/* async function saveRoomData(itemBody) {
  try {
      // read the item to see if it exists
      const { item } = await client.database(databaseId).container(containerId2).item(itemBody.id).read();
      console.log(`Item with family id ${itemBody.id} already exists\n`);
  }
  catch (error) {
     // create the family item if it does not exist
     if (error.code === HttpStatusCodes.NOTFOUND) {
         const { item } = await client.database(databaseId).container(containerId).items.create(itemBody);
         console.log(`Created family item with id:\n${itemBody.id}\n`);
     } else {
         throw error;
     }
  }
}; */


async function getRoomInfo() {
  const { result: results } = await client
    .database(databaseId)
    .container(containerIdroom)
    .items.query(dataQueries.roomInfo, { enableCrossPartitionQuery: true }) // Cross Partition
    .toArray();


    //console.log('Room Results: ' + JSON.stringify(results));

    return results;
  /* var jsonArray = JSON.stringify(results);
  var idArray = JSON.parse(jsonArray); */

  /* lastIdArray = [];
  for (var i = 0; i < idArray.length; i++) {
    lastIdArray.push(idArray[i].deviceId);
    lastIdArray[i] = "'" + lastIdArray[i] + "'";
  }
  return lastIdArray; */
}





function exit(message) {
  console.log(message);
  console.log('Press any key to exit');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
}


async function insertRoom(item){
  console.log(item)
  const { testa } = await client
    .database(databaseId)
    .container(containerIdroom)
    .items.create(item);
}

/*
 getCurrentData().then(() => {
   exit();
 }).catch((error) => {
   console.log(error);
 })
*/

module.exports.getDeviceIdArray = getDeviceIdArray;
module.exports.getDeviceIdRoomArray = getDeviceIdRoomArray;
module.exports.getCurrentData = getCurrentData;
module.exports.insertRoom = insertRoom;
module.exports.getRoomInfo = getRoomInfo;
//module.exports.saveRoomData = saveRoomData;
//module.exports.getdeviceIdroom = getdeviceIdroom;
