let angle;
let leaves = [];

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

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // Calculate the angle based on the mouse position, maximum 90 degrees
  angle = (mouseX / width) * 90;
  angle = min(angle, 90);

  // Start the tree from the bottom of the screen
  translate(width / 2, height);

  // Draw the trunk
  stroke(0, 255, 255);
  line(0, 0, 0, -120);

  // Move to the end of the trunk
  translate(0, -120);

  // Start the recursive branching
  branch(120, 0);

  // Update and draw falling leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    leaves[i].update();
    leaves[i].display();
    if (leaves[i].offScreen()) {
      leaves.splice(i, 1);
    }
  }
}

function branch(h, level) {
  // Set the hue based on the recursion level
  stroke(level * 40 % 360, 255, 255);

  // Each branch will be 2/3 the size of the previous one
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
    // Draw a static leaf at the tip
    fill(120, 255, 255);
    noStroke();
    ellipse(0, 0, 6, 6);

    // Occasionally spawn a falling leaf
    if (random(1) < 0.01) {
      let pos = getCanvasCoords(0, 0); // convert to absolute canvas coords
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