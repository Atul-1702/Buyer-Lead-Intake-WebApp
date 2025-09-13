import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: { isLoginUI: true },
  reducers: {
    setLoginStateUI: (state, action) => {
      state.isLoginUI = action.payload;
    },
  },
});

export const { setLoginStateUI } = ownerSlice.actions;
export default ownerSlice.reducer;
