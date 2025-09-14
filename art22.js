function setup() {
  createCanvas(600, 600);
} 

const size = 10;
const divider = 20;
const numRows = 60;
const numCols = 60;

function draw () {
  background(235, 70, 80);

  noStroke();

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider); // noise between 0–1

      // Map noise value to color (from blue to pink)
      const c = lerpColor(color(50, 100, 200), color(200, 50, 150), value);
      fill(c);

      // Size also depends on noise
      ellipse(size / 2 + x * size, size / 2 + y * size, value * size);
    }
  }
}



