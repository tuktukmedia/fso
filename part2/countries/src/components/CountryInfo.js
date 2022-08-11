import { useEffect, useState } from "react";
import axios from "axios"; 
 
 //Yksittäisen maan sivu, tämä näytetään maalistan sijaan kun listalla enää yksi maa jäljellä
 const CountryInfo = ({data}) => {

    //null aluksi, että voidaan katsoa onko säätiedot jo vastaanotettu ennen kuin yritetään näyttää niitä
    const [weatherData, setWeatherData] = useState(null)

    useEffect(()=> {
        console.log('säähaku alkaa')
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(
          response => {
            setWeatherData(response.data)
            console.log('säähaku valmis')
          }
        )
    }, [])
   
    return(
    <div>
      <h2>{data.name.common}</h2>
       Capital: {data.capital}<br />
       Area: {data.area}<br />
      <p><b>Languages:</b></p>
      <ul>
        {/* koska object taulukon sisällä, ilman object values mappaus ei toiminut. Pitää mapata kun halutaan kaikki listana. */}
        {Object.values(data.languages).map((language) => 
          <li key={language}>
            {language}
          </li>
          )
        }      
      </ul>
      <img src={data.flags.png} alt={data.name.common} />
      <h2>Weather in {data.capital}</h2>
      {/*  Tsekkaa onko weatherData null ja voidaanko jo näyttää säädataa... */}      
      {weatherData===null ? <><p>lataa</p></> : 
      <>
        <p>Temperature {weatherData.main.temp} Celcius</p>
        <img src={"http://openweathermap.org/img/wn/".concat(weatherData.weather[0].icon).concat("@4x.png")} />
        <p>Wind {weatherData.wind.speed} m/s</p>
      </>
      }
    </div>
    )
}  

export default CountryInfo