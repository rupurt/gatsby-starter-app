/**
 * Calculates the periodic payment for an annuity investment based on
 * constant-amount periodic payments and a constant interest rate.
 *
 * @param interestRate interest rate per month
 * @param periods      number of periods in months
 * @param presentValue present value
 * @param futureValue  future value
 * @param paymentDue   when the payments are due
 */
export function pmt(
  interestRate: number,
  periods: number,
  presentValue: number,
  futureValue: number = 0,
  paymentDue: PaymentDue = PaymentDue.EndOfMonth
) {
  let pmt, pvif

  if (interestRate === 0) {
    return -(presentValue + futureValue) / periods
  }

  pvif = Math.pow(1 + interestRate, periods)
  pmt = (-interestRate * presentValue * (pvif + futureValue)) / (pvif - 1)

  if (paymentDue === PaymentDue.BeginningOfMonth) {
    pmt /= 1 + interestRate
  }

  return pmt
}

export enum PaymentDue {
  EndOfMonth = 0,
  BeginningOfMonth = 1,
}
