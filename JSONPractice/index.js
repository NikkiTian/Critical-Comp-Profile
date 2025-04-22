const myWeatherKey = "c6607fee5723851dd29a9960f04bf16c";
const weatherPath = "https://api.openweathermap.org/data/2.5/weather"+
"?lat=42"+
"&lon=-71" +
"&units=metric"+
"&appid=";

fetch(weatherPath + myWeatherKey)
  .then((response) => response.json())///standard writing
  .then(handleParsedData)
  .catch(handleError);

  //fetch and transform JSON object into data
function handleParsedData(data){
    console.log("Parsed Data", data);
    
    const myHeader = document.createElement("h1");

    myHeader.textContent = "feels like: "+ data.main.feels_like+"°C";
    document.body.appendChild(myHeader);
}

function handleError(error){
    console.log("Error", error);
}