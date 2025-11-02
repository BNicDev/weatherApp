let API_KEY = '1ea4f89accf91abda486b4e66914993b'
let API = `https://api.openweathermap.org/data/2.5/weather?q=ezeiza&appid=${API_KEY}`

async function DATA_API(){
    try{
        const response = await fetch(API);
        const data = await response.json();

        console.log(data)
    }catch(e){
        console.log('hay un error ', e)
    }
}
DATA_API()