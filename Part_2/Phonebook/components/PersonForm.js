import Reac from 'react'

const PersonForm = (props) => {
    const {addPerson, newName, handleChange, newNumber, handleChangeNumber} = props
    
    return(
        <form onSubmit = {addPerson}>
        <div>
        name: <input
          value={newName} 
          onChange={handleChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm