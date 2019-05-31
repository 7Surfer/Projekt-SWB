const timestamp = require("./dateTest");
const deviceIdResults = require("./testAusgabe");

var dataQueries = {};

dataQueries.deviceCount = {

  // Query aus queries.js
  query: "SELECT DISTINCT c.deviceId FROM c c WHERE c._ts > @secondsNow",  //1559238358
  parameters: [
    {
      name: "@secondsNow",
      value: Math.floor((Date.now() / 1000) - 15)
    }
  ]
};

dataQueries.lastTenSeconds = {
  // > @timestampInSeconds10 einfügen
  query:
  "SELECT c.deviceId, c.temperature, c.humidity , c._ts FROM c c WHERE c._ts >  @timestampInSeconds15 ORDER BY c._ts DESC", //  1559243368
  parameters: [
    {
      name: "@timestampInSeconds15",
      value: Math.floor((Date.now() / 1000) - 15)
    }
  ]
};


dataQueries.currentData = {
  query:
    "SELECT TOP @activeDeviceCount c.deviceId, c.temperature, c.humidity , c._ts FROM c c ",
  parameters: [
    {
      name: "@activeDeviceCount",
      value: deviceIdResults.numberOfDevices
    }
  ]
};




module.exports = dataQueries;
