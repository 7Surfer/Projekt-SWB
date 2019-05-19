var config = {};

config.endpoint  = 'https://cosmosdbrs.documents.azure.com:443/';
config.primaryKey = 'ZDS3HVCSHeCZH2f0cUHjboJahR5Hww1gGCev9xj6BzWVxmXboV610IZrQ59mifxg5KLZi9Ne9Qwd5dHlhAPiFw==';

config.database = {
    "id": "roomsensedb"
};

config.container = {
    "id": "MeasuredData"
};


module.exports = config;