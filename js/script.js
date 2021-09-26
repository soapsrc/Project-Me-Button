// Background
var bg = new Image();
// Platform
var pf = new Image();
// Walking Kirby
var wkirby = new Image();
<<<<<<< Updated upstream
var walkArray = new Array();
=======
// Array holding all walking animation frames
var walkArray = [];
// Array holding all chef Kirby animation frames
var chefArray = [];
>>>>>>> Stashed changes
// Meme tomato
var tomato = new Image();
// Chef Kirby
var ckirby = new Image();
// Toggle music Button
var musicButton = new Image();
// Item display boolean
var showItem = false;
// Item has landed on grass platform boolean
var itemLanded = false;
// Kirby is inhaling something boolean
var isSuck = false;
// Item type variable (tomato, sword, fire, ice, etc.)
var itemType;
var ctx; // Canvas context
canvas.width = 800;
canvas.height = 451;
var pfX = 0; // X coordinate of scrolling platform
var pfY = canvas.height - 90; // Y coordiante of scrolling platform
var delayCount = 1; // Delay count of Walking Kirby and Chef Kirby
var wKirbyFrame = 0; // Current frame of Walking Kirby and Chef Kerby animation
var cKirbyFrame = 0; // Current frame of Walking Kirby and Chef Kerby animation
var startTime; // Start time of chef -> platform item animation
<<<<<<< Updated upstream
var itemX = (canvas.width / 2.5) + ckirby.width; // X coordinate of tomato
var itemY = 200 + (ckirby.height); // Y coordinate of tomato
=======
var itemX;
var itemY;
var ckirbyX;
var ckirbyY;
var wkirbyX = 20;
var wkirbyY = 290;
// Assign constant variables
const speed = 0.7; // FrameRate - lower is faster
const dx = -0.75; // Offset of pfX
const delay = 19; // Animation delay for Walking Kirby and Chef Kirby animation
const duration = 1500; // Duration of chef -> platform item animation
const musicX = canvas.width - 80; // X coordinate of musicButton
const musicY = canvas.height - 65; // Y coordinate of musicButton
const wkirbyScale = 4;
const walkSuffix = "_walk";
const suckSuffix = "_suck";

>>>>>>> Stashed changes
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
    bg.src = "assets/kirbydreamland.jpeg";
<<<<<<< Updated upstream
    pf.src = "assets/grasstile.png"
    wkirby.src = "assets/kirby_animation_frames/Kirby_Walk/0.png"
    tomato.src = "assets/mtomato.png"
    ckirby.src = "assets/kirby_animation_frames/chef_kirby/ckirby0.gif"
    loadArray("default");
