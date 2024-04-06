import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isMinimal: boolean;
};

const initialState: InitialState = {
  isMinimal: false,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setIsMinimal(state, { payload }: PayloadAction<boolean>) {
      state.isMinimal = payload;
    },
  },
});

export const { setIsMinimal } = navbarSlice.actions;
