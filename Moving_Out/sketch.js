let sceneNum = 0;
let introTextSeq = 0;
let dollTextSeq = 0;
let score = 0;
let xSpeed = 2;
let spacebarPressed = false;
let hoopGameInst;
let state = 0;
let isHoopWin = false; ///////also determines whether doll can be fixed
let targetZonesPerLevel = [
  [
    [150, 180],
    [243, 323],
    [379, 414],
  ],
  [
    [209, 250],
    [356, 414],
  ],
  [
    [194, 216],
    [305, 352],
    [425, 440],
  ],
  [
    [225, 244],
    [443, 468],
    [179, 191],
  ],
  [[238, 255]],
];

function preload() {
  bg = loadSound("bgm.mp3");
  downstairsImg = loadImage("SceneOne_Downstairs/downstairs.jpg");
  bedroomImg = loadImage("SceneTwo_Bedroom/bedroom.jpg");
  tree = loadImage("SceneTwo_Bedroom/fortuneTree.jpg");
  deskView = loadImage("SceneThree_Desk/desk.jpg");
  bedroom_doll_unfixed = loadImage("SceneTwo_Bedroom/doll_broken.png");
  bedroom_doll_fixed = loadImage("SceneTwo_Bedroom/doll.png");
  wallpaper = loadImage("SceneThree_Desk/wallpaper.jpg");
  error = loadImage("SceneThree_Desk/errorMes.png");
  mineIcon = loadImage("SceneThree_Desk/minesweeperIcon.png");
  threadBoxClosed = loadImage("SceneThree_Desk/box_closed.png");
  threadBoxOpened = loadImage("SceneThree_Desk/box_opened.png");
  mainImage = loadImage("hoopGameAsset/hoopGame_defalt.png");
  hoop1Image = loadImage("hoopGameAsset/hoop1.png");
  hoop2Image = loadImage("hoopGameAsset/hoop2.png");
  hoop3Image = loadImage("hoopGameAsset/hoop3.png");
  hoop4Image = loadImage("hoopGameAsset/hoop4.png");
  hoop5Image = loadImage("hoopGameAsset/hoop5.png");
  hoop1_fImage = loadImage("hoopGameAsset/hoop1_f.png");
  hoop2_fImage = loadImage("hoopGameAsset/hoop2_f.png");
  hoop3_fImage = loadImage("hoopGameAsset/hoop3_f.png");
  hoop4_fImage = loadImage("hoopGameAsset/hoop4_f.png");
  hoop5_fImage = loadImage("hoopGameAsset/hoop5_f.png");
  level1Image = loadImage("hoopGameAsset/level1.png");
  level2Image = loadImage("hoopGameAsset/level2.png");
  level3Image = loadImage("hoopGameAsset/level3.png");
  level4Image = loadImage("hoopGameAsset/level4.png");
  level5Image = loadImage("hoopGameAsset/level5.png");
  fishImage = loadImage("hoopGameAsset/fish.png");
  thread = loadImage("hoopGameAsset/threadIcon.png");
}

function setup() {
  createCanvas(600, 600);
  background("#0000FF");
  bg.loop();
  // hoopGameInst = new Hoop();
  //this part is to make sure when you exit the minesweeper you come back to the same scene
  // const savedSceneNum = localStorage.getItem("sceneNum");
  // //console.log("Stored sceneNum:", savedSceneNum);
  // if (savedSceneNum !== null) {
  //   sceneNum = 3;
  // }
  localStorage.removeItem("sceneNum");

  hoop1 = new Hoop(hoop1Image, hoop1_fImage, true, 1, 1);
  hoop2 = new Hoop(hoop2Image, hoop2_fImage, false, 2, 1);
  hoop3 = new Hoop(hoop3Image, hoop3_fImage, true, 3, 2);
  hoop4 = new Hoop(hoop4Image, hoop4_fImage, false, 4, 2);
  hoop5 = new Hoop(hoop5Image, hoop5_fImage, true, 5, 3);
  fish = new Fish(fishImage);
  fish.initializePosition(random(200, 400), 407);
}

