import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reducers/themeSlice";
import fileSlice from "./reducers/fileSlice";
import bookmarkSlice from "./reducers/bookmarkSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import searchSlice from "./reducers/searchSlice";

const persistThemeConfig = {
  key: "theme",
  storage: AsyncStorage,
};
const persistBookmarksConfig = {
  key: "bookmarks",
  storage: AsyncStorage,
};

const persistedThemeReducer = persistReducer(persistThemeConfig, themeSlice);
const persistedBookmarksReducer = persistReducer(
  persistBookmarksConfig,
  bookmarkSlice
);

const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    file: fileSlice,
    bookmarks: persistedBookmarksReducer,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default store;
export { persistor };
