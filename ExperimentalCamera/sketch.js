////code for ml5 function comes from https://docs.ml5js.org/#/reference/facemesh
////and https://learn.ml5js.org/docs/#/reference/handpose
let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };
let faces = [];

let handPose;
let hands = [];

let randomIndices = []; ////since i'm not displaying all the dots on the mesh, this array will help me to store random 50 points from the mesh
let randomTextIndex = []; ////within randomIndices[] i want to display keywords beside the random 3 indices
let words = [
  ["好色", "Lustful"], 
  ["贪财", "Greedy"],
  ["克夫", "Harmful to your husband"],
  ["口舌", "Quarrelsome"],
  ["小人", "Villain"],
  ["贫苦", "Poor"],
  ["自杀", "Suicide"],
  ["贱", "Vile"],
  ["桃花劫", "Love misfortune"],
  ["刀厄", "Knife danger"],
  ["破财", "Financial loss"],
  ["淫荡", "Slut"],
  ["牛马不如", "Worse than animals"],
  ["官司", "Lawsuit"],
  ["散家", "Family ruin"]
];////words are created in the form of 2d array so that the chinese could be displayed on the face
////and the english can be shown on hand accordingly.
let textColor = 0;

////parameters for the rectangle/frame part, rectTarget will later be initialized in setup()
let rectTarget;
let lerpSpeed = 0.05;
let lastX,
  lastY = 0;
let lastTime = 0;
let previousX=100
let previousY=100

////some parameters to be used in draw(), 
// randomTargetNumX seems to be VERY redundant
// but I was too late to realize and to make changes
let lastUpdateTime = 0;
let updateInterval = 2000;
let randomTargetNumA;
let randomTargetNumB;
let randomTargetNumC;
let randomTargetNumD;

let scaling = [];


function preload() {
  faceMesh = ml5.faceMesh(options);
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640*1.5, 480*1.5).parent('canvas-container');
  video = createCapture(VIDEO, { flipped: true });
  video.size(640*1.5, 480*1.5);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);

  ////randomly choose three words from the words list
  while (randomTextIndex.length < 3) {
    let index = Math.floor(Math.random() * words.length);
    if (!randomTextIndex.includes(index)) {
      randomTextIndex.push(index);
    }
  }

  rectMode(CENTER);

  randomTargetNumA = floor(random(0, 468));
  randomTargetNumB = floor(random(0, 468));
  randomTargetNumC = floor(random(0, 468));
  randomTargetNumD = floor(random(0, 468));

  for(let i=0; i<4; i++){
    scaling.push(random(-50,50));
  }
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];
    let keypoints = face.keypoints;

////refresh indices every 3 seconds
    if (millis() - lastUpdateTime >= updateInterval) {
      for (let i = 0; i < 4; i++) {
        let newIndex = floor(random(0, keypoints.length));
        if (i === 0) randomTargetNumA = newIndex;
        if (i === 1) randomTargetNumB = newIndex;
        if (i === 2) randomTargetNumC = newIndex;
        if (i === 3) randomTargetNumD = newIndex;
      }
      lastUpdateTime = millis();
    }

    ////drawing rectangles with randomSizeOffset
    for (let i = 0; i < 4; i++) {
      if (i === 0) drawFrame(randomTargetNumA, "rgb(0,255,0)", scaling[i]);
      if (i === 1) drawFrame(randomTargetNumB, "rgb(0,255,0)", scaling[i]);
      if (i === 2) drawFrame(randomTargetNumC, "rgb(0,255,0)", scaling[i]);
      if (i === 3) drawFrame(randomTargetNumD, "rgb(0,255,0)", scaling[i]);
    }

    ////draw lines connecting the center points of the rectangles
    drawConnectingLines(randomTargetNumA, randomTargetNumB, randomTargetNumC,randomTargetNumD);

    ////selecting '20' random indices as 'moles'
    if (randomIndices.length === 0) {////to avoid any further updates after initialization
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
      let faceKeypoint = keypoints[randomIndices[randomTextIndex[i]]];
      fill(textColor);
      drawVerticalText(words[randomTextIndex[i]][0], faceKeypoint.x - 7.5, faceKeypoint.y + 20);
  
      ////if hand is being detected, display the english result on the hand
      if (hands.length > 0) {
        let hand = hands[0];
        let handKeypoints = hand.keypoints;
  
        let handKeypoint = handKeypoints[9];
  
        push();
        stroke(0,0,255);
        strokeWeight(5);
        fill(200, 0, 0);
        // Rectangle background
        rect(width - handKeypoint.x, handKeypoint.y, 250, 100);
        pop();
        push();
        textSize(18);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        fill(0);
        let textOffset = 20;
        for (let j = 0; j < 3; j++) {
          ////Getting text individually
          let wordIndex = randomTextIndex[(i + j) % randomTextIndex.length];
          ////display english word on the second place of the array
          text(words[wordIndex][1], width - handKeypoint.x, handKeypoint.y - 40 + textOffset); 
          textOffset += 25;
        }
        pop();
      }
    }
  }
}

function drawFrame(index, colorr, scaling) {
  let face = faces[0];
  let keypoints = face.keypoints;

  let targetX = keypoints[index].x;
  let targetY = keypoints[index].y;

  ////calculate the width and height based on the change in position
  let rectWidth = abs(targetX - previousX)*0.5 + ((sin(millis() / 700)) * scaling);
  let rectHeight = abs(targetY - previousY)*0.5 + ((sin(millis() / 700)) * scaling);

  ////lerp to make animation smoother
  rectWidth = lerp(rectWidth, abs(targetX - lastX)*0.5 + ((sin(millis() / 700)) * scaling), lerpSpeed);
  rectHeight = lerp(rectHeight, abs(targetY - lastY)*0.5 - ((sin(millis() / 700)) * scaling), lerpSpeed);

  ////draw
  push();
  noFill();
  stroke(colorr);
  strokeWeight(2);
  rect(targetX, targetY, rectWidth*0.3, rectHeight*0.3);
  pop();

  ////update position
  lastX = targetX;
  lastY = targetY;
}

function drawConnectingLines(indexA, indexB, indexC, indexD) {
  let face = faces[0];
  let keypoints = face.keypoints;

      // Randomly select indices and draw lines
      let indices = [indexA, indexB, indexC, indexD];
  
      let pointA = keypoints[indices[0]];
      let pointB = keypoints[indices[1]];
      let pointC = keypoints[indices[2]];
      let pointD = keypoints[indices[3]];
  
      push();
      stroke("rgb(0,255,0)");
      strokeWeight(2);
      line(pointA.x, pointA.y, pointB.x, pointB.y);
      line(pointB.x, pointB.y, pointC.x, pointC.y);
      line(pointC.x, pointC.y, pointD.x, pointD.y);
      pop()

  if (hands.length > 0) { // Check if there is at least one hand
    let hand = hands[0];
    let handKeypoints = hand.keypoints;
    let resultBox = handKeypoints[9]; // Hand keypoint

    push();
    stroke("rgb(0,255,0)");
    strokeWeight(2);
    line(pointD.x, pointD.y, width-resultBox.x, resultBox.y); // Line to hand keypoint
    pop();
  }
}

function drawVerticalText(txt, x, y) {
  for (let i = 0; i < txt.length; i++) {
    fill(0);
    textStyle(BOLD);
    textSize(15);
    text(txt[i], x, y + i * 12);
  }
}

function gotFaces(results) {
  faces = results;
}

function gotHands(results) {
  hands = results;
}

function keyPressed(){
  if (key === ' ') { 
    location.reload(); ////reset the sketch when space is pressed
  }
}