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
    myFatigueCanvas.position(p.windowWidth / 2, 200);
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

////////////////////////////////////////// sketch two: TUG
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
    myTugCanvas.position(p.windowWidth / 2, 600);
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
          this.x += p.abs(this.speedX);
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
        p.stroke("yellow");
        for (let i = 0; i < this.points.length; i++) {
          let point = this.points[i];
          // let distance = p.dist(point.x, point.y, p.mouseX, p.mouseY);
          if (i % 2 === 0) {
            p.line(p.mouseX, p.mouseY, point.x, point.y);
          }
        }
        p.filter(p.BLUR, 0.4);
      }

      p.fill("white");
      p.noStroke();
      for (let i = 0; i < this.points.length; i++) {
        p.circle(this.tempX[i], this.tempY[i], 3);
      }
    }
  }
};

////////////////////////////////////////// sketch three: STRANDED
var strandedEffect = function(p) {
  let font;
  let dragLineY;
  let connections = [];

  p.preload = function() {
    font = p.loadFont("../Fonts/Creepster-Regular.ttf");
  }

  p.setup = function() {
    const myStrandedCanvas = p.createCanvas(600, 300);
    myStrandedCanvas.parent("strandedCanvas");
    myStrandedCanvas.position(p.windowWidth / 2, 800);
    p.textAlign(p.CENTER, p.CENTER);
    
    dragLineY = p.height / 2;

    txt = new StrandedEffect("Stranded", p.width / 2 - 50, p.height / 2 + 20);
    txt.generateConnections();
  }

  p.draw = function() {
    p.clear();
    txt.update();
    txt.display();
  }

  p.mouseWheel = function(event) {
      ////when the mouse scrolls the line moves accordingly. constrain this line so the points wont be ount of bound
    dragLineY += event.delta * 0.1;
    dragLineY = p.constrain(dragLineY, 50, p.height - 50);
  }

  class StrandedEffect {
    constructor(txt, x, y) {
      this.txt = txt;
      this.x = x;
      this.y = y;
      this.points = font.textToPoints(this.txt, this.x - 150, this.y, 130, {
        sampleFactor: 0.2,
      });

      this.originalX = [];
      this.originalY = [];

      for (let i = 0; i < this.points.length; i++) {
        this.originalX.push(this.points[i].x);
        this.originalY.push(this.points[i].y);
      }
    }

  ////since i wanted to add more lines within the empty shape to create volume, i generated
  // an array sorting random groups of points; which later been used in display() method
    generateConnections() {
      connections = [];
      for (let i = 0; i < this.points.length - 20; i += 5) {
        let p1 = this.points[i];
        let p2 = this.points[i + Math.floor(p.random(1, 20))];
        connections.push([p1, p2]);
      }
    }

    update() {
      for (let i = 0; i < this.points.length - 1; i++) {
        let currentX = this.points[i].x;
        let currentY = this.points[i].y;
        let distance = p.dist(currentX, currentY, p.mouseX, p.mouseY);

        ////adding some of my old code that does the point escape from mouse thing
        if (distance < 50) {
          let angle = p.atan2(currentY - p.mouseY, currentX - p.mouseX);
          let escapeDistance = p.map(distance, 0, 50, 5, 0);
          currentX = p.lerp(currentX, currentX + p.cos(angle) * escapeDistance, 0.1);
          currentY = p.lerp(currentY, currentY + p.sin(angle) * escapeDistance, 0.1);
        }else {
          ////implementing the line into use - 
          let scaleY;
          if (this.originalY[i] < dragLineY) {
            // when the point is above dragLineY
            scaleY = p.map(this.originalY[i], 0, dragLineY, 0.5, 1);
          } else {
            //when the point is below dragLineY
            scaleY = p.map(this.originalY[i], dragLineY, height, 2, 1);
          }
  
          currentX = p.lerp(currentX, this.originalX[i], 0.05);
          currentY = p.lerp(currentY, this.originalY[i] * scaleY, 0.05);
        }

        this.points[i].x = currentX;
        this.points[i].y = currentY;
      }

      this.generateConnections();
    }

    display() {
      p.stroke(0);
      p.strokeWeight(1.5);

      ////connecting points with lines
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      p.line(p1.x, p1.y, p2.x, p2.y);
    }

    // draw random lines at once
    for (let i = 0; i < connections.length; i++) {
      let p1 = connections[i][0];
      let p2 = connections[i][1];
      p.line(p1.x, p1.y, p2.x, p2.y);
    }
  }
};

var canvas1 = new p5(fatigueEffect, "fatigueEffect");
var canvas2 = new p5(tugEffect, "tugEffect");
var canvas3 = new p5(strandedEffect, "strandedEffect");