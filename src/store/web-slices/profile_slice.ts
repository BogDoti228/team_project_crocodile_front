import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ROOM_ID_IN_STORAGE} from "./chat_slice";

interface ProfileType {
    isAuth: boolean,
    name : string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed',
    isRoomExist : boolean
}

const initialState = {
    isAuth: false,
    name: "none",
    loading: 'idle',
    isRoomExist : false
} as ProfileType

export type RoomInfo = {
    isRoomExist : boolean
}

export const getName = createAsyncThunk("getName", async () => {
    const response : Promise<ProfileType> = fetch('https://localhost:8080/user/profile')
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export const postName = createAsyncThunk("postName", async (name : string) => {
    await fetch('https://localhost:8080/user/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, roomId: sessionStorage.getItem(ROOM_ID_IN_STORAGE)})
    })
})

export const deleteName = createAsyncThunk("deleteName", async (name : string) => {
    await fetch('https://localhost:8080/user/profile', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, roomId: sessionStorage.getItem(ROOM_ID_IN_STORAGE)})
    })
})

export const checkExistingRoom = createAsyncThunk("checkExistingRoom", async (roomId : string) => {
    const response : Promise<RoomInfo> = await fetch('https://localhost:8080/user/rooms', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Room-Id": roomId
        }
    }).then((x) => x.json())
        .catch(console.log)
    return await response
})

export const profileSlice = createSlice({
    name : "profileSlice",
    initialState : initialState,
    reducers : {
        setName : (state, action) => {
            state.name = action.payload;
        },
        setAuth : (state, action) => {
            state.isAuth = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getName.fulfilled, (state, action) => {
            state.name = action.payload.name
        })
        builder.addCase(postName.fulfilled, () => {
        })
        builder.addCase(deleteName.fulfilled, () => {
        })
        builder.addCase(checkExistingRoom.fulfilled, (state, action) => {
            state.isRoomExist = action.payload.isRoomExist
        })
    }
})

export const profileSliceReducers = profileSlice.reducer;
export const {setName, setAuth} = profileSlice.actions