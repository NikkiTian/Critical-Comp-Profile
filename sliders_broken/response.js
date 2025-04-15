// create responses and assign button functionality when dom content is loaded
addEventListener("DOMContentLoaded", createResponses);
addEventListener("DOMContentLoaded", assignButtonFunctionality);

// make back button take you back to index.html
function assignButtonFunctionality() {
    const backButton = document.getElementById("submit-button");
    backButton.addEventListener("click", onBackButtonClick);
}

function onBackButtonClick() {
    window.location.href = "index.html";
    console.log("i think i should be going back to the other page...")
}

const emotions = ["happiness", "anger", "anxiety", "sleepiness", "excitement"];

// dictionary for connecting slider values to responses
// index 0 of array is for low scores on the sliders
// index 2 is for high ones
const emotionMessagesMap = {
    happiness: [
        "hey, it's okay.",
        "keep going :)",
        "heck yeah!"
    ],
    anger: [
        "deep breath.",
        "cool off time.",
        "🔥 chill, champ!"
    ],
    anxiety: [
        "😎",
        "try a pause.",
        "let it out."
    ],
    sleepiness: [
        "go take a nap.",
        "maybe a snack?",
        "let's go for a run!"
    ],
    excitement: [
        "womp...",
        "ooh, a lil bit of energy!",
        "let’s GOO!"
    ]
};

// create content to display based on slider data
function createResponses() {

    // find and store a reference to the element that will hold responses
    const responseContainer = document.getElementById("response-container");

    // for each emotion (there are 5), check what appropriate response should be created
    for (let i = 0; i < emotions.length; i++) {
        const emotionType = emotions[i];
        const emotionValue = localStorage.getItem(emotionType);

        const targetTextContent = calculateResponseText(emotionType, emotionValue);

        if (targetTextContent === null) {
            console.error("WARNING: target message was null! Stopping program.")
            return;
        }

        // create a new element and append it to the response container
        const newParagraph = document.createElement("p");
        newParagraph.textContent = targetTextContent;
        responseContainer.appendChild(newParagraph);
    }
}

function calculateResponseText(type, value) {
 
    // round slider value down so that it is either 0, 1, or 2
    const roundedSliderValue = Math.floor(Number(value));
    // check the emotion-message map, and get the appropriate message inside it
    
    const targetMessage = emotionMessagesMap[type][roundedSliderValue];

    // determine value that should be returned from this function
    return targetMessage;
}

