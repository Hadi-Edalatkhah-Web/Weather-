//api.openweathermap.org/data/2.5/weather?q=tehran&appid=905b9df92fe9f2cda1fe7de8cfc3d2ce&units=metric
// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

const apiKey = "905b9df92fe9f2cda1fe7de8cfc3d2ce";

const input = document.getElementById("search-input");
const button = document.getElementById("searchButton");
const list = document.getElementById("citysList");
const msg=document.getElementById("msg");

button.addEventListener("click", searchCity);
input.addEventListener("keypress", e => {
    if (e.key === 'Enter') {
        searchCity();
    }
});

function searchCity() {
    const citysName = input.value;
    input.value = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citysName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            console.log(data);
            const {
                main,
                name,
                sys,
                weather,
                wind
            } = data;

            const li = document.createElement("li");
            li.classList.add("city")
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

            const markup = `<div class='weather'>

            <h2 class='cityHeader'>${citysName}        ${sys.country}</h2>

      
            <div class='weathericon'>
            <img class='icon' src=${icon} alt='faild to load image'>
            <h3 id='weatherText'>${weather[0]["description"]}</h3>
            </div>


            <div id='temps'>
                 <span id='realTemp'>${Math.round(main["temp"])}</span>

                     <div class='temp'>
                     <span>Up   ${Math.round(main["temp_max"])}</span>
                     <span>Down   ${Math.round(main["temp_min"])}</span>
                     <span>Real ${Math.round(main["feels_like"])}</span>
                     </div>       

                </div>
           </div>
            `
            li.innerHTML = markup;
            list.appendChild(li);
            msg.innerText="";
        })
        .catch(()=>msg.innerText="city not found")

}