import { createSlice } from "@reduxjs/toolkit";


const DataSlice = createSlice({
    name: 'Data',
    initialState: {
        data: [] as any[],
        status: "none"
    },
    reducers: {
        addData(state, action) {
            state.data.push(action.payload);
        }
    },
    // extraReducers: (builder) => {


    // }
})
export const { addData } = DataSlice.actions;
export default DataSlice.reducer;
