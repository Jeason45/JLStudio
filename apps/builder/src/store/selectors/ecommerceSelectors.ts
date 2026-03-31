import type { EditorState } from '../types'

export const selectEcommerceProducts = (s: EditorState) => s.ecommerceProducts
export const selectEcommerceCategories = (s: EditorState) => s.ecommerceCategories
export const selectEcommerceOrders = (s: EditorState) => s.ecommerceOrders
export const selectActiveProductId = (s: EditorState) => s.activeProductId
export const selectActiveOrderId = (s: EditorState) => s.activeOrderId

export const selectActiveProduct = (s: EditorState) =>
  s.ecommerceProducts.find(p => p.id === s.activeProductId) ?? null

export const selectActiveOrder = (s: EditorState) =>
  s.ecommerceOrders.find(o => o.id === s.activeOrderId) ?? null
