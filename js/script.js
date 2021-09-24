var bg = new Image();
canvas.width = 800;
canvas.height = 451;
bg.src = "assets/kirbydreamland.jpeg";
bg.onload = function() {
    scaleToFit(this);
}

function scaleToFit(img) {
    var ctx = document.getElementById('canvas').getContext('2d');
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
}