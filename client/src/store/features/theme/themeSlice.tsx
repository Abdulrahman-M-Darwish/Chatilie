import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorScheme: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDark: (state, { payload }: PayloadAction<string>) => {
      state.colorScheme = payload;
    },
  },
});

export const { setIsDark } = themeSlice.actions;
