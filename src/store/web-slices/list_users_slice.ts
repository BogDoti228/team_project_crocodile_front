import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";
import {profileSlice} from "./profile_slice";

export interface UserInfoType {
    name : string,
    score : string
}

interface UserListType {
    usersList: Array<UserInfoType>,
    timeList: Array<string>,
    scoreList: Array<string>,
    settingsShow: boolean,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface ServerUserInfoType {
    Name: string,
    Score: string
}

const initialState = {
    usersList : [],
    timeList : ["00:10","01:00", "02:00", "03:00", "04:00", "05:00"],
    scoreList : ["5", "10", "15", "20", "25", "30"],
    loading: 'idle',
    settingsShow: false,
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

export const usersListSlice = createSlice({
    name : "userListSlice",
    initialState : initialState,
    reducers : {
        setSettingsShow : (state, action) => {
            state.settingsShow = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersList.fulfilled, (state, action) => {
            //console.log("accept user list")
            let userList : Array<ServerUserInfoType> = [];

            try{
                userList = JSON.parse(action.payload);
            }
            catch (e)
            {
                console.error('Не могу распарсить JSON', action.payload)
                console.error(e)
            }
            state.usersList = userList.map(x => {return {name : x.Name, score : x.Score}})

        })
    }
})

export const usersListSliceReducers = usersListSlice.reducer;
export const {setSettingsShow} = usersListSlice.actions