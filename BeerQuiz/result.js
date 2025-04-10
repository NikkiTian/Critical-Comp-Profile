function getBeerResult() {
  const answers = {};
  for (let i = 1; i <= 8; i++) {
    answers['q' + i] = localStorage.getItem('q' + i);
  }

  // 简单示例逻辑
  if (answers.q3 === 'yes' && answers.q2 === 'high') return showResult("IPA");
  if (answers.q6 === 'yes') return showResult("Stout");
  if (answers.q5 === 'yes') return showResult("Sour");
  if (answers.q4 === 'yes' && answers.q2 !== 'high') return showResult("Wheat Beer");
  if (answers.q1 === 'crisp' && answers.q2 === 'low') return showResult("Pale Lager");
  if (answers.q1 === 'crisp' && answers.q2 === 'medium') return showResult("Pilsner");
  if (answers.q3 === 'no' && answers.q4 === 'no') return showResult("Pale Ale");
  return showResult("Saison");
}

function showResult(style) {
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
  document.getElementById("result").innerHTML =
    `<h2>Your Best Match: ${style}</h2><p>Brands: </p><ul>` +
    brands[style].map(b => `<li>${b}</li>`).join('') + `</ul>`;
}

window.onload = getBeerResult;
