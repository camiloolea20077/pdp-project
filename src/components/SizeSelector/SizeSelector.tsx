import React from 'react';
import './SizeSelector.scss';

interface Props {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const SizeSelector: React.FC<Props> = ({ sizes, selectedSize, onSelectSize }) => {
  const renderSizes = () => {
    return sizes.map(size => (
          <option key={size} value={size}>{size}</option>
      ))
  }
  return (
    <div className="size-selector">
      <label htmlFor="size-select" className="size-label">Talla:</label>
      <select
        id="size-select"
        className="size-select"
        value={selectedSize}
        onChange={e => onSelectSize(e.target.value)}
      >
        {renderSizes()}
      </select>
    </div>
  );
};

export default SizeSelector;
