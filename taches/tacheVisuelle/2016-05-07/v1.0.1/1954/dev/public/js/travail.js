var x;
x = Math.floor(Math.random() * (561 - 51)) + 51;
var y;
y = Math.floor(Math.random() * (351 - 51)) + 51;
var c;
c = Math.floor(Math.random() * 2);
postMessage([x, y, c]);