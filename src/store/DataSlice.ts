import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/SupaClient.ts"
interface DataPoint {
    Date: string;  // match your backend data
    Open: number;
    High: number;
    Low: number;
    Close: number;
    "Adj Close": number;
    Volume: number;
    company: string;
}
const DataSlice = createSlice({
    name: 'Data',
    initialState: {
        data: [] as DataPoint[],
        status: "none"
    },
    reducers: {
        addData(state, action) {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.status = "idle"
            state.data = action.payload ?? []
        })
        builder.addCase(getData.rejected, (state) => {
            state.status = "failed";

        });

    }
})
export const { addData } = DataSlice.actions;
export default DataSlice.reducer;
type getData = {
    company: string | string[];
}
export const getData = createAsyncThunk("company/getCompany", async ({ company }: getData) => {
    console.log("hi")
    console.log(company[0])
    // console.log(email, password)
    // try {
    //     const response = await SignUpNewUser(email, password);
    //     return response; // Return response data to update Redux state
    // } catch (error) {
    //     return thunkAPI.rejectWithValue(error.message);
    // }
    try {
        const { data: value } = await supabase
            .from('Data')
            .select('*')
            .eq("company", company[0])
        console.log(value)
        return value;
    }
    catch (e) {
        console.log(e);
    }
});