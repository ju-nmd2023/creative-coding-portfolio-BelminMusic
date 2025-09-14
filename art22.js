function setup() {
  createCanvas(600, 600);
} 

const size = 10;
const divider = 20;
const numRows = 60;
const numCols = 60;

function draw () {
  background("black");
  noStroke();

  const maxSize = map(mouseX, 0, width, size, size * 4); 

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider, frameCount * 0.1);

      // gardient color for the dots
      const c = lerpColor(color(50, 255, 230), color(255, 80, 200), value);

      //mouse control
      const dotSize = value * maxSize;

      // glow  effect
        for (let g = 5; g > 0; g--) { 
        fill(red(c), green(c), blue(c), 20);
        ellipse(size / 2 + x * size, size / 2 + y * size, dotSize + g * 8);
      }

      fill(c);

      // Circle size animated
      ellipse(size / 2 + x * size, size / 2 + y * size, dotSize);
    }
  }
}




