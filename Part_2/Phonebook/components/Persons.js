import React from 'react'
import noteService from '../services/notes'

const Persons = ({namesToShow, url}) => {

    return(
        <div>
            {namesToShow.map(person =>
                <li key={person.id}>{person.name} {person.number}
                    <button onClick={() => noteService.deletePerson(url,person.id,person.name)}>delete</button>
                </li>
            )}
        </div>
    )
}

export default Persons