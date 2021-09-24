// Background
var bg = new Image();
// Platform
var pf = new Image();
bg.src = "assets/kirbydreamland.jpeg";
pf.src = "assets/grasstile.png"
var clearX;
var clearY;
var speed = 0.7; // lower is faster
var scale = 1.05;
var dx = -0.75;
var ctx;
canvas.width = 800;
canvas.height = 451;
var x = 0;
var y = canvas.height - 100;


bg.onload = function() {
    scaleToFit(this);
}

pf.onload = function() {
    imgW = pf.width * scale;
    imgH = pf.height * scale;

    // get canvas context
    ctx = document.getElementById('canvas').getContext('2d');

    // set refresh rate
    return setInterval(draw, speed);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    scaleToFit(bg);

    // reset, start from beginning
    if (x < -imgW) {
        x = 0;
    }
    // draw additional image
    if (x < canvas.width - imgW) {
        ctx.drawImage(pf, x + imgW, y, imgW, imgH);
    }

    // draw image
    ctx.drawImage(pf, x, y, imgW, imgH);
    // amount to move
    x += dx;
}

function scaleToFit(img) {
    ctx = document.getElementById('canvas').getContext('2d');
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
}