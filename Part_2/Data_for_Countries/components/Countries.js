import React, { useState } from 'react'
import ShowCountry from './ShowCountry'


const Countries = ({countries}) => {

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
      }

    if (countries.length>10){
        return(
            <div>Too many matches, specify another filter</div>
        )
    } else if (countries.length===1){

        return(
            <div>
            {countries.map(country =>
                <div key={country.cca2}>
                    <ShowCountry country={country}/>
                </div>
            )}
            </div>
        )
        
    } else {
        return(
            <div>
            {countries.map(country =>
                <p key={country.cca2}>{country.name.common} 
                <button onClick={handleShow}>show</button>
                {show===true ? <ShowCountry country={country}/> : null }
                </p>
            )}
            </div>
        )
        }
}

export default Countries