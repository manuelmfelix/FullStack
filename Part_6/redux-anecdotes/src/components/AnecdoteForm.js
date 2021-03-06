import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
// import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    // const newAnecdote = await anecdoteServices.createNew(content)
    // dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You created ${content}`))
    setTimeout(() => {dispatch(removeNotification(''))},5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>

  )
}

export default AnecdoteForm