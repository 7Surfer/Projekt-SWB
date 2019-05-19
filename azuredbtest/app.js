const CosmosClient = require("@azure/cosmos").CosmosClient;
const dataQueries = require("./queries");
const config = require("./config");
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


// Query
async function getDeviceIdArray() {
  const deviceCount = {
  //query: "SELECT DISTINCT c.deviceId FROM c c",
  // Query aus queries.js
    query: dataQueries.deviceIdArray,
    parameters: []
  };

  const { result: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(deviceCount)
    .toArray();


  var jsonArray = JSON.stringify(results);
  var idArray = JSON.parse(jsonArray);

  for (var i = 0; i < idArray.length; i++) {
    lastIdArray.push(idArray[i].deviceId);
    lastIdArray[i] = "'" + lastIdArray[i] + "'";
  }
  return lastIdArray;
}

function exit(message) {
  console.log(message);
  console.log("Press any key to exit");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", process.exit.bind(process, 0));
}


module.exports.getDeviceIdArray = getDeviceIdArray;



