import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      state = payload
    },
  }
})

export const usersReducer = usersSlice.reducer
export const usersActions  = usersSlice.actions