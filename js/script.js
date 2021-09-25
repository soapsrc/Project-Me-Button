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
// Tomato boolean
var showItem = false;
var itemLanded = false;

// Declare variables
var speed = 0.7; // FrameRate - lower is faster
var scale = 1.05; // Scale of the platform image
var dx = -0.75; // Offset of pfX
var ctx; // Canvas context
canvas.width = 800;
canvas.height = 451;
var pfX = 0; // X coordinate of scrolling platform
var pfY = canvas.height - 90; // Y coordiante of scrolling platform
var delayCount = 1; // Delay count of Walking Kirby and Chef Kirby
var f = 1; // Current frame of Walking Kirby and Chef Kerby animation
var delay = 17; // Animation delay for Walking Kirby and Chef Kirby animation
var duration = 1500; // Duration of chef -> platform item animation
var startTime; // Start time of chef -> platform item animation
var itemX = (canvas.width / 2) + ckirby.width; // X coordinate of tomato
var itemY = 200 + (ckirby.height); // Y coordinate of tomato

function init() {
    // Load images
    bg.src = "assets/kirbydreamland.jpeg";
    pf.src = "assets/grasstile.png"
    wkirby.src = "assets/walkkirby/wkirby0.gif"
    tomato.src = "assets/mtomato.png"
<<<<<<< Updated upstream
    ckirby.src = "assets/chefkirby/ckirby0.gif"
=======
    ckirby.src = "assets/Kirby_Animation_Frames/chef_kirby/ckirby0.gif"
>>>>>>> Stashed changes

    // Get canvas context and add double click event listener
    ctx = document.getElementById('canvas').getContext('2d');
    document.getElementById('canvas').addEventListener("dblclick", onClick, false);

    // Load background image
    bg.onload = function() {
        scaleToFit(this);
    }

    // Load scrolling platform
    pf.onload = function() {
            imgW = pf.width * scale;
            imgH = pf.height * scale;

            // Set refresh rate
            return setInterval(draw, speed);
        }
        // 
    wkirby.onload = function() {
        drawKirby();
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    scaleToFit(bg);

    // reset, start from beginning
    if (pfX < -imgW) {
        pfX = 0;
    }
    // draw additional image
    if (pfX < canvas.width - imgW) {
        ctx.drawImage(pf, pfX + imgW, pfY, imgW, imgH);
    }
    // draw image
    ctx.drawImage(pf, pfX, pfY, imgW, imgH);
    // amount to move
    pfX += dx;

    drawKirby();

    if (itemLanded && notCollided()) drawItem("tomato");
}

function drawKirby() {
    ctx.drawImage(wkirby, -50, 190, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, canvas.width / 2 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
    if (delayCount % delay == 0) {
        wkirby.src = "assets/walkkirby/wkirby" + f + ".gif";
        ckirby.src = "assets/Kirby_Animation_Frames/chef_kirby/ckirby" + f + ".gif";
        f++;
    }

    if (delayCount < delay * 16) delayCount++;
    else delayCount = 1;
    if (f > 15) f = 0;

}

function resetItem() {
    itemX = (canvas.width / 2) + ckirby.width; // X coordinate of tomato
    itemY = 200 + (ckirby.height); // Y coordinate of tomato
}

function notCollided() {
    if (itemX <= ckirby.width * 2) {
        itemLanded = false;
        showItem = false;
        resetItem();
        return false;
    }
    return true;
}

function drawItem(type) {
    if (type == "tomato")
        ctx.drawImage(tomato, itemX, itemY);
    else if (type == "fireKirby") {} // draw Fire Kirby
    itemX += dx
    if (itemX < -tomato.width) {
        showItem = false;
        itemLanded = false;
        resetItem();
    }

}

function scaleToFit(img) {
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
}

// A portion of the following code is from https://stackoverflow.com/questions/43626268/html-canvas-move-circle-from-a-to-b-with-animation

function landItem(time, type) {
    if (!startTime) // it's the first frame
        startTime = time || performance.now();

    // deltaTime should be in the range [0 ~ 1]
    var deltaTime = (time - startTime) / duration;
    // currentPos = previous position + (difference * deltaTime)
    var currentX = itemX + ((canvas.width - 50 - itemX) * deltaTime);
    var currentY = itemY + ((335 - itemY) * deltaTime);

    if (deltaTime >= 1) { // this means we ended our animation
        itemX = canvas.width - 50; // reset x variable
        itemY = 335; // reset y variable
        startTime = null; // reset startTime
        if (type == "tomato")
            ctx.drawImage(tomato, itemX, itemY);
        else if (type == "fireKirby") {} // draw fire Kirby sprite
        itemLanded = true;
    } else {
        ctx.drawImage(tomato, currentX, currentY);
        requestAnimationFrame(landItem); // Continue with animation
    }
}

function onClick(e) {
    if (e.pageX > canvas.width / 2 - ckirby.width && e.pageX < (canvas.width / 2) + ckirby.width &&
        e.pageY > 200 && e.pageY < 200 + (ckirby.height * 2)) {
        if (!showItem) {
            showItem = true;
            landItem(performance.now(), "tomato");
        }
    }

}

init();