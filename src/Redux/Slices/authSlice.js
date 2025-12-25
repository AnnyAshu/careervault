import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", {
        Username: username,
        Password: password,
      });

      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("roles", JSON.stringify(res.data.roles));

      return res.data;
    } catch (err) {
      return rejectWithValue("Server error");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.clear();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
