import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 1. IMPORT ALL COMPONENTS
import Summary from '../components/dashboard/Summary';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';

const DashboardPage = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login'); // If not logged in, redirect to login
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return null; // Avoid flicker

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <hr />
      
      {/* 2. ADD THE COMPONENTS */}
      <Summary />
      <hr />
      
      <h3>Add New Transaction</h3>
      <TransactionForm />
      <hr />
      
      <h3>History</h3>
      <TransactionList />
      
    </div>
  );
};

export default DashboardPage;