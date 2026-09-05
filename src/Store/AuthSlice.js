import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../Utils/LocalStorage";
import { api } from "../Utils/api";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.login(email, password);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async ({ name, email, password, role }, { rejectWithValue }) => {
        try {
            const response = await api.register({ name, email, password, role });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async () => {
        await api.logout();
    }
);

const initialState = {
    users: getFromLocalStorage("users") || [],
    user: getFromLocalStorage("user") || null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                setToLocalStorage("user", action.payload);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })
            // Register
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                setToLocalStorage("user", action.payload);
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })
            // Logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("user");
            });
    }
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;