=======
    pf.src = "assets/grasstile.png";
    wkirby.src = "assets/kirby_animation_frames/normal_kirby_walk/0.png";
    tomato.src = "assets/mtomato.png";
    ckirby.src = "assets/kirby_animation_frames/chef_kirby/ckirby0.gif";
    musicButton.src = "assets/musicnote.gif";
    ckirbyX = canvas.width / 3;
    ckirbyY = 200;
    // Set item position to where chef Kirby's pot is
    resetItem();

    loadArray("normal_kirby" + walkSuffix);
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
        // Set refresh rate
        return setInterval(draw, speed);
    }

    // Draw kirby on load
    wkirby.onload = function() {

<<<<<<< Updated upstream
        drawKirby();
=======
/**
 * Used when referencing files names based on item types
 * @returns string to be appended with file path
 */
function kirbyFileUtility() {
    switch (itemType) {
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
>>>>>>> Stashed changes
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
    //drawMirror();
    // Check if Kirby collided with item
    checkCollision();
    // Check if item landed on grass platform
    if (itemLanded) drawItem(itemType);
    //  Draw Kirby
    drawKirby();
    drawButtons();
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
    wkirbyY = 375 - (wkirby.height * 4); //Adjust y coordinate of walking Kirby vector to its height
    // Draw walking Kirby and chef Kirby
<<<<<<< Updated upstream
    ctx.drawImage(wkirby, 20, 290, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, canvas.width / 2.5 - ckirby.width, 200, ckirby.width * 2, ckirby.height * 2);
=======
    ctx.drawImage(wkirby, wkirbyX, wkirbyY, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, ckirbyX, ckirbyY, ckirby.width, ckirby.height);
>>>>>>> Stashed changes
    // Must delay Kirbys animation or else it will be too fast
    if (delayCount % delay == 0) { // Only animate Kirbys when delayCount % delay == 0
        wkirby.src = walkArray[wKirbyFrame];
        ckirby.src = chefArray[cKirbyFrame];
        wKirbyFrame++; // Update walking Kirby frame
        cKirbyFrame++; // Update chef Kirby frame
    }
    // delayCount range is [1,delay * totalnumber of frames]
    if (delayCount < delay * walkArray.length) delayCount++;
    else delayCount = 1;
    // Restart animation if current frame is last frame of chef Kirby animation
    if (cKirbyFrame == chefArray.length) {
        cKirbyFrame = 0; // Restart animation
    }
    // Last walking Kirby animation frame
    if (wKirbyFrame > walkArray.length - 1) {
<<<<<<< Updated upstream
        // If Kirby is already sucking, default Kirby_Walk sprites is saved into walkArray
        if (isSuck) {
            console.log("isSuck = false");
            loadArray("default");
=======
        // If Kirby is already sucking, walking sprites are loaded into walkArray
        if (isSuck) {
            loadArray(kirbyFileUtility() + walkSuffix);
>>>>>>> Stashed changes
            isSuck = false;
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
<<<<<<< Updated upstream
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
=======
    if (!kirby.includes("suck")) {
        walkArray = [
            "assets/kirby_animation_frames/" + kirby + "/0.png",
            "assets/kirby_animation_frames/" + kirby + "/1.png",
            "assets/kirby_animation_frames/" + kirby + "/2.png",
            "assets/kirby_animation_frames/" + kirby + "/3.png",
            "assets/kirby_animation_frames/" + kirby + "/4.png",
            "assets/kirby_animation_frames/" + kirby + "/5.png",
            "assets/kirby_animation_frames/" + kirby + "/6.png",
            "assets/kirby_animation_frames/" + kirby + "/7.png",
            "assets/kirby_animation_frames/" + kirby + "/8.png",
            "assets/kirby_animation_frames/" + kirby + "/9.png"
        ];
    } else if (kirby == "chef_kirby") {
        const chef_kirby_frames = 17;
        for (i = 0; i < chef_kirby_frames; i++) {
            chefArray[i] = "assets/kirby_animation_frames/chef_kirby/ckirby" + i + ".gif";
        }
    } else {
        walkArray = new Array();
        walkArray = [
            "assets/kirby_animation_frames/" + kirby + "/0.png",
            "assets/kirby_animation_frames/" + kirby + "/1.png",
            "assets/kirby_animation_frames/" + kirby + "/2.png",
            "assets/kirby_animation_frames/" + kirby + "/3.png",
            "assets/kirby_animation_frames/" + kirby + "/4.png"
        ];
>>>>>>> Stashed changes
        wKirbyFrame = 0;
    }

    const chef_kirby_frames = 17;
    for (i = 0; i < chef_kirby_frames; i++) {
        chefArray[i] = "assets/kirby_animation_frames/chef_kirby/ckirby" + i + ".gif";
    }
}
/**
 * Returns None
 * Resets current item position back to beside chef's Kirby pot
 */
function resetItem() {
    itemX = ckirbyX + 10; // X coordinate of item
    itemY = ckirbyY + 20; // Y coordinate of item
    console.log("RESET ckirby.width " + ckirby.width + " ckirby.height" + ckirby.height);

}
/**
 * Returns None
 * Checks if Kirby has collided with current item (only one item can be called at a time or function will not work)
 */
function checkCollision() {
    // Check if item is behind Kirby
    if (itemX <= wkirbyX + (wkirby.width * wkirbyScale) - 10) {
        showItem = false;
        itemLanded = false;
        resetItem();
<<<<<<< Updated upstream
    } else if (itemX <= ckirby.width * 2 + 35 && !isSuck) {
        console.log("isSuck = true");
        isSuck = true;
        loadArray("suck");
=======
    }
    // Check if item is in front of Kirby
    else if (itemX <= wkirbyX + (wkirby.width * wkirbyScale) + 50 && itemX >= wkirbyX + (wkirby.width * wkirbyScale) + 20 && !isSuck) {
        isSuck = true;
        loadArray(kirbyFileUtility() + suckSuffix);
        if (itemType === tomato) {
            updateMirror();
        }
>>>>>>> Stashed changes
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
    if (isSuck) itemY -= 0.3;
}
/**
 * Returns None
 * Moves item from chef Kirby's pot to the end of the scrolling Kirby platform
 * A portion of the following code is from https://stackoverflow.com/questions/43626268/html-canvas-move-circle-from-a-to-b-with-animation
 */
function dropItem(time) {
    // Coordinates of where we want the item to land (end of grass platform)
    var landX = canvas.width - 50;
    var landY = 370 - itemType.height;
    if (!startTime) // Check if first frame
        startTime = time || performance.now(); // Update startTime

    // delataTime = portion of duration time that has passed, keeps track of current time
    var deltaTime = (time - startTime) / duration;
    // currentPos = previous position + (difference * deltaTime)
    // Move tomato to next 
    var currentX = itemX + ((landX - itemX) * deltaTime);
    var currentY = itemY + ((landY - itemY) * deltaTime);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        if (itemType == "tomato")
            ctx.drawImage(tomato, currentX, currentY);
        else if (itemType == "fireKirby") {} // Draw fire Kirby sprite
        requestAnimationFrame(landItem); // Continue with animation
=======
        ctx.drawImage(itemType, currentX, currentY);
        requestAnimationFrame(dropItem); // Continue with animation
>>>>>>> Stashed changes
    }
}

/**
 * Returns None
 * updates currentmeme to a random Kirby meme image
 */
function updateMirror() {
<<<<<<< Updated upstream
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

=======
    // Produce random array index number for memeArray
    let arrayIndex = Math.floor(Math.random() * memeArray.length);
    // Set newrandommeme to memeArray[arrayIndex]
    var newrandommeme = memeArray[arrayIndex];
    // If newrandommeme is the same as previous meme or if arrayIndex == 0 then randomize arrayIndex again
    while (currentmeme === newrandommeme || arrayIndex == 0) {
        arrayIndex = Math.floor(Math.random() * memeArray.length);
        newrandommeme = memeArray[arrayIndex];
    }
    // Update  currentmeme
    currentmeme = newrandommeme;
}

// Handle single and double clicks
let clickTimer

/**
 * Returns None
 * Handles single click on chef Kirby by triggering copy item animation and moving it from pot -> platform 
 */
function onSingleClick(e) {
    if (e.detail === 1) {
        clickTimer = setTimeout(() => {
            releaseItem(copyItemsArray[Math.floor(Math.random() * copyItemsArray.length)], e);
        }, 200)
    }
>>>>>>> Stashed changes
}
/**
 * Returns None
 * Handles double click on chef Kirby by triggering tomato animation and moving it from pot -> platform
 */
<<<<<<< Updated upstream
function onClick(e) {
=======
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
>>>>>>> Stashed changes
    // If mouse coordinates is within chef Kirby image
    if (e.pageX > ckirbyX && e.pageX < ckirbyX + (ckirby.width) &&
        e.pageY > ckirbyY && e.pageY < ckirbyY + (ckirby.height)) {
        // If an item is not already being drawn then draw item and animate it moving from pot -> platform
        if (!showItem) {
            showItem = true;
<<<<<<< Updated upstream
            itemType = 'tomato';
            landItem();
=======
            itemType = releaseItemType;
            dropItem();
>>>>>>> Stashed changes
        }
    }

}
/**
 * Returns None
 * Draws background music toggle button
 */
function drawButtons() {
    ctx.drawImage(musicButton, musicX, musicY);
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