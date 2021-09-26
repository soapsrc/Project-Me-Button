// Background
var bg = new Image();
// Platform
var pf = new Image();
// Walking Kirby
var wkirby = new Image();
var walkArray = [];
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
const walkSuffix = "_walk";
const suckSuffix = "_suck";

/**
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
    bg.src = "assets/kirby_animation_frames/kirby_bg/stars3.png";
    pf.src = "assets/grasstile.png";
    wkirby.src = "assets/kirby_animation_frames/normal_kirby_walk/0.png";
    tomato.src = "assets/mtomato.png";
    ckirby.src = "assets/kirby_animation_frames/chef_kirby/ckirby0.gif";
    loadArray("normal_kirby"+walkSuffix);

    // Get canvas context and add double click event listener
    ctx = document.getElementById('canvas').getContext('2d');
    document.getElementById('canvas').addEventListener("click", onSingleClick, false);
    document.getElementById('canvas').addEventListener("dblclick", onDoubleClick, false);
    document.getElementById('canvas').addEventListener("pointerdown", onPointerDown, false);

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
 * Used when referencing files names based on item types
 * @returns string to be appended with file path
 */
function kirbyFileUtility(){
    switch(itemType){
        case fire:
            return "fire_kirby";
        case ice:
            return "ice_kirby";
        case mirror: 
            return "mirror_kirby";
        case painter: 
            return "painter_kirby";
        case sword:
            return "sword_kirby";
        default:
            return "normal_kirby";
    }
}

/**
 * Returns None
 * Draws canvas
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    scaleToFill(bg);
    // scaleToFit(bg);
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
function scaleToFill(img){
    // get the scale
    var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
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
    ctx.drawImage(wkirby, 20, 361 - (wkirby.height * 3.5), wkirby.width * 4, wkirby.height * 4);
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
        // If Kirby is already sucking, default normal_kirby_walk sprites saved into walkArray
        if (isSuck) {
            loadArray(kirbyFileUtility()+walkSuffix);
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
    if (!kirby.includes("suck")) {
        walkArray = 
        [
            "assets/kirby_animation_frames/"+kirby+"/0.png",
            "assets/kirby_animation_frames/"+kirby+"/1.png",
            "assets/kirby_animation_frames/"+kirby+"/2.png",
            "assets/kirby_animation_frames/"+kirby+"/3.png",
            "assets/kirby_animation_frames/"+kirby+"/4.png",
            "assets/kirby_animation_frames/"+kirby+"/5.png",
            "assets/kirby_animation_frames/"+kirby+"/6.png",
            "assets/kirby_animation_frames/"+kirby+"/7.png",
            "assets/kirby_animation_frames/"+kirby+"/8.png",
            "assets/kirby_animation_frames/"+kirby+"/9.png"
        ];        
    } else {
        walkArray = new Array();
        walkArray = 
        [
            "assets/kirby_animation_frames/"+kirby+"/0.png",
            "assets/kirby_animation_frames/"+kirby+"/1.png",
            "assets/kirby_animation_frames/"+kirby+"/2.png",
            "assets/kirby_animation_frames/"+kirby+"/3.png",
            "assets/kirby_animation_frames/"+kirby+"/4.png"
        ];
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
        isSuck = true;
        loadArray(kirbyFileUtility()+suckSuffix);
        if(itemType === tomato){
            updateMirror();
        }
        // Play suck sound effect
        suckSound = new loadSound("assets/audio/kirbysuck.mp3");
        suckSound.play();
    }
}

/**
 * Returns None
 * Draws item as it moves along the platform and towards Kirby
 */
function drawItem() {
    ctx.drawImage(itemType, itemX, itemY);
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
    var currentX = itemX + ((canvas.width - 50 - itemX) * deltaTime);
    var currentY = itemY + ((335 - itemY) * deltaTime);

    if (deltaTime >= 1) { // Animation (pot -> platform) has finished
        // Update x-coordiantes to where item landed
        itemX = landX; //  End of glass platform
        itemY = landY; // End of glass platform
        startTime = null; // Reset startTime
        ctx.drawImage(itemType, itemX, itemY);
        itemLanded = true;
    } else { // Animation (pot -> platform) has not finished yet
        ctx.drawImage(itemType, currentX, currentY);
        requestAnimationFrame(landItem); // Continue with animation
    }
}

/**
 * Generates random numbers to be utilized for array indices
 * @param {*} arr the array to be randomly accessed
 * @param {*} compareItem the current item to ensure no two items are outputted consecutively
 * @param {*} beforeStartIndex one less than the start index of the subarray to access
 * @returns a random number that serves as the index to randomly access an array
 */
function randomNumberGenerator(arr, compareItem, beforeStartIndex) {
    var index = Math.floor(Math.random() * arr.length);
    while(compareItem === arr[index] || index === beforeStartIndex) {
        index = Math.floor(Math.random() * arr.length);
    }
    return index;
}

/**
 * Returns None
 * updates currentmeme to a random Kirby meme image
 */
function updateMirror() {
    // Update  currentmeme
    currentmeme = memeArray[randomNumberGenerator(memeArray, currentmeme, 0)];
}

// Handle single and double clicks
var clickTimer

/**
 * Returns None
 * Handles single click on chef Kirby by triggering copy item animation and moving it from pot -> platform 
 */
function onSingleClick(e){
    if (e.detail === 1) {
        clickTimer = setTimeout(() => {
            releaseItem(copyItemsArray[randomNumberGenerator(copyItemsArray, itemType, -1)], e);
        }, 200)
    }
}

/**
 * Returns None
 * Handles double click on chef Kirby by triggering tomato animation and moving it from pot -> platform
 */
function onDoubleClick(e) {
    clearTimeout(clickTimer)
    releaseItem(tomato, e);
}

/**
 * Returns None
 * @param {*} e, event handler that looks for pointer down to call function 
 */
function onPointerDown(e) {
        clickTimer = setTimeout(() => {
            releaseItem(foodArray[Math.floor(Math.random() * foodArray.length)], e);
        }, 400)
}

function releaseItem(releaseItemType, e) {
    // If mouse coordinates is within chef Kirby image
    if (e.pageX > canvas.width / 2.5 - ckirby.width && e.pageX < (canvas.width / 2) + ckirby.width &&
        e.pageY > 200 && e.pageY < 200 + (ckirby.height * 2)) {
        // If an item is not already being drawn then draw item and animate it moving from pot -> platform
        if (!showItem) {
            showItem = true;
            itemType = releaseItemType;
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