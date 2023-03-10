import { persistStore, persistReducer, PERSIST, REGISTER } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import reducer from "../reducers/reducer";

const persistConfig = {
    key: "root",
    storage,
};

const reducers = combineReducers({ data: reducer.state });
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ PERSIST, REGISTER ],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };