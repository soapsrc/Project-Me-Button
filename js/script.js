// Background
var bg = new Image();
// Platform
var pf = new Image();
// Walking Kirby
var wkirby = new Image();
// Meme tomato
var tomato = new Image();
// Chef Kirby
var ckirby = new Image();
// Load images
bg.src = "assets/kirbydreamland.jpeg";
pf.src = "assets/grasstile.png"
wkirby.src = "assets/walkkirby/wkirby0.gif"
tomato.src = "assets/tomato.png"
ckirby.src = "assets/chefkirby/ckirby0.gif"
    // Declare variables
var speed = 0.7; // lower is faster
var scale = 1.05;
var dx = -0.75;
var ctx;
canvas.width = 800;
canvas.height = 451;
var x = 0;
var y = canvas.height - 90;
var frame = 1;
var f = 1;
var delay = 17;

function init() {
    // get canvas context
    ctx = document.getElementById('canvas').getContext('2d');
    document.getElementById('canvas').addEventListener("click", onClick, false);

    bg.onload = function() {
        scaleToFit(this);
    }

    pf.onload = function() {
        imgW = pf.width * scale;
        imgH = pf.height * scale;

        // set refresh rate
        return setInterval(draw, speed);
    }
    wkirby.onload = function() {
        drawKirby();
    }

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

    drawKirby();

    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "red";
    ctx.rect(canvas.width / 2 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
    ctx.stroke();
}

function drawKirby() {
    ctx.drawImage(wkirby, -50, 190, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, canvas.width / 2 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
    if (frame % delay == 0) {
        wkirby.src = "assets/walkkirby/wkirby" + f + ".gif";
        ckirby.src = "assets/chefkirby/ckirby" + f + ".gif";
        f++;
    }

    if (frame < delay * 16) frame++;
    else frame = 1;
    if (f > 15) f = 0;

}

function scaleToFit(img) {
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
}

function onClick(e) {

    if (e.pageX > canvas.width / 2 - ckirby.width && e.pageX < (canvas.width / 2) + ckirby.width &&
        e.pageY > 200 && e.pageY < 200 + (ckirby.height * 2)) {
        drawTomato();
    }
}

init();