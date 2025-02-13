let myFont;
let textPoints;

let myCustomPoints = [];

function preLoad(){
myFont = loadFont("../p5Template/Chakra_Petch/ChakraPetch-Regular.ttf")
}

function setup() {
createCanvas(400, 400);
noStroke()
textPoints = myFont.textToPoints("milk",20,140,140,{sampleFactor:0.2})
}

function draw() {
background(220);
for(let i=0;i<myCustomPoints.length;i++){
  myCustomPoints[i].update()
  myCustomPoints[i].display()
}
}

class CustomPoint{
constructor(posX,posY){
  this.r = random(0,100)
  this.g = random(100,200)
  this.b = random(0,100)
  
  this.a = 255

  this.x = posX
  this.y = posY
  
  this.size = 5;
  this.timer = 0;
  this.blink = random(0.5,255)
  
  this.on = true;
}

update(){
  this.timer+=deltaTime/1000;
  if(this.timer >= this.blink){
    fill(this.r,this.g,this.b)
    circle(this.x,this.y,this.size)
    this.timer=0
  }
}

display(){

}
}