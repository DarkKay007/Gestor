import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import  {AuthProvider}  from '../src/context/authContext.jsx';
import {UserProvider}  from '../src/context/userContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
