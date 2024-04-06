import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, User } from '@/types';

type InitialState = {
  user: User | null;
  profile: Profile | null;
};

const initialState: InitialState = {
  user: null,
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
    },
    setUserProfile: (state, { payload }: PayloadAction<Profile | null>) => {
      state.profile = payload;
    },
    editUser: (state, { payload }: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user!, ...payload };
    },
  },
});

export const { setUser, editUser, setUserProfile } = userSlice.actions;
