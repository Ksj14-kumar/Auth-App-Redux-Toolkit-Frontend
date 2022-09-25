import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./features/authSlice"
const store = configureStore({
    reducer: {
        Auth: AuthReducer
    },
    devTools: false
})
export default store;