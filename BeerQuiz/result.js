function getBeerResult() {
  const answers = {};
  for (let i = 0; i < 9; i++) {
    answers['q' + (i + 1)] = localStorage.getItem('q' + (i + 1));
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
  displayResult(index, answers);
}

function displayResult(indexInput, answers) {
  const style = styleCalculation(answers);

  const brands = {
    "Pale Lager": ["Heineken", "Budweiser", "Estrella", "Light, crisp, and super easy to drink. Great for hot days or just chilling."],
    "Pilsner": ["Stella Artois", "San Miguel", "Carlsberg", "Still crisp like a lager, but with more flavor and a little hop kick."],
    "IPA": ["Goose Island IPA", "lagunitas", "New Belgium Voodoo Ranger", "Bold and hoppy with a punch of bitterness. Often citrusy, piney, or tropical."],
    "Pale Ale": ["Sierra Nevada Pale Ale", "Dales", "Coopers", "Easygoing but flavorful, with just the right touch of hops to keep things interesting."],
    "Wheat Beer": ["Hoegaarden", "Vedett", "Blue Moon", "Smooth and hazy, often with hints of citrus or spice. Super refreshing."],
    "Stout": ["Guinness", "Left Hand Milk Stout", "Hardywood Park Gingerbread Stout", "Dark, rich, and roasty. Think coffee, chocolate, or dessert vibes."],
    "Sour": ["Crooked Stave Sour Rosé", "Revolution Freedom of Press", "Sierra Nevada Wild Little Thing", "Tart and tangy with a fruity twist. Not your average beer—fun and unexpected."],
    "Saison": ["Brooklyn Sorachi Ace", "Boulevard Tank 7", "Saison Dupont", "Dry, slightly spicy, and full of character. A bit wild in a good way."]
  };

  const chosenBrand = brands[style][indexInput];
  const brandImageSrc = "assets/" + chosenBrand.replace(/\s+/g, "_").toLowerCase() + ".png";

  document.getElementById("brand-heading").textContent = "You are a";
  document.getElementById("brand-name").textContent = chosenBrand;
  document.getElementById("brand-image").src = brandImageSrc;
  document.getElementById("brand-image").alt = chosenBrand + " image";
  document.getElementById("brand-description").textContent = brands[style][3];
}

function styleCalculation(answers) {
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