function draw() {
  // console.log(mouseX, mouseY);
  switch (sceneNum) {
    case 0:
      downstairs();
      break;
    case 1:
      bedroom();
      break;
    case 2:
      biggerDoll();
      break;
    case 3:
      desk();
      break;
    case 4:
      computer();
      break;
    case 5:
      minesweeper();
      break;
    case 6:
      fortuneTree();
      break;
    case 7:
      hoopGame_main();
      break;
    case 8:
      hoopGame_1();
      break;
    case 9:
      hoopGame_2();
      break;
    case 10:
      hoopGame_3();
      break;
    case 11:
      hoopGame_4();
      break;
    case 12:
      hoopGame_final();
      break;
    case 13:
      threadBox();
      break;
    case 14:
      ending();
      break;
  }
  spacebarPressed = false;
}

function downstairs() {
  image(downstairsImg, 0, 0, width, height);
  push();
  textAlign(CENTER);
  stroke("blue");
  strokeWeight(5);
  textSize(18);
  fill("yellow");
  let welcome = [
    "It is my first time coming back here in five years.",
    "Can't believe my mom signed the contract.",
    "Well...",
    "I might as well take one last look of my room before the guy in suit turn it into a loving fake apartment building.",
  ];

  if (introTextSeq < welcome.length) {
    text(welcome[introTextSeq], width / 4, height / 2, 300);
  } else {
    sceneNum++;
  }
  pop();
}

function bedroom() {
  image(bedroomImg, 0, 0, width, height);
  click(0, 192, 100, 520, 3); /////desk
  click(223, 355, 262, 395, 2); //////doll
  click(504, 260, 573, 323, 6); //////tree
  if (isHoopWin) {
    image(thread, 450, 490, 136, 99);
  }
}
function fortuneTree() {
  image(tree, 0, 0, 600, 600);
  if (isHoopWin) {
    image(thread, 450, 490, 136, 99);
  }
  push();
  stroke("blue");
  strokeWeight(5);
  textSize(15);
  // textAlign(CENTER);
  fill("yellow");
  text(
    "This was a gift from my cousin's wedding. Since then, it's just been sitting here, and I've never really paid much attention to it. But somehow, it never seems to wither. (press SPACE)",
    30,
    520,
    550
  );
  if (keyIsPressed) {
    if (keyCode === 32) {
      sceneNum = 1;
    }
  }
  pop();
}
function biggerDoll() {
  image(bedroomImg, 0, 0, width, height);
  if (!isHoopWin) {
    push();
    imageMode(CENTER);
    image(bedroom_doll_unfixed, 300, 300, 369, 600);
    pop();
    push();
    stroke("blue");
    strokeWeight(5);
    textSize(15);
    textAlign(CENTER);
    fill("white");
    text("Press SPACE to exit", width / 2, 550);
    pop();
    if (keyIsPressed) {
      if (keyCode === 32) {
        sceneNum = 1;
      }
    }
  }
  if (isHoopWin) {
    // image(bedroomImg, 0, 0, width, height);
    push();
    imageMode(CENTER);
    image(bedroom_doll_fixed, 300, 300, 600, 986);
    pop();
    push();
    textAlign(CENTER);
    stroke("blue");
    strokeWeight(5);
    textSize(20);
    fill("yellow");
    let dollWords = [
      "     ",
      "You see.",
      "I have always been here for the past five years.",
      "No one ever tried to notice me",
      "All I saw is your mom walking around packing things and leaving",
      " Thank you for noticing me.",
      " ",
      "不要忘记我。",
    ];
    if (dollTextSeq < dollWords.length) {
      text("CJ7:  " + dollWords[dollTextSeq], width / 4, height / 2, 300);
    } else {
      sceneNum = 14;
    }
    pop();
  }
}

function desk() {
  image(deskView, 0, 0, width, height);
  if (isHoopWin) {
    image(thread, 450, 490, 136, 99);
  }
  click(337, 103, 531, 279, 4); ////i think this this computer
  click(0, 550, 80, 600, 1); ////back arrow
  if (
    mouseX <= 288 &&
    mouseX >= 132 &&
    mouseY <= 456 &&
    mouseY >= 380 &&
    mouseIsPressed
  ) {
    if (!isHoopWin) {
      sceneNum = 7;
    } else {
      push();
      textAlign(CENTER);
      stroke("blue");
      strokeWeight(5);
      textSize(15);
      fill("yellow");
      text(
        "My sister wants to play it and she took it.",
        mouseX + 20,
        mouseY + 20,
        300
      );
      pop();
    }
  }
}

