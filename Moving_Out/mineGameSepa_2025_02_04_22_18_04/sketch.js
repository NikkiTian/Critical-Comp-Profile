///from p5.js library
///Creator: greenStone83
const gameWidth = 12;
const gameHeight = 12;
const mineNum = 10;
const squareSize = 40;
let isWin = false;
let bg, endingPost, button;
let introTextSeq = 0;
let speak = [
  "Congratulations",
  "You just won 'The Most Boring Person on the World' award'.",
  "Your granddad will be so proud.",
];

let underGround = []; //0, 1, 2..., "mine"
let overGround = []; //"flag", "covered", "uncovered"
let minesLeft = mineNum;
let digs = 0;
let gameState = "game"; //win, lose
let pPressed = false;
let stateString;

for (let j = 0; j < gameHeight; j++) {
  underGround[j] = [];
  overGround[j] = [];
  for (let i = 0; i < gameWidth; i++) {
    overGround[j][i] = "covered";
  }
}

const colors = [
  {},
  { r: 0, g: 0, b: 255 },
  { r: 0, g: 127, b: 0 },
  { r: 255, g: 0, b: 0 },
  { r: 63, g: 0, b: 127 },
  { r: 191, g: 0, b: 63 },
  { r: 0, g: 127, b: 127 },
  { r: 0, g: 0, b: 0 },
  { r: 127, g: 127, b: 127 },
];

const coords = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

function preload() {
  endingPost = loadImage("minesweeper/minesweeperWinningP.jpg");
  bg = loadImage("minesweeper/wallpaper.jpg");
  button = loadImage("minesweeper/button.jpg");
}

function generateBoard(x, y) {
  let mineCount = 0;
  while (mineCount < mineNum) {
    let i = floor(random(0, gameWidth));
    let j = floor(random(0, gameHeight));
    if (
      underGround[j][i] !== "mine" &&
      (x > i + 1 || x < i - 1 || y > j + 1 || y < j - 1)
    ) {
      underGround[j][i] = "mine";
      mineCount++;
    }
  }

  for (let j = 0; j < gameHeight; j++) {
    for (let i = 0; i < gameWidth; i++) {
      if (underGround[j][i] !== "mine") {
        let sum = 0;
        for (let k of coords) {
          if (
            underGround[j + k[0]] &&
            underGround[j + k[0]][i + k[1]] === "mine"
          ) {
            sum++;
          }
        }
        underGround[j][i] = sum;
      }
    }
  }
}

function drawBoard() {
  for (let j = 0; j < gameHeight; j++) {
    for (let i = 0; i < gameWidth; i++) {
      let x = squareSize * (i + 1.5);
      let y = squareSize * (j + 2.5);

      if (overGround[j][i] === "covered") {
        fill(127, 127, 127, 180);
        rect(x, y, squareSize, squareSize);
        //if mine and game is Over, then draw mine
      } else if (overGround[j][i] === "flag") {
        fill(191, 191, 191, 180);
        rect(x, y, squareSize, squareSize);
        fill(255, 0, 0);
        let ss = squareSize / 4;
        triangle(x - ss, y, x + ss, y - ss, x + ss, y + ss);
        //if mine and game is over, then draw mine
      } else {
        if (underGround[j][i] === "mine") {
          fill(255, 0, 0);
          rect(x, y, squareSize, squareSize);
          fill(0);
          circle(x, y, squareSize / 2);
        } else if (underGround[j][i] === 0) {
          fill(191, 191, 191, 180);
          rect(x, y, squareSize, squareSize);
        } else {
          fill(191, 191, 191, 180);
          rect(x, y, squareSize, squareSize);
          let n = underGround[j][i];
          fill(colors[n].r, colors[n].g, colors[n].b);
          textSize((squareSize * 3) / 4);
          text(n, x, y);
        }
      }
    }
  }
}

function clearPoints(i, j) {
  if (overGround[j] && overGround[j][i] === "covered") {
    overGround[j][i] = "uncovered";
    digs++;
    if (digs === gameWidth * gameHeight - mineNum) {
      gameState = "win";
    }
    if (underGround[j][i] === 0) {
      for (let k of coords) {
        clearPoints(i + k[0], j + k[1]);
      }
      for (let k of coords) {
        if (
          underGround[j + k[0]] &&
          underGround[j + k[0]][i + k[1]] === "mine"
        ) {
          clearPoints(i + k[0], j + k[1]);
        }
      }
    } else if (underGround[j][i] === "mine") {
      gameState = "lose";
    }
  }
}

