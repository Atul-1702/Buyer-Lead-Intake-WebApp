import { configureStore } from "@reduxjs/toolkit";
import OwnerSlice from "./ownerSlice";

const store = configureStore({
  reducer: {
    OwnerSlice,
  },
});

export default store;
