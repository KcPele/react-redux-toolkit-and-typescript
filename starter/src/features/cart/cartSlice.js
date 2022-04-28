import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", 
  async (name, thunkAPI) => {
      console.log(name)
      //i can do anything with the thunkAPI check the console
      console.log(thunkAPI)
      try {
        const resp = await axios(url)
        return resp.data
      } catch(error){
          console.log(error)
        return thunkAPI.rejectWithValue('something went wrong')
      }
    
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
        console.log(action)
        state.isLoading = false;

    }
  },
});

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
