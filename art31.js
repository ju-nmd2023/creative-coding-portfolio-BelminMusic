
let inc = 0.1; 
let scl = 20;       
let cols, rows;
let zoff = 0;        
let particles = [];
let flowfield;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  // Create particles
  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

