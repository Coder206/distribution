//SocketIO
var socket = io.connect();

//Timer
var i = 0;
var t = document.getElementById("t");
var te = document.getElementById("te");
var timer;

//Worker
var v = document.getElementById("v");
var ve = document.getElementById("ve");
var w;
var eve;
var valc = { "debut": 0, "fin": 0, "total": 0 };
var d;

//Page web
var res = document.getElementById("rvisible");
var userN
var user = document.getElementById("users");
var nTravail = document.getElementById("nTravail");

socket.on("message", function(message) {
    t.style.visibility = "hidden";
    te.style.visibility = "hidden";
    valc.debut = message[0];
    valc.fin = message[1];
    valc.total = message[2];
    userN = message[3];

    userN = userN - 1;

    if (userN == 1) {
        user.textContent = userN + " contributor/contributeur";
    }
    else if (userN == -1) {
        user.textContent = "0 contributeur/contributor";
    }
    else {
        user.textContent = userN + " contributors/contributeurs";
    }

    v.textContent = "Des calculs précédent nous ont permis de déterminer qu'il existent " + valc.total + " nombres premiers entre 0 et " + valc.debut + ".";
    ve.textContent = "Previous work from our contributors has determined there are " + valc.total + " prime numbers between 0 and " + valc.debut + ".";

    //console.log(valc.debut + "-" + valc.fin + "-" + valc.total);
    dTravail();
    dTemps();
});

function dTemps() {
    i += 1;
    if (i == 1) {
        t.textContent = "Votre système informatique a réalisé la tâche en " + i.toString() + " seconde.";
        te.textContent = "Your device took " + i.toString() + " second to complete the task.";
    }
    else {
        t.textContent = "Votre système informatique a réalisé la tâche en " + i.toString() + " secondes.";
        te.textContent = "Your device took " + i.toString() + " seconds to complete the task.";
    }
    timer = window.setTimeout("dTemps()", 1000);
}

function fTemps() {
    clearTimeout(timer);
}

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
        alert("We are working on allowing you to contribute here. Please stay tuned for more.\nNous sommes en conception de code pour vous permettre de contribuer.");
    }
}

function resultats() {
    userN = userN + 1;
    user.textContent = userN + " contributors/contributeurs";
    t.style.visibility = "visible";
    te.style.visibility = "visible";
    v.textContent = "Grace au calculs qui ont été fait sur votre système, nous savons maintenant qu'il existent " + valc.total + " nombres premiers entre 0 et " + d.data[1] + ".";
    ve.textContent = "With help from your computer, we now know that there are " + valc.total + " prime numbers between 0 and " + d.data[1] + ".";
    alert("Bonjour, merci pour votre contribution! J'aimerais prendre cette occasion pour remercier tous ceux qui permit la conception de Distribution, notamment Aaron Langille, Pierre Taillon, Roby Desrochers and Nicholas Paun qui m'ont appuyer tout au long du projet.\n\nGreetings! I would like to thank you for your contribution to the Distribution project. I would also like to take this opportunity to thank Aaron Langille, Pierre Taillon, Roby Desrochers and Nicholas Paun along with many others who helped make this project a reality.");
}

function fTravail(e) {
    fTemps();
    //valc.total = e.data;
    valc.total = valc.total + e.data[2];
    console.log(e.data);
    socket.send(e.data);
    d = e;
    res.style.visibility = "visible";
    nTravail.style.visibility = "visible";
}

res.addEventListener("click", resultats);

nTravail.addEventListener("click", function() {
    window.location.reload(1);
});