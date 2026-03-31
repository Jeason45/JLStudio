import type { StateCreator } from 'zustand'
import type { EditorState, EcommerceSlice } from '../types'

export const createEcommerceSlice: StateCreator<EditorState, [['zustand/immer', never]], [], EcommerceSlice> = (set, get) => ({
  ecommerceProducts: [],
  ecommerceCategories: [],
  ecommerceOrders: [],
  activeProductId: null,
  activeOrderId: null,

  setEcommerceProducts: (products) => set((state) => { state.ecommerceProducts = products }),
  setEcommerceCategories: (categories) => set((state) => { state.ecommerceCategories = categories }),
  setEcommerceOrders: (orders) => set((state) => { state.ecommerceOrders = orders }),
  setActiveProductId: (id) => set((state) => { state.activeProductId = id }),
  setActiveOrderId: (id) => set((state) => { state.activeOrderId = id }),
})
