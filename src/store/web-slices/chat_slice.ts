import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface MessagesType {
    messages : Array<Message>
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface Message {
    Text : string,
    Name : string
}

const initialState = {
    messages: [],
    loading: 'idle',
} as MessagesType

export const sendMessage = createAsyncThunk("sendMessage", async (text : string) => {
    await fetch('https://localhost:8080/chat/message', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: localStorage.getItem("name"),
            text: text
        })
    })
})

export const getStoryMessage = createAsyncThunk("getStoryMessage", async () => {
    const response : Promise<string> = fetch('https://localhost:8080/chat/story')
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export const chatSlice = createSlice({
    name : "chatSlice",
    initialState : initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder.addCase(getStoryMessage.fulfilled, (state, action) => {
            const messages : Array<Message> = JSON.parse(action.payload)
            console.log(messages)
            state.messages = messages
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {

        })
    }
})

export const chatSliceReducers = chatSlice.reducer;