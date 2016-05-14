//DOM

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 200;

var nU = document.getElementById("users");
//SocketIO
var socket = io.connect();

socket.on('connect', function () {
    //drawCoordinates(50, 100, 0);
    //drawCoordinates(100, 150, 1);
    //drawCoordinates(55, 95, 0);
    socket.on('u', function (msg) {
        //NE FONCTIONNE PAS!! -- WEBRTC!!! "io.emit("nU", nU);"
        nU.textContent = msg;

        var points = [],
            currentPoint = 1,
            nextTime = new Date().getTime() + 500,
            pace = 500 /  msg;

        // make some points
        for (var i = 0; i < 50; i++) {
            points.push({
                x: i * (canvas.width / 50),
                y: 100 + Math.sin(i) * 10
            });
        }

        function draw() {
            if (new Date().getTime() > nextTime) {
                nextTime = new Date().getTime() + pace;

                currentPoint++;
                if (currentPoint > points.length) {
                    currentPoint = 0;
                }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#2068A8';
            ctx.fillStyle = '#2068A8';
            for (var p = 1, plen = currentPoint; p < plen; p++) {
                ctx.lineTo(points[p].x, points[p].y);
            }
            ctx.stroke();

            requestAnimFrame(draw);
        }

        draw();

        window.onbeforeunload = function () {
            socket.disconnect();
        }

    });
});