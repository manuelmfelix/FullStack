import React from 'react'
import personService from '../services/persons'

const Persons = ({namesToShow, url}) => {

    return(
        <div>
            {namesToShow.map(person =>
                <li key={person.id}>{person.name} {person.number}
                    <button onClick={() => personService.deletePerson(url,person.id,person.name)}>delete</button>
                </li>
            )}
        </div>
    )
}

export default Persons