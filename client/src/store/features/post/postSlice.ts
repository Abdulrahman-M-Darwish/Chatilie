import { Post } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  postToUpdate: string | null;
  postToShow: Post | null;
};

const initialState: InitialState = {
  postToUpdate: null,
  postToShow: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost: (state, { payload }: PayloadAction<string | null>) => {
      state.postToUpdate = payload;
    },
    showPost: (state, { payload }: PayloadAction<Post | null>) => {
      state.postToShow = payload;
    },
  },
});

export const { updatePost, showPost } = postSlice.actions;
