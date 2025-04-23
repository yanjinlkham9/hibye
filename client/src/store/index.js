import { configureStore } from "@reduxjs/toolkit";

import { loginReducer } from "./loginReducer";

const store = configureStore({
  reducer: {
    isLogin: loginReducer,
  },
});

export default store;
