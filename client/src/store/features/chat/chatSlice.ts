import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

export const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateChat: (state, action: PayloadAction<Partial<InitialState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateChat } = chatSlice.actions;
