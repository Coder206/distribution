//SocketIO
var socket = io.connect();

socket.on("message", function(message) {
    dTravail();
});

function dTravail() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("js/travail.js");
            w.postMessage([valc.debut, valc.fin, 0]);
        }
        w.onmessage = function(event) {
            fTravail(event);
        };
    } else {
        alert("We are working on code allowing you to contribute to the website. Please stay tuned for more.\nNous sommes en conception de code pour vous permettre de contribuer.");
    }
}

function fTravail(e) {
    x = 
}
