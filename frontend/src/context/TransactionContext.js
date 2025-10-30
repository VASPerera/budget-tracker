import React, { createContext, useReducer, useContext } from 'react';
import api from '../services/api';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Reducer
const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS_SUCCESS':
      return { ...state, transactions: action.payload, loading: false, error: null };
    case 'ADD_TRANSACTION_SUCCESS':
      return { ...state, transactions: [action.payload, ...state.transactions], error: null };
    case 'DELETE_TRANSACTION_SUCCESS':
      return { ...state, transactions: state.transactions.filter(t => t._id !== action.payload), error: null };
    case 'TRANSACTION_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Create Context
export const TransactionContext = createContext(initialState);

// Provider Component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await api.get('/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.message || 'Error fetching transactions',
      });
    }
  }

  async function addTransaction(transaction) {
    try {
      const res = await api.post('/transactions', transaction);
      dispatch({
        type: 'ADD_TRANSACTION_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.message || 'Error adding transaction',
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await api.delete(`/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION_SUCCESS',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.message || 'Error deleting transaction',
      });
    }
  }

  return (
    <TransactionContext.Provider value={{ ...state, getTransactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};