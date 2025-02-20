let font;

function preload() {
  font = loadFont("Fonts/LeagueScript-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);

  text1 = new FatigueEffect("Fatigue", width / 2 - 50, 150);
  text2 = new FatigueEffect("Fatigue", width / 2 - 50, 300);
  text3 = new FatigueEffect("Fatigue", width / 2 - 50, 450);
}

function draw() {
  background(0);

  text1.update1();
  text1.display();

  text2.update2();
  text2.display();

  text3.update3();
  text3.display();
}

class FatigueEffect {
  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.points = font.textToPoints(this.txt, this.x - 100, this.y, 100, {
      sampleFactor: 0.3,
    });
    this.originalX = [];
    this.originalY = [];
    ////the offsets are supposed to be inside the update3() to control indivisual partical movement but im too lazy to move it there
    this.offsetX = [];
    this.offsetY = [];

    for (let i = 0; i < this.points.length; i++) {
      this.originalX.push(this.points[i].x);
      this.originalY.push(this.points[i].y);
      
      this.offsetX.push(random(-10, 10))
      this.offsetY.push(random(-10, 10))
    }
  }

  update1() {
    ////wavy text based on sin function
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].y +=
        sin(frameCount * 0.1 + this.points[i].x * 0.01) * 0.4;
    }
  }

  update2() {
    //// i dont know why but the points are disintegrating thoughout time...
    //// this is not intentional but it adds to the theme so i didnt fix it
    ////i would love to know how to fix it though
    let speed = 0.5;
    let direction = 1;
    let range = 10;

    for (let i = 0; i < this.points.length; i++) {
    ////use of % to divide the shape of the text
      if (i % 2 == 0) {
        this.points[i].x += speed * direction;
      } else {
        this.points[i].x -= speed * direction;
      }

      if (this.points[i].x > this.originalX[i] + range) {
        direction = -1;
      } else if (this.points[i].x < this.originalX[i] - range) {
        direction = 1;
      }
    }
  }

  update3() {
    let mappedMouse = map(mouseX, 0, width, 0, 1);
    ////here i also navigated the extent of shake based on the mouseX position
    let randomValue = map(mouseX, 0, width, 3, 0.5);

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
    ////this combo makes the texts light up
    fill("yellow");
    stroke("white");
    strokeWeight(0.5);
    for (let i = 0; i < this.points.length; i++)
{
      ellipse(this.points[i].x,this.points[i].y, 3);
    }
  }
}
