import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    articlesSlice,
    authSlice,
  },
});
