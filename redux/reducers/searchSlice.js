import {createSlice} from '@reduxjs/toolkit';
import {icons} from '../../assets/icons';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    listDisplay: 'flex',
    searchDisplay: 'none',
    inputAreaWidth: '60%',
    inputWidth: '82.5%',
    inputWidth: '82.5%',
    icon: icons.searchOutline,
  },
  reducers: {
    openSearch(state) {
      state.listDisplay = 'none';
      state.searchDisplay = 'flex';
      state.inputAreaWidth = '90%';
      state.inputWidth = '82.5%';
      state.icon = icons.search;
    },
    closeSearch(state) {
      state.listDisplay = 'flex';
      state.searchDisplay = 'none';
      state.inputAreaWidth = '60%';
      state.inputWidth = '82.5%';
      state.icon = icons.searchOutline;
    },
  },
});

export default searchSlice.reducer;
export const {openSearch, closeSearch} = searchSlice.actions;
