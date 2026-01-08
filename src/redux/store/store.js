import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "../slice/contactsSlice";
import filterSlice from "../slice/filterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const contactsPersistConfig = {
  key: "contacts",
  storage,
};

const filterPersistConfig = {
  key: "filter",
  storage,
};

const persistedContactsReducer = persistReducer(contactsPersistConfig, contactsReducer);
const persistedFilterReducer = persistReducer(filterPersistConfig, filterSlice);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: persistedFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
