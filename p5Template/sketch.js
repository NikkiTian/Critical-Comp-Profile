const ourWord = "the";
const ourSecondWord = "furk";

let myFont;
function preload(){
  myFont = loadFont("Chakra_Petch/ChakraPetch-Regular.ttf");
}
function setup() {
  createCanvas(400, 400).parent("my-sketch");
  background(50,255,0);
  noStroke();
  pointArray = myFont.textToPoints(ourWord, 20,150,135,{sampleFactor:0.2});
  secondArray = myFont.textToPoints(ourSecondWord, 20,300,135,{sampleFactor:0.2});
  for(let i=0;i<pointArray.length;i++){
    let size =7;
    if(pointArray[i].y<100){
      size=3;
    }
    if(i%2==0){
      fill("yellow");
    }
    else{
      fill("hotpink");
    }    
    square(pointArray[i].x,pointArray[i].y,size);
  }
  for(let i=0;i<secondArray.length;i++){
    let size =7;
    if(i<100){
      size=10;
    }
    if(i%2==0){
      fill("yellow");
    }
    else{
      fill("hotpink");
    }
    square(secondArray[i].x,secondArray[i].y,size);
  }
}
  
  function draw() {

    // circle(width/2, height/2, 100);
  }