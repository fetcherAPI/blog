import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    articlesSlice,
    authSlice,
    userSlice,
  },
});
