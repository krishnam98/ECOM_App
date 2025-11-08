import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../API/Axios";
import { toast } from "react-hot-toast";

const getProducts = createAsyncThunk(
  "/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await api.get("/products");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: { loading: false, products: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { getProducts };
export default productSlice.reducer;
