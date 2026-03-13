// ─────────────────────────────────────────────
// E-COMMERCE TYPES
// ─────────────────────────────────────────────

export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface ProductVariant {
  id: string
  label: string
  options: Record<string, string> // e.g. { color: 'Rouge', size: 'M' }
  price?: number // override in cents
  sku?: string
  stock?: number
  image?: string
}

export interface Product {
  id: string
  siteId: string
  name: string
  slug: string
  description?: string
  images: string[]
  price: number // cents
  compareAtPrice?: number
  currency: string
  sku?: string
  stock: number
  trackInventory: boolean
  isDigital: boolean
  digitalFileUrl?: string
  categoryId?: string
  tags: string[]
  status: ProductStatus
  variants: ProductVariant[]
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface ProductCategory {
  id: string
  siteId: string
  name: string
  slug: string
  parentId?: string
  image?: string
  children?: ProductCategory[]
  createdAt: string
  updatedAt: string
}

// ─── Cart ───

export interface CartItem {
  productId: string
  variantId?: string
  name: string
  image?: string
  price: number // cents
  quantity: number
  variantLabel?: string
  sku?: string
}

export interface Cart {
  items: CartItem[]
  couponCode?: string
}

// ─── Checkout ───

export interface AddressData {
  firstName: string
  lastName: string
  line1: string
  line2?: string
  city: string
  state?: string
  postalCode: string
  country: string
  phone?: string
}

export interface CheckoutData {
  email: string
  shippingAddress: AddressData
  billingAddress?: AddressData
  sameBillingAddress: boolean
  paymentMethod: 'stripe' | 'paypal'
  couponCode?: string
  notes?: string
}

export interface CheckoutResult {
  orderId: string
  orderNumber: string
  clientSecret?: string // Stripe
  paypalOrderId?: string // PayPal
}

// ─── Orders ───

export type OrderStatus =
  | 'PENDING' | 'PAYMENT_PENDING' | 'PAID' | 'PROCESSING'
  | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

export interface OrderItem {
  id: string
  orderId: string
  productId?: string
  name: string
  price: number
  quantity: number
  variantLabel?: string
  sku?: string
}

export interface Order {
  id: string
  siteId: string
  orderNumber: string
  email: string
  status: OrderStatus
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  shippingAddress: AddressData
  billingAddress?: AddressData
  paymentProvider?: string
  paymentId?: string
  couponId?: string
  notes?: string
  metadata: Record<string, unknown>
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

// ─── Coupons ───

export type CouponType = 'DISCOUNT_PERCENT' | 'DISCOUNT_FIXED' | 'FREE_SHIPPING'

export interface Coupon {
  id: string
  siteId: string
  code: string
  type: CouponType
  value: number // percent (e.g. 10) or cents (e.g. 500)
  minOrderAmount?: number
  maxUses?: number
  usedCount: number
  validFrom?: string
  validTo?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

// ─── Shipping ───

export interface ShippingRate {
  id: string
  name: string // e.g. "Standard", "Express"
  price: number // cents
  minOrderAmount?: number // free shipping threshold
  estimatedDays?: string // e.g. "3-5"
}

export interface ShippingZone {
  id: string
  siteId: string
  name: string
  countries: string[]
  rates: ShippingRate[]
  createdAt: string
  updatedAt: string
}

// ─── Tax ───

export interface TaxRate {
  id: string
  siteId: string
  name: string
  rate: number // e.g. 20 for 20%
  country?: string
  region?: string
  includeInPrice: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

// ─── Helpers ───

export function formatPrice(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)
}
