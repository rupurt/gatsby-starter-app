import React, { useState } from 'react'
/* import { Decimal } from 'decimal.js' */
import { pmt } from '../utils/pmt'

const DEFAULT_AMOUNT = 350000
const DEFAULT_INTEREST_RATE = 3.5
const DEFAULT_TERM = 30

const AmortizationSchedule: React.FC = () => {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE)
  const [term, setTerm] = useState(DEFAULT_TERM)
  const [monthlyPmt, setMonthlyPrincipalAndInterest] = useState(
    calculateMonthlyPmt(amount, interestRate, term)
  )
  const [rows, setRows] = useState(
    calculateRows(monthlyPmt, amount, interestRate)
  )

  return (
    <>
      <div>
        <div>
          <div>
            <label htmlFor="mortgage[amount]">Loan Amount:</label>
            $
            <input
              name="mortgage[amount]"
              type="number"
              min="0"
              step="1"
              onChange={e => {
                setAmount(parseFloat(e.target.value))
                setMonthlyPrincipalAndInterest(
                  calculateMonthlyPmt(amount, interestRate, term)
                )
                setRows(calculateRows(monthlyPmt, amount, interestRate))
              }}
              defaultValue={DEFAULT_AMOUNT}
            />
          </div>
          <div>
            <label htmlFor="mortgage[interest_rate]">Interest Rate:</label>
            <input
              name="mortgage[interest_rate]"
              type="number"
              min="0"
              step="0.01"
              onChange={e => {
                setInterestRate(parseFloat(e.target.value))
                setMonthlyPrincipalAndInterest(
                  calculateMonthlyPmt(amount, interestRate, term)
                )
                setRows(calculateRows(monthlyPmt, amount, interestRate))
              }}
              defaultValue={DEFAULT_INTEREST_RATE}
            />
            %
          </div>
          <div>
            <label htmlFor="mortgage[term]">Term:</label>
            <input
              name="mortgage[term]"
              type="number"
              min="0"
              step="1"
              onChange={e => {
                setTerm(parseInt(e.target.value, 10))
                setMonthlyPrincipalAndInterest(
                  calculateMonthlyPmt(amount, interestRate, term)
                )
                setRows(calculateRows(monthlyPmt, amount, interestRate))
              }}
              defaultValue={DEFAULT_TERM}
            />{' '}
            years
          </div>
        </div>
        <div>
          <div>
            <label>Monthly Principal & Interest:</label>${monthlyPmt}
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Payment Number</th>
            <th>Payment Amount</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Balance</th>
            <th>Cumulative Interest</th>
            <th>Cumulative Equity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <AmortizationRow key={i} {...r} />
          ))}
        </tbody>
      </table>
    </>
  )
}

function calculateMonthlyPmt(
  loanAmount: number,
  loanRate: number,
  loanTerm: number
): number {
  return -pmt(loanRate / 100 / 12, loanTerm * 12, loanAmount)
}

function calculateRows(
  monthlyPmt: number,
  initialAmount: number,
  rate: number
): Row[] {
  const rows: Row[] = []
  const monthlyRate = rate / 100 / 12
  let interest = initialAmount * monthlyRate
  let principal = monthlyPmt - interest
  let balance = initialAmount - principal
  let lastRow: Row = {
    paymentNumber: 1,
    paymentAmount: monthlyPmt,
    interest: interest,
    principal: principal,
    balance: balance,
    cumulativeInterest: interest,
    cumulativeEquity: principal,
  }

  // TODO:
  // - Test this
  // - It should not infinite loop on infinitely small amounts
  do {
    rows.push(lastRow)

    interest = lastRow.balance * monthlyRate
    principal = monthlyPmt - interest
    balance = lastRow.balance - principal
    lastRow = {
      paymentNumber: lastRow.paymentNumber + 1,
      paymentAmount: monthlyPmt,
      interest: interest,
      principal: principal,
      balance: balance,
      cumulativeInterest: lastRow.cumulativeInterest + interest,
      cumulativeEquity: lastRow.cumulativeEquity + principal,
    }
    console.log('=========================')
    console.log('------------ lastPaymentNumber: %o', lastRow.paymentNumber)
    console.log('------------ balance: %o', balance)
  } while (balance > 0)

  return rows
}

type Row = {
  paymentNumber: number
  paymentAmount: number
  interest: number
  principal: number
  balance: number
  cumulativeInterest: number
  cumulativeEquity: number
}

const AmortizationRow: React.FC<Row> = row => {
  return (
    <tr>
      <td>{row.paymentNumber}</td>
      <td>${row.paymentAmount}</td>
      <td>${row.interest}</td>
      <td>${row.principal}</td>
      <td>${row.balance}</td>
      <td>${row.cumulativeInterest}</td>
      <td>${row.cumulativeEquity}</td>
    </tr>
  )
}

export default AmortizationSchedule
