////fatigue... a sense of vertigo
////added blur effect as wished
var fatigueEffect = function(p) {
  let font;
  let txt;

  p.preload = function() {
    font = p.loadFont("../Fonts/LeagueScript-Regular.ttf");
  }

  p.setup = function() {
    console.log("Setting up", p);
    const myFatigueCanvas = p.createCanvas(600, 300);
    myFatigueCanvas.parent("fatigueCanvas");
    myFatigueCanvas.position(p.windowWidth/2, 200);
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
      ////recording the original position of the points
      this.originalX = [];
      this.originalY = [];
      ////setting up random offsets for each points
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

      ////lerping the points to their original position based on mouse
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
      // Adjust the 'r' and 'b' value to change the color of the text
      let mappedR = p.map(p.mouseY, 0, p.height, 255, 0, true);
      let mappedB = p.map(p.mouseY, 0, p.height, 0, 255, true);
      let blurV = p.map(p.mouseY, 0, p.height, 0, 5, true);
    
      p.fill(mappedR, 255, mappedB);
      for (let i = 0; i < this.points.length; i++) {
        p.ellipse(this.points[i].x, this.points[i].y, 3);
      }
    
      p.filter(p.BLUR, blurV);
    }
    
  }
};

//////////////////////////////////////////sketch two: tugEffect//////////////////////////////////////////
var tugEffect = function(p) {
  let font;
  let txt;

  p.preload = function() {
    font = p.loadFont("../Fonts/Barriecito-Regular.ttf");
  }

  p.setup = function() {
    console.log("Setting up", p);
    const myTugCanvas = p.createCanvas(600, 450);
    myTugCanvas.parent("tugCanvas");
    myTugCanvas.position(p.windowWidth/2, 600);
    txt = new TugEffect("Tug", p.random(100, p.width - 200), p.random(100, p.height - 100));
  }

  p.draw = function() {
    p.clear();
    txt.update();
  }

  ////revision: changed 'hyper' into 'tug'
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

      ////recording the original position of the points
      this.originalX = [];
      this.originalY = [];
      for (let i = 0; i < this.points.length; i++) {
        this.originalX.push(this.points[i].x);
        this.originalY.push(this.points[i].y);
      }

      ////creating temporary array to store the points with random offsets
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
      ////points 'colliding' with the edges of the canvas as a whole

      ////left top
      if (p.mouseIsPressed && p.mouseX < p.width / 2 && p.mouseY < p.height / 2) {
        this.x -= p.abs(this.speedX);
        this.y -= p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x += p.abs(this.speedX);
          this.y += p.abs(this.speedY);
        }
      }
      
      ////right top
      else if (p.mouseIsPressed && p.mouseX > p.width / 2 && p.mouseY < p.height / 2) {
        this.x += p.abs(this.speedX);
        this.y -= p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x -= p.abs(this.speedX);
          this.y += p.abs(this.speedY);
        }
      }
      
      ////left bottom
      else if (p.mouseIsPressed && p.mouseX < p.width / 2 && p.mouseY > p.height / 2) {
        this.x -= p.abs(this.speedX);
        this.y += p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x += p.abs(this.speedX);
          this.y -= p.abs(this.speedY);
        }
      }
      
      ////right bottom
      else if (p.mouseIsPressed && p.mouseX > p.width / 2 && p.mouseY > p.height / 2) {
        this.x += p.abs(this.speedX);
        this.y += p.abs(this.speedY);
        if (this.isOutOfBound()) {
          this.x -= p.abs(this.speedX);
          this.y -= p.abs(this.speedY);
        }
      }
      
      ////return to normal collision mode when mouse is not pressed
      else {
        this.x += this.speedX;
        this.y += this.speedY;
      }

      ////bounce off the edges
      if (this.x < 5 || this.x > p.width - 230) this.speedX *= -1;
      if (this.y < 110 || this.y > p.height - 25) this.speedY *= -1;

      this.generatePoints();

      for (let i = 0; i < this.points.length; i++) {
        this.tempX[i] = this.originalX[i] + p.random(-2, 2);
        this.tempY[i] = this.originalY[i] + p.random(-2, 2);
      }

      ////draw lines when mouse is pressed
      if (p.mouseIsPressed) {
        p.stroke("yellow");
        for (let i = 0; i < this.points.length; i++) {
          let point = this.points[i];
          let distance = p.dist(point.x, point.y, p.mouseX, p.mouseY);
          if (i % 2 === 0) {
            p.line(p.mouseX, p.mouseY, point.x, point.y);
          }
        }
        p.filter(p.BLUR, 0.4);
      }

      ////draw the points
      p.fill("white");
      p.noStroke();
      for (let i = 0; i < this.points.length; i++) {
        p.circle(this.tempX[i], this.tempY[i], 3);
      }
    }
  }
};

var myp5_2 = new p5(tugEffect);
var myp5_1 = new p5(fatigueEffect);