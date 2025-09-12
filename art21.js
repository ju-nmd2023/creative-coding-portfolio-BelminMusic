
function setup() {
  createCanvas(600, 600);
  noFill();
}

function draw() {
  //Gradient background
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(30, 30, 60), color(10, 10, 30), y / height); 
    stroke(c);
    line(0, y, width, y);
  }

  const baseY = height / 2;
  const divider = 100;
  const layers = 5;

  //Waves
  for (let i = 0; i < layers; i++) {
    let waveColor = color(180 + i * 15, 220, 255, 180); 
    stroke(waveColor);
    strokeWeight(2);

    beginShape();
    for (let x = 0; x < width; x++) {
      let y = baseY + i * 30 + noise(x / divider, frameCount * 0.01 + i) * 150;
      vertex(x, y);
    }
    endShape();
  }
}   

