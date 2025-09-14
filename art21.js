let stars = [];

function setup() {
  createCanvas(600, 600);
  noFill();

  // Generate static stars
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      brightness: random(150, 255)
    });
  }
}

function draw() {
  // Gradient background
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(30, 30, 60), color(10, 10, 30), y / height); 
    stroke(c);
    line(0, y, width, y);  
  }

  //Moon 
  noStroke();
  fill(255, 230, 200, 200); // soft glowing moon
  ellipse(500, 100, 100, 100); // main body
  fill(255, 230, 200, 80);    // glow layer
  ellipse(500, 100, 150, 150);

  //Stars
  for (let s of stars) {
    stroke(255, s.brightness);
    point(s.x, s.y);
  }

  // Shooting stars
  if (random(1) < 0.005) { // small chance each frame
    let x1 = random(width);
    let y1 = random(height / 2);
    stroke(255);
    strokeWeight(2);
    line(x1, y1, x1 + 50, y1 + 20);
  }

  //Waves
  const baseY = height / 2;
  const divider = 100;
  const layers = 6;

  for (let i = 0; i < layers; i++) {
    let waveColor = color(255, 100 + i * 20, 200, 180); // bright pink waves
    stroke(waveColor);
    strokeWeight(2);
    noFill(); //

    beginShape();
    for (let x = 0; x < width; x++) {
      let y = baseY + i * 30 + noise(x / divider, frameCount * 0.01 + i) * 150;
      vertex(x, y);
    }
    endShape();
  }
}
