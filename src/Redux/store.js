import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Import reducers or create your own
import cartReducer from './CartSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  // Add any blacklist/whitelist configuration here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Add any middleware or enhancers here
});

export const persistor = persistStore(store);
