const timestamp = require("./dateTest");

var dataQueries = {};

dataQueries.deviceCount = {

  // Query aus queries.js
  query: "SELECT DISTINCT c.deviceId FROM c c",
  parameters: []
};

dataQueries.lastTenSeconds = {
  // > @timestampInSeconds10 einfügen
  query:
    "SELECT c.deviceId, c.temperature, c.humidity , c._ts FROM c c WHERE c._ts > 1558370897 ORDER BY c._ts DESC",
  parameters: [
    {
      name: "@timestampInSeconds10",
      value: timestamp.InSeconds10
    }
  ]
};

module.exports = dataQueries;
