import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {profileSliceReducers} from "./web-slices/profile_slice";

const rootReducer = combineReducers({
    profileReducer : profileSliceReducers
})

export const store = configureStore({
    reducer : rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useTypeDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof rootReducer>