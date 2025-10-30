import React, { useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

const Summary = () => {
  const { transactions } = useContext(TransactionContext);

  const amounts = transactions.map(transaction => transaction.amount);
  
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const expense = (
    amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);
  
  const balance = (income - expense).toFixed(2);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
      <div>
        <h4>Income</h4>
        <p style={{ color: 'green' }}>Rs. {income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p style={{ color: 'red' }}>Rs. {expense}</p>
      </div>
      <div>
        <h4>Balance</h4>
        <p style={{ fontSize: '1.2em' }}>Rs. {balance}</p>
      </div>
    </div>
  );
};

export default Summary;