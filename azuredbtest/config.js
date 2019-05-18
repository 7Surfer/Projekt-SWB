var config = {};

config.endpoint  = 'https://cosmosdbrs.documents.azure.com:443/';
config.primaryKey = '';

config.database = {
    "id": "roomsensedb"
};

config.container = {
    "id": "MeasuredData"
};


module.exports = config;