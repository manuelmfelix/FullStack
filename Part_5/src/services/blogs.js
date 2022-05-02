import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = newToken
  console.log('Token: ',token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('Token 2º time: ', token)
  const response = await axios
    .post(baseUrl, newObject, { headers: { Authorization: `Bearer ${token}` } } )
  return response.data
}

const update = async ( newObject ) => {
  const request = await axios
    .put(`${ baseUrl }/${newObject.id}`, newObject, { headers: { Authorization: `Bearer ${token}` } } )
  // return request.then(response => response.data)
  return request.data
}

const deleteBlog = async( newObject ) => {
  const request = await axios
    .delete(`${ baseUrl }/${newObject.id}`, { headers: { Authorization: `Bearer ${token}` } } )
  return request.status
}

const exportedObject = {
  getAll, create, update, setToken, deleteBlog
}

export default exportedObject