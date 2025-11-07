let API_KEY = '1ea4f89accf91abda486b4e66914993b';
let searchData = ''
let buscar = document.getElementById('search');
let informacionFormulario = document.getElementById('formularioData')
let DATA = []

const dayElemento = document.getElementById('date');
const opcionesFecha = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};

// Formatear la fecha actual en español
dayElemento.innerText = new Date().toLocaleDateString('es-ES', opcionesFecha);

informacionFormulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputData = document.getElementById('input');
    searchData = inputData.value.trim();
    if(searchData){
        DATA_API(searchData, API_KEY)
    }else{
        alert('ingrese una ciudad')
    }
    console.log(DATA)
})

async function DATA_API(s,ak){

    let API = `https://api.openweathermap.org/data/2.5/weather?q=${s}&appid=${ak}`;

    try{
        const response = await fetch(API);
        const data = await response.json();

        DATA.length = 0;
        DATA.push(data);
        // console.log(data)
    }catch(e){
        console.log('hay un error ', e)
    }
}

function mostrarClima(datos){

}
mostrarClima()