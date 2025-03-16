import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice.ts"
import CompanySlice from "./CompanySlice.ts"
import ThemeSlice from "./ThemeSlice.tsx"
import TooltipSlice from "./TooltipSlice.tsx"
const store = configureStore({
    reducer: {
        data: DataSlice,
        company: CompanySlice,
        mode: ThemeSlice,
        tip: TooltipSlice
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;