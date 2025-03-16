import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice.ts"
import CompanySlice from "./CompanySlice.ts"
import ThemeSlice from "./ThemeSlice.tsx"
const store = configureStore({
    reducer: {
        data: DataSlice,
        company: CompanySlice,
        mode: ThemeSlice,
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;