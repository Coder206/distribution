function init(t) {
    var x = Math.floor(Math.random() * 601);
    var y = Math.floor(Math.random() * 301);
}

onmessage = function (e) {
    init(e);
}
