let API_KEY = '1ea4f89accf91abda486b4e66914993b';
let searchData = ''
let buscar = document.getElementById('search');
let informacionFormulario = document.getElementById('formularioData')
let DATA = [];
let autocomplete;

const dayElemento = document.getElementById('location');
const opcionesFecha = { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric' 
};
const date = new Date().toLocaleDateString('es-ES', opcionesFecha);

dayElemento.innerHTML = `
    <p>${date}</p>

`

informacionFormulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputData = document.getElementById('input');
    searchData = inputData.value.trim();
    if(searchData){
        DATA_API(searchData, API_KEY)
    }else{
        alert('ingrese una ciudad')
    }
    inputData.value = ''
})

obtenerUbicacionActual();

async function DATA_API(s,ak){

    let API = `https://api.openweathermap.org/data/2.5/weather?q=${s}&appid=${ak}&units=metric&lang=es`;

    try{
        const response = await fetch(API);
        const data = await response.json();

        if(!response.ok){
            mostrarClima({cod:'404'});
            throw new Error(`Error ${response.status}: Ciudad no encontrada`)
        }

        DATA.length = 0;
        DATA.push(data);
        
        mostrarClima(DATA[0])

    }catch(e){
        if(e.message.includes('404')){
            console.log('ciudad no encontrada');
        }else{
            console.log('hay un error', e)
        }
    }
}

async function DATA_API_COORDENADAS(lat, lon, ak) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ak}&units=metric&lang=es`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        DATA.length = 0;
        DATA.push(data);
        
        mostrarClima(DATA[0]);
        
    } catch (e) {
        console.error('Error al buscar el clima por coordenadas:', e);
    }
}

function initMap(){
    const inputElemento = document.getElementById('input');
    const options = {
        types : ['(cities)'],
    };
    autocomplete = new google.maps.places.Autocomplete(inputElemento, options);

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged(){
    const place = autocomplete.getPlace();
    if(place.geometry){
        const cityName = place.name;
        DATA_API(cityName, API_KEY)
    }else{
        alert('la ciudad no fue encontrada')
    }
}

function mostrarClima(datos){
    const ciudad = document.getElementById('ciudad')
    const temperatura = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humedad = document.getElementById('humidity');
    const viento = document.getElementById('wind'); 

    tempParseada = Math.round(datos.main.temp);
    vientoParseado = Math.round(datos.wind.speed)

    ciudad.innerHTML = datos.name;
    temperatura.innerHTML = tempParseada + '°C' + ` <img src="/assets/img/weather/clear.svg" />`;
    description.innerText = datos.weather[0].description;
    humedad.innerHTML = `Humedad <br/> ${datos.main.humidity}% <img src="/assets/img/weather/humidity_percentage_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" />`;
    viento.innerHTML = `Viento <br/> ${vientoParseado} km/h <img src="/assets/img/weather/air_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" />`;
}

function obtenerUbicacionActual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                DATA_API_COORDENADAS(lat, lon, API_KEY);
            },
            
            
            (error) => {
                console.error('Error al obtener la ubicación:', error.code, error.message);
                alert('Permiso de ubicación denegado. Se mostrará el clima de la ciudad por defecto.');
                DATA_API('ezeiza', API_KEY); 
            },
            
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        alert('Tu navegador no soporta la geolocalización. Se mostrará la ciudad por defecto.');
        DATA_API('ezeiza', API_KEY);
    }
}

function mostrarImagen(){}