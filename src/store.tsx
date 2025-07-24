import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/authentication/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist `auth` reducer
};

const rootReducer = combineReducers({
  auth: authReducer,
  // add other reducers here later
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
