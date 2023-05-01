import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const bookmarkSlice = createSlice({
  name: "selectedFile",
  initialState: {
    idsList: [],
    filesList: [],
  },
  reducers: {
    bookmarksOperation(state, action) {
      const { fileName, fileId } = action.payload;

      if (state.idsList.includes(fileId)) {
        const index = state.idsList.indexOf(fileId);
        state.idsList.splice(index, 1);
        state.filesList.splice(index, 1);
      } else {
        state.idsList = [...state.idsList, fileId];
        state.filesList = [...state.filesList, { file: fileName, id: fileId }];
      }
    },
    removeFile(state, action) {
      const { fileName, fileId } = action.payload;
      const index = state.idsList.indexOf(fileId);
      state.idsList.splice(index, 1);
      state.filesList.splice(index, 1);
    },
    removeAll(state) {
      state.filesList = [];
      state.idsList = [];
    },
  },
});

export default bookmarkSlice.reducer;
export const { bookmarksOperation, removeFile, removeAll } =
  bookmarkSlice.actions;
