import { createSlice } from "@reduxjs/toolkit";
import { FlatList } from "native-base";

const isLoggedin = false
const userData = null
const isImageLoading = false

const userSlider = createSlice({
    name: "user",
    initialState: {isLoggedin, userData, isImageLoading},
    reducers: {
        setLogginStatus(state) {
            state.isLoggedin = !state.isLoggedin
        },
        setUser(state, action) {
            state.userData = action.payload
        },
        setImageStatus(state) {
            state.isImageLoading = !state.isImageLoading
        },
        deleteUserInfo(state){
            state.userData = null
            state.isImageLoading = false
            state.isLoggedin = false
        }
    }
})

const { actions } = userSlider
export const { setLogginStatus, setUser, setImageAvatarStatus,deleteUserInfo } = actions
export default userSlider.reducer