import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice.ts"
const store = configureStore({
    reducer: {
        data: DataSlice,
    }
})
export default store 