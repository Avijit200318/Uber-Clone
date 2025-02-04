import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCaptain: null,
    error: null,
    loading: false,
}

const captainSlice = createSlice({
    name: 'captain',
    initialState,
    reducers: {
        captainSignInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        captainSignInSuccess: (state, action) => {
            state.currentCaptain = action.payload;
            state.loading = false;
            state.error = null;
        },
        captainSignInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        captainSignOutStart: (state) => {
            state.loading = true;
        },
        captainSignOutSuccess: (state) => {
            state.loading = false;
            state.currentCaptain = null;
            state.error = null;
        },
        captainSignOutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { captainSignInStart, captainSignInSuccess, captainSignInFailure, captainSignOutStart, captainSignOutSuccess, captainSignOutFailure} = captainSlice.actions;
export default captainSlice.reducer;