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
  ////categorized tarot cards, specifically major arcanas, based on their meaning
  if (selectedCategory === 'fate') {
    cardsData = cardsData.filter(card => ['ZERO', '1', '10','13','15','16','20','21'].includes(card.value));
  } else if (selectedCategory === 'wisdom') {
    cardsData = cardsData.filter(card => ['2', '3', '4','5','9','11','12','18'].includes(card.value));
  } else if (selectedCategory === 'relationships') {
    cardsData = cardsData.filter(card => ['6', '7','8','14','17','19'].includes(card.value));
  }
}

function setup() {
  createCanvas(500, 500);
  strokeWeight(10);
  stroke("yellow");
  noFill();
  rect(0, 0, width, height);
}

function mousePressed() {
  if (hasDrawn) return;
  startTime = millis();
  startX = mouseX;
}

function mouseDragged() {
  if (hasDrawn) return;

  alphaVal = 100;

  for (let i = 0; i < 5; i++) {
    let xOffset = random(-5, 5);
    let yOffset = random(-5, 5);
    
    fill(255, 0, 157, alphaVal);
    noStroke();
    ellipse(mouseX + xOffset, mouseY + yOffset, random(8, 15));
    
    alphaVal -= 5;
    if (alphaVal <= 0) {
      alphaVal = 100;
    }
  }
}

function mouseReleased() {
  if (hasDrawn){
    return;
  } 

  let timePassed = millis() - startTime;
  let dx = mouseX - startX;
  startX = null;
  hasDrawn = true;

  displayScore(timePassed, dx);
}

function displayScore(duration, xDifference) {
  if (cardsData.length === 0) return;

  ////random math calculation based on the time and distance of the mouse movement
  let score = Math.abs(duration / 100) + Math.abs(xDifference / 10);
  let index = floor(score % cardsData.length);
  let card = cardsData[index];

  ////creeating the result(and the content) linking back to the html
  let result = document.getElementById('result');

  let title = document.createElement('h3');
  title.textContent = "Your card: " + card.name;
  result.appendChild(title);
  
  let description = document.createElement('p');
  description.innerHTML = card.desc;
  result.appendChild(description);
  
  let image = document.createElement('img');
  image.src = "tarots/" + card.value + ".jpg";
  result.appendChild(image);
}
