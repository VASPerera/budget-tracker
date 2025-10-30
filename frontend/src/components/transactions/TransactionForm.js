import React, { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

const TransactionForm = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  
  const { addTransaction } = useContext(TransactionContext);

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Amount is positive for income, negative for expense
    const finalAmount = type === 'income' ? Math.abs(amount) : -Math.abs(amount);

    const newTransaction = {
      text,
      amount: finalAmount,
      type,
      category,
      date: new Date() // Add date
    };

    addTransaction(newTransaction);
    
    // Clear form
    setText('');
    setAmount(0);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label>Description (e.g., "Lunch")</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter description..." required />
      </div>
      <div>
        <label>Category (e.g., "Food")</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category..." required />
      </div>
      <div>
        <label>Amount (Rs.)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;