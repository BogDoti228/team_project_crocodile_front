import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {profileSliceReducers} from "./web-slices/profile_slice";
import {usersListSliceReducers} from "./web-slices/list_users_slice";
import {chatSliceReducers} from "./web-slices/chat_slice";
import {roleSliceReducers} from "./web-slices/role_slice";
import {chatMiddleware} from "./middlewares/chatMiddleware";
import {selectSliceReducers} from "./web-slices/select_slice";
import {canvasMiddleware} from "./middlewares/canvasMiddleware";
import {canvasSliceReducers} from "./web-slices/canvas_slice";
import {gameProcessSliceReducers} from "./web-slices/game_process_slice";
import {statisticsSliceReducers} from "./web-slices/statistics_slice";


const rootReducer = combineReducers({
    profileReducer : profileSliceReducers,
    usersListReducer : usersListSliceReducers,
    chatReducer : chatSliceReducers,
    roleReducer : roleSliceReducers,
    selectReducer : selectSliceReducers,
    canvasReducer: canvasSliceReducers,
    gameProcessReducer: gameProcessSliceReducers,
    statisticsReducer : statisticsSliceReducers
})

export const store = configureStore({
    reducer : rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatMiddleware, canvasMiddleware),
})

export type AppDispatch = typeof store.dispatch
export const useTypeDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof rootReducer>