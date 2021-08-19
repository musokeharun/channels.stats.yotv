import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createToast, createToastLoading} from "../../utils/toasts";
import Http from "../../services/http";

const initialState = {
    main: {},
    mostDay: {},
    mostHour: {},
    meta: {},
    channels: [],
    epg: {},
    selectedChannels: "",
    dates: []
};

let toastLoading = createToastLoading();

export const fetchMain = createAsyncThunk(
    "funnel/main",
    async (body) => {
        let {data} = await Http.post("partner/funnel", body);
        // console.log(data);
        return data;
    })

export const fetchEpg = createAsyncThunk(
    "funnel/epg",
    async (body) => {
        let {data} = await Http.post("partner/epg", body);
        // console.log(data);
        return data;
    })

export const fetchChannels = createAsyncThunk(
    "funnel/channels",
    async () => {
        let {data} = await Http.post("auth/list");
        return data;
    })

let funnel = createSlice({
    name: "funnel",
    initialState,
    reducers: {
        concat: state => {
            console.log(state);
        },
        alterState: (state, action) => {
            const {prop, data} = action.payload;
            state[prop] = data;
        },
        setMax: (state, action) => {
            state.max = action.payload;
        },
        setSelectedChannels: (state, action) => {
            state.selectedChannels = action.payload;
        },
        setDates: (state, action) => {
            state.dates = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMain.pending, (state) => {
                toastLoading.fire({
                    title: "Retrieving Data",
                }).then(r => console.log("Toasted"))
            })
            .addCase(fetchMain.fulfilled, (state, action) => {
                state.main = action.payload.data;
                state.meta = action.payload.meta;
                toastLoading.close();
            })
            .addCase(fetchMain.rejected, state => {
                createToast().fire({
                    title: "Could not fetch query",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.channels = action.payload;
                toastLoading.close();
            })
            .addCase(fetchChannels.rejected, state => {
                createToast().fire({
                    title: "Could not fetch channels",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            })
            .addCase(fetchEpg.fulfilled, (state, action) => {
                state.epg = action.payload;
                toastLoading.close();
            })
            .addCase(fetchEpg.rejected, state => {
                createToast().fire({
                    title: "Could not fetch epg",
                    icon: "error"
                }).then((e) => console.error("Toasted", e))
            });
    }
});

export const fetchData = (body, prop) => async (dispatch, getState) => {
    try {
        let {data} = await Http.post("partner/funnel", body);
        dispatch(alterState({
            data: data.data,
            prop
        }));
    } catch (e) {
        return {};
    }
};

export const {alterState, concat, setMax, setSelectedChannels,setDates} = funnel.actions;
export const selectMain = (state) => state.funnel.main;
export const selectEpg = (state) => state.funnel.epg;
export const selectMeta = (state) => state.funnel.meta;
export const selectMostDay = (state) => state.funnel.mostDay;
export const selectMostHour = (state) => state.funnel.mostHour;
export const selectChannels = (state) => state.funnel.channels;
export const selectSelectedRange = (state) => state.funnel.dates;
export const getSelectedChannels = (state) => state.funnel.selectedChannels;
export default funnel.reducer;