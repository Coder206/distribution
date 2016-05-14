var nca;
var ideb;
var itot;
var ifin;
var fdeb;
var ffin;
var ftot;

//Out
var deb;
var fin;
var tot;

var cou;

function isPrime(number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

function calculer() {
    tot = itot + ftot;
}

function termine(n) {
    //Vérifie la complétion
    if (fin === cou) {
        calculer();
        postMessage([deb, fin, tot]);
    }
    else {
        init(n);
    }
}

function init(t) {
    nca = t.data[0];
    deb = t.data[0];
    fin = t.data[1];
    itot = t.data[2];
    cou = deb;

    while (++nca <= fin) {
        ftot += isPrime(nca) ? 1 : 0;
        cou++;
    }
    
    termine(t);
}

onmessage = function(e) {
    init(e);
}
