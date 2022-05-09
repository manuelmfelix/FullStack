import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotificationTime } from '../reducers/notificationReducer'
// import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const anecdotes = useSelector(state => state.anecdote)
  const filterText = useSelector(state => state.filter)
  console.log(filterText)
  const filteredAnecdotes = [...anecdotes]
      .filter(({ content }) => content.toLowerCase().includes(filterText))
  const orderedAnecdotes = filteredAnecdotes.slice()
    .sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (contentAnec) => {
    dispatch(incrementVote(contentAnec))
    const note = anecdotes.find(n => n.id === contentAnec.id)
    dispatch(setNotificationTime(`You voted ${note.content}`, 5))
    // dispatch(setNotification(`You voted ${note.content}`))
    // setTimeout(() => {dispatch(removeNotification(''))},5000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm

