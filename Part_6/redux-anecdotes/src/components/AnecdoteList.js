import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const anecdotes = useSelector(state => state.anecdote)
  const filterText = useSelector(state => state.filter)
  console.log(filterText)
  const filteredAnecdotes = [...anecdotes]
      .filter(({ content }) => content.toLowerCase().includes(filterText))
  const orderedAnecdotes = filteredAnecdotes.slice()
    .sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
    const note = anecdotes.find(n => n.id === id)
    dispatch(setNotification(`You voted ${note.content}`))
    setTimeout(() => {dispatch(removeNotification(''))},5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm

