import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  user: [],
  messages: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, { payload } ) => {
 
      if (Array.isArray(payload) && payload.length) {
        //@ts-ignore
        state.users.push(...payload)
      }    
    },
    selectUser: (state, { payload }) => {
      state.user = []
      state.user = payload
    },
    displayMessages: (state, { payload }) => {
      //@ts-ignore
      state.messages.push(payload)
    },
    clearMessages: (state) => {
      state.messages = []
    }
  }
})

export const usersReducer = usersSlice.reducer
export const usersActions  = usersSlice.actions