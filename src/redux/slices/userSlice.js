import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initailState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
