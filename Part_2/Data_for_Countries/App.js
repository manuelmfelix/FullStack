import React, { useState,useEffect } from 'react'
import axios from 'axios'
import FilterCountries from './components/FilterCountries'
import Countries from './components/Countries'

const App = () => {

  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const [ filterCountries, setFilterCountries] = useState('')

  const handlefilterCountries = (e) => {
    console.log(e.target.value)
    setFilterCountries(e.target.value)
  }

  const countriesToShow = ''
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(filterCountries.toLowerCase()))

  return (
    <div>
      <h2>Countries</h2>
        <FilterCountries filterCountries={filterCountries} handlefilterCountries={handlefilterCountries}/>
        <Countries countries={countriesToShow}/>
    </div>
  )
}

export default App