import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext'; // <-- 1. IMPORT THIS

import Navbar from './components/layout/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <TransactionProvider> {/* <-- 2. WRAP EVERYTHING */}
        <Router>
          <Navbar />
          <div className="container" style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </Router>
      </TransactionProvider> {/* <-- 3. END WRAP */}
    </AuthProvider>
  );
}

export default App;