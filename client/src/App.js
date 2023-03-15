/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Transactions from './components/Transactions';
import Checkout from './components/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/checkout-transactions" element={<Checkout />} />
    </Routes>
  );
}

export default App;
