const CosmosClient = require("@azure/cosmos").CosmosClient;
const dataQueries = require("./utils/queries");
const config = require("./databaseConfig");
const endpoint = config.endpoint;
const masterKey = config.primaryKey;
const client = new CosmosClient({
  endpoint: endpoint,
  auth: { masterKey: masterKey }
});
const HttpStatusCode = { NOTFOUND: 404 };
const databaseId = config.database.id;
const containerId = config.container.id;

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

  for (var i = 0; i < idArray.length; i++) {
    lastIdArray.push(idArray[i].deviceId);
    lastIdArray[i] = "'" + lastIdArray[i] + "'";
  }
  return lastIdArray;
}

async function getCurrentData() {

  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(dataQueries.lastTenSeconds)
    .toArray();

  //console.log(results);

  for (var queryResult of results) {
    var resultString = JSON.stringify(queryResult);
    newDataArray.push(resultString);
  }
  return newDataArray;
}

async function getdeviceIdroom() {

  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(dataQueries.newRoomQuerry)
    .toArray();

  //console.log(results);

  for (var queryResult of results) {
    var resultString = JSON.stringify(queryResult);
    idroom.push(resultString);
  }
  return idroom;
}

function exit(message) {
  console.log(message);
  console.log("Press any key to exit");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", process.exit.bind(process, 0));
}

// getCurrentData().then(() => {
//   exit();
// }).catch((error) => {
//   console.log(error);
// })

module.exports.getDeviceIdArray = getDeviceIdArray;
module.exports.getCurrentData = getCurrentData;
module.exports.getdeviceIdroom = getdeviceIdroom;
