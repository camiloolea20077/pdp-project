import React from 'react';
import './ProductDetails.scss';
import { CurrencyFormat } from '../../utils';

interface Props {
  title: string;
  brand: string;
  sku: string;
  color: string;
  priceFull: number;
  priceDiscount: number;
}

const ProductDetails: React.FC<Props> = ({ title, brand, sku, color, priceFull, priceDiscount }) => {
  return (
    <div className="product-details">
      <h1 className="title">{title}</h1>
      <p className="brand">Marca: {brand}</p>
      <p className="sku">Referencia (SKU): {sku}</p>
      <p className="color">Color: {color}</p>
      <p className="price-full">{CurrencyFormat(priceFull)}</p>
      <p className="price-discount">{CurrencyFormat(priceDiscount)}</p>
    </div>
  );
};

export default ProductDetails;
