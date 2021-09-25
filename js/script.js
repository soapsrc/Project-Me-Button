// Background
var bg = new Image();
// Platform
var pf = new Image();
// Walking Kirby
var wkirby = new Image();
var walkArray = new Array();
// Meme tomato
var tomato = new Image();
// Chef Kirby
var ckirby = new Image();
// Item display boolean
var showItem = false;
// Item has landed on glass platform boolean
var itemLanded = false;
// Kirby is inhaling something boolean
var isSuck = false;
var itemType;

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
var delay = 20; // Animation delay for Walking Kirby and Chef Kirby animation
var duration = 1500; // Duration of chef -> platform item animation
var startTime; // Start time of chef -> platform item animation
var itemX = (canvas.width / 2) + ckirby.width; // X coordinate of tomato
var itemY = 200 + (ckirby.height); // Y coordinate of tomato

function init() {
    // Load images
    bg.src = "assets/kirbydreamland.jpeg";
    pf.src = "assets/grasstile.png"
    wkirby.src = "assets/Kirby_Animation_Frames/Kirby_Walk/0.png"
    tomato.src = "assets/mtomato.png"
    ckirby.src = "assets/Kirby_Animation_Frames/chef_kirby/ckirby0.gif"
    loadArray("default");

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
    // Check if collided with item
    notCollided();

    if (itemLanded) drawItem(itemType);
    drawKirby();
}

function drawKirby() {
    ctx.drawImage(wkirby, 20, 290, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, canvas.width / 2 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
    if (delayCount % delay == 0) {
        wkirby.src = walkArray[f];
        ckirby.src = "assets/Kirby_Animation_Frames/chef_kirby/ckirby" + f + ".gif";
        f++;
    }

    if (delayCount < delay * walkArray.length) delayCount++;
    else delayCount = 1;
    // Last animation frame
    if (f > walkArray.length - 1) {
        if (isSuck) {
            console.log("isSuck = false");

            loadArray("default");
            isSuck = false;
            console.log("f1: " + f);
        }
        f = 0;
    }

}
// Manually loads images into an image array
function loadArray(kirby) {
    if (kirby == "default") {
        console.log("load default");
        walkArray[0] = "assets/Kirby_Animation_Frames/Kirby_Walk/0.png";
        walkArray[1] = "assets/Kirby_Animation_Frames/Kirby_Walk/1.png";
        walkArray[2] = "assets/Kirby_Animation_Frames/Kirby_Walk/2.png";
        walkArray[3] = "assets/Kirby_Animation_Frames/Kirby_Walk/3.png";
        walkArray[4] = "assets/Kirby_Animation_Frames/Kirby_Walk/4.png";
        walkArray[5] = "assets/Kirby_Animation_Frames/Kirby_Walk/5.png";
        walkArray[6] = "assets/Kirby_Animation_Frames/Kirby_Walk/6.png";
        walkArray[7] = "assets/Kirby_Animation_Frames/Kirby_Walk/7.png";
        walkArray[8] = "assets/Kirby_Animation_Frames/Kirby_Walk/8.png";
        walkArray[9] = "assets/Kirby_Animation_Frames/Kirby_Walk/9.png";
    } else if (kirby == "suck") {
        console.log("load suck");
        walkArray = new Array();
        walkArray[0] = "assets/Kirby_Animation_Frames/kirby_suck/0.png";
        walkArray[1] = "assets/Kirby_Animation_Frames/kirby_suck/1.png";
        walkArray[2] = "assets/Kirby_Animation_Frames/kirby_suck/2.png";
        walkArray[3] = "assets/Kirby_Animation_Frames/kirby_suck/3.png";
        walkArray[4] = "assets/Kirby_Animation_Frames/kirby_suck/4.png";
        f = 0;
    }

}
// Resets item coordinates and places item right back beside chef kirby's pot
function resetItem() {
    itemX = (canvas.width / 2) + ckirby.width; // X coordinate of item
    itemY = 200 + (ckirby.height); // Y coordinate of item
}

// Updates mirror with new meme
function updateMirror() {

}
// Checks if Kirby has collided with current item (only one item can be called at a time or function will not work)
function notCollided() {
    if (itemX <= ckirby.width * 2) {
        showItem = false;
        itemLanded = false;
        resetItem();
        return true;
    } else if (itemX <= ckirby.width * 2 + 35 && !isSuck) {
        console.log("isSuck = true");
        isSuck = true;
        loadArray("suck");
        // Mirror is updated with new meme
        updateMirror();
    }
    return true;
}

function drawItem() {
    if (itemType == "tomato")
        ctx.drawImage(tomato, itemX, itemY);
    else if (itemType == "fireKirby") {} // draw Fire Kirby

    itemX += dx
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

function landItem(time) {
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
        if (itemType == "tomato")
            ctx.drawImage(tomato, itemX, itemY);
        else if (itemType == "fireKirby") {} // draw fire Kirby sprite
        itemLanded = true;
    } else {
        if (itemType == "tomato")
            ctx.drawImage(tomato, currentX, currentY);
        else if (itemType == "fireKirby") {} // draw fire Kirby sprite
        requestAnimationFrame(landItem); // Continue with animation
    }
}

function onClick(e) {
    if (e.pageX > canvas.width / 2 - ckirby.width && e.pageX < (canvas.width / 2) + ckirby.width &&
        e.pageY > 200 && e.pageY < 200 + (ckirby.height * 2)) {
        if (!showItem) {
            showItem = true;
            itemType = 'tomato';
            landItem();
        }
    }

}

init();