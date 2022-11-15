import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//authenticate user
export const Authenticate = createAsyncThunk(
  "/auth/isAuthenticated",
  async (_, thunkAPI) => {
    const authToken = localStorage.getItem("__chatty_token__");
    if (authToken) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
);

//logout user
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  localStorage.removeItem("__chatty_token__");

  return { isAuthenticated: false };
});

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(Authenticate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Authenticate.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
      }),
});

export default authSlice.reducer;
