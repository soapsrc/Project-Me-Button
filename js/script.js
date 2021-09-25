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
// Item has landed on grass platform boolean
var itemLanded = false;
// Kirby is inhaling something boolean
var isSuck = false;
// Item type variable (tomato, sword, fire, ice, etc.)
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
var wKirbyFrame = 1; // Current frame of Walking Kirby and Chef Kerby animation
var delay = 20; // Animation delay for Walking Kirby and Chef Kirby animation
var duration = 1500; // Duration of chef -> platform item animation
var startTime; // Start time of chef -> platform item animation
var itemX = (canvas.width / 2.5) + ckirby.width; // X coordinate of tomato
var itemY = 200 + (ckirby.height); // Y coordinate of tomato

 * This function is used to import other files
 * @param {*} file, this parameter is the relative filepath to another file 
 */
function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);
}
// Import rss.js
include('js/rss.js');
/**
 * Returns None
 * Canvas setup
 */
function init() {
    // Load images
    bg.src = "assets/kirbydreamland.jpeg";
    pf.src = "assets/grasstile.png"
    wkirby.src = "assets/kirby_animation_frames/Kirby_Walk/0.png"
    tomato.src = "assets/mtomato.png"
    ckirby.src = "assets/kirby_animation_frames/chef_kirby/ckirby0.gif"
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
        // Set refresh rate
        return setInterval(draw, speed);
    }

    // Draw kirby on load
    wkirby.onload = function() {

        drawKirby();
    }
}
/**
 * Returns None
 * Draws canvas
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    scaleToFit(bg);
    // Draw scrolling platform
    drawPlatform();
    // Draw meme mirror
    drawMirror();
    // Check if Kirby collided with item
    checkCollision();
    // Check if item landed on grass platform
    if (itemLanded) drawItem(itemType);
    //  Draw Kirby
    drawKirby();
}
/**
 * Returns None
 * Passes an image and scales it to fit the entire canvas
 */
function scaleToFit(img) {
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
}
/**
 * Returns None
 * Draws and animates the scrolling grass platform
 */
function drawPlatform() {
    // If platform x-coordinate is <= width of platform image width then reset x-coordinate
    if (pfX <= -pf.width) {
        pfX = 0;
    }
    // Platform image width is smaller than canvas width so we must draw a second platform
    if (pfX < canvas.width - pf.width) {
        ctx.drawImage(pf, pfX + pf.width, pfY, pf.width, pf.height);
    }
    // Draw initial platform
    ctx.drawImage(pf, pfX, pfY, pf.width, pf.height);
    // Distance x-coordinate of platform is moved
    pfX += dx;
}
/**
 * Returns None
 * Draws meme mirror using currentmeme image
 */
