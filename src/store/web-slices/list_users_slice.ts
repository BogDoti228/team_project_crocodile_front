import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";

interface UserListType {
    usersList: Array<string>,
    timeList: Array<string>,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    usersList : [],
    timeList : ["01:00", "02:00", "03:00", "04:00", "05:00"],
    loading: 'idle',
} as  UserListType


interface ObjectList {
    [index: string] : string
}

export const getUsersList = createAsyncThunk("getUsersList", async () => {
    const response : Promise<string> = fetch('https://localhost:8080/users/list', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string
        }
    })
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

interface ServerInfoUser {
    Name : string
}

export const usersListSlice = createSlice({
    name : "userListSlice",
    initialState : initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(getUsersList.fulfilled, (state, action) => {
            const userList : Array<ServerInfoUser> = JSON.parse(action.payload)
            state.usersList = userList.map(x => x.Name)
        })
    }
})

export const usersListSliceReducers = usersListSlice.reducer;