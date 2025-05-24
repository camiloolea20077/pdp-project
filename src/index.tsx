import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductDetailPage from './pages/ProductDetailPage';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                  
import 'primeicons/primeicons.css';                                
// import '../src/'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
      <Routes>
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
);