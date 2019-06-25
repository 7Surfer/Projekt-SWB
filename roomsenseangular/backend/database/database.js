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

async function getAllRooms() {
  const { result: results } = await client
    .database(databaseId)
    .container(containerIdroom)
    .items.query(dataQueries.getroomSettings, { enableCrossPartitionQuery: true })
    .toArray();

    var jsonArray = JSON.stringify(results);
    var idArray = JSON.parse(jsonArray);

  return idArray;
}

async function getCurrentData(timestamp) {

  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
/*     .items.query(dataQueries.dummyData)        // für Dummy Daten einkommentieren */
/*     .items.query(dataQueries.latestData)       Neuesten Daten die aktuell gesendet werden */
    .items.query(`SELECT c.deviceId, c.temperature, c.humidity , c._ts FROM c c WHERE c._ts >  ${timestamp} ORDER BY c._ts DESC`)
    .toArray();

  newDataArray.length = 0;
  newDataArray = results;
  return newDataArray;
}

async function getRoomInfo() {
  const { result: results } = await client
    .database(databaseId)
    .container(containerIdroom)
    .items.query(dataQueries.roomInfo, { enableCrossPartitionQuery: true }) // Cross Partition
    .toArray();

    return results;
}

// Statistiken
async function getStatistic(deviceId) {
  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(`SELECT TOP 100 c.temperature, c.humidity, c._ts FROM c c WHERE c.deviceId = '${deviceId}' ORDER BY c._ts DESC`,
      { enableCrossPartitionQuery: true }) // Cross Partition
    .toArray();
    let statisticArray = results;
    return statisticArray;
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


async function deleteItem(item){
  await client
  .database(databaseId)
  .container(containerIdroom)
  .item(item.id, item.id)
  .delete(item);
}


async function updateItem(item){
  await client
  .database(databaseId)
  .container(containerIdroom)
  .item(item.id, item.id)
  .replace(item)
}


module.exports.getDeviceIdArray = getDeviceIdArray;
module.exports.getDeviceIdRoomArray = getDeviceIdRoomArray;
module.exports.getCurrentData = getCurrentData;
module.exports.insertRoom = insertRoom;
module.exports.getRoomInfo = getRoomInfo;
module.exports.getAllRooms = getAllRooms;
module.exports.deleteItem = deleteItem;
module.exports.updateItem = updateItem;
//module.exports.getRoomSettings = getRoomSettings;
module.exports.getStatistic = getStatistic;
//module.exports.saveRoomData = saveRoomData;
//module.exports.getdeviceIdroom = getdeviceIdroom;
