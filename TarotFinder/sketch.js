let selectedCategory = localStorage.getItem("selectedCategory");
let cardsData = [];
let startTime = null;
let startX = null;
let hasDrawn = false;
let instructionVisible = true;

fetch('https://tarotapi.dev/api/v1/cards')
  .then(response => response.json())
  .then(specifyCardType)
  .catch(error => console.log(error));

function specifyCardType(data) {
  cardsData = data.cards.filter(card => card.type === 'major');
  if (selectedCategory === 'fate') {
    cardsData = cardsData.filter(card => ['ZERO', '1', '10'].includes(card.value));
  } else if (selectedCategory === 'wisdom') {
    cardsData = cardsData.filter(card => ['2', '3', '4'].includes(card.value));
  } else if (selectedCategory === 'relationships') {
    cardsData = cardsData.filter(card => ['5', '6', '7'].includes(card.value));
  }
}

function setup() {
  createCanvas(500, 500);
  background(240);
  textSize(24);
  textAlign(CENTER);
  textFont("fantasy");
  text("Drag", width / 2, 50);
}

function draw() {
}

function mousePressed() {
  if (hasDrawn) return;
  startTime = millis();
  startX = mouseX;
}

function mouseDragged() {
  if (hasDrawn) return;

  stroke(50);
  strokeWeight(2);
  ellipse(mouseX, mouseY, 2);
}

function mouseReleased() {
  if (hasDrawn){
    return;
  } 

  let elapsed = millis() - startTime;
  let dx = mouseX - startX;
  startX = null;
  hasDrawn = true;

  displayScore(elapsed, dx);
}

function displayScore(duration, xDifference) {
  if (cardsData.length === 0) return;

  let score = Math.abs(duration / 100) + Math.abs(xDifference / 10);
  let index = floor(score % cardsData.length);
  let card = cardsData[index];

  let result = document.getElementById('result');

  let title = document.createElement('h3');
  title.textContent = "Your card: " + card.name;
  result.appendChild(title);
  
  let description = document.createElement('p');
  description.innerHTML = card.desc;
  result.appendChild(description);
  
  let image = document.createElement('img');
  image.src = card.image;
  image.style.maxWidth = "100%";
  image.style.height = "auto";
  result.appendChild(image);
}
