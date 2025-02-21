function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(25, 221, 224);
  noStroke();
  console.log(mouseX, mouseY);

  //main body
  push();
  fill(0);
  rectMode(CENTER);
  rect(225, 315, 40, 60);
  pop();

  //right back leg
  push();
  fill(0);
  rectMode(CENTER);
  rect(340, 315, 40, 60);
  pop();

  //left back leg
  push();
  fill(255);
  rectMode(CENTER);
  rect(250, 270, 220, 100);
  pop();

  //face
  push();
  fill(0);
  ellipseMode(CENTER);
  ellipse(150, 160, 220);
  pop();

  //left brow
  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  curve(40, 200, 40, 85, 140, 85, 180, 200);
  pop();

  //right brow
  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  curve(170, 200, 170, 85, 270, 85, 310, 200);
  pop();

  //left glasses
  push();
  fill(255);
  rectMode(CENTER);
  rect(80, 151, 115, 70, 15);
  pop();

  //right glasses
  push();
  fill(255);
  rectMode(CENTER);
  rect(220, 151, 115, 70, 15);
  pop();

  //nose
  push();
  fill(255);
  triangle(120, 202, 150, 160, 180, 202);
  pop();

  //nostril
  push();
  fill(0);
  rectMode(CENTER);
  rect(150, 197, 35, 10);
  pop();

  //mouth
  push();
  fill(255);
  ellipseMode(CENTER);
  ellipse(150, 240, 90, 25);
  pop();

  //left front leg
  push();
  fill(0);
  rectMode(CENTER);
  rect(160, 315, 40, 60);
  pop();

  //right front leg
  push();
  fill(0);
  rectMode(CENTER);
  rect(280, 315, 40, 60);
  pop();

  //left eyelid1
  push();
  stroke(0);
  strokeWeight(3);
  line(60, 140, 115, 140);
  pop();

  //right eyelid1
  push();
  stroke(0);
  strokeWeight(3);
  line(185, 140, 240, 140);
  pop();

  //left eyelid2
  push();
  stroke(0);
  strokeWeight(3);
  line(60, 160, 115, 160);
  pop();

  //right eyelid2
  push();
  stroke(0);
  strokeWeight(3);
  line(185, 160, 240, 160);
  pop();

  //mouse translate
  let mX, mY;
  mX = mouseX - 60;
  mY = mouseY - 60;

  //left eyeball adv
  push();
  pupilX = map(mX, -200, 200, 82.5, 92.5, true);
  pupilY = map(mY, -200, 200, 145, 155, true);
  fill(0);
  circle(pupilX, pupilY, 30);
  pop();

  //right eyeball adv
  push();
  pupilX = map(mX, -200, 200, 205, 215, true);
  pupilY = map(mY, -200, 200, 145, 155, true);
  fill(0);
  circle(pupilX, pupilY, 30);
  pop();

  //tail
  push();
  fill(25, 221, 224);
  ellipseMode(CENTER);
  ellipse(350, 268, 40);
  pop();

  //tail center
  push();
  fill(0);
  ellipseMode(CENTER);
  ellipse(350, 268, 5);
  pop();

  //moving dot
  push();
  fill(0);
  stroke(25, 221, 224);
  strokeWeight(3);
  if (mouseX > 345 && mouseX < 355 && mouseY < 272 & mouseY > 263) {
    circle(350, 268, 40);
    console.log("love you, jimmy.");
    textFont("Courier New", 20);
    text("love you, jimmy.", 60, 380);
    noLoop();
  } else {
    circle(mouseX, mouseY, 40);
  }
  pop();
}
