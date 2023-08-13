import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../features/users/index";

export const store = configureStore({
    reducer: {
        users: usersReducer,
    }
})

// console.log(store.getState());