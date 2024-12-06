let Tuesday = "rgb(255,0,237)";
let Sunday = "blue";
let Monday = "red";
let Friday = "rgb(0,255,0)";

let segment =20;

let early = 20;
let okay = 60;
let late = 100;

function setup() {
  createCanvas(1280, 800);
  frameRate(5)
  noCursor();
  // noLoop();
}

function preload() {
  wallpaper = loadImage("wallpaper.jpg");
  folderIcon = loadImage("folderIcon.png");
  cursorIcon = loadImage("cursor.png");
}

function draw() {
  background(220);
  console.log("adjust the window to see full screen!!!");
  image(wallpaper,0,0,width,height,0,0,wallpaper.width,wallpaper.height,CONTAIN);
  cursor(cursorIcon, mouseX, mouseY);

  //note: myLine(x1, y1, x2, y2, segments, intensity,date)
//////////////////////////////////sunday
  myLine(70, 100, timeToPixel(0, 02,15), 100, segment, early, Sunday);
  myLine(70, 100, timeToPixel(0, 04,01),100+random(-100,100), segment, okay, Sunday);
  myLine(70, 100, timeToPixel(0,  06,18), 100+random(-100,100), segment, okay, Sunday);
//////////////////////////////////monday
  myLine(70, 300, timeToPixel(0, 18, 19), 300+random(-100,100), segment, okay, Monday);
  myLine(70, 300, timeToPixel(0, 14, 53), 300+random(-100,100), segment, late, Monday);
  myLine(70, 300, timeToPixel(0, 52, 10), 300+random(-100,100), segment, okay, Monday);
  myLine(70, 300, timeToPixel(1, 17, 0), 300+random(-100,100), segment, okay, Monday);
  myLine(70, 300, timeToPixel(0, 49, 58), 300+random(-100,100), segment, okay, Monday);
//////////////////////////////////tuesday
    myLine(70, 500, timeToPixel(0, 06,51), 500+random(-100,100), segment, early, Tuesday);
//////////////////////////////////friday
    myLine(70, 700, timeToPixel(0, 06,51), 700+random(-100,100), segment, late, Friday);
    myLine(70, 700, timeToPixel(01,01,21), 700+random(-100,100), segment, late, Friday);
//////////////////////////////////titles
  myText("Sunday",50,100)
  myText("Monday",50,300)
  myText("Tuesday",50,500)
  myText("Friday",50,700)
}

///modified from ChatGPT, mainly the part including lerp() function
function myLine(x1, y1, x2, y2, segments, intensity, date) {
  let prevX = x1 + random(-10, 10);
  let prevY = y1 + random(-10, 10);

  for (let i = 1; i <= segments; i++) {
    let t = map(i, 0, segments, 0, 1);
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);

    let shakeX = random(-5, 5);
    let shakeY = random(-intensity, intensity);

    stroke(date);
    strokeWeight(3);

    line(prevX, prevY, x + shakeX, y + shakeY);

    prevX = x + shakeX;
    prevY = y + shakeY;
  }
}
function timeToPixel(h, m, s) {
  return h * 1000 + (m / 60) * 1000 + s / 360 / 1000;
}
function myText(date,x,y){
  image(folderIcon,x+5,y-40,50,50);
  fill("yellow")
  strokeWeight(2)
  stroke("black")
  textAlign(LEFT)
  textSize(15)
  text(date,x,y+20)
}
