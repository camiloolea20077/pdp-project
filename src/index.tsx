import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductDetailPage from './pages/products/ProductDetailPage';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                  
import 'primeicons/primeicons.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Redirige al Home por defecto */}
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
);