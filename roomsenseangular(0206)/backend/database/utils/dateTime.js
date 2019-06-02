
var timestamp = {};

//Sekunden ohne Nachkommastellen
timestamp.InSeconds = (new Date().getTime() / 1000).toFixed(0);

//Letzte 10 Sekunden
timestamp.InSeconds10 = (new Date().getTime() / 1000).toFixed(0) - 10;


module.exports = timestamp;
