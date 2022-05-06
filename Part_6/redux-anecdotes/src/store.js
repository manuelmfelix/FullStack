import { configureStore } from '@reduxjs/toolkit'
import anecReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer:{
    anecdote: anecReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

export default store