import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart", // this is a slice name ( the cartSlice is send as its name "cart" to the store so then we can call this slice name as cart not cartSlice)
  initialState,
  reducers: {
    // THESE ARE 5 REDUCERS AND 5 ACTION CREATORS.
    addItem(state, action) {
      // pushing the newly created item to the cart.
      //  payload = newItem [here the payload we need pass newItem]
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId [ to this ]
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // to delete the item from the cart if quantity is = 0;
      // here to manually call the one of the reducer inside another reudcer we can use this ** trick **.
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      // here to clear the cart we don't even need the action.
      state.cart = [];
    },
  },
});

// lets now take the 5 Reducers and 5 action creators
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer; // to

// SELECTOR FUNCTIONS: (the function called by the useSelector() ) [ in large appn we should use ** reselect ** liberary]
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
//(state.cart.cart)--> here the slice name is cart and we have and we have property cart in the initialState and we have passed the initialState to the cartSlice.

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0; // Explained below.

/////----------------/////////

// In the provided cartSlice code, each function inside the reducers object serves as both a reducer and an action creator.

// export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0) -->
//Q ) how can the getTotalCartQuentity can access the store(cart.quantity which is the initialState given to reducer)even though it not in the slice ?
//Ans: since it not inside the slice , it can be accessed by the useSelector( ) which get accese to the store and contains all the state . so in CartOverview.jsx [  const totalCartQuantity = useSelector(getTotalCartQuantity);] here the useSelector gets the all the state of the store and the and give it the [reduce((sum, item) => sum + item.quantity, 0);] reducer function by the selector .  [ basically the useSelector( ) provides the cart to these functions]

/// export const getCurrentQuantityById = (id) => (state) => state.cart.cart.find((item) => (item.pizzaId === id)?.quantity ?? 0);
// here i am calling the getCurrentQuantityById for each MenuItem and i am passing an Id then it checks wheather that id is already in the cart by checking its quentity ** by OPTIONAL CHAINING ** if the item is present in a cart(quantity > 0) then it returns a quantity if the item is not present in the cart then it returns 0.
