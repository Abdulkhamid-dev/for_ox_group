import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import logger from "redux-logger";
import accounSLice from "./auth/authSlice";

const rootReducer = combineReducers({
  account: accounSLice,
});

const persistConfig = {
  key: "root",
  whitelist: ["account"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store as default, persistor };
