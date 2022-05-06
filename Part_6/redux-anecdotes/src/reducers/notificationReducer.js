import { createSlice } from '@reduxjs/toolkit'

let initialState = ''

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
export default NotificationSlice.reducer