function squareClicked() {
  let i = floor(mouseX / squareSize) - 1;
  let j = floor(mouseY / squareSize) - 2;
  if (i >= 0 && i < gameWidth && j >= 0 && j < gameHeight) {
    if (mouseButton === LEFT) {
      if (!underGround[0].length) {
        generateBoard(i, j);
      }
      clearPoints(i, j);
    } else {
      if (overGround[j][i] === "covered") {
        overGround[j][i] = "flag";
        minesLeft--;
      } else if (overGround[j][i] === "flag") {
        overGround[j][i] = "covered";
        minesLeft++;
      }
    }
  }
}

function restartButton() {
  let x = 366;
  let y = height / 2;
  let w = 30;
  let h = 30;

  //   fill(255);
  //   rect(x, y, w, h, squareSize / 4);
  //   textSize(squareSize / 2);
  //   fill(0);
  //   text("Reset", x, y);

  if (
    mouseIsPressed &&
    !pPressed &&
    mouseX > x - w / 2 &&
    mouseY > y - h / 2 &&
    mouseX < x + w / 2 &&
    mouseY < y + h / 2
  ) {
    minesLeft = mineNum;
    digs = 0;
    gameState = "game";
    underGround = [];
    overGround = [];

    for (let j = 0; j < gameHeight; j++) {
      underGround[j] = [];
      overGround[j] = [];
      for (let i = 0; i < gameWidth; i++) {
        overGround[j][i] = "covered";
      }
    }
  }
}

function offButton() {
  let x = 279;
  let y = height / 2;
  let w = 30;
  let h = 30;

  //   fill(255);
  //   rect(x, y, w, h, squareSize / 4);
  //   textSize(squareSize / 2);
  //   fill(0);
  //   text("Reset", x, y);

  if (
    mouseIsPressed &&
    !pPressed &&
    mouseX > x - w / 2 &&
    mouseY > y - h / 2 &&
    mouseX < x + w / 2 &&
    mouseY < y + h / 2
  ) {
    // window.location.href = "index.html"
    console.log("exit back to main page!!!");
  }
}

function setup() {
  createCanvas((gameWidth + 2) * squareSize, (gameHeight + 3) * squareSize);
  strokeWeight(2);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont("Courier New");
  textStyle(BOLD);
}

function draw() {
  // console.log(mouseX,mouseY)
  if (mouseIsPressed && !pPressed && gameState === "game") {
    squareClicked();
  }
  image(bg, -5, 0, 600, 600);
  drawBoard();
  textSize(squareSize / 2);
  fill(0);
  if (gameState === "game") {
    stateString = "Mines left: " + minesLeft;
    text(stateString, width / 4, squareSize);
  } else if (gameState === "win") {
    winning();
  } else if (gameState === "lose") {
    stateString = "What you just did?";
    text(stateString, width / 4 + 25, squareSize);
    push();
    imageMode(CENTER);
    image(button, width / 2, height / 2, 315, 202);
    offButton();
    restartButton();
    pop();
  }
  pPressed = mouseIsPressed;

  // if(isWin) {
  //   if(keyIsPressed&&keyCode===32)
  //    window.location.href = "index.html";
  //  }
}
function winning() {
  if (gameState === "win") {
    image(endingPost, -10, 0, 600, 600);
    push();
    stroke("blue");
    strokeWeight(5);
    fill("yellow");

    if (introTextSeq < speak.length) {
      push();
      textSize(30);
      text("WINDOWS", 80, 400);
      pop();
      push();
      textSize(23);
      textAlign(LEFT)
      text(speak[introTextSeq], 300, 470,550);
      pop();
    } else {
      introTextSeq = 0;
      console.log("going back to main page");
      // window.location.href = "index.html";/////////////////////define here
    }
    pop();
  }
}
function mousePressed() {
  if (gameState === "win" && introTextSeq < speak.length) {
    introTextSeq++;
  }
}
