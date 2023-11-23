const apiKey = '2eefab48400736bd2b83cd5849cd9826';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const saveButton = document.getElementById('js-save-button');
const saveList = document.getElementById('js-save-list');
const image = document.getElementById('js-image');

let savedCities = ['Romsey'];
let data;

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    data = await response.json();

    //updates text
    document.getElementById('js-city').innerHTML = data.name + ', ' + data.sys.country;
    document.getElementById('js-temp').innerHTML = data.main.temp + '°C'
    document.getElementById('js-weather').innerHTML = data.weather[0].main;
    document.getElementById('js-windspeed').innerHTML = data.wind.speed + ' km/h';

    //sets save button icon
    if(savedCities.includes(data.name)){
        saveButton.classList.remove('far', 'fa-bookmark');
        saveButton.classList.add('fas', 'fa-bookmark');
    }else{
        saveButton.classList.remove('fas', 'fa-bookmark');
        saveButton.classList.add('far', 'fa-bookmark');
    }

    console.log(data);   
    
    //updates the image
    if(data.weather[0].main == 'Clouds'){
        image.src ='Images/clouds.png';
    }else if(data.weather[0].main == 'Clear'){
        image.src = 'Images/clear.png';
    }else if(data.weather[0].main == 'Drizzle'){
        image.src = 'Images/drizzle.png';
    }else if(data.weather[0].main == 'Mist'){
        image.src = 'Images/mist.png';
    }else if(data.weather[0].main == 'Rain'){
        image.src = 'Images/rain.png';
    }else if(data.weather[0].main == 'Snow'){
        image.src = 'Images/snow.png';
    }
}

saveButton.addEventListener('click', function(){      
    //add / remove city to save list
    if(!savedCities.includes(data.name)){
        savedCities.push(data.name);
    } else{
        let index = savedCities.indexOf(data.name);
        savedCities.splice(index, 1);
    }

    //toggles save button icon
    if(saveButton.classList.contains('far', 'fa-bookmark')){
        saveButton.classList.remove('far', 'fa-bookmark');
        saveButton.classList.add('fas', 'fa-bookmark');
    } else if(saveButton.classList.contains('fas', 'fa-bookmark')){
        saveButton.classList.remove('fas', 'fa-bookmark');
        saveButton.classList.add('far', 'fa-bookmark');
    }
    updateSaveList();   
   
})

checkWeather('romsey');

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

//shows the current saved list on screen
function updateSaveList() {
    saveList.innerHTML = '';

    savedCities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        saveList.appendChild(listItem);
        listItem.addEventListener('click', function(){
            console.log(city);
            checkWeather(city);
            searchBox.value = '';
        })
    });  
}

updateSaveList();









