import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../API/Axios";
import toast from "react-hot-toast";

export const getCartDetails = createAsyncThunk(
  "/getCartDetails",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await api.get("/cart");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await api.post("/cart", data);
      const updatedCart = await api.get("/cart");
      toast.success("Added to cart!");
      return updatedCart.data;
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "deleteFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await api.delete(`/cart/${id}`);
      console.log(resp.data);
      toast.success("Removed from cart!");
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { loading: false, cart: { items: [], total: 0 }, error: null },
  reducers: {
    clearCart: (state) => {
      state.cart = { items: [], total: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        // console.log("fulfilled", action.payload);

        state.error = null;
      })
      .addCase(getCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        console.log("fulfilled", action.payload);
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
