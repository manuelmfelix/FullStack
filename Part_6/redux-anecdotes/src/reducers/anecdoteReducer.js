import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const AnecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    // incrementVote(state, action) {
    updateAnecdote(state, action) {
      const id = action.payload.id
      const voteToChange = state.find(n => n.id === id)
      const anecChanged = {
        ...voteToChange,
        votes: voteToChange.votes + 1
      }
      return state.map(anec =>
        anec.id !== id ? anec : anecChanged 
      )
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, appendAnecdotes, setAnecdotes } = AnecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.createNew(content)
    dispatch(appendAnecdotes(anecdotes))
  }
}

export const incrementVote = content => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.updateVote(content)
    dispatch(updateAnecdote(anecdotes))
  }
}


export default AnecdoteSlice.reducer

// const anecReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'VOTE':
//       const id = action.data.id
//       const voteToChange = state.find(n => n.id === id)
//       const anecChanged = {
//         ...voteToChange,
//         votes: voteToChange.votes + 1
//       }
//       return state.map(anec =>
//         anec.id !== id ? anec : anecChanged 
//       )
//     case 'NEWANEC':
//       return [...state, action.data]
//     default:
//       return state
//   }
// }

// export const createAnecdote = (data) => {
//   return {
//     type: 'NEWANEC',
//     data: {
//       content: data,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const incrementVote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export default anecReducer