function drawMirror() {
    // Initialize currentmeme to the Meme Mirror
    ctx.drawImage(currentmeme, canvas.width / 1.89 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
}

/**
 * Returns None
 * Draws chef Kirby and walking Kirby
 */
function drawKirby() {
    // Draw walking Kirby and chef Kirby
    ctx.drawImage(wkirby, 20, 290, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, canvas.width / 2.5 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
    // Must delay Kirbys animation or else it will be too fast
    if (delayCount % delay == 0) { // Only animate Kirbys when delayCount % delay == 0
        wkirby.src = walkArray[wKirbyFrame];
        ckirby.src = "assets/kirby_animation_frames/chef_kirby/ckirby" + wKirbyFrame + ".gif";
        wKirbyFrame++; // Update Kirby frame
    }
    // delayCount range = [1,delay * totalnumber of frames]
    if (delayCount < delay * walkArray.length) delayCount++;
    else delayCount = 1;
    // Last animation frame
    if (wKirbyFrame > walkArray.length - 1) {
        // If Kirby is already sucking, default Kirby_Walk sprites is saved into walkArray
        if (isSuck) {
            console.log("isSuck = false");
            loadArray("default");
            isSuck = false;
            itemY += 5;
        }
        // If Kirby is not sucking and is just walking, reset frame number to restart animation
        wKirbyFrame = 0;
    }

}
/**
 * Returns None
 * Manually loads image into image array
 */
function loadArray(kirby) {
    if (kirby == "default") {
        console.log("load default");
        walkArray[0] = "assets/kirby_animation_frames/Kirby_Walk/0.png";
        walkArray[1] = "assets/kirby_animation_frames/Kirby_Walk/1.png";
        walkArray[2] = "assets/kirby_animation_frames/Kirby_Walk/2.png";
        walkArray[3] = "assets/kirby_animation_frames/Kirby_Walk/3.png";
        walkArray[4] = "assets/kirby_animation_frames/Kirby_Walk/4.png";
        walkArray[5] = "assets/kirby_animation_frames/Kirby_Walk/5.png";
        walkArray[6] = "assets/kirby_animation_frames/Kirby_Walk/6.png";
        walkArray[7] = "assets/kirby_animation_frames/Kirby_Walk/7.png";
        walkArray[8] = "assets/kirby_animation_frames/Kirby_Walk/8.png";
        walkArray[9] = "assets/kirby_animation_frames/Kirby_Walk/9.png";
    } else if (kirby == "suck") {
        console.log("load suck");
        walkArray = new Array();
        walkArray[0] = "assets/kirby_animation_frames/kirby_suck/0.png";
        walkArray[1] = "assets/kirby_animation_frames/kirby_suck/1.png";
        walkArray[2] = "assets/kirby_animation_frames/kirby_suck/2.png";
        walkArray[3] = "assets/kirby_animation_frames/kirby_suck/3.png";
        walkArray[4] = "assets/kirby_animation_frames/kirby_suck/4.png";
        wKirbyFrame = 0;
    }
}
/**
 * Returns None
 * Resets current item position back to beside chef's Kirby pot
 */
function resetItem() {
    itemX = (canvas.width / 2.5) + ckirby.width; // X coordinate of item
    itemY = 200 + (ckirby.height); // Y coordinate of item
}
/**
 * Returns None
 * Checks if Kirby has collided with current item (only one item can be called at a time or function will not work)
 */
function checkCollision() {
    if (itemX <= ckirby.width * 2) {
        showItem = false;
        itemLanded = false;
        resetItem();
    } else if (itemX <= ckirby.width * 2 + 35 && !isSuck) {
        console.log("isSuck = true");
        isSuck = true;
        loadArray("suck");
        // Play suck sound effect
        suckSound = new loadSound("assets/audio/kirbysuck.mp3");
        suckSound.play();
        // Mirror is updated with new meme
        updateMirror();
    }
}
/**
 * Returns None
 * Draws item as it moves along the platform and towards Kirby
 */
function drawItem() {
    if (itemType == "tomato")
        ctx.drawImage(tomato, itemX, itemY);
    else if (itemType == "fireKirby") {} // draw Fire Kirby

    itemX += dx
}
/**
 * Returns None
 * Moves item from chef Kirby's pot to the end of the scrolling Kirby platform
 * A portion of the following code is from https://stackoverflow.com/questions/43626268/html-canvas-move-circle-from-a-to-b-with-animation
 */
function landItem(time) {
    // Coordinates of where we want the item to land (end of grass platform)
    var landX = canvas.width - 50;
    var landY = 335;
    if (!startTime) // Check if first frame
        startTime = time || performance.now(); // Update startTime

    // delataTime = portion of duration time that has passed, keeps track of current time
    var deltaTime = (time - startTime) / duration;
    // currentPos = previous position + (difference * deltaTime)
    // Move tomato to next 
    var currentX = itemX + ((landX - itemX) * deltaTime);
    var currentY = itemY + ((landY - itemY) * deltaTime);
    if (deltaTime >= 1) { // Animation (pot -> platform) has finished
        // Update x-coordiantes to where item landed
        itemX = landX; //  End of glass platform
        itemY = landY; // End of glass platform
        startTime = null; // Reset startTime
        // Draw tomato
        if (itemType == "tomato")
            ctx.drawImage(tomato, itemX, itemY);
        else if (itemType == "fireKirby") {} // Draw fire Kirby sprite
        // Item has landed
        itemLanded = true;
    } else { // Animation (pot -> platform) has not finished yet
        if (itemType == "tomato")
            ctx.drawImage(tomato, currentX, currentY);
        else if (itemType == "fireKirby") {} // Draw fire Kirby sprite
        requestAnimationFrame(landItem); // Continue with animation
    }
}

/**
 * Returns None
 * updates currentmeme to a random Kirby meme image
 */
function updateMirror() {
    // Produce random array index number for memearray
    let arrayIndex = Math.floor(Math.random() * memearray.length);
    // Set newrandommeme to memearray[arrayIndex]
    var newrandommeme = memearray[arrayIndex];
    // If newrandommeme is the same as previous meme or if arrayIndex == 0 then randomize arrayIndex again
    while (currentmeme === newrandommeme || arrayIndex == 0) {
        arrayIndex = Math.floor(Math.random() * memearray.length);
        newrandommeme = memearray[arrayIndex];
    }
    // Update  currentmeme
    currentmeme = newrandommeme;

}
/**
 * Returns None
 * Handles double click on chef Kirby by triggering tomato animation and moving it from pot -> platform
 */
function onClick(e) {
    // If mouse coordinates is within chef Kirby image
    if (e.pageX > canvas.width / 2.5 - ckirby.width && e.pageX < (canvas.width / 2) + ckirby.width &&
        e.pageY > 200 && e.pageY < 200 + (ckirby.height * 2)) {
        // If an item is not already being drawn then draw item and animate it moving from pot -> platform
        if (!showItem) {
            showItem = true;
            itemType = 'tomato';
            landItem();
        }
    }

}
/**
 * Returns None
 * Parameters: path - relative path of mp3 file
 * Only works for mp3 files
 */
function loadSound(path) {
    var audio = new Audio(path);
    this.play = function() {
        audio.play();
    }
    this.stop = function() {
        audio.pause();
    }
}

init();