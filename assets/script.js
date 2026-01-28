const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const nameText = document.getElementById("name");
const descriptionText = document.getElementById("description");
const p5container = document.getElementById("p5container");

let currentExperiment = 0;
let experiments = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    experiments = data;
    if (experiments.length > 0) {
      goToExperiment(0);
    }
  });

function goToExperiment(index) {
  const experiment = experiments[index];
  if (!experiment) return;

  p5container.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.setAttribute("allow", "autoplay");

  // CHECK: Is it an HTML file or a JS file?
  if (experiment.file.endsWith(".html")) {
    // If it's HTML, just load the file directly
    iframe.src = experiment.file;
  } else {
    // If it's a JS file, build the environment like your old code did
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.js"></script>
          <link rel="stylesheet" href="assets/iframe.css">
          <style>body { margin: 0; display: flex; justify-content: center; align-items: center; background: black; }</style>
        </head>
        <body>
          <script src="${experiment.file}"></script>
        </body>
      </html>
    `;
    iframe.srcdoc = htmlContent;
  }

  p5container.appendChild(iframe);
  nameText.innerText = experiment.name;
  descriptionText.innerText = experiment.description;
}

nextButton.addEventListener("click", () => {
  currentExperiment = (currentExperiment + 1) % experiments.length;
  goToExperiment(currentExperiment);
});

prevButton.addEventListener("click", () => {
  currentExperiment = (currentExperiment - 1 + experiments.length) % experiments.length;
  goToExperiment(currentExperiment);
});