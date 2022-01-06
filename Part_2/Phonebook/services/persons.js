import axios from 'axios'

const getAll = (url) => {
  const request =  axios.get(url)
  return request.then(response => response.data)
}

const create = (url,newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
  }

const update = (url,id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (baseUrl,id,name) => {
    const url = `${baseUrl}/${id}`
    console.log("click worked")
    if (window.confirm(`Do you want to delete ${name}?`)) {
        axios
        .delete(url)
        .then(() => {console.log(`${name} was deleted`)
          alert(`The person ${name} will be deleted`)
        })
        .catch(error => {
            alert(
              `the person ${name} was already deleted from server`
            )
            console.log(`oh...sorry...it wasn't`)
          })
        
    } else {
        console.log(`Deletion canceled`)
    }
}

export default { getAll, create, update, deletePerson }