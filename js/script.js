// Background
var bg = new Image();
// Platform
var pf = new Image();
// Walking Kirby
var wkirby = new Image();
// Array holding all walking animation frames
var walkArray = [];
// Array holding all chef Kirby animation frames
var chefArray = [];
var sparkArray = [8];
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
var ctx; // Canvas context
canvas.width = 800;
canvas.height = 451;
var pfX = 0; // X coordinate of scrolling platform
var pfY = canvas.height - 90; // Y coordiante of scrolling platform
var delayCount = 1; // Delay count of Walking Kirby and Chef Kirby
var wKirbyFrame = 0; // Current frame of Walking Kirby and Chef Kerby animation
var cKirbyFrame = 0; // Current frame of Walking Kirby and Chef Kerby animation
var sparkFrame = 0;
var startTime; // Start time of chef -> platform item animation
var itemX;
var itemY;
var ckirbyX;
var ckirbyY;
var wkirbyX;
var wkirbyY;
var mirrorX;
var mirrorY;
var bgMusic;
// Assign constant variables
// Toggle music Button
const musicButton = new Image();
// Meme tomato
const tomato = new Image();
const normal_bg = "assets/kirby_animation_frames/kirby_bg/normal.png";
const fire_bg = "assets/kirby_animation_frames/kirby_bg/fire.png";
const ice_bg = "assets/kirby_animation_frames/kirby_bg/ice.png";
const mirror_bg = "assets/kirby_animation_frames/kirby_bg/mirror.png";
const paint_bg = "assets/kirby_animation_frames/kirby_bg/paint.png";
const sword_bg = "assets/kirby_animation_frames/kirby_bg/sword.png";
const speed = 0.7; // FrameRate - lower is faster
const dx = -0.75; // Offset of pfX
const delay = 19; // Animation delay for Walking Kirby and Chef Kirby animation
const duration = 1500; // Duration of chef -> platform item animation
const musicX = canvas.width - 80; // X coordinate of musicButton
const musicY = canvas.height - 65; // Y coordinate of musicButton
const wkirbyScale = 4;
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
    // bg.src = "assets/kirby_animation_frames/kirby_bg/normal.png";
    bg.src = normal_bg;
    pf.src = "assets/grasstile.png";
    wkirby.src = "assets/kirby_animation_frames/normal_kirby_walk/0.png";
    tomato.src = "assets/mtomato.png";
    ckirby.src = "assets/kirby_animation_frames/chef_kirby/ckirby0.gif";
    musicButton.src = "assets/musicnote.gif";
    // Assign variables
    ckirbyX = 200;
    ckirbyY = 30;
    wkirbyX = 20;
    wkirbyY = 290;
    mirrorX = canvas.width / 2 - 50;
    mirrorY = ckirbyY;
    // Set item position to where chef Kirby's pot is
    resetItem();

    loadArray("normal_kirby" + walkSuffix);
    loadArray("chef_kirby");

    bgMusic = new loadSound("assets/audio/greengreenslong.mp3");

    // Clicking outside of intro div hides the div
    document.onclick = ((e) => {
        if (e.target.id != 'intro' && document.getElementById('intro').style.display != 'none') {
            document.getElementById('intro').style.display = 'none';
        }
    });
    // Fade out after 7 seconds
    setTimeout(function() {
        document.getElementById("intro").style.display = 'none';
    }, 7000);

    // Get canvas context and add event listeners
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
        drawKirbys();
    }
}

/**
 * Used when referencing files names based on item types
 * @returns string to be appended with file path
 */
