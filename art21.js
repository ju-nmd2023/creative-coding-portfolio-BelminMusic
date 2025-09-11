let angle;
let leaves = [];
let stars = [];

class Leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(4, 8);
    this.speed = random(1, 2);
    this.offset = random(TWO_PI); // wiggle offset
  }

  update() {
    this.y += this.speed;
    this.x += sin(frameCount * 0.05 + this.offset) * 0.5;
  }

  display() {
    noStroke();
    fill(120, 255, 255, 200); // green leaf
    ellipse(this.x, this.y, this.size);
  }

  offScreen() {
    return this.y > height;
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(-50, 0); // start above the canvas
    this.size = random(2, 4);
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    noStroke();
    fill(60, 0, 255); // bright white star
    ellipse(this.x, this.y, this.size);
    // optional trail:
    stroke(60, 0, 255, 150);
    line(this.x, this.y, this.x, this.y - 10);
  }

  offScreen() {
    return this.y > height;
  }
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // ⭐ Falling stars in the background
  if (random(1) < 0.05) { 
    stars.push(new Star());
  }
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    stars[i].display();
    if (stars[i].offScreen()) {
      stars.splice(i, 1);
    }
  }

  // 🌳 Draw the tree
  push();
  angle = (mouseX / width) * 90;
  angle = min(angle, 90);

  translate(width / 2, height);

  stroke(0, 255, 255);
  line(0, 0, 0, -120);

  translate(0, -120);

  branch(120, 0);
  pop();

  // 🍂 Falling leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].update();
    leaves[i].display();
    if (leaves[i].offScreen()) {
      leaves.splice(i, 1);
    }
  }
}

function branch(h, level) {
  stroke(level * 40 % 360, 255, 255);

  h *= 0.66;

  if (h > 2) {
    // Right branch
    push();
    rotate(angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, level + 1);
    pop();

    // Left branch
    push();
    rotate(-angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, level + 1);
    pop();
  } else {
    // Static leaf at tip
    fill(120, 255, 255);
    noStroke();
    ellipse(0, 0, 6, 6);

    // Occasionally spawn a falling leaf
    if (random(1) < 0.01) {
      let pos = getCanvasCoords(0, 0);
      leaves.push(new Leaf(pos.x, pos.y));
    }
  }
}

// Convert current drawing coords into canvas coords
function getCanvasCoords(x, y) {
  let m = drawingContext.getTransform();
  return {
    x: m.a * x + m.c * y + m.e,
    y: m.b * x + m.d * y + m.f
  };
}
