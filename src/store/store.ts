import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice.ts"
import CompanySlice from "./CompanySlice.ts"
const store = configureStore({
    reducer: {
        data: DataSlice,
        company: CompanySlice,
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;