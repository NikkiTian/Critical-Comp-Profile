function setup() {
  createCanvas(800,800);
  angleMode(DEGREES);
}

function milkBox(){
  push();
  noStroke();
  fill(142, 161, 56)////main
    beginShape();
      vertex(205,290)
      vertex(278,312)
      vertex(278,500);
      vertex(205,468)
    endShape(CLOSE);
  pop();
  
  push();////cover right
  noStroke();
  fill(174, 227, 68)
    beginShape();
      vertex(278,312)
      vertex(365,287);
      vertex(365,468);
      vertex(278,500);
    endShape(CLOSE);
  pop();
  
  push();
  noStroke();
  fill(250, 214, 70);//light face on top right
    beginShape();
      vertex(278,312)
      vertex(323,262)
      vertex(365,287);
    endShape(CLOSE);
  pop();
  
  push();
  noStroke();
  fill(247, 233, 25);//light face on top left
    beginShape();
      vertex(205,290);
      vertex(255,245);
      vertex(323,262);
      vertex(278,312)
    endShape(CLOSE);
  pop();
  
  
  push();//inner platform on top
  noStroke();
  fill(105, 100, 10);
    beginShape();
      vertex(278,312)
      vertex(365,287);
      vertex(313,273)
    endShape(CLOSE);
  pop();
  
  push();//lid
  noStroke();
  fill(105, 15, 66);
    ellipse(262,277,25,18);
  fill(240, 19, 152);
    ellipse(259,273,25,18);
  pop();
  
  push();//handle???
  noStroke();
  fill(242, 162, 24)
    beginShape();
      vertex(255,245);
      vertex(323,262);
      vertex(323,237);
      vertex(255,223)
    endShape(CLOSE);
  pop();
  /////text
  push()
  fill(240, 19, 152);
  textAlign(CENTER, CENTER);
  textSize(25);
  textFont("Cooper")
  rotate(18)
  text("Milk",348,282)
  pop()
  push()
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(25);
  textFont("Cooper")
  rotate(18)
  text("Milk",344,280)
  pop()
}
function cup(){
  push();
  noStroke()  
  push();
    noStroke();
    fill(194, 147, 181)
    beginShape();
      curveVertex(418,479);
      curveVertex(505,465);
      curveVertex(525,495);
      curveVertex(505,523);
      curveVertex(418,555);
    endShape(CLOSE);
  
  pop();
    fill(158, 30, 92)
  translate(79,-25);
  ellipse(419,519,55,60)
  pop();
  
  push();
  noStroke()
  fill("pink")
  ellipse(419,519,65,80)
  pop();
}
function spilledWater(){
  push()
    noStroke()
    fill(120,251,207,200)
    beginShape();
      curveVertex(389,535)
      curveVertex(476,511)
      curveVertex(511,520);
      curveVertex(435,555)
      curveVertex(413,558)
      curveVertex(394,548)
    endShape(CLOSE);
  pop()
  
  push()
  noStroke()
  fill(120,251,207,200)
  beginShape();
    curveVertex(476,511);
    curveVertex(511,520);
    curveVertex(443,548);
    curveVertex(450,540);
    curveVertex(430,570);
    curveVertex(446,590);
    curveVertex(420,623)
    curveVertex(430,666)
    curveVertex(429,712)
    curveVertex(390,780)
    curveVertex(351,680)
    curveVertex(335,650);
    curveVertex(325,610);
    curveVertex(300,590);
    curveVertex(343,569);
    curveVertex(389,535);
  endShape(CLOSE);
  pop()
}

///////////////////////////////////////////////////////////////////////////
function draw() {
  console.log(mouseX,mouseY);
  background(251,251,251,0);
  translate(0,-100)
////////BG
  push();
    strokeWeight(3);
    fill("white")
    rect(125,125,550)
  pop();
  
////////table
// push()
//   strokeWeight(3)
//   line(125,420,673,420)
// pop()
push()
    noStroke()
    fill(255, 235, 122)
    rect(127,420,546.5,170)
pop()
  
push()
    noStroke()
    fill(4245, 203, 78)
    rect(126,590,548,84)
pop()
///////drawing assets
  push()
  translate(30,0)
    push()
    translate(30,55);
    milkBox();
    pop()  
    cup();
    spilledWater();
    push();
    noStroke()
  blendMode(EXCLUSION)
    fill(255,255,255,180)
    ellipse(419,519,65,80)
    pop();
  pop();
}
