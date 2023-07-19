import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userStore from "./user";

const rootReducer = combineReducers({
  userStore: userStore.reducer,
  // Add reducers here
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
