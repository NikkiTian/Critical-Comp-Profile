const breedListURL = "https://dog.ceo/api/breeds/list/all";

let randomBreed;

fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(handleBreedListFetch)
    .catch(error => console.log(error));

function getURLFromBreed(breed) {
    return "https://dog.ceo/api/breed/" + breed + "/images";
}

function handleBreedListFetch(data) {
    // pick random breed from the list
    const breedList = Object.keys(data.message); // object helper method that transforms an object's keys into an array
    randomBreed = breedList[Math.floor(Math.random() * breedList.length)];
    
    console.log(randomBreed);

    fetch(getURLFromBreed(randomBreed))
    .then(response => response.json())
    .then(handleBreedImages)
    .catch(error => console.log(error));
}

function handleBreedImages(imagedata) {
    let imagePathList = imagedata.message;

    const imageCount = 5;
    for (let i = 0; i < imageCount; i++) {
        let randomIdx = Math.floor(Math.random() * imagePathList.length);
        let randomPath = imagePathList[randomIdx];

        const imgElement = document.createElement("img");
        imgElement.src = randomPath;
        imgElement.style.width = "300px";
        imgElement.style.height = "auto";
        document.body.appendChild(imgElement);
    }
}
