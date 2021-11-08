import React from 'react'

const Filter = (props) => {
    const {filterNames,handlefilterNames} = props

    return(
        <div>
        filter shown with: <input
        value={filterNames}
        onChange={handlefilterNames}
        />
      </div>
    )
}

export default Filter