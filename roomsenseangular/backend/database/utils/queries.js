const timestamp = require("./dateTime");

var dataQueries = {};

dataQueries.deviceCount = {

  // Query aus queries.js
  query: "SELECT DISTINCT c.deviceId FROM c c",
  parameters: []
};

dataQueries.dummyData = {
  // > @timestampInSeconds10 einfügen
  query:
    "SELECT c.deviceId, c.temperature, c.humidity , c._ts FROM c c WHERE c._ts > 1559243368 ORDER BY c._ts DESC",
  parameters: [
    {
      name: "@timestampInSeconds10",
      value: timestamp.InSeconds10
    }
  ]
};


dataQueries.latestData = {
  // > @timestampInSeconds10 einfügen
  query:
  "SELECT c.deviceId, c.temperature, c.humidity , c._ts FROM r r WHERE c._ts >  @timestampInSeconds15 ORDER BY c._ts DESC", //  1559243368
  parameters: [
    {
      name: "@timestampInSeconds15",
      value: Math.floor((Date.now() / 1000) - 15)
    }
  ]
};


dataQueries.roomInfo = {
  query:
  "SELECT c.deviceId, c.roomName, c.lowerTempLimit, c.upperTempLimit, c.lowerHumiLimit, c.upperHumiLimit, c.message FROM c c ORDER BY c._ts DESC",
  parameters: []
}

module.exports = dataQueries;