function computer() {
  let boxWidth = textWidth("Press M to play") + 20;
  image(wallpaper, 0, 0, width, height);
  push();
  rect(550, 560, 20, 20);
  fill("blue");
  stroke("black");
  pop();
  click(550, 560, 570, 580, 3);
  push();
  image(mineIcon, 41, 62, 50, 50);
  fill("black");
  textSize(10);
  stroke("white");
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text("minesweeper", 66, 125);
  pop();
  if (mouseX <= 91 && mouseX >= 41 && mouseY <= 112 && mouseY >= 62) {
    push();
    translate(20, 20);
    fill("blue");
    stroke("black");
    rect(mouseX, mouseY, boxWidth, 35);
    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(15);
    text("Press M to play", mouseX + boxWidth / 2, mouseY + 15);
    pop();
  }
  if (keyIsPressed) {
    if (key === "m") {
      push();
      imageMode(CENTER);
      image(error, width / 2, height / 2);
      pop();
      //this is to store the scene right before you leave for minesweeper
      // localStorage.setItem("sceneNum", sceneNum);
      // window.location.href = "minesweeper.html";
      console.log("https://editor.p5js.org/nikkitian/sketches/-1DllTXpM");
    }
  }
}
function hoopGame_main() {
  image(mainImage, 0, 150, 600, 316);
  push();
  textAlign(CENTER);
  stroke("blue");
  strokeWeight(5);
  textSize(15);
  fill("yellow");
  text("press SPACE to play", width / 2, 580);
  pop();
  if (keyIsPressed && keyCode === 32 && sceneNum === 7) {
    sceneNum++;
  }
}
function hoopGame_1() {
  image(level1Image, 0, 150, 600, 316);

  hoop1.display();
  hoop2.display();
  hoop3.display();
  hoop4.display();
  hoop5.display();
  fish.display();
  fish.updatePosition();
}
function hoopGame_2() {
  image(level2Image, 0, 150, 600, 316);
  hoop1.display();
  hoop2.display();
  hoop3.display();
  hoop4.display();
  hoop5.display();
  fish.display();
  fish.updatePosition();
}
function hoopGame_3() {
  image(level3Image, 0, 150, 600, 316);
  hoop1.display();
  hoop2.display();
  hoop3.display();
  hoop4.display();
  hoop5.display();
  fish.display();
  fish.updatePosition();
}
function hoopGame_4() {
  image(level4Image, 0, 150, 600, 316);
  hoop1.display();
  hoop2.display();
  hoop3.display();
  hoop4.display();
  hoop5.display();
  fish.display();
  fish.updatePosition();
}

function hoopGame_final() {
  image(level5Image, 0, 150, 600, 316);
  hoop1.display();
  hoop2.display();
  hoop3.display();
  hoop4.display();
  hoop5.display();
  fish.display();
  fish.updatePosition();
  isHoopWin = true;
  // if(isHoopWin&&mouseIsPressed){
  //   sceneNum=13
  // }
  // if (this.score === 3) {
  //   image(thread, width / 2, height / 2);
  //   showText("Looks like you got something.", width / 2, 580);
  //   isHoopWin = true;
  //   sceneNum = 4;
  // } else {
  //   isHoopWin = false;
  // }
}
function threadBox() {
  let showImage;
  image(deskView, 0, 0, width, height);
  push();
  imageMode(CENTER);
  showImage = image(threadBoxClosed, width / 2, height / 2, 590, 566);
  if (mouseIsPressed) {
    showImage = image(threadBoxOpened, width / 2, height / 2, 553, 569);
    showText(
      "You found a cookie box full of threads in the dust.",
      0,
      470,
      580
    );
    showText("Press 'f' to go back to my room", 0, 500, 580);
  }
  if (keyIsPressed && keyCode == 70) {
    sceneNum = 1;
  }
  pop();
}
function ending() {
  fill("black");
  rect(0, 0, 600, 600);
  showText("'SPACE'", 0, 580, 600);
  if (keyIsPressed) {
    if (keyCode === 32) {
      sceneNum = 0;
      introTextSeq = 0;
      dollTextSeq = 0;
      isHoopWin = false;
    }
  }
}
function mousePressed() {
  if (sceneNum === 0) {
    let welcome = [
      "It is my first time coming back here in five years.",
      "Can't believe my mom signed the contract.",
      "Well...",
      "I might as well take one last look of my room before the guy in suit turn it into a loving fake apartment building.",
    ];
    if (introTextSeq < welcome.length) {
      image(downstairsImg, 0, 0, width, height);
      text(welcome[introTextSeq], width / 4, height / 2, 300);
      introTextSeq++;
    } else {
      sceneNum++;
      introTextSeq = 0;
    }
  }
}
function click(aX, aY, bX, bY, destinationScene) {
  if (mouseIsPressed) {
    if (mouseX >= aX && mouseX <= bX && mouseY >= aY && mouseY <= bY) {
      console.log("switch scene...");
      sceneNum = destinationScene;
    }
  }
}
function mouseClicked() {
  if (sceneNum == 3) {
    if (mouseX >= 27 && mouseX <= 98 && mouseY >= 527 && mouseY <= 576) {
      sceneNum = 1;
    }
  }
  if (sceneNum === 2 && isHoopWin) {
    let dollWords = [
      "     ",
      "You see.",
      "I have always been here for the past five years.",
      "No one ever tried to notice me",
      "All I saw is your mom walking around packing things and leaving",
      " Thank you for noticing me.",
      "...",
      "不要忘记我。",
    ];
    if (dollTextSeq < dollWords.length) {
      image(bedroomImg, 0, 0, width, height);
      image(thread, 450, 490, 136, 99);
      image(bedroom_doll_fixed, 200, 200, 450, 730);
      text("CJ7:  " + dollWords[dollTextSeq], width / 4, height / 2, 300);
      dollTextSeq++;
    } else {
      dollTextSeq = 0;
    }
  }
}
class Hoop {
  constructor(img, img_f, isLeft, order, layerNum) {
    this.img = img;
    this.img_f = img_f;
    this.isLeft = isLeft;
    this.layerNum = layerNum;
    this.order = order;
    this.state = 0; // 0 = default, 1 = launched, 2 = epicFail
    this.x = 471 - 16;
    this.y = 320 + 60 - this.order * 15;
  }

