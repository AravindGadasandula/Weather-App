const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const input = document.getElementById('input');
const weatherDetails = document.getElementById('weather-details');
const msg = document.getElementById('message');
const date_container = document.getElementById('date-container');










searchBtn.onclick=()=>{
  let cityName = input.value;
  if(cityName==''){
    msg.style.display='block'
     msg.innerHTML='Enter a city ';
   setTimeout(function(){msg.style.display='none'},2000)
weatherDetails.innerHTML ='';
  }
else{
 let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a3cf433287b26fd8281b1597f3d48fbd`;
  fetchData(api)
  // input.value='';
}
 input.value='';
}


function fetchData(api){
    msg.style.display='block';
    msg.innerHTML='Loading';
  fetch(api)
  .then(res=>res.json())
  .then(data=>{
    
     msg.style.display='none'

  console.log(data)
weatherData(data);
  })
   .catch( (err)=>{
     msg.style.display ='block';
     msg.innerHTML = 'City not found';
     setTimeout(function(){msg.style.display='none'},2000);

   })
 

}


function weatherData(data){

  weatherDetails.innerHTML=`<div>
                       <p class='temp'> ${data.main.temp.toFixed()} &#176 <span class='celcius'>  C </span>  </p>
                     <p class='city'> ${data.name} </p>
                     <div class='weather-data'>

                        <div class='desc-container'>
                   <p>${data.weather[0].main}</p>
                   <img  src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png'>
                        </div>
                         
                    <div class='humidity-container'>
                     <p> Humidity</p>
                     <p class='humidity' >  ${data.main.humidity}<span>%</span>  </p>
                     </div>

                    <div class='pressure-container'>
                    <p>Air Pressure</p>
                    <p class='pressure' >  ${data.main.pressure}<span>hPa</span> </p>
                    </div>
                     </div>
                     <p class="created-by">CREATED BY</p>
                     <P class="aravind">A R A V I N D</P>
                      </div>

                           `
}

//window load

window.addEventListener('load',()=>{
myLocation();
})

//location button

locationBtn.addEventListener('click',()=>{
myLocation();
})

//myLocation fun

function myLocation(){
       if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
let long = position.coords.longitude;
let lat = position.coords.latitude;

  
let api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=696b82a4b609dd02301be0f5d7ff83f2` ;
fetchData(api);
}
 )}  else if( !(navigator.geolocation)){
    msg.style.display ='block';
   msg.innerHTML='Something went wrong';
    setTimeout(function(){msg.style.display='none'},2000);

 } 
}


const days= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const d = new Date();
const day = d.getDate();
const date = d.getDay();
const month =d.getMonth();
const year = d.getFullYear();
date_container.innerHTML = `
                         <div class=''>
                        ${days[date]},
                        ${day}
                        ${months[month]}
                        ${year}
                         </div>
                         `





input.addEventListener('keyup', function(e){
if(e.keyCode==13){
e.preventDefault();
searchBtn.onclick();
}

})