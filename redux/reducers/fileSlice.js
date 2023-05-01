import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "selectedFile",
  initialState: {
    visibility: false,
    fileName: "",
    fileId: "",
  },
  reducers: {
    openFile(state, action) {
      state.visibility = true;
      state.fileName = action.payload.fileName;
      state.fileId = action.payload.fileId;
    },
    closeFile(state) {
      state.visibility = false;
      state.fileName = "";
      state.fileId = "";
    },
  },
});

export default fileSlice.reducer;
export const { openFile, closeFile } = fileSlice.actions;
