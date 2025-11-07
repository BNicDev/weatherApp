let API_KEY = '1ea4f89accf91abda486b4e66914993b';
let searchData = ''
let buscar = document.getElementById('search');
let informacionFormulario = document.getElementById('formularioData')
let DATA = []

const dayElemento = document.getElementById('location');
const opcionesFecha = { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric' 
};
const date = new Date().toLocaleDateString('es-ES', opcionesFecha);
console.log(date)

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

const CIUDAD_POR_DEFECTO = 'ezeiza';
DATA_API(CIUDAD_POR_DEFECTO, API_KEY);

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

function mostrarClima(datos){
    console.log(datos)
    const ciudad = document.getElementById('ciudad')
    const temperatura = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humedad = document.getElementById('humidity');
    const viento = document.getElementById('wind'); 

    tempParseada = Math.round(datos.main.temp);
    vientoParseado = Math.round(datos.wind.speed)

    ciudad.innerHTML = datos.name;
    temperatura.innerText = tempParseada + '°C';
    description.innerText = datos.weather[0].description;
    humedad.innerText = datos.main.humidity + '%';
    viento.innerText = vientoParseado + ' KM/H';
}