import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  file: File | null;
};

const initialState: InitialState = {
  file: null,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, { payload }: PayloadAction<File | null>) => {
      state.file = payload;
    },
  },
});

export const { setFile } = fileSlice.actions;
