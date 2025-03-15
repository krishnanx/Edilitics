import { createSlice } from "@reduxjs/toolkit";


const CompanySlice = createSlice({
    name: 'company',
    initialState: {
        data: "" as string,

    },
    reducers: {
        addCompany(state, action) {
            state.data = action.payload;
        }
    },
    // extraReducers: (builder) => {


    // }
})
export const { addCompany } = CompanySlice.actions;
export default CompanySlice.reducer;
