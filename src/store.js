import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

// configureStore() is given by the redux tool kit
// it(store) recives an object with a reducre property from the userSlice.js(we exported there)
const store = configureStore({
  reducer: {
    user: userReducer, // i am renaming useReducer as a user
    cart: cartReducer,
  },
});

export default store;
