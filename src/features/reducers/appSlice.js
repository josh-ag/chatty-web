import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: true };

const appSlice = createSlice({
  name: "appslice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
});

export const { reset } = appSlice.actions;
export default appSlice.reducer;
