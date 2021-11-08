import React from 'react'

const Persons = (props) => {
    const {namesToShow} = props

    return(
        <div>
        {namesToShow.map(person =>
            <li key={person.id}>{person.name} {person.number}</li>
          )}
        </div>
    )
}

export default Persons