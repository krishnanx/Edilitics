import { createSlice } from "@reduxjs/toolkit"

const TooltipSlice = createSlice({
    name: "tooltip",
    initialState: {
        tip: {
            open: null,
            close: null,
            high: null,
            low: null,
            volume: null,
            date: "" as String
        }
    },
    reducers: {
        addTip(state, action) {
            state.tip = action.payload
        }
    }
})
export const { addTip } = TooltipSlice.actions
export default TooltipSlice.reducer
