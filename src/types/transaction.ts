export interface Transaction {
  id?: string
  transaction_date: string
  customer_name: string
  laptop_brand: string
  laptop_model: string
  price: number
  quantity: number
  subtotal: number
  ppn: number
  pph: number
  total_price: number
  created_at?: string
}