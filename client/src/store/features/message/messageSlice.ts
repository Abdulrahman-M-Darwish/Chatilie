import { Message } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = Message[];

const initialState: InitialState = [];

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => action.payload,
    addMessages: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { setMessages, addMessages } = messageSlice.actions;
