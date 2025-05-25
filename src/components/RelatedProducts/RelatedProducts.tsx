import React from 'react';
import './RelatedProducts.scss';
import { CurrencyFormat } from '../../utils';

interface Product {
  id: string;
  title: string;
  images: string[];
  priceDiscount: number;
}

interface Props {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

const RelatedProducts: React.FC<Props> = ({ products, onSelectProduct }) => {
  const renderProducts = () => {
    return products.map(prod => (
          <div key={prod.id} className="related-product-card" onClick={() => onSelectProduct(prod.id)}>
            <img src={prod.images[0]} alt={prod.title} />
            <p>{prod.title}</p>
            <p>{CurrencyFormat(prod.priceDiscount)}</p>
          </div>
      ))
  }
  return (
    <>
    <h3 className='text-center'>Productos relacionados</h3>
    <div className="flex related-products justify-content-center">
      <div className="related-products-list">
        {renderProducts()}
      </div>
    </div>
    </>
  );
};

export default RelatedProducts;
