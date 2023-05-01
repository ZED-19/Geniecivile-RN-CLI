import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: false,
  },
  reducers: {
    setTheme(state) {
      state.value = !state.value;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
