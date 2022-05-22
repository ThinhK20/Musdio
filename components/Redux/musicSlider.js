import { createSlice } from "@reduxjs/toolkit";

const musicSlider = createSlice({
    name: "musics",
    initialState: [],
    reducers: {
        addMusic(state, action) {
            state.push(action.payload)
        },
        removeMusic(state, action) {
            state.splice(action.payload, 1)
        }
    }
})

const { actions } = musicSlider
export const { addMusic, removeMusic } = actions
export default musicSlider.reducer