let font;

function preload() {
  font = loadFont("../Fonts/Barriecito-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);

  text1 = new HyperEffect("Hyper", width / 2 - 75, 150);
  text2 = new HyperEffect("Hyper", width / 2 - 75, 330);
  text3 = new HyperEffect("Hyper", width / 2 - 75, 500);
}

function draw() {
  //background("black");
  clear();

  ////instruction text
  push();
  fill("yellow");
  stroke("red");
  strokeWeight(4);
  textSize(20);
  text("press", 550, 550);
  pop();

  ////maybe i was using too much animations i didn't use display() for this one
  text1.update1();
  text2.update2();
  text3.update3();
}

class HyperEffect {
  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.points = font.textToPoints(this.txt, this.x - 100, this.y, 150, {
      sampleFactor: 0.3,
    });

    ////stores the original position of the points
    this.originalX = [];
    this.originalY = [];
    for (let i = 0; i < this.points.length; i++) {
      this.originalX.push(this.points[i].x);
      this.originalY.push(this.points[i].y);
    }

    //// for update1(). got this format online, to replicate each content of the target array
    this.tempX = [...this.originalX];
    this.tempY = [...this.originalY];
  }

  update1() {
    //// refreshes a random offet per 5 frames, meant to reduce frame rate while not influencing the rest of the canvas.
    if (frameCount % 5 === 0) {
      for (let i = 0; i < this.points.length; i++) {
        this.tempX[i] = this.originalX[i] + random(-1, 1);
        this.tempY[i] = this.originalY[i] + random(-1, 1);
      }
    }

    ////draw the shape
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      if (mouseIsPressed) {
        fill(204,15,15,70);
        circle(this.tempX[i], this.tempY[i], 20);
      } else {
        fill(204,15,15);
        circle(this.tempX[i], this.tempY[i], 4);
      }
    }
  }

  update2() {
    for (let i = 0; i < this.points.length; i++) {
      ///evaluate the distance from point to mouse. i could've made the dots follow the mouse directly but this is morre fun
      let distance = dist(this.points[i].x, this.points[i].y, mouseX, mouseY);

      ////mapping the points' direction/movement
      let offsetX = map(distance, -200, 200, -30, 30);
      let offsetY = map(distance, -200, 200, -30, 30);

      push();
      ////adjust the deviation due to movement
      translate(-40, -20);
      fill("rgb(204,15,15)");
      noStroke();
      ////refreshing position
      circle(this.points[i].x + offsetX, this.points[i].y + offsetY, 4);
      pop();
    }
  }

  update3() {
    ////does the same thing as update1()
    if (frameCount % 5 === 0) {
      for (let i = 0; i < this.points.length; i++) {
        this.tempX[i] = this.originalX[i] + random(-1, 1);
        this.tempY[i] = this.originalY[i] + random(-1, 1);
      }
    }

    ////basic shape
    fill("rgb(204,15,15)");
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      circle(this.tempX[i], this.tempY[i], 1.5);
    }

    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let distance = dist(p.x, p.y, mouseX, mouseY);
      ///draw a line from the points to the mouse when pressed
      if (mouseIsPressed && distance < 100) {
        stroke("yellow");
        line(mouseX, mouseY, this.points[i].x, this.points[i].y);
      } else {
        p.x = lerp(p.x, this.originalX[i], 0.1);
        p.y = lerp(p.y, this.originalY[i], 0.1);
      }
    }
  }
}
