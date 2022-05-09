import { createSlice } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'

let initialState = ''
let timeoutID

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setNotification, removeNotification } = NotificationSlice.actions

export const setNotificationTime = (note, time) => {
  return async dispatch => {
    dispatch(setNotification(note))
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = await setTimeout(() => {dispatch(removeNotification(''))}, time*1000)
  }
}

export default NotificationSlice.reducer