import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, User } from '@/types';

type InitialState = {
  profile: Profile | null;
  user: User | null;
};

const initialState: InitialState = {
  profile: null,
  user: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<Partial<InitialState>>) => {
      state.profile = payload.profile || state.profile;
      state.user = payload.user || state.user;
    },
    editProfile: (state, { payload }: PayloadAction<Partial<Profile>>) => ({
      ...state,
      ...payload,
    }),
  },
});
export const { setProfile, editProfile } = profileSlice.actions;
