 

 const size = 100;
 const layers = 15;
 let stars = [];


function setup() {
    createCanvas(600, 600);
    frameRate(4);

        // Generate stars
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            brightness: random(150, 255)
        });}
 }

 function getAnimatedValue(pos, variance, offset) {
    // Smooth animated movement using Perlin noise
    return pos + map(noise(frameCount * 0.02 + offset), 0, 1, -variance, variance);
}

 function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance);
 }

 function drawLayers(x, y, size, layers) {
    //const half = size / 2;
    const variance = size / 105;
    noFill();
    //rectMode(CENTER);
    for (let i = 0; i < layers; i++) {
        if (Math.random() > 0.8) {
            continue;   
        }
        const s = (size / layers) * i;
        const half = s / 4;

        //colors for the lines
        stroke(0, 191, 179);
        //thicker lines
        strokeWeight(random(1, 4));
        

        beginShape();
        vertex(getRandomValue(x - half, variance),getRandomValue(y - half, variance));
        vertex(getRandomValue(x + half, variance),getRandomValue(y - half, variance));
        vertex(getRandomValue(x + half,variance),getRandomValue(y + half, variance));
        vertex(getRandomValue (x - half,variance),getRandomValue(y + half, variance));
        endShape(CLOSE);
        //rect(x - half, y - half, s, s);
    }
}

function drawStars() {
    noStroke();
    for (let star of stars) {
        fill(star.brightness);
        ellipse(star.x, star.y, star.size);
    }
}

 function draw() {
     background(0); // dark background for stars
    drawStars();

    //drawLayers(100, 100, size, layers);
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
        }
    }

    //noLoop();
 }

