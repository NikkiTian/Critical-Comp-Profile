let font;
let dragLineY;
let connections = [];

function preload() {
  font = loadFont("Creepster-Regular.ttf");
}

function setup() {
  createCanvas(600, 300);
  textAlign(CENTER, CENTER);
  
  ////initializing an invisible light to perform division
  dragLineY = height / 2;

  txt = new StrandedEffect("Stranded", width / 2 - 50, height / 2 + 20);
  txt.generateConnections();
}

function draw() {
  background(200);
  txt.update();
  txt.display();
}

function mouseWheel(event) {
  ////when the mouse scrolls the line moves accordingly. constrain this line so the points wont be ount of bound
  dragLineY += event.delta * 0.1;
  dragLineY = constrain(dragLineY, 50, height - 50);
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

  ////since i wanted to add more lines within the empty shape to create volume, i generated an array sorting random groups of points; which later been used in display() method
  generateConnections() {
    connections = [];
    for (let i = 0; i < this.points.length - 20; i += 5) {
      let p1 = this.points[i];
      let p2 = this.points[i + floor(random(1, 20))];
      connections.push([p1, p2]);
    }
  }

  update() {
    for (let i = 0; i < this.points.length - 1; i++) {
      let currentX = this.points[i].x;
      let currentY = this.points[i].y;
      let distance = dist(currentX, currentY, mouseX, mouseY);

      ////adding my old code that does the point escape from mouse thing
      if (distance < 50) {
        let angle = atan2(currentY - mouseY, currentX - mouseX);
        let escapeDistance = map(distance, 0, 50, 5, 0);
        currentX = lerp(currentX, currentX + cos(angle) * escapeDistance, 0.5);
        currentY = lerp(currentY, currentY + sin(angle) * escapeDistance, 0.5);
      } else {
        ////implementing the line into use - 
        let scaleY;
        if (this.originalY[i] < dragLineY) {
          // 点在 dragLineY 之上
          scaleY = map(this.originalY[i], 0, dragLineY, 0.5, 1);
        } else {
          // 点在 dragLineY 之下
          scaleY = map(this.originalY[i], dragLineY, height, 2, 1);
        }

        currentX = lerp(currentX, this.originalX[i], 0.05);
        currentY = lerp(currentY, this.originalY[i] * scaleY, 0.05);
      }

      this.points[i].x = currentX;
      this.points[i].y = currentY;
    }
  }

  display() {
    stroke(0);
    strokeWeight(1.5);

    ////connecting points with lines
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      line(p1.x, p1.y, p2.x, p2.y);
    }

    // 画随机生成的连线
    for (let i = 0; i < connections.length; i++) {
      let p1 = connections[i][0];
      let p2 = connections[i][1];
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}