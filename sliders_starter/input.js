// wait for DOM content to load
document.addEventListener("DOMContentLoaded", onDOMLoaded);

function onDOMLoaded() {
    // assign button's functionality
    const button = document.getElementById("submit-button");
    button.addEventListener("click", onSubmit);

    // try to restore slider values
    tryRestoreSliderValues();
}

function onSubmit() {
    // store slider values in local storage
    const happinessSlider = document.getElementById("happiness-slider");
    const angerSlider = document.getElementById("anger-slider");
    const anxietySlider = document.getElementById("anxiety-slider");
    const sleepinessSlider = document.getElementById("sleepiness-slider");
    const excitementSlider = document.getElementById("excitement-slider");
  
    localStorage.setItem("happiness", happinessSlider.value);
    localStorage.setItem("anger", angerSlider.value);
    localStorage.setItem("anxiety", anxietySlider.value);
    localStorage.setItem("sleepiness", sleepinessSlider.value);
    localStorage.setItem("excitement", excitementSlider.value);

    // load next page
    window.location.href = "./response.html";
}

function tryRestoreSliderValues() {
    // try to reset sliders to previous positions if they had a previous position
    const happinessSlider = document.getElementById("happiness-slider");
    const angerSlider = document.getElementById("anger-slider");
    const anxietySlider = document.getElementById("anxiety-slider");
    const sleepinessSlider = document.getElementById("sleepiness-slider");
    const excitementSlider = document.getElementById("excitement-slider");

    const savedHappiness = localStorage.getItem("happiness");
    const savedAnger = localStorage.getItem("anger");
    const savedAnxiety = localStorage.getItem("anxiety");
    const savedSleepiness = localStorage.getItem("sleepiness");
    const savedExcitement = localStorage.getItem("excitement");

    // if the slider had a value, set it back to that position
    if (savedHappiness !== null) happinessSlider.value = savedHappiness;
    if (savedAnger !== null) angerSlider.value = savedAnger;
    if (savedAnxiety !== null) anxietySlider.value = savedAnxiety;
    if (savedSleepiness !== null) sleepinessSlider.value = savedSleepiness;
    if (savedExcitement !== null) excitementSlider.value = savedExcitement;
}