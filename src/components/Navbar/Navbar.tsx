import React from 'react';
import { Badge } from 'primereact/badge';
import { ShoppingCart } from 'phosphor-react';
import './Navbar.scss';
import useCartStore from '../store/useCartStore';
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({onCartClick }) => {
  const totalQuantity = useCartStore(state => state.getTotalQuantity()); 
  return (
    <nav className="navbar p-shadow-3 p-px-4 p-py-2 flex align-items-center justify-content-between">
      <h2 className="m-0">Mi Tienda</h2>
      <div className='flex gap-3 align-items-center'>
        <button className="p-button p-button-text p-component" onClick={onCartClick} style={{ position: 'relative' }}>
          <ShoppingCart size={24} />
          {totalQuantity > 0 && <Badge value={totalQuantity} severity="danger" style={{ position: 'absolute', top: '1px', right: '1px' }} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
