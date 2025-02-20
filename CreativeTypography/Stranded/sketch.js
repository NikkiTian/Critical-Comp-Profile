let font;

function preload() {
  font = loadFont("../Fonts/RubikBurned-Regular.ttf");
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);

  text1 = new FatigueEffect("Stranded", width / 2 - 150, 150);
  text2 = new FatigueEffect("Stranded", width / 2 - 150, 320);
  text3 = new FatigueEffect("Stranded", width / 2 - 150, 500);
}

function draw() {
  background("rgb(0,0,177)");

  text1.update1();
  text1.display();

  text2.update2();
  text2.display2();

  text3.update3();
  text3.display3();
}

class FatigueEffect {
  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.points = font.textToPoints(this.txt, this.x - 100, this.y, 100, {
      sampleFactor: 0.4,
    });
    this.pointsThree = font.textToPoints(this.txt, this.x - 100, this.y, 100, {
      sampleFactor: 0.2,
    });
    this.originalX = [];
    this.originalY = [];
    this.originalXNew = [];
    this.originalYNew = [];

    for (let i = 0; i < this.points.length; i++) {
      this.originalX.push(this.points[i].x);
      this.originalY.push(this.points[i].y);
    }

    ////adding the new original coordinate to suite my third character, since it has different sampleFactor
    for (let i = 0; i < this.pointsThree.length; i++) {
      this.originalXNew.push(this.pointsThree[i].x);
      this.originalYNew.push(this.pointsThree[i].y);
    }

    ////static random offset for update2()
    this.offsetX = random(-5, 5);
    this.offsetY = random(-5, 5);
  }

  update1() {
    ////rippling effect hinting *drowning*, *wave*, *breathing*
    ////it looks cool because of my font... the principle is pretty simple im adding a sin value here
    for (let i = 0; i < this.points.length; i++) {
      let wave = sin(frameCount * 0.1 + i * 0.5) * 2;
      this.points[i].y = this.originalY[i] + wave;
    }
  }

  update2() {
    ////creating a 3d-like rectangle stacks
    for (let i = 0; i < this.points.length; i++) {
      let xDist = this.points[i].x - width / 2;
      let yDist = this.points[i].y - height / 2;

      ////scalling blocks based on perspective
      let scale = map(
        dist(this.points[i].x, this.points[i].y, width / 2, height / 2),
        0,
        width / 2,
        1.5,
        0.5
      );

      fill("rgb(0,0,0)");
      stroke("blue");
      strokeWeight(0.3);

      ////stacking rectangles. i decided to stack 3 rectangles on each dots
      push();
      translate(this.points[i].x, this.points[i].y);
      for (let i = 0; i < 3; i++) {
        let size = scale * 5;
        rect(this.offsetX, this.offsetY, size, size * 5);
      }
      pop();
    }
  }

  update3() {
    for (let i = 0; i < this.pointsThree.length - 1; i++) {
      let currentX = this.pointsThree[i].x;
      let currentY = this.pointsThree[i].y;
      let nextX = this.pointsThree[i + 1].x;
      let nextY = this.pointsThree[i + 1].y;
      ///calculating the distance from mouse to point
      let distance = dist(currentX, currentY, mouseX, mouseY);
      
      //// connecting each point though lines. There are some lines out of place for the design of this font, but i think they look good on this
      push();
      stroke("rgb(0,255,223)");
      strokeWeight(2);
      line(currentX, currentY, nextX, nextY);
      pop();
      
      if (distance < 50) {
        ////use the angle to decide dots' moving direction... i appologize for using chatGPT for this but i really struggled a lot on using the math for this one
        let angle = atan2(currentY - mouseY, currentX - mouseX);

        ////the closer the point the more it moves
        let escapeDistance = map(distance, 0, 50, 5, 0);

        ////smoothly move the point away from the mouse using lerp, by incorporating sin and cos the dots will be able to animate NORMALLY
        currentX = lerp(currentX, currentX + cos(angle) * escapeDistance, 0.5);
        currentY = lerp(currentY, currentY + sin(angle) * escapeDistance, 0.5);
      } else {
        //// move back
        currentX = lerp(currentX, this.originalXNew[i], 0.05);
        currentY = lerp(currentY, this.originalYNew[i], 0.05);
      }
      ///updating the point position after movement
      this.pointsThree[i].x = currentX;
      this.pointsThree[i].y = currentY;
    }
  }

  display() {
    fill("rgb(0,255,223)");
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      rect(this.points[i].x, this.points[i].y, 3);
    }
  }

  display2() {
    fill("rgb(0,255,223)");
    noStroke();
    for (let i = 0; i < this.points.length; i++) {
      rect(this.points[i].x, this.points[i].y, 6, 2);
    }
  }

  ////added display3() since i have a differrent sample factor for the third iteration
  display3() {
    fill("rgb(0,255,223)");
    noStroke();
    // for (let i = 0; i < this.pointsThree.length; i++) {
    //   rect(this.pointsThree[i].x, this.pointsThree[i].y, 3);
    // }
  }
}
