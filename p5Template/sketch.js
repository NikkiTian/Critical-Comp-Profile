const level12 = "egg";
const level34 = "and";
const level5 = "milk";
const level6 = "for";
const level7 = "dinner";

let myFont;
function preload(){
  myFont = loadFont("Chakra_Petch/ChakraPetch-Regular.ttf");
}

function setup() {
  createCanvas(1200,800);
  background("yellow");
  fill("blue")
  noStroke();
  
  let sampleFactorf = 0.2
  let textSize = 120;
  let a=250;
  
  firstArray = myFont.textToPoints(level12, 40,200,textSize,{sampleFactor:sampleFactorf});
  secondArray = myFont.textToPoints(level34, 420,200,textSize,{sampleFactor:sampleFactorf});
  thirdArray = myFont.textToPoints(level5, 800,200,textSize,{sampleFactor:sampleFactorf});
  forthArray = myFont.textToPoints(level6, 40,500,textSize,{sampleFactor:sampleFactorf});
  fifthArray = myFont.textToPoints(level7, 40,700,textSize,{sampleFactor:sampleFactorf});

/////////////////////////////////////first word: egg
  for(let i=0;i<firstArray.length;i++){
    let shapeSize=5;

    fill(0,0,255,a)
    circle(firstArray[i].x,firstArray[i].y,shapeSize);

    a-=a/firstArray.length
  }
/////////////////////////////////////second word: aand
  for(let i=0;i<secondArray.length;i++){
  let shapeSize = map(secondArray[i].y, 40, 120, 2, 7)
  fill("blue")
  if(i<secondArray.length/2){
    fill("rgb(0,226,0)")
  }
  circle(secondArray[i].x,secondArray[i].y,shapeSize);
}
  
/////////////////////////////////////third word: milk
  for(let i=0;i<thirdArray.length;i++){
    let shapeSize =5;
    if(i%2==0){
      fill("blue");
    }
    else{
      fill("rgb(0,226,0)");
    }
    circle(thirdArray[i].x,thirdArray[i].y,shapeSize);
  }
}

  let t = 0;

  function draw() {
    fill("blue")
    push()
    fill("yellow")
    rect(0,300,600,300)
    pop()
    console.log(mouseX,mouseY)
/////////////////////////////////////forth word: for
  for(let i=0;i<forthArray.length;i++){
    let shapeSize =5;
    let offset = sin(t + i * 0.2)*2;
    
    circle(forthArray[i].x,forthArray[i].y+offset,shapeSize);
  }
    t += 0.05;
    
/////////////////////////////////////fifth word: dinner
  for(let i=0;i<fifthArray.length;i++){

    let posX = fifthArray[i].x;
    let posY = fifthArray[i].y;

    let distToMouse = dist(posX, posY, mouseX, mouseY);

    let shapeSize = map(distToMouse, 0,50, 10,3, true);
    
    circle(fifthArray[i].x,fifthArray[i].y,shapeSize);
  }
}