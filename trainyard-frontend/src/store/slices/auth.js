import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        id: "",
        email: "",
        name: "",
    },
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
};

const reducers = {
    login(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken(state, action) {
        state.accessToken = action.payload.accessToken;
    },
    setRefreshToken(state, action) {
        state.accessToken = action.payload.refreshToken;
    },
    logout(state) {
        state.isAuthenticated = false;
        state.user = initialState.user;
        state.accessToken = initialState.accessToken;
        state.refreshToken = initialState.refreshToken;
    },
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers,
});

export const { reducer } = authSlice;
