// var today = new Date();
// var date = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;
// console.log(dateTime);
 
var timestamp = {};

//Sekunden ohne Nachkommastellen
timestamp.InSeconds = (new Date().getTime() / 1000).toFixed(0);

//Letzte 10 Sekunden
timestamp.InSeconds10 = Math.floor((Date.now() / 1000) - 5) ;





module.exports = timestamp;

/* setInterval(() => {
     console.log((new Date().getTime() / 1000).toFixed -5); 
    console.log(timestamp.InSeconds10);
  
}, 5000); */
//SELECT TOP 5 m.deviceId, m.temperature, m.humidity, m._ts FROM MeasuredData m Order by m._ts DESC