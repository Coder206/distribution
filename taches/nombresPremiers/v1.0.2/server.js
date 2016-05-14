var express = require('express');
var http = require('http');
var io = require('socket.io');
var json = require("json-file");
//var open = require("open");

var port = process.env.port || 3478;
var app = express();
app.use(express.static('./public'));

//Data
var file = json.read("./public/data/valeurs.json");
console.log(file.data);
var val = { "debut": 0, "fin": 0, "total": 0 };
var message_to_client;
var nUsers = file.get("cont");
console.log(nUsers);
val.debut = file.get("debut");
val.fin = file.get("fin");
val.total = file.get("total");

console.log(val.debut);
console.log(val.fin);
console.log(val.total);


var server = http.createServer(app).listen(port);
console.log("Le serveur est démarré au port: " + port);
io = io.listen(server);
//open("localhost:" + port, "firefox");

function backup() {
    file.set("debut", val.debut);
    file.set("fin", val.fin);
    file.set("total", val.total);
    file.set("cont", nUsers);

    file.writeSync();
}

io.sockets.on("connection", function(socket) {
    if (val.debut == 0) {
        val.debut = val.fin;
    }
    else {
        val.debut = val.fin;
    }
    //val.fin = val.debut + 1000000000;
    //nUsers = nUsers + 1;
    message_to_client = [val.debut, val.fin, val.total, nUsers];
    console.log(message_to_client);
    socket.send(message_to_client);
    console.log("Nous sommes connectés!");

    socket.on("message", function(data) {
        val.total = val.total + data[2];
        console.log(data[2]);
        console.log(val.total);
        val.fin = val.debut + 1000000000;
        nUsers = nUsers + 1;
        backup();
    });

});
