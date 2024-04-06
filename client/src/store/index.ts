import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  userSlice,
  imageSlice,
  profileSlice,
  themeSlice,
  postSlice,
  chatSlice,
  messageSlice,
  fileSlice,
  navbarSlice,
} from './features';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chat', 'user'],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  image: imageSlice.reducer,
  profile: profileSlice.reducer,
  theme: themeSlice.reducer,
  chat: chatSlice.reducer,
  post: postSlice.reducer,
  file: fileSlice.reducer,
  message: messageSlice.reducer,
  navbar: navbarSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => appDispatch = useDispatch;
export default store;
export const persistor = persistStore(store);