function kirbyFileUtility() {
    switch (itemType) {
        case fire:
            bg.src = fire_bg;
            return "fire_kirby";
        case ice:
            bg.src = ice_bg;
            return "ice_kirby";
        case mirror:
            bg.src = mirror_bg;
            return "mirror_kirby";
        case painter:
            bg.src = paint_bg
            return "painter_kirby";
        case sword:
            bg.src = sword_bg;
            return "sword_kirby";
        default:
            bg.src = normal_bg;
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
    // Draw scrolling platform
    drawPlatform();
    // Draw meme mirror
    drawMirror();
    // Check if Kirby collided with item
    checkCollision();
    // Check if item landed on grass platform
    if (itemLanded) drawItem(itemType);
    // Draw clouds
    drawClouds();
    //  Draw Kirby
    drawKirbys();
    if (itemType === tomato && isSuck) {
        drawSparkles();
    }
    // Draw music toggle button
    drawButtons();
}

/**
 * Returns None
 * Passes an image and scales it to fill the entire canvas
 * Code is from https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
 */
function scaleToFill(img) {
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
 * Code is from https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
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
    ctx.drawImage(currentmeme, mirrorX, mirrorY);
    // Wiggle the mirror so that it looks like it's floating
    if (delayCount % (delay * 8) == 0) {
        if (mirrorY >= 35) {
            mirrorY -= 5;
        } else mirrorY += 5;
    }
}

function drawClouds() {
    var cloud1 = new Image();
    var cloud2 = new Image();
    var cloud3 = new Image();
    var cloud1_OffsetX = -7;
    var cloud1_OffsetY = ckirby.height - 25;
    var cloud2_OffsetX = -25;
    var cloud2_OffsetY = currentmeme.height - 60;
    var cloud3_OffsetX = +120;
    var cloud3_OffsetY = currentmeme.height - 100;

    cloud1.src = "assets/cloud1.png";
    cloud2.src = "assets/cloud2.png";
    cloud3.src = "assets/cloud3.png";
    // Cloud underneath Chef Kirby
    ctx.drawImage(cloud1, ckirbyX + cloud1_OffsetX, ckirbyY + cloud1_OffsetY);
    // The two clouds by the meme mirror
    ctx.drawImage(cloud2, mirrorX + cloud2_OffsetX, mirrorY + cloud2_OffsetY);
    ctx.drawImage(cloud3, mirrorX + cloud3_OffsetX, mirrorY + cloud3_OffsetY);

}

/**
 * Returns None
 * Draws chef Kirby and walking Kirby
 */
function drawKirbys() {
    wkirbyY = 375 - (wkirby.height * 4); //Adjust y coordinate of walking Kirby vector to its height
    // Draw walking Kirby and chef Kirby
    ctx.drawImage(wkirby, wkirbyX, wkirbyY, wkirby.width * 4, wkirby.height * 4);
    ctx.drawImage(ckirby, ckirbyX, ckirbyY, ckirby.width, ckirby.height);
    // Wiggle chef Kirby so it looks like he's floating
    if (delayCount % (delay * 8) == 0) {
        if (ckirbyY >= 35) {
            ckirbyY -= 5;
        } else ckirbyY += 5;
    }
    // Must delay Kirbys animation or else it will be too fast
    if (delayCount % delay == 0) { // Only animate Kirbys when delayCount % delay == 0
        wkirby.src = walkArray[wKirbyFrame];
        ckirby.src = chefArray[cKirbyFrame];
        ckirby.load;
        wkirby.load;
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
        // If Kirby is already sucking, walking sprites are loaded into walkArray
        if (isSuck) {
            loadArray(kirbyFileUtility() + walkSuffix);
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
    if (kirby == "chef_kirby") {
        const chef_kirby_frames = 17;
        for (i = 0; i < chef_kirby_frames; i++) {
            chefArray[i] = "assets/kirby_animation_frames/chef_kirby/ckirby" + i + ".gif";
        }
    } else {
        var walk_kirby_frames = 10;
        if (kirby.includes("suck")) {
            walkArray = new Array();
            wKirbyFrame = 0;
            walk_kirby_frames = 5;
        }
        for (i = 0; i < walk_kirby_frames; i++) {
            walkArray[i] = "assets/kirby_animation_frames/" + kirby + "/" + i + ".png";
        }
    }
}

/**
 * Returns None
 * Resets current item position back to beside chef's Kirby pot
 */
function resetItem() {
    itemX = ckirbyX + 10; // X coordinate of item
    itemY = ckirbyY + 20; // Y coordinate of item

}
/**
 * Returns None
 * Checks if Kirby has collided with current item (only one item can be called at a time or function will not work)
 */
function checkCollision() {
    let is_within_wkirby_boundaries = itemX <= wkirbyX + (wkirby.width * wkirbyScale) + 50 && itemX >= wkirbyX + (wkirby.width * wkirbyScale) + 20;
    // Check if item is behind Kirby
    if (itemX <= wkirbyX + (wkirby.width * wkirbyScale) - 10) {
        showItem = false;
        itemLanded = false;
        resetItem();
    }
    // Check if item is in front of Kirby
    else if (is_within_wkirby_boundaries && !isSuck && itemY == 370 - itemType.height) {
        isSuck = true;
        loadArray(kirbyFileUtility() + suckSuffix);
        if (itemType === tomato) {
            updateMirror();
        }
        // Play suck sound effect
        let suckSound = new loadSound("assets/audio/kirbysuck.mp3");
        suckSound.play();

        // Play poyo sound effect after food has been inhaled
        if (foodArray.includes(itemType)) {
            setTimeout(() => {
                poyoSound = new loadSound(poyoArray[Math.floor(Math.random() * poyoArray.length)]);
                poyoSound.play();
            }, 500);
        }
    }
}

/**
 * Returns None
 * Draws item as it moves along the platform and towards Kirby
 */
function drawItem() {
    ctx.drawImage(itemType, itemX, itemY);
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

    if (deltaTime >= 1) { // Animation (pot -> platform) has finished
        // Update x-coordiantes to where item landed
        itemX = landX; //  End of glass platform
        itemY = landY; // End of glass platform
        startTime = null; // Reset startTime
        ctx.drawImage(itemType, itemX, itemY);
        itemLanded = true;
        // Play thud sound effect
        let thudSound = new loadSound("assets/audio/thud.mp3");
        thudSound.play();
    } else { // Animation (pot -> platform) has not finished yet
        ctx.drawImage(itemType, currentX, currentY);
        requestAnimationFrame(dropItem); // Continue with animation
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
    while (compareItem === arr[index] || index === beforeStartIndex) {
        index = Math.floor(Math.random() * arr.length);
    }
    return index;
}

/**
 * Returns None
 * updates currentmeme to a random Kirby meme image
 */
function updateMirror() {
    // Play magic sound effect every time mirror is updated
    let magicSound = new loadSound("assets/audio/magic.mp3");
    magicSound.play();
    // Update  currentmeme
    currentmeme = memeArray[randomNumberGenerator(memeArray, currentmeme, 0)];
}


function drawSparkles() {
    // Sparkles
    var sparkle0 = new Image();
    var sparkle1 = new Image();
    var sparkle2 = new Image();
    var sparkle3 = new Image();
    var sparkle4 = new Image();
    var sparkle5 = new Image();
    var sparkle6 = new Image();
    var sparkle7 = new Image();
    var spark = new Image();
    // Load sparkle images
    sparkle0.src = "assets/kirby_animation_frames/sparkles/0.gif";
    sparkle1.src = "assets/kirby_animation_frames/sparkles/1.gif";
    sparkle2.src = "assets/kirby_animation_frames/sparkles/2.gif";
    sparkle3.src = "assets/kirby_animation_frames/sparkles/3.gif";
    sparkle4.src = "assets/kirby_animation_frames/sparkles/4.gif";
    sparkle5.src = "assets/kirby_animation_frames/sparkles/5.gif";
    sparkle6.src = "assets/kirby_animation_frames/sparkles/6.gif";
    sparkle7.src = "assets/kirby_animation_frames/sparkles/7.gif";
    var sparkArray = [sparkle0, sparkle1, sparkle2, sparkle3, sparkle4, sparkle5, sparkle6, sparkle7];
    // Draw sparkles at current frame
    ctx.drawImage(sparkArray[sparkFrame], mirrorX + (currentmeme.width / 3 - 15), mirrorY + currentmeme.height / 3);
    if (delayCount % delay == 0) { // Only animate Kirbys when delayCount % delay == 0
        if (sparkFrame < sparkArray.length - 1)
            sparkFrame++;
        else sparkFrame = 0;
    }

}
// Handle single and double clicks
var clickTimer

/**
 * Returns None
 * Handles single click on chef Kirby by triggering copy item animation and moving it from pot -> platform 
 */
function onSingleClick(e) {

    clickTimer = setTimeout(() => {
        releaseItem(copyItemsArray[randomNumberGenerator(copyItemsArray, itemType, -1)], e);
        if (e.pageX > musicX && e.pageX < musicX + musicButton.width &&
            e.pageY > musicY && e.pageY < musicY + musicButton.height) {
            if (bgMusic.paused())
                bgMusic.play();
            else {
                bgMusic.stop();
            }
        }
    }, 200)

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
    if (e.pageX > ckirbyX && e.pageX < ckirbyX + (ckirby.width) &&
        e.pageY > ckirbyY && e.pageY < ckirbyY + (ckirby.height)) {
        // If an item is not already being drawn then draw item and animate it moving from pot -> platform
        if (!showItem) {
            playWhoosh();
            showItem = true;
            itemType = releaseItemType;
            dropItem();
        }
    }
}

/**
 * Returns None
 * Draws background music toggle button
 */
function drawButtons() {
    ctx.drawImage(musicButton, musicX, musicY);
    if (bgMusic.paused()) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#bee1e6';
        ctx.beginPath();
        ctx.moveTo(musicX, musicY);
        ctx.lineTo(musicX + musicButton.width, musicY + musicButton.height);
        ctx.stroke();
    }
}
/**
 * Returns None
 * Plays woosh sound
 */
function playWhoosh() {
    let woosh = new loadSound("assets/audio/highwhoosh.mp3");
    woosh.play();
}
/**
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
    this.paused = function() {
        return audio.paused;
    }
}

init();