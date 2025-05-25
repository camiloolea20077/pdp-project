
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailPage from './pages/products/ProductDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
