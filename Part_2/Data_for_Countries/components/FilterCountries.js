import React from 'react'

const Filter = ({filterCountries,handlefilterCountries}) => {

    return(
        <div>
        filter shown with: <input
        value={filterCountries}
        onChange={handlefilterCountries}
        />
      </div>
    )
}

export default Filter