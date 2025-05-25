import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

import ProductImages from "../../components/ProductImages/ProductImages";
import SizeSelector from "../../components/SizeSelector/SizeSelector";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import Cart from "../../components/Cart/Cart";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import Navbar from "../../components/Navbar/Navbar";
import useCartStore from "../../components/store/useCartStore";

import {
  fetchProducts,
} from "../../services/productService";
import "./ProductDetailPage.scss";
import { useProducts } from "./use-products";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
        setAllProducts,
        product,
        selectedSize,
        setSelectedSize,
        cart,
        showCart,
        setShowCart,
        relatedProducts,
        isLoading,
        toast,
        navigateToProduct,
  } = useProducts(productId);

  //Zustang
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProducts(20)
      .then((products) => {
        setAllProducts(products);
      })
      .catch((e) => {
        console.error("Error cargando productos:", e);
      });
  }, []);

  // Acciones carrito
  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    addToCart(product, selectedSize, product.color);
    toast.current?.show({
      severity: "success",
      summary: "Añadido",
      detail: "Producto agregado al carrito",
      life: 2000,
    });
  };

  const handleSelectRelatedProduct = (id: string) => {
    navigateToProduct(id);
  };

  const loadingApp = () => {
    return (
      <div className="loading-modal">
        <ProgressSpinner />
        <p>Cargando producto...</p>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      {isLoading && loadingApp()}

      {!isLoading && product && (
        <div className="container">
          <div className="product-detail-layout">
            <div className="product-images-section h-full">
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
              <SizeSelector
                sizes={product.availableSizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
              <div className="action-buttons">
                <AddToCartButton onAdd={handleAddToCart} />
              </div>
            </div>
          </div>
          <RelatedProducts
            products={relatedProducts}
            onSelectProduct={handleSelectRelatedProduct}
          />

          <Cart visible={showCart} onHide={() => setShowCart(false)} />
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;

