import { configureStore } from "@reduxjs/toolkit";
import facebookSlider from "./facebookSlider";
import generalSlider from "./generalSlider";
import musicSlider from "./musicSlider";

const store = configureStore({
    reducer: {
        musics: musicSlider,
        facebook: facebookSlider,
        general: generalSlider
    }
})

export default store

