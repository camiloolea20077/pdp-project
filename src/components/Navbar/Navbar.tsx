import React from 'react';
import { Badge } from 'primereact/badge';
import { ShoppingCart } from 'phosphor-react';
import './Navbar.scss';
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="navbar p-shadow-3 p-px-4 p-py-2 flex align-items-center justify-content-between">
      <div className='flex gap-3'>
        <h2 className="m-0">Mi Tienda</h2>
        <button className="p-button p-button-text p-component" onClick={onCartClick} style={{ position: 'relative' }}>
          <ShoppingCart size={24} />
          {cartCount > 0 && <Badge value={cartCount} severity="danger" style={{ position: 'absolute', top: '1px', right: '1px' }} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
