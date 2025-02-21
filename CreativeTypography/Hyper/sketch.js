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

  text1.update1();
  //text1.display();

  text2.update2();
  text2.display();

  text3.update3();
  text3.display3();
}

class HyperEffect {
  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.points = font.textToPoints(this.txt, this.x - 100, this.y, 150, {
      sampleFactor: 0.3,
    });

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
    fill("rgb(204,15,15)");
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      circle(this.tempX[i], this.tempY[i], 4);
    }
  }

  update2() {}

  update3() {
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let distance = dist(p.x, p.y, mouseX, mouseY);

      if (mouseIsPressed && distance < 100) {
        stroke("rgb(204,15,15)");
        line(mouseX, mouseY, this.points[i].x, this.points[i].y);
      } else {
        p.x = lerp(p.x, this.originalX[i], 0.1);
        p.y = lerp(p.y, this.originalY[i], 0.1);
      }
    }
  }

  display() {
    fill("rgb(204,15,15)");
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      circle(this.points[i].x, this.points[i].y, 4);
    }
  }

  display3() {
    fill("rgb(204,15,15)");
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      circle(this.points[i].x, this.points[i].y, 1.5);
    }
  }
}
