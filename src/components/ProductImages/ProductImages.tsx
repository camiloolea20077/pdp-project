import React from 'react';
import { Galleria } from 'primereact/galleria';
import './ProductImages.scss';

interface Props {
  images: string[];
  altText: string;
}

const ProductImages: React.FC<Props> = ({ images, altText }) => {
  const itemTemplate = (item: string) => <img src={item} alt={altText} className="product-image" />;

  return (
    <Galleria value={images} item={itemTemplate} thumbnailsPosition="bottom" />
  );
};

export default ProductImages;
