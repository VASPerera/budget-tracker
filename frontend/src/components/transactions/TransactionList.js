import React, { useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

const TransactionList = () => {
  const { transactions, getTransactions, deleteTransaction, loading } = useContext(TransactionContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {transactions.length === 0 ? (<p>No transactions yet.</p>) : (
          transactions.map(transaction => (
            <li 
              key={transaction._id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                border: '1px solid #ddd', 
                padding: '10px', 
                marginBottom: '5px',
                borderColor: transaction.amount < 0 ? 'red' : 'green'
              }}
            >
              <span>{transaction.text} ({transaction.category})</span>
              <span>
                {transaction.amount < 0 ? '-' : '+'}Rs. {Math.abs(transaction.amount)}
              </span>
              <button onClick={() => deleteTransaction(transaction._id)}>X</button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default TransactionList;