import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createToast, createToastLoading} from "../../../utils/toasts";
import Http from "../../../services/http";

const initialState = {
    realtime: {},
    dashboard: {}
};

let toastLoading = createToastLoading();

export const fetchRealtime = createAsyncThunk(
    "overview/realtime",
    async () => {
        let {data} = await Http.get("partner/realtime");
        // console.log(data);
        return data;
    })

export const fetchDashBoard = createAsyncThunk(
    "overview/dashboard",
    async () => {
        let {data} = await Http.get("partner/dashboard");
        // console.log(data);
        return data;
    })

let overviewSlice = createSlice({
    name: "overview",
    initialState,
    reducers: {
        concat: state => {
            console.log(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRealtime.pending, (state) => {
                toastLoading.fire({
                    title: "Retrieving Data",
                }).then(r => console.log("Toasted"))
            })
            .addCase(fetchRealtime.fulfilled, (state, action) => {
                state.realtime = action.payload;
                toastLoading.close();
            })
            .addCase(fetchRealtime.rejected, state => {
                createToast().fire({
                    title: "Could not fetch data",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            })
            .addCase(fetchDashBoard.pending, (state => {
                toastLoading.fire({
                    title: "Retrieving Data",
                }).then(r => console.log("Toasted"))
            }))
            .addCase(fetchDashBoard.fulfilled, (state, action) => {
                state.dashboard = action.payload;
                toastLoading.close();
            })
    }
});

export const selectRealtime = (state) => state.overview.realtime;
export const selectDashboard = (state) => state.overview.dashboard;
export default overviewSlice.reducer;