  display() {
    push();
    if (this.state === 1) {
      if (this.isLeft) {
        image(
          this.img,
          this.x - 237,
          this.y - 61 + this.order * 15 - this.layerNum * 15
        );
      } else {
        image(
          this.img,
          this.x - 116,
          this.y - 61 + this.order * 15 - this.layerNum * 15
        );
      }
    } else if (this.state === 2) {
      image(this.img_f, this.x, this.y);
    } else {
      image(this.img, this.x, this.y);
    }
    pop();
  }

  launch() {
    this.state = 1;
    console.log("launched");
  }

  epicFail() {
    this.state = 2;
    console.log("failed");
  }
}
class Fish {
  constructor(img) {
    this.img = img;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, 56, 74);
    pop();
  }

  initializePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  updatePosition() {
    this.x += xSpeed;
    if (this.x >= 483 - this.img.width / 2 || this.x <= 116) {
      xSpeed *= -1;
    }
  }

  updateSpeed() {
    xSpeed *= 1.3;
  }

  isInTargetZone(t) {
    let targetZones = targetZonesPerLevel[t];
    for (let i = 0; i < targetZones.length; i++) {
      let zone = targetZones[i];
      if (this.x >= zone[0] && this.x <= zone[1]) {
        console.log("in range");
        return true;
      }
    }
    console.log("not in range");
    return false;
  }
}
function keyPressed() {
  if (
    sceneNum == 7 ||
    sceneNum == 8 ||
    sceneNum == 9 ||
    sceneNum == 10 ||
    sceneNum == 11 ||
    sceneNum == 12
  ) {
    if (keyCode === 32 && !spacebarPressed) {
      let hoops = [hoop1, hoop2, hoop3, hoop4, hoop5];
      for (let i = 0; i < 5; i++) {
        if (sceneNum === i + 8 && fish.isInTargetZone(i)) {
          hoops[i].launch();
          sceneNum++;
          score++;
          fish.updateSpeed();
          break;
        } else if (sceneNum === i + 8 && !fish.isInTargetZone(i)) {
          hoops[i].epicFail();
          // push();
          // textAlign(CENTER);
          // stroke("blue");
          // strokeWeight(5);
          // textSize(15);
          // fill("yellow");
          // text("YOU GOTTA BE KIDDING ME", width / 2, height / 2, 50);
          // pop();
          break;
        }
      }
      spacebarPressed = true;
    }
  }
}
function showText(message, x, y, maxWid) {
  push();
  textAlign(CENTER);
  stroke("blue");
  strokeWeight(5);
  textSize(17);
  fill("yellow");
  text(message, x, y, maxWid);
  pop();
}
