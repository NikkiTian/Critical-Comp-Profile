let timer = 0;
let visibleTime = 0;
randomColors = ['#ffa8cc', '#5cfaff', '#9dff00'];
let textX, textY;

function setup() {
  createCanvas(600, 600);
  background(25);
  textX = round(random(0, 600));
  textY = round(random(0, 600));
  
  noStroke();
  fill(random(randomColors));
  textFont('Courier New');
  textSize(random(20,50));
  textAlign(CENTER, CENTER);
  text(visibleTime, textX,textY);
}

function draw() {
  timer+=deltaTime;
  console.log(" location: "+textX,textY+" time: "+ visibleTime + " mouse: " + mouseX,mouseY);
  
  if(timer>1000){
    timer=0;
    visibleTime+=1;
  }
  
  if (isMouseOverText(textX,textY,visibleTime)) {
    console.log("true");
    // background("white")
    textX = round(random(0, 600));
    textY = round(random(0, 600));
    
    push()
    stroke("yellow")
    line(mouseX,mouseY,textX,textY);
    pop()
    
    fill(random(randomColors)); 
    textSize(random(20,50));
    text(visibleTime, textX,textY);
  }
  
  function isMouseOverText(x, y, str) {/////this function is written by GPT since I cannot calculate the collosion part
  let textWidthVal = textWidth(str);
  let textHeightVal = textAscent() + textDescent();
  return mouseX > x - textWidthVal / 2 && mouseX < x + textWidthVal / 2 &&
         mouseY > y - textHeightVal / 2 && mouseY < y + textHeightVal / 2;
}
}