import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    openCartModal: false
  },
  reducers: {
    // Add item to the cart
    addItem(state, action) {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    // Remove item from the cart
    removeItem(state, action) {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item._id !== itemIdToRemove);
    },
    // Clear all items from the cart
    clearCart(state) {
      state.items = [];
    },
    // Toggle open/close cart modal
    cartModal(state, action) {
        state.openCartModal = action.payload
    }
  },
});

export const { addItem, removeItem, clearCart, cartModal } = cartSlice.actions;

export default cartSlice.reducer;
