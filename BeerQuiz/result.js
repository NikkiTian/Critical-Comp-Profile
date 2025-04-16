function getBeerResult() {
  const answers = {};
  for (let i = 0; i < 9; i++) {
    answers['q' + (i+1)] = localStorage.getItem('q' + (i+1));
  }
  finalDecision(answers);
}

function finalDecision(answers) {
  const brandChoice = answers.q9;
  let index;
  if (brandChoice === "A") {
    index = 0;
  } else if (brandChoice === "B") {
    index = 1;
  } else {
    index = 2;
  }
  displayResult(index,answers);
}

function displayResult(indexInput, answers) {
  const style = styleCalculation(answers);

  const brands = {
    "Pale Lager": ["Heineken", "Budweiser", "San Miguel"],
    "Pilsner": ["Estrella", "Stella Artois", "Peroni"],
    "IPA": ["Goose Island IPA", "lagunitas", "New Belgium Voodoo Ranger"],
    "Pale Ale": ["Sierra Nevada", "Goose Island IPA", "Sam Adams Boston Lager"],
    "Wheat Beer": ["Hoegaarden", "Vedett", "Blue Moon"],
    "Stout": ["Guinness", "Samuel Smith Oatmeal Stout", "Founders Breakfast Stout"],
    "Sour": ["Rodenbach Grand Cru", "Cantillon Gueuze", "Berliner Kindl Weisse"],
    "Saison": ["Saison Dupont", "Boulevard Tank 7", "Ommegang Hennepin"]
  };

  const chosenBrand = brands[style][indexInput];
  const resultElement = document.getElementById("result");
  const heading = document.createElement("h2");
  heading.className = "highlight_normalText";
  heading.textContent = "Your Category: " + style;

  const paragraph = document.createElement("p");
  paragraph.textContent = "You are a " + chosenBrand;

  resultElement.innerHTML = "";
  resultElement.appendChild(heading);
  resultElement.appendChild(paragraph);
}

function styleCalculation(answers){
  let style = "";

  if (answers.q3 === 'yes' && answers.q2 === 'high') style = "IPA";
  else if (answers.q6 === 'yes') style = "Stout";
  else if (answers.q5 === 'yes') style = "Sour";
  else if (answers.q4 === 'yes' && answers.q2 !== 'high') style = "Wheat Beer";
  else if (answers.q1 === 'crisp' && answers.q2 === 'low') style = "Pale Lager";
  else if (answers.q1 === 'crisp' && answers.q2 === 'medium') style = "Pilsner";
  else if (answers.q3 === 'no' && answers.q4 === 'no') style = "Pale Ale";
  else style = "Saison";

  return style;
}

window.onload = getBeerResult;
