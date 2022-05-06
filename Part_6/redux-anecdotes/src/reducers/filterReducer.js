import { createSlice } from '@reduxjs/toolkit'

let initialState = ''

const FilterSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    filterChange(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { filterChange } = FilterSlice.actions
export default FilterSlice.reducer