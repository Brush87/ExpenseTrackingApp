export const TAX_AMOUNT = 0.15

export const calculateTaxes = (amount: number) => {
  const initialAmmount = amount * TAX_AMOUNT
  return Math.round((initialAmmount + Number.EPSILON) * 100) / 100
}

export const displayTaxedAmount = (amount: number) => {
  return amount.toFixed(2)
}