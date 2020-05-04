//Global Variables
//GeoBase API
const geoBaseUrl= 'http://api.geonames.org/searchJSON?q=';
const username = 'jmyers';
//weather API
const weatherAPI = '7c68f287643448b2af096243b42952fb';
const weatherBaseUrl = 'https://cors-anywhere.herokuapp.com/http://api.weatherbit.io/v2.0/forecast/daily';

//Pixabay API
const pixabayBaseUrl = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=';
const pixaAPIKey = '16298290-8f92b102f0df5b5586801c1e9';
//Buttons
const button = document.getElementById('cta');
const deleteBtn = document.getElementById('delete');



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

//Event Listener to Call Main Function
 button.addEventListener('click', submitTrip);


 function submitTrip(e) {
   e.preventDefault();
   const locationAnswer = document.getElementById('zip').value;
   const dateAnswer = document.getElementById('date').value;


  getCity(geoBaseUrl, locationAnswer, username)
   .then((cityData) => {
     const cityLat = cityData.geonames[0].lat;
     const cityLon = cityData.geonames[0].lng;
     const weatherData = getWeather(cityLat, cityLon, dateAnswer)
     return weatherData;
   })
   .then((weatherData) => {
      //add data to POST request
      const allData = postData('http://localhost:5000/add', {locationAnswer, dateAnswer, weather: weatherData.data[0].temp});
     return allData;})

   .then(function (allData) {
   //Update UI function
       updateUI(allData);
     });
}
//GET request for GEO API
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
  const req = await fetch(weatherBaseUrl + "?" + "&lat=" + cityLat + "&lon=" + cityLon + "&start_date=" + dateAnswer + "&end_date="+ dateAnswer +"&units=I"+"&key=" + weatherAPI );
  try {
    const weatherData = await req.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};


//POST request adds weather and user entries to app
const postData = async (url ='', data = {}) => {
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

   const updateUI = async(allData) => {

    const res = await fetch(pixabayBaseUrl + pixaAPIKey + "&q=" + allData.locationAnswer + "+&image_type=illustration");
    try {
       const pixaImage = await res.json();
        //countdown days
        const currentTime = new Date();
        const newDateAnswer = new Date (document.getElementById('date').value);
        const daysCalc = Math.ceil(newDateAnswer - currentTime);
        const countdown = Math.ceil(daysCalc / 8.64e7);
        const dateFormat = allData.dateAnswer.split("-").reverse().join("/");
        //update text
        document.getElementById('city').innerHTML = allData.locationAnswer;
        document.getElementById('temp').innerHTML = allData.weather;
         document.getElementById('days').textContent = countdown;
        document.getElementById('dateEntered').innerHTML = dateFormat;
        document.getElementById('cityImage').setAttribute('src', pixaImage.hits[0].webformatURL);

    } catch(error) {
        console.log('error', error);
    }
};

export { submitTrip }
