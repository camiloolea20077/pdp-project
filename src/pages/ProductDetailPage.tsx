import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams, useNavigate } from 'react-router-dom';
import ProductImages from '../components/ProductImages/ProductImages';
import SizeSelector from '../components/SizeSelector/SizeSelector';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import Cart from '../components/Cart/Cart';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

import { fetchProduct, fetchProducts, Product as RawProduct } from '../services/productService';
import './ProductDetailPage.scss';
import Navbar from '../components/Navbar/Navbar';

interface Product {
  id: string;
  title: string;
  brand: string;
  sku: string;
  images: string[];
  color: string;
  priceFull: number;
  priceDiscount: number;
  availableSizes: string[];
}

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState<RawProduct[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    fetchProducts(20)
      .then((products) => {
        setAllProducts(products);
      })
      .catch((e) => {
        console.error('Error cargando productos:', e);
      });
  }, []);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setProduct(null);

    const foundRaw = allProducts.find(p => p.productId === productId);

    if (foundRaw) {
      const firstItem = foundRaw.items && foundRaw.items.length > 0 ? foundRaw.items[0] : null;
      const firstSeller = firstItem && firstItem.sellers && firstItem.sellers.length > 0 ? firstItem.sellers[0] : null;

      const mappedProduct: Product = {
        id: foundRaw.productId,
        title: foundRaw.productName || foundRaw.productTitle || '',
        brand: foundRaw.brand || '',
        sku: foundRaw.productReferenceCode || '',
        images: firstItem ? firstItem.images.map(img => img.imageUrl) : [],
        color: firstItem && firstItem.Color ? firstItem.Color[0] : '',
        priceFull: firstSeller ? firstSeller.commertialOffer.ListPrice : 0,
        priceDiscount: firstSeller ? firstSeller.commertialOffer.Price : 0,
        availableSizes: firstItem && firstItem.Talla ? firstItem.Talla : []
      };

      setProduct(mappedProduct);
      if (mappedProduct.availableSizes.length > 0) setSelectedSize(mappedProduct.availableSizes[0]);
      setLoading(false);
    } else {
      fetchProduct(productId)
        .then((data: RawProduct) => {
          const firstItem = data.items && data.items.length > 0 ? data.items[0] : null;
          const firstSeller = firstItem && firstItem.sellers && firstItem.sellers.length > 0 ? firstItem.sellers[0] : null;

          const mappedProduct: Product = {
            id: data.productId,
            title: data.productName || data.productTitle || '',
            brand: data.brand || '',
            sku: data.productReferenceCode || '',
            images: firstItem ? firstItem.images.map(img => img.imageUrl) : [],
            color: firstItem && firstItem.Color ? firstItem.Color[0] : '',
            priceFull: firstSeller ? firstSeller.commertialOffer.ListPrice : 0,
            priceDiscount: firstSeller ? firstSeller.commertialOffer.Price : 0,
            availableSizes: firstItem && firstItem.Talla ? firstItem.Talla : []
          };

          setProduct(mappedProduct);
          if (mappedProduct.availableSizes.length > 0) setSelectedSize(mappedProduct.availableSizes[0]);
        })
        .catch((e) => {
          console.error('Error al cargar el producto:', e);
          alert('Error al cargar el producto');
        })
        .finally(() => setLoading(false));
    }
  }, [productId, allProducts]);

  useEffect(() => {
    if (!allProducts.length || !productId) {
      setRelatedProducts([]);
      return;
    }

    const filtered = allProducts.filter(p => p.productId !== productId);
    const mapped = filtered.map(data => {
      const firstItem = data.items && data.items.length > 0 ? data.items[0] : null;
      const firstSeller = firstItem && firstItem.sellers && firstItem.sellers.length > 0 ? firstItem.sellers[0] : null;

      return {
        id: data.productId,
        title: data.productName || data.productTitle || '',
        brand: data.brand || '',
        sku: data.productReferenceCode || '',
        images: firstItem ? firstItem.images.map(img => img.imageUrl) : [],
        color: firstItem && firstItem.Color ? firstItem.Color[0] : '',
        priceFull: firstSeller ? firstSeller.commertialOffer.ListPrice : 0,
        priceDiscount: firstSeller ? firstSeller.commertialOffer.Price : 0,
        availableSizes: firstItem && firstItem.Talla ? firstItem.Talla : []
      } as Product;
    });
    setRelatedProducts(mapped);
  }, [allProducts, productId]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (!product || !selectedSize) return;

    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.size === selectedSize && item.color === product.color
    );
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { product, size: selectedSize, color: product.color, quantity: 1 }]);
    }

    toast.current?.show({ severity: 'success', summary: 'Añadido', detail: 'Producto agregado al carrito', life: 2000 });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  const handleSelectRelatedProduct = (id: string) => {
    navigate(`/product/${id}`);
  }

  const loadingApp = () => {
    return (
      <div className="loading-modal">
        <ProgressSpinner />
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <>
      <Toast ref={toast} />
      <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      {isLoading && loadingApp()}

      {!isLoading && product && (
        <div className="container">
          <div className="product-detail-layout">
            <div className="product-images-section">
              <ProductImages images={product.images} altText={product.title} />
            </div>
            <div className="product-info-section">
              <ProductDetails
                title={product.title}
                brand={product.brand}
                sku={product.sku}
                color={product.color}
                priceFull={product.priceFull}
                priceDiscount={product.priceDiscount}
              />
              <SizeSelector sizes={product.availableSizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
              <div className="action-buttons">
                <AddToCartButton onAdd={addToCart} />
                {/* <button className="p-button p-button-secondary ml-2" onClick={() => setShowCart(true)}>
                  Ver Carrito ({cart.length})
                </button> */}
              </div>
            </div>
          </div>
          <RelatedProducts products={relatedProducts} onSelectProduct={handleSelectRelatedProduct} />

          <Cart visible={showCart} onHide={() => setShowCart(false)} cart={cart} removeItem={removeFromCart} />
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
