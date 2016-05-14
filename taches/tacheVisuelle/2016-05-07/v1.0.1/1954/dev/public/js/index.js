//DOM

var nU = document.getElementById("users");

//wEB AUDIO
var on = false;
var context = new AudioContext(),
    oscillator;
//document.querySelector("button").addEventListener("click", start);
window.addEventListener("load", oscStart);

function oscStart(nUsers) {
    oscillator = context.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.value = nUsers * 50;
    oscillator.detune.value = 100;
    oscillator.connect(context.destination);

    //oscillator.start(context.currentTime);
    //oscillator.stop(context.currentTime + 5);

    oscillator.start();
    on = true;
}

//SocketIO
var socket = io.connect();

socket.on('connect', function () {
    //drawCoordinates(50, 100, 0);
    //drawCoordinates(100, 150, 1);
    //drawCoordinates(55, 95, 0);
    dTravail();
    socket.on('u', function (msg) {
        //NE FONCTIONNE PAS!! -- WEBRTC!!! "io.emit("nU", nU);"
        nU.textContent = msg;
        if (on === false) {
            oscStart(msg);
        }
        else {
            oscillator.stop();
            oscStart(msg);
        }
    });

    socket.on("np", function (data) {
        x = data[0];
        y = data[1];
        c = data[2];
        drawCoordinates(x, y, c);
    });

});

function dTravail() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("js/travail.js");
        }
        w.onmessage = function (event) {
            fTravail(event);
        };
    } else {
        var x;
        x = Math.floor(Math.random() * (561 - 51)) + 51;
        var y;
        y = Math.floor(Math.random() * (351 - 51)) + 51;
        var c;
        c = Math.floor(Math.random() * 2);
        var p = { x, y, c };
        fTravail(p);
    }
}

function fTravail(e) {
    var x = e.data[0];
    var y = e.data[1];
    var c = e.data[2];
    drawCoordinates(e.data[0], e.data[1], e.data[2]);
    socket.emit('point', { p: e.data });
    console.log(x);
    console.log(y);
    console.log(c);
}

function drawCoordinates(x, y, c) {
    var pointSize = 20; // Change according to the size of the point.
    var ctx = document.getElementById("cvs").getContext("2d");

    if (c === 0) {
        ctx.fillStyle = "blue"; // Blue color
    }

    else {
        ctx.fillStyle = "green";
    }
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
}

window.onbeforeunload = function () {
    socket.disconnect();
}