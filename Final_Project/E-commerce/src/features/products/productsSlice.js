
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { searchFoodProducts } from "../../api/foodApi";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (query = "chicken", { rejectWithValue }) => {
//     try {
//       return await searchFoodProducts(query);
//     } catch (error) {
//       return rejectWithValue(
//         error.message || "Unable to load meals."
//       );
//     }
//   }
// );

// const productsSlice = createSlice({
//   name: "products",

//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//     query: "chicken",
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state, action) => {
//         state.status = "loading";
//         state.error = null;
//         state.query = action.meta.arg || "chicken";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error =
//           action.payload || "Unable to load meals.";
//       });
//   },
// });

// export default productsSlice.reducer;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchFoodProducts } from "../../api/foodApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (query = "chicken", { rejectWithValue }) => {
    try {
      return await searchFoodProducts(query);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;
