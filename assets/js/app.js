const apiKey = 'f5b94bc6b795a6569b936dd66e2d7852';
const inp = document.getElementById('input');
const cityName = document.getElementById('cityName');
const divDate = document.getElementById('date');
const temperature = document.getElementById('temperature');
const desp = document.getElementById('desp');
const minmax = document.getElementById('minmax');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const divImg = document.getElementById('img');


document.addEventListener('keypress', (e) => {
    let text = inp.value;
    if (e.which == 13) {
        if (text === "")
            alert("Enter City Name!");
        else
            apiReq(text).catch(msg => {
                inp.value = "";
                alert("Invalid Input");
            });
    }
})


async function apiReq(searchText) {
    console.log(searchText);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}`;
    await axios.get(url).then(result => {
        console.log(result);
        setData(result.data);
    }).catch(() => {
        throw "Wrong input";
    });
    // let data = await fetch(url);
    // let result = await data.json();
    // console.log(result);
    // if (result.cod === 404)
    //     throw "Wrong input";
    // else
    //     setData(result);
}



function setData(res) {
    let date_detail = setDate();
    cityName.innerText = `${res.name}, ${res.sys.country}`;
    divDate.innerText = `${date_detail.day} ${date_detail.no_date} ${date_detail.month_name}  ${date_detail.year}`;
    temperature.innerText = `${Math.floor(res.main.temp - 273.15)} °C`;
    desp.innerText = `${res.weather[0].main}`
    minmax.innerText = `Min/Max: ${Math.floor(res.main.temp_min-273.15)}°C/${Math.floor(res.main.temp_max-273.15)}°C`
    humidity.innerText = `Humidity: ${res.main.humidity}%`
    pressure.innerText = `Pressure: ${res.main.pressure}mbar`
        // console.log(result)
    inp.innerText = "";
    setBackGroundImage(res.weather[0].main);
}

function setDate() {
    let date = new Date();
    let week = ['Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thusday', 'Friday', 'Saturday'];
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
        'December'
    ];
    const obj = {
        day: week[date.getDay()],
        no_date: date.getDate(),
        month_name: month[date.getMonth()],
        year: date.getFullYear()
    }

    // console.log(`${week[date.getDay()]}, ${date.getDate()} ,${month[date.getMonth()]} ,${date.getFullYear()}`);
    // console.log(date);
    return obj;
}


function setBackGroundImage(weather) {
    switch (weather) {
        case 'Clouds':
            divImg.style.backgroundImage = "url('https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdWRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')";
            break;
        case 'Clear':
            divImg.style.backgroundImage = "url('https://images.unsplash.com/photo-1590077428593-a55bb07c4665?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xlYXIlMjBza3l8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')";
            break;
        case 'Rain':
            divImg.style.backgroundImage = "url('https://images.unsplash.com/photo-1565332296511-c4e6c6f27832?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHJhaW5pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')";
            break;
        case 'Haze':
            divImg.style.backgroundImage = "url('https://images.unsplash.com/photo-1534818509150-ac05235effb8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGhhemV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')";
            break;
        default:
            divImg.style.backgroundImage = "url('https://images.unsplash.com/photo-1592210454359-9043f067919b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdGhlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')";
            break;

    }

}