function setup() {
  createCanvas(600, 600);
  frameRate(7);
  // noLoop();
}

function draw() {
  console.log(mouseX,mouseY);
  console.log("press 'r' to enter rage form, press other keys to exit");
  background(251,251,251);
  
  push()//////////////////////face
  let cx = mouseX;
  let cy = mouseY;
  let r = random(0,300)*(mouseX/300);
  let totalPoints = random(0,10)*(mouseX/300); 
  for (let i = 0; i < totalPoints; i++) {
    let angle1 = map(i, 0, totalPoints, 0, TWO_PI);
    
    let angle2 = map(i + 1, 0, totalPoints, 0, TWO_PI);
    
    let x1 = cx + r * cos(angle1);
    let y1 = cy + r * sin(angle1);
    
    let x2 = cx + r * cos(angle2);
    let y2 = cy + r * sin(angle2);
    
    if (mouseIsPressed){
    drawALine(x1, y1, x2, y2);
    }
  }
  pop()
  
  push();
  let mX, mY;
  mX = mouseX-60;
  mY = mouseY-60;
//////////////////////////////////left eyeball
  pupilX = map(mX,0,600,150,215,true);
  pupilY = map(mY,0,600,200,350,true);
  let totalPointsForEllipse = random(3,7);  // 总点数
  let a = 50;  // 椭圆的水平半径
  let b = 100; // 椭圆的垂直半径

  fill("white");
  blendMode(DIFFERENCE);
  noStroke();

  beginShape();
  for (let i = 0; i < totalPointsForEllipse; i++) {
    let angle = map(i, 0, totalPointsForEllipse, 0, TWO_PI);  // 当前点的角度

    // 计算每个点的坐标
    let x = pupilX + a * cos(angle);
    let y = pupilY + b * sin(angle);

    // 将点添加到形状中
    vertex(x, y);
  }
  endShape(CLOSE);
  
/////////////////////////////////////right eyeball
  pupilX = map(mX,0,600,300,425,true);
  pupilY = map(mY,0,600,200,350,true);

  beginShape();
  for (let i = 0; i < totalPointsForEllipse; i++) {
    let angle = map(i, 0, totalPointsForEllipse, 0, TWO_PI);  // 当前点的角度

    // 计算每个点的坐标
    let x = pupilX + a * cos(angle);
    let y = pupilY + b * sin(angle);

    // 将点添加到形状中
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function drawALine(x1,x2,y1,y2,){
    for(let i=0 ; i<100;i++){
    line(x1+random(-i*2,i*2),x2+random(-i*2,i*2),y1+random(-i*2,i*2),y2+random(-i*2,i*2));
    }   
}

function mouseDragged(){
    translate(mouseX,mouseY)  
  // redraw();
}

function keyPressed(){
  if(key==='r'){
    stroke(184, 0, 31)
  } else{
    stroke("black")
  }
}