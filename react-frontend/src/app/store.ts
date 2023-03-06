import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";
import { usersApi } from "../apis/usersApi";
import authReducer from "../features/auth/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { oauthApi } from "../apis/oauthApi";
import { servicesApi } from "../apis/servicesApi";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [oauthApi.reducerPath]: oauthApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(oauthApi.middleware)
      .concat(servicesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
