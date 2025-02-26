////fatigue... a sense of vertigo
////added blur effect as wished
let font;

function preload() {
  font = loadFont("../Fonts/LeagueScript-Regular.ttf");
}


function setup() {
    createCanvas(600, 300);
    textAlign(CENTER, CENTER);
  
    txt = new FatigueEffect("Fatigue", width / 2 - 140, height / 2 + 30);
  }
  
  function draw() {
    clear();

    txt.update();
    txt.display();
  }
  
  class FatigueEffect {
    constructor(txt, x, y) {
      this.txt = txt;
      this.x = x;
      this.y = y;
      this.points = font.textToPoints(this.txt, this.x - 100, this.y, 150, {
        sampleFactor: 0.3,
      });
      ////recording the original position of the points
      this.originalX = [];
      this.originalY = [];
      ////setting up random offsets for each points
      this.offsetX = [];
      this.offsetY = [];
  
      for (let i = 0; i < this.points.length; i++) {
        this.originalX.push(this.points[i].x);
        this.originalY.push(this.points[i].y);
  
        this.offsetX.push(random(-10, 10));
        this.offsetY.push(random(-10, 10));
      }
    }
  
    update() {
      let mappedMouse = map(mouseX, 0, width, 0, 1, true);
      let randomValue = map(mouseX, 0, width, 3, 0.7, true);
  
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].x =
          lerp(
            this.originalX[i] + this.offsetX[i],
            this.originalX[i],
            mappedMouse
          ) + random(-randomValue, randomValue);
        this.points[i].y =
          lerp(
            this.originalY[i] + this.offsetY[i],
            this.originalY[i],
            mappedMouse
          ) + random(-randomValue, randomValue);
      }
    }
  
    display() {
      noStroke();
      ////adjust the 'r' and 'b'value to change the color of the text
      let mappedB = map(mouseY, 0, height, 200, 0, true);
      let mappedR = map(mouseY, 0, height, 255, 100, true);
      let blurV = map(mouseY, 0, height, 0, 5, true);
  
      fill(mappedR, 255, mappedB);
      for (let i = 0; i < this.points.length; i++) {
        ellipse(this.points[i].x, this.points[i].y, 3);
      }
  
      filter(BLUR, blurV);
    }
  }