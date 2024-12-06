let tree;
let mouth;
const rows = 50;
const columns = 38;

function preload() {
  tree = loadImage("tree.png");
  mouth = loadImage("mouth.png");
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background("black");

  if (mouseIsPressed) {
    framingDot("blue");
    push();
    blendMode(EXCLUSION);
    image(mouth, 0, 0, width, height);
    pop();
    push();
    fill("yellow");
    stroke(0);
    strokeWeight(8);
    textSize(22);
    textAlign(CENTER);
    textFont('Chakra Petch')
    text("Hmm...", 400,50);
    pop();
  } else {
    framingDot("blue");
    push();
    blendMode(EXCLUSION);
    image(tree, 0, 0, width, height);
    pop();
    push();
    fill("yellow");
    stroke(0);
    strokeWeight(8);
    textSize(22);
    textAlign(CENTER);
    textFont('Chakra Petch')
    text("Click and Drag", 400, 560);
    pop();
  }
}

///////for this function I referenced the code Ally did for the last week's code challenge
function framingDot(fillColor) {
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= columns; j++) {
      fill(fillColor);
      noStroke();
      let posX = (i * width) / rows;
      let posY = (j * height) / columns;

      let distToMouse = dist(posX, posY, mouseX, mouseY);

      let dia = map(distToMouse, 0, 400, 25, 0, true);

      circle(posX, posY, dia);
    }
  }
}
