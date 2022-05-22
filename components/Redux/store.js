import { configureStore } from "@reduxjs/toolkit";
import musicSlider from "./musicSlider";

const store = configureStore({
    reducer: {
        musics: musicSlider
    }
})

export default store

