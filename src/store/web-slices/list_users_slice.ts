import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";

interface UserListType {
    usersList: Array<string>,
    timeList: Array<string>,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    usersList : [],
    timeList : ["00:10","01:00", "02:00", "03:00", "04:00", "05:00"],
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
        .then((x) => {
            if (x.ok){
                return x.json();
            }
            console.error('Error get user list with status', x.status);
            return JSON.stringify([]);
        })
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
            console.log("accept user list")
            let userList : Array<ServerInfoUser> = [];

            try{
                userList = JSON.parse(action.payload);
            }
            catch (e)
            {
                console.error('Не могу распарсить JSON', action.payload)
                console.error(e)
            }
            state.usersList = userList.map(x => x.Name)

        })
    }
})

export const usersListSliceReducers = usersListSlice.reducer;