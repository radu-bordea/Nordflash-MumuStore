export const FREE_SHIPPING_THRESHOLD = 699; // NOK, incl. MVA
export const SHIPPING_FEE = 99; // NOK, incl. MVA

export const calculateShipping = (cartTotal: number) =>
  cartTotal === 0 || cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;