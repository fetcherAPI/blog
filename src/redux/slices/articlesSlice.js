import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  article: {},
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },
    setArticle(state, action) {
      state.article = { ...action.payload };
    },
  },
});

export const { setArticles, setArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
