import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info:null,
};

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovieInfo: (state, action) => {
            state.info = action.payload;
        },
        
        removeMovieInfo: (state, action) => {
            state.info = null;
        },

    },
});

export const { setMovieInfo, removeMovieInfo } = movieSlice.actions;

export default movieSlice.reducer;