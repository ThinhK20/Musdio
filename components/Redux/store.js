import { configureStore } from "@reduxjs/toolkit";
import facebookSlider from "./facebookSlider";
import musicSlider from "./musicSlider";

const store = configureStore({
    reducer: {
        musics: musicSlider,
        facebook: facebookSlider
    }
})

export default store

