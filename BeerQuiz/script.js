function submitQuiz() {
    // Collect answers
    const taste = document.querySelector('input[name="taste"]:checked');
    const bitterness = document.querySelector('input[name="bitterness"]:checked');
    const aroma = document.querySelectorAll('input[name="aroma"]:checked');
    const color = document.querySelector('input[name="color"]:checked');
    const alcohol = document.querySelector('input[name="alcohol"]:checked');
    const occasion = document.querySelector('input[name="occasion"]:checked');
    const fizz = document.querySelector('input[name="fizz"]:checked');
    const newBeer = document.querySelector('input[name="newBeer"]:checked');
  
    // Validate answers
    if (!taste || !bitterness || !color || !alcohol || !occasion || !fizz || !newBeer) {
      alert('Please answer all the questions!');
      return;
    }
  
    // Store answers in localStorage
    localStorage.setItem("taste", taste.value);
    localStorage.setItem("bitterness", bitterness.value);
    localStorage.setItem("aroma", Array.from(aroma).map(a => a.value).join(","));
    localStorage.setItem("color", color.value);
    localStorage.setItem("alcohol", alcohol.value);
    localStorage.setItem("occasion", occasion.value);
    localStorage.setItem("fizz", fizz.value);
    localStorage.setItem("newBeer", newBeer.value);
  
    // Recommend beer style based on answers
    let beerStyle = '';
    let beerExamples = [];
  
    if (taste.value === "lager") {
      beerStyle = 'Pale Lager';
      beerExamples = ['Estrella', 'Heineken', 'Budweiser'];
    } else if (taste.value === "ale") {
      beerStyle = 'IPA';
      beerExamples = ['Goose Island IPA', 'Lagunitas IPA', 'Stone IPA'];
    }
  
    // Display result
    document.getElementById("beerStyle").textContent = beerStyle;
    document.getElementById("beerExamples").innerHTML = beerExamples.map(beer => `<li>${beer}</li>`).join('');
    document.getElementById("result").style.display = "block";
  }
  