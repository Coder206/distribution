//Modules de code (NPM)
var express = require('express');
var http = require('http');
var io = require('socket.io');
var open = require("open");
//Variables
//Nombres d'utilisateurs (INT)
var nU = 0;
//Serveur de Web
var port = process.env.port || 3478;
var app = express();
app.use(express.static('./public'));
var server = http.createServer(app).listen(port);
console.log("Le serveur est démarré au port: " + port);
io = io.listen(server);
//Development    
open("localhost:" + port, "firefox");
//Logique
io.on('connection', function (socket) {
    nU++;
    console.log("Nous sommes connectés!");
    io.emit("u", nU);
    socket.on('point', function (data) {
    io.emit("np", data.p);
  });
    //Connexion terminée
    socket.on('disconnect', function () {
        nU--;
        console.log("Connexion terminée!");
        io.emit("u", nU);
    });
});