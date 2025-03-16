import { createSlice } from "@reduxjs/toolkit";
const ThemeSlice = createSlice({
    name: 'Theme',
    initialState: {
        mode: "dark" as string
    },
    reducers: {
        addTheme(state, action) {
            state.mode = action.payload;
        }
    }
})
export const { addTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;