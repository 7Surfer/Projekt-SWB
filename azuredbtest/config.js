var config = {}; 

config.endpoint  = 'https://cosmosdbrs.documents.azure.com:443/';
config.primaryKey = 'YYtlMaYKQJ2xuIjVLEIPs4cVGvOtHenNikWdRsk2kSCgrH21GaadpfVM5T4B6ruSq6eAQNJ0dl1KgUI09GQnQg==';

config.database = {
    "id": "roomsensedb"
};

config.container = {
    "id": "MeasuredData"
};


module.exports = config;