import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductI } from '@/core/models/globals'

export interface CartState {
  products: ProductI[]
}

const initialState: CartState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductI>) => {
      state.products = [...state.products, action.payload]
    },
    removeProduct: (state, action: PayloadAction<ProductI>) => {
      state.products = [...state.products.filter((product: ProductI) => {return product.id !== action.payload.id })]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct } = cartSlice.actions

export default cartSlice.reducer