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


var deviceIdArray = [];
// Query
async function getDeviceIdArray() {
  

        const deviceCount = {
            query: "SELECT DISTINCT c.deviceId FROM c c",
            parameters: []
        };
        
        const { result: results } = await client.database(databaseId).container(containerId).items.query(deviceCount).toArray()
        var jsonArray = JSON.stringify(results);
        console.log('Results: ' + jsonArray);
        var idArray = JSON.parse(jsonArray);
        
        
         for(var i = 0; i < idArray.length; i++) {
             deviceIdArray.push(idArray[i].deviceId);
             deviceIdArray[i] = "'" + deviceIdArray[i] + "'";
     }
        
        console.log('DeviceIdArray: ' + deviceIdArray);
        console.log('Länge: ' + deviceIdArray.length)
        
}

function exit(message) {
  console.log(message);
  console.log("Press any key to exit");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", process.exit.bind(process, 0));
}

console.log('IdArray: ' + deviceIdArray);


  getDeviceIdArray()
  .then(() => {
    exit(`Completed successfully`);
  })
  .catch(error => {
    exit(`Completed with error \${JSON.stringify(error)}`);
  });

 

  
  
