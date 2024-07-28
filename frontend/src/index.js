import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Pages/Context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContext>
  <BrowserRouter>
   
      <App />

  </BrowserRouter>
  </UserContext>
);


