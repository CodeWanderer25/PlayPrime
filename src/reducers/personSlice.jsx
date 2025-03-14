import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info:null,
};

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setPersonInfo: (state, action) => {
            state.info = action.payload;
        },
        
        removePersonInfo: (state, action) => {
            state.info = null;
        },

    },
});

export const { setPersonInfo, removePersonInfo } = personSlice.actions;

export default personSlice.reducer;