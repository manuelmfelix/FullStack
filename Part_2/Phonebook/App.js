import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilterNames] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    console.log("goes well!", e.target)
    const newPerson = {
      name: newName,
      id: newName,
      number: newNumber,
    }

    const namesInList = persons.map(person => person.name)
    console.log(namesInList)
    console.log(namesInList.includes(newPerson.name))

    if(namesInList.includes(newPerson.name) === true){
      return(
        window.alert(`${newPerson.name} is already in the list`)
      )
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  } 

  const handleChange = (e) => {
    console.log(newName)
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    console.log(newNumber)
    setNewNumber(e.target.value)
  }

  const handlefilterNames = (e) => {
    console.log(e.target.value)
    setFilterNames(e.target.value)
  }

  const namesToShow = ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterNames={filterNames} handlefilterNames={handlefilterNames}/>

      <h2>Add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleChange={handleChange}
        newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>

      <h2>Numbers</h2>
        <Persons namesToShow={namesToShow}/>
    </div>
  )
}

export default App