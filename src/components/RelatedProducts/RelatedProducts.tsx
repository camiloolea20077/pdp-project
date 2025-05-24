import React from 'react';
import './RelatedProducts.scss';

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
  return (
    <div className="related-products">
      <h3>Productos relacionados</h3>
      <div className="related-products-list">
        {products.map(prod => (
          <div key={prod.id} className="related-product-card" onClick={() => onSelectProduct(prod.id)}>
            <img src={prod.images[0]} alt={prod.title} />
            <p>{prod.title}</p>
            <p>${prod.priceDiscount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
