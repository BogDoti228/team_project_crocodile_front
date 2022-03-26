import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface UserListType {
    usersList: Array<string>,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    usersList : [],
    loading: 'idle',
} as  UserListType


interface ObjectList {
    [index: string] : string
}

export const getUsersList = createAsyncThunk("getUsersList", async () => {
    const response : Promise<string> = fetch('https://localhost:8080/users/list')
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