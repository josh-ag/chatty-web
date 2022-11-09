import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/queries";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import ThemeSlice from "./reducers/themeSlice";

const store = configureStore({
  reducer: {
    theme: ThemeSlice,
    [api.reducerPath]: api.reducer,
  },
  //adding middleware enable caching, polling, invalidation and other useful features of rtkQuery
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

//enable refetchOnMount & reFetchOnReconnect
setupListeners(store.dispatch);

export default store;
