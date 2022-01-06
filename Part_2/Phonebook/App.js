import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [ persons, setPersons ] = useState([])

  const url = 'http://localhost:3001/persons'

  useEffect(() => {
    personService
      .getAll(url)
      .then(initial => {
        setPersons(initial)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilterNames] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ notificationSuccess, setNotificationsuccess] = useState('notification')

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const namesInList = persons.map(person => person.name)

    if(namesInList.includes(newPerson.name) === true){

      if (window.confirm(`Do you want to change the number?`)) {

        const personFound = persons.find(n => n.name === newPerson.name)
        const changedNumber = { ...personFound, number: newPerson.number }

        personService
        .update(url,personFound.id,changedNumber)
        .then(returnedPersons => {
          setPersons(persons.map(person => person.id !== personFound.id ? person : returnedPersons))
          setErrorMessage(
            `${newPerson.name} changed phone number`
          )
          setNotificationsuccess('notification')
          setTimeout(() => {
            setErrorMessage(null)},3000
          )
        })
        .catch(error => {
          setErrorMessage(
            `${newPerson.name} was already deleted from server`
          )
          setNotificationsuccess('error')
          setTimeout(() => {
            setErrorMessage(null)},3000
          )
        }

        )
        return

      } else {
        return(
          window.alert(`${newPerson.name} is already in the list`)
        )
      }
    } else {
      personService
      .create(url,newPerson)
      .then(returned => {
        setPersons(persons.concat(returned))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Added ${newPerson.name}`
        )
        setNotificationsuccess('notification')
        setTimeout(() => {
          setErrorMessage(null)},3000
        )
      })
    }
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
      <Notification message={errorMessage} type={notificationSuccess} />
        <Filter filterNames={filterNames} handlefilterNames={handlefilterNames}/>

      <h2>Add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handleChange={handleChange}
        newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>

      <h2>Numbers</h2>
        <Persons 
        namesToShow={namesToShow}
        url={url}
        />
    </div>
  )
}

export default App