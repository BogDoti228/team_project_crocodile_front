import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {profileSliceReducers} from "./web-slices/profile_slice";
import {usersListSliceReducers} from "./web-slices/list_users_slice";
import {chatSliceReducers} from "./web-slices/chat_slice";
import {canvasSliceReducers} from "./web-slices/canvas_slice";
import {signal} from "./middlewares/chatMiddleware";

const rootReducer = combineReducers({
    profileReducer : profileSliceReducers,
    usersListReducer : usersListSliceReducers,
    chatReducer : chatSliceReducers,
    canvasReducer : canvasSliceReducers,
})

export const store = configureStore({
    reducer : rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(signal),
})

export type AppDispatch = typeof store.dispatch
export const useTypeDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof rootReducer>