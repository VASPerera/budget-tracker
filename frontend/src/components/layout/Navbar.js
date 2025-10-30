import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const authLinks = (
    <>
      <span style={{ marginRight: '10px' }}>Hello, {user?.name}</span>
      <button onClick={onLogout}>Logout</button>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
      <Link to="/register">Register</Link>
    </>
  );

  return (
    <nav style={{ background: '#f4f4f4', padding: '10px', marginBottom: '20px' }}>
      <h1>
        <Link to="/">Budget Tracker</Link>
      </h1>
      <div style={{ float: 'right' }}>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;