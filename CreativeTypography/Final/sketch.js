// Sketch One: Fatigue Effect
var fatigueEffect = function(p) {
  let font;
  let txt;

  p.preload = function() {
    font = p.loadFont("../Fonts/LeagueScript-Regular.ttf");
  }

  p.setup = function() {
    const myFatigueCanvas = p.createCanvas(600, 300);
    myFatigueCanvas.parent("fatigueCanvas");
    p.textAlign(p.CENTER, p.CENTER);
    txt = new FatigueEffect("Fatigue", p.width / 2 - 140, p.height / 2 + 30);
  }

  p.draw = function() {
    p.clear();
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

      this.originalX = [];
      this.originalY = [];
      this.offsetX = [];
      this.offsetY = [];

      for (let i = 0; i < this.points.length; i++) {
        this.originalX.push(this.points[i].x);
        this.originalY.push(this.points[i].y);
        this.offsetX.push(p.random(-10, 10));
        this.offsetY.push(p.random(-10, 10));
      }
    }

    update() {
      let mappedMouse = p.map(p.mouseX, 0, p.width, 0, 1, true);
      let randomValue = p.map(p.mouseX, 0, p.width, 3, 0.7, true);

      for (let i = 0; i < this.points.length; i++) {
        this.points[i].x =
          p.lerp(this.originalX[i] + this.offsetX[i], this.originalX[i], mappedMouse) +
          p.random(-randomValue, randomValue);
        this.points[i].y =
          p.lerp(this.originalY[i] + this.offsetY[i], this.originalY[i], mappedMouse) +
          p.random(-randomValue, randomValue);
      }
    }

    display() {
      p.noStroke();
      let mappedB = p.map(p.mouseY, 0, p.height, 200, 0, true);
      let mappedR = p.map(p.mouseY, 0, p.height, 255, 100, true);
      let blurV = p.map(p.mouseY, 0, p.height, 0, 5, true);

      p.fill(mappedR, 255, mappedB);
      for (let i = 0; i < this.points.length; i++) {
        p.ellipse(this.points[i].x, this.points[i].y, 3);
      }

      p.filter(p.BLUR, blurV);
    }
  }
};

////////////////////////////////////////// Sketch Two: Tug Effect
var tugEffect = function(p) {
  let font;
  let txt;

  p.preload = function() {
    font = p.loadFont("Barriecito-Regular.ttf");
  }

  p.setup = function() {
    const myTugCanvas = p.createCanvas(600, 500);
    myTugCanvas.parent("tugCanvas");
    txt = new TugEffect("Tug", p.random(100, p.width - 200), p.random(100, p.height - 100));
  }

  p.draw = function() {
    p.clear();
    txt.update();
  }

  class TugEffect {
    constructor(txt, x, y) {
      this.txt = txt;
      this.x = x;
      this.y = y;

      this.speedX = p.random(3, 4);
      this.speedY = p.random(3, 4);

      if (p.random() > 0.5) this.speedX = -this.speedX;
      if (p.random() > 0.5) this.speedY = -this.speedY;

      this.generatePoints();
      this.isOutOfBound();
    }

    generatePoints() {
      this.points = font.textToPoints(this.txt, this.x, this.y, 150, {
        sampleFactor: 0.3,
      });

      this.originalX = this.points.map((p) => p.x);
      this.originalY = this.points.map((p) => p.y);

      this.tempX = [...this.originalX];
      this.tempY = [...this.originalY];
    }

    isOutOfBound() {
      if (
        this.x < 5 ||
        this.x > p.width - 230 ||
        this.y < 110 ||
        this.y > p.height - 25
      ) {
        return true;
      } else {
        return false;
      }
    }

    update() {
      if (p.mouseIsPressed && p.mouseX < p.width / 2 && p.mouseY < p.height / 2) {
        this.x -= p.abs(this.speedX);
        this.y -= p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x -= p.abs(this.speedX);
          this.y += p.abs(this.speedY);
        }
      } else if (p.mouseIsPressed && p.mouseX > p.width / 2 && p.mouseY < p.height / 2) {
        this.x += p.abs(this.speedX);
        this.y -= p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x -= p.abs(this.speedX);
          this.y += p.abs(this.speedY);
        }
      } else if (p.mouseIsPressed && p.mouseX < p.width / 2 && p.mouseY > p.height / 2) {
        this.x -= p.abs(this.speedX);
        this.y += p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x += p.abs(this.speedX);
          this.y -= p.abs(this.speedY);
        }
      } else if (p.mouseIsPressed && p.mouseX > p.width / 2 && p.mouseY > p.height / 2) {
        this.x += p.abs(this.speedX);
        this.y += p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x -= p.abs(this.speedX);
          this.y -= p.abs(this.speedY);
        }
      } else {
        this.x += this.speedX;
        this.y += this.speedY;
      }

      if (this.x < 5 || this.x > p.width - 230) this.speedX *= -1;
      if (this.y < 110 || this.y > p.height - 25) this.speedY *= -1;

      this.generatePoints();

      for (let i = 0; i < this.points.length; i++) {
        this.tempX[i] = this.originalX[i] + p.random(-2, 2);
        this.tempY[i] = this.originalY[i] + p.random(-2, 2);
      }

      if (p.mouseIsPressed) {
        p.stroke("blue");
        for (let i = 0; i < this.points.length; i++) {
          let point = this.points[i];
          let distance = p.dist(point.x, point.y, p.mouseX, p.mouseY);
          if (i % 2 === 0) {
            p.line(p.mouseX, p.mouseY, point.x, point.y);
          }
        }
        p.filter(p.BLUR, 0.4);
      }

      p.fill("red");
      p.noStroke();
      for (let i = 0; i < this.points.length; i++) {
        p.circle(this.tempX[i], this.tempY[i], 3);
      }
    }
  }
};


var myp5_1 = new p5(fatigueEffect);
var myp5_2 = new p5(tugEffect);