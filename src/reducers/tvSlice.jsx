import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info:null,
};

export const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        setTvInfo: (state, action) => {
            state.info = action.payload;
        },
        
        removeTvInfo: (state, action) => {
            state.info = null;
        },

    },
});

export const { setTvInfo, removeTvInfo } = tvSlice.actions;

export default tvSlice.reducer;