
/*
 * Code adapted from: "Recursive Tree" example
 * p5.js Examples — Repetition: Recursive Tree
 * https://p5js.org/examples/repetition-recursive-tree/
 * Accessed: September 12, 2025
 */

let angle;
let prevAngle = 0; // track previous mouse angle
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
    fill(120, 255, 255, 200);
    ellipse(this.x, this.y, this.size);
  }

  offScreen() {
    return this.y > height;
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(-50, 0);
    this.size = random(2, 4);
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    noStroke();
    fill(60, 0, 255);
    ellipse(this.x, this.y, this.size);
    // optional trail
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

  // Falling stars in the background
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

  // Calculate current tree angle
  angle = (mouseX / width) * 90;
  angle = min(angle, 90);

  // Check if the tree has moved
  let treeMoved = angle !== prevAngle;
  prevAngle = angle;

  // Draw the tree
  stroke(0, 255, 255);
  let trunkLength = 120;
  let startX = width / 2;
  let startY = height;

  // Draw trunk
  line(startX, startY, startX, startY - trunkLength);

  // Start recursive branches from top of trunk
  branch(startX, startY - trunkLength, trunkLength, -90, 0, treeMoved);

  // Update and draw falling leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].update();
    leaves[i].display();
    if (leaves[i].offScreen()) {
      leaves.splice(i, 1);
    }
  }
}

// Recursive branch function using absolute coordinates
function branch(x, y, h, a, level, treeMoved) {
  stroke(level * 40 % 360, 255, 255);

  h *= 0.66;

  if (h > 2) {
    // Right branch
    let newX = x + cos(a) * h;
    let newY = y + sin(a) * h;
    line(x, y, newX, newY);
    branch(newX, newY, h, a + angle, level + 1, treeMoved);

    // Left branch
    newX = x + cos(a) * h;
    newY = y + sin(a) * h;
    line(x, y, newX, newY);
    branch(newX, newY, h, a - angle, level + 1, treeMoved);
  } else {
    // Static leaf at tip
    fill(120, 255, 255);
    noStroke();
    ellipse(x, y, 6, 6);

    // Occasionally spawn falling leaf only if the tree moved
    if (random(1) < 0.01 && treeMoved) {
      leaves.push(new Leaf(x, y));
    }
  }
}
