 
 function setup() {
    createCanvas(600, 600);
 }

 const size = 100;
 const layers = 100;

 function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance);
 }

 function drawLayers(x, y, size, layers) {
    //const half = size / 2;
    const variance = size / 20;
    noFill();
    //rectMode(CENTER);
    for (let i = 0; i < layers; i++) {
        if (Math.random() > 0.8) {
            continue;   
        }
        const s = (size / layers) * i;
        const half = s / 2;

        //colors for the lines
        stroke(random(255), random(255), random(255));
        //thicker lines
        strokeWeight(10);
        

        beginShape();
        vertex(getRandomValue(x - half, variance),getRandomValue(y - half, variance));
        vertex(getRandomValue(x + half, variance),getRandomValue(y - half, variance));
        vertex(getRandomValue(x + half,variance),getRandomValue(y + half, variance));
        vertex(getRandomValue (x - half,variance),getRandomValue(y + half, variance));
        endShape(CLOSE);
        //rect(x - half, y - half, s, s);
    }
}

 function draw() {
    background(255, 140, 0);

    //drawLayers(100, 100, size, layers);
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            drawLayers(size / 4 + x * size, size / 4 + y * size, size, layers);
        }
    }

    noLooop();
 }