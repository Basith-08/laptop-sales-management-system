export const calculateTransaction = (price: number, quantity: number) => {
    const subtotal = price * quantity
    const ppn = subtotal * 0.11
    const pph = subtotal * 0.025
    const total_price = subtotal + ppn + pph
    return {
        subtotal,
        ppn,
        pph,
        total_price
    }
}
