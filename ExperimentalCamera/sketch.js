////code for ml5 function comes from https://docs.ml5js.org/#/reference/facemesh
let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };
let faces = [];

let randomIndices = []; ////since i'm not displaying all the dots on the mesh, this array will help me to store random 50 points from the mesh
let randomTextIndex = []; ////within randomIndices[] i want to display keywords beside the random 3 indices
let words = [
  "好色", // Lustful
  "贪财", // Greedy
  "克夫", // Harmful to husbands
  "口舌", // Quarrelsome
  "小人", // Villain
  "贫苦", // Poor
  "自杀", // Suicide
  "贱", // Vile
  "桃花劫", // Love misfortune
  "刀厄", // Knife danger
  "破财", // Financial loss
  "淫荡", // Lewd
  "牛马不如", // Worse than animals
  "官司", // Lawsuit
  "散家", // Family ruin
];
let textColor = 0;

////parameters for the rectangle/frame part, rectTarget will later be initialized in setup()
let rectTarget;
let lerpSpeed = 0.05;
let lastX,
  lastY = 0;
let lastTime = 0;
let previousX=100
let previousY=100

////some parameters to be used in draw()
let lastUpdateTime = 0;
let updateInterval = 500;
let randomTargetNumA;
let randomTargetNumB;
let randomTargetNumC;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640*1.5, 480*1.5).parent('canvas-container');
  video = createCapture(VIDEO, { flipped: true });
  video.size(640*1.5, 480*1.5);
  video.hide();
  faceMesh.detectStart(video, gotFaces);

  ////randomly choose three words from the words list
  while (randomTextIndex.length < 3) {
    let index = Math.floor(Math.random() * words.length);
    if (!randomTextIndex.includes(index)) {
      randomTextIndex.push(index);
    }
  }

  rectTarget = createVector(random(0, 468), random(0, 468));
  randomTargetNumA = floor(random(0, 468));
  randomTargetNumB = floor(random(0, 468));
  randomTargetNumC = floor(random(0, 468));
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];
    let keypoints = face.keypoints;

////refresh indices every 3 seconds
    if (millis() - lastUpdateTime >= updateInterval) {
      for (let i = 0; i < 3; i++) {
        let newIndex = floor(random(0, keypoints.length));
        if (i === 0) randomTargetNumA = newIndex;
        if (i === 1) randomTargetNumB = newIndex;
        if (i === 2) randomTargetNumC = newIndex;
      }
      lastUpdateTime = millis();
    }

    ////drawing rectangles
    drawFrame(randomTargetNumA, "rgb(0,255,0)");
    drawFrame(randomTargetNumB, "rgb(0,255,0)");
    drawFrame(randomTargetNumC, "rgb(0,255,0)");

    ////selecting '20' random indices as 'moles'
    if (randomIndices.length === 0) {////to avoid any further updates
      for (let i = 0; i < 20; i++) {
        randomIndices.push(Math.floor(Math.random() * keypoints.length));
      }
    }
    for (let i = 0; i < randomIndices.length; i++) {
      let keypoint = keypoints[randomIndices[i]];

      ////changing color based on whether or not it's 'mole'; because of the algorithm, sometimes the regular dots will cover the key dots... wonder how i can fix it
      if (randomTextIndex.includes(i)) {////a much simpler way for me to write in nested for loops
        stroke("red");
        fill(textColor);
        circle(keypoint.x, keypoint.y, 10);
      } else {
        push();
        noStroke();
        fill(0, 0, 255);
        circle(keypoint.x, keypoint.y, 5);
        pop();
      }
    }

    ////text display
    for (let i = 0; i < randomTextIndex.length; i++) {
      let keypoint = keypoints[randomIndices[randomTextIndex[i]]];
      fill(textColor);
      drawVerticalText(
        words[randomTextIndex[i]],
        keypoint.x - 7.5,
        keypoint.y + 20
      );
    }
  }
}

function drawFrame(index, colorr) {
  let face = faces[0];

  let keypoints = face.keypoints;
  let targetX = keypoints[index].x;
  let targetY = keypoints[index].y;

  ////calculate the width and height based on the change in position
  let rectWidth = abs(targetX - previousX)-300;
  let rectHeight = abs(targetY - previousY)-300;

  ////lerp to make animation smoother
  rectWidth = lerp(rectWidth, abs(targetX - lastX)-300, lerpSpeed);
  rectHeight = lerp(rectHeight, abs(targetY - lastY)-300, lerpSpeed);

  ////draw
  push();
  noFill();
  stroke(colorr);
  strokeWeight(2);
  rectMode(CENTER);
  rect(targetX, targetY, rectWidth, rectHeight);
  pop();

  ////update position
  lastX = targetX;
  lastY = targetY;
}

function drawVerticalText(txt, x, y) {
  for (let i = 0; i < txt.length; i++) {
    fill(0);
    textSize(15);
    text(txt[i], x, y + i * 12);
  }
}

function gotFaces(results) {
  faces = results;
}

function keyPressed(){
  if (key === ' ') { 
    location.reload(); ////reset the sketch when space is pressed
  }
}