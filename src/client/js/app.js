//Global Variables
const geoBaseUrl= 'http://api.geonames.org/searchJSON?q=';
const username = 'jmyers';
//weather API
const weatherAPI = '7c68f287643448b2af096243b42952fb';
const weatherBaseUrl = 'https://cors-anywhere.herokuapp.com/http://api.weatherbit.io/v2.0/forecast/daily';

//Pixabay API
const pixabayBaseUrl = 'https://pixabay.com/api/';
const pixaAPIKey = '16298290-8f92b102f0df5b5586801c1e9';
const button = document.getElementById('cta');
const deleteBtn = document.getElementById('delete');
//UPDATE FORM functions//


const tripAdd = button.addEventListener('click', function (e) {
  e.preventDefault();
});

//UPDATE UI FORM
button.addEventListener('click',function(e){
  let appBody = document.getElementById('app');
  let resultBody = document.getElementById('result_invisible');
  appBody.style.display = "none";
  resultBody.style.display = "block";
});

//Delete goes back to original//
 deleteBtn.addEventListener('click',function(e){
  let appBody = document.getElementById('app');
  let resultBody = document.getElementById('result_invisible');
  appBody.style.display = "block";
  resultBody.style.display = "none";

});

 button.addEventListener('click', submitTrip);


 function submitTrip(e) {
   e.preventDefault();
   const locationAnswer = document.getElementById('zip').value;
   const dateAnswer = document.getElementById('date').value;
   //current day
   const currentTime = new Date();


  getCity(geoBaseUrl, locationAnswer, username)
   .then((cityData) => {
     const cityLat = cityData.geonames[0].lat;
     const cityLon = cityData.geonames[0].lng;
     const country = cityData.geonames[0].countryName;
     const weatherData = getWeather(cityLat, cityLon, dateAnswer)
     return weatherData;
   })
   .then((weatherData) => {
      //add data to POST request
      const daysCalc = Math.ceil(dateAnswer - currentTime);
      const daysUntil = Math.round(daysCalc / 8.64e7);
      const allData = postData('http://localhost:3000/add', {locationAnswer, dateAnswer, weather: weatherData.data.temp, daysUntil});
     return allData;})

   .then(function (allData) {
   //Update UI function
       updateUI(allData);
     });
}
//GET request for GEO API data
 const getCity = async (geoBaseUrl, locationAnswer, username) => {
  const response = await fetch(geoBaseUrl + locationAnswer + "&maxRows=10&" + "username=" + username);
  try {
    const cityData = await response.json();
    return cityData;
  } catch (error) {
    console.log("error", error);
  }
};

// GET request for weather API
  const getWeather = async (cityLat, cityLon, dateAnswer) => {
  const req = await fetch(weatherBaseUrl + "?" + "&lat=" + cityLat + "&lon=" + cityLon + "&start_date=" + dateAnswer + "&end_date="+ dateAnswer + "&key=" + weatherAPI +"&units=I");
  try {
    const weatherData = await req.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};


//POST request adds weather and user entries to app
export const postData = async (url ='', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

      body: JSON.stringify({
      dateAnswer: data.dateAnswer,
      location: data.locationAnswer,
      weather: data.weather,
      daysUntil: data.daysUntil
    })
  });

    try {
        const allData = await request.json();
        return allData;
    } catch(error) {
        console.log('error',error);
    }
};

//Update UI with user entry

export const updateUI = async(allData) => {

    const res = await fetch(pixabayBaseUrl + pixaAPIKey + "&q=" + allData.location + "+&image_type=illustration");
    try {
       const pixaImage = await res.json();
        //calc days
        const dateFormat = allData.dateAnswer.split("-").reverse().join("/");
        //update text
        document.getElementById('city').innerHTML = allData.locationAnswer;
        document.getElementById('temp').innerHTML = allData.weather;
        document.getElementById('days').innerHTML = allData.daysUntil;
        document.getElementById('dateEntered').innerHTML = dateFormat;
        document.getElementById('cityImage').setAttribute('src', pixaImage.hits[0].webformatURL);

    } catch(error) {
        console.log('error', error);
    }
};

export { submitTrip }
