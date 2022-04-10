import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface SelectType {
    currentTimer : string,
    currentStartUser: string,
    words : Array<string>,
    currentWord: string,
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    currentTimer : "",
    currentStartUser: "",
    words: ["Аниме", "Бебра", "Амогус", "Телевизор", "Чешуя"],
    currentWord: "Игра не началась",
    loading: 'idle',
} as SelectType

/*export const getCanvasImage = createAsyncThunk("getCanvasImage", async () => {
    const response : Promise<string> = fetch('https://localhost:8080/canvas/get')
        .then((x) => x.json())
        .catch(console.log)
    return await response
})

export const postCanvasImage = createAsyncThunk("postCanvasImage", async (url : string) => {
    await fetch('https://localhost:8080/canvas/post', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({canvas: url})
    })
})*/

export const selectSlice = createSlice({
    name : "selectSlice",
    initialState : initialState,
    reducers : {
        setCurrentTimer : (state, action) => {
            state.currentTimer = action.payload
        },
        setCurrentStartUser : (state, action) => {
            state.currentStartUser = action.payload
        },
        generateNewWord : (state) => {
            const getRandomInt = (length : number) => {
                return Math.floor(Math.random() * length);
            }

            state.currentWord = state.words[getRandomInt(state.words.length)]
            console.log("adad")
        }
    },
    /*extraReducers: (builder) => {
    }*/
})

export const selectSliceReducers = selectSlice.reducer;
export  const {setCurrentStartUser, setCurrentTimer, generateNewWord} = selectSlice.actions