let extraCount = 0;

onPageLoad();

function onPageLoad() { //// ensure that the page is fully loaded before running the script
    document.body.style.backgroundColor = "yellow";

    let myParagraph = document.querySelector("#myP")
    let existingString = myParagraph.textContent;

    myParagraph.textContent = existingString + "This is a paragraph";

    let username = document.querySelector("#username");
    username.value = localStorage.getItem("lastSaved");

    let stored6Count = localStorage.getItem("extraCount");
    let sixCount = Number(stored6Count);

    let element = document.querySelector("#my-6");

    for(let i=0; i<sixCount; i++){
        element.textContent += "6";
        extraCount ++;
    }
}

function onButtonClicked(){
    let element = document.querySelector("#my-6");
    element.textContent += "6";/////accumulated text content
    extraCount ++;

    localStorage.setItem("extraCount", extraCount);
}

function clearContent(){
    let element = document.querySelector("#my-6");
    element.textContent = "";

    localStorage.removeItem("extraCount");
}