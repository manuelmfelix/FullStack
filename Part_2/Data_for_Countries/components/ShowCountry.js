import React, { useState,useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({country}) => {

    const [ weather, setWeather ] = useState([])

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid={API_KEY}`)
          .then(response => {
            setWeather(response.data)
          })
    }, [])

    return(
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>Languages</h2>
            {Object.keys(country.languages).map(key =>
                <li key={key}>{country.languages[key]}</li>
            )}
            <img src = {country.flags.png} width="100"/>
            <h2>Weather in {country.capital[0]}</h2>
            {weather.length===0 ? null :
            <p><strong>Temperature:</strong> {Math.round(weather.main.temp-273)} Celcius<br/>
            <strong>Weather:</strong> {weather.weather[0].main}<br/>
            <strong>Wind:</strong> {weather.wind.speed} mph</p> }
        </div>
    )
}
export default ShowCountry
