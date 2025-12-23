import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setEditCategory: (state, action) => {
      state.editCategory = action.payload;
    },
    clearEditCategory: (state) => {
      state.editCategory = null;
    },
  },
});

export const { setEditCategory, clearEditCategory } = categorySlice.actions;
export default categorySlice.reducer;
