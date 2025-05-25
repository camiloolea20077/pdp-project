import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem, Product, ProductsApi } from "../../interfaces";
import { Toast } from "primereact/toast";
import { fetchProduct } from "../../services/productService";

export function useProducts(productId?: string) {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState<ProductsApi[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (!productId) return;
        setLoading(true);
        setProduct(null);

        const foundRaw = allProducts.find((p) => p.productId === productId);

        if (foundRaw) {
            const firstItem =
                foundRaw.items && foundRaw.items.length > 0 ? foundRaw.items[0] : null;
            const firstSeller =
                firstItem && firstItem.sellers && firstItem.sellers.length > 0
                    ? firstItem.sellers[0]
                    : null;

            const mappedProduct: Product = {
                id: foundRaw.productId,
                title: foundRaw.productName || foundRaw.productTitle || "",
                brand: foundRaw.brand || "",
                sku: foundRaw.productReferenceCode || "",
                images: firstItem ? firstItem.images.map((img) => img.imageUrl) : [],
                color: firstItem && firstItem.Color ? firstItem.Color[0] : "",
                priceFull: firstSeller ? firstSeller.commertialOffer.ListPrice : 0,
                priceDiscount: firstSeller ? firstSeller.commertialOffer.Price : 0,
                availableSizes: firstItem && firstItem.Talla ? firstItem.Talla : [],
            };

            setProduct(mappedProduct);
            if (mappedProduct.availableSizes.length > 0)
                setSelectedSize(mappedProduct.availableSizes[0]);
            setLoading(false);
        } else {
            fetchProduct(productId)
                .then((data: ProductsApi) => {
                    const firstItem =
                        data.items && data.items.length > 0 ? data.items[0] : null;
                    const firstSeller =
                        firstItem && firstItem.sellers && firstItem.sellers.length > 0
                            ? firstItem.sellers[0]
                            : null;

                    const mappedProduct: Product = {
                        id: data.productId,
                        title: data.productName || data.productTitle || "",
                        brand: data.brand || "",
                        sku: data.productReferenceCode || "",
                        images: firstItem
                            ? firstItem.images.map((img) => img.imageUrl)
                            : [],
                        color: firstItem && firstItem.Color ? firstItem.Color[0] : "",
                        priceFull: firstSeller ? firstSeller.commertialOffer.ListPrice : 0,
                        priceDiscount: firstSeller ? firstSeller.commertialOffer.Price : 0,
                        availableSizes: firstItem && firstItem.Talla ? firstItem.Talla : [],
                    };

                    setProduct(mappedProduct);
                    if (mappedProduct.availableSizes.length > 0)
                        setSelectedSize(mappedProduct.availableSizes[0]);
                })
                .catch((e) => {
                    console.error("Error al cargar el producto:", e);
                    alert("Error al cargar el producto");
                })
                .finally(() => setLoading(false));
        }
    }, [productId, allProducts]);

    useEffect(() => {
        if (!allProducts.length || !productId) {
            setRelatedProducts([]);
            return;
        }

        const filtered = allProducts.filter((p) => p.productId !== productId);
        const mapped = filtered.map((data) => {
            const firstItem =
                data.items && data.items.length > 0 ? data.items[0] : null;
            const firstSeller =
                firstItem && firstItem.sellers && firstItem.sellers.length > 0
                    ? firstItem.sellers[0]
                    : null;

            return {
                id: data.productId,
                title: data.productName || data.productTitle || "",
                brand: data.brand || "",
                sku: data.productReferenceCode || "",
                images: firstItem ? firstItem.images.map((img) => img.imageUrl) : [],
                color: firstItem && firstItem.Color ? firstItem.Color[0] : "",
                priceFull: firstSeller ? firstSeller.commertialOffer.ListPrice : 0,
                priceDiscount: firstSeller ? firstSeller.commertialOffer.Price : 0,
                availableSizes: firstItem && firstItem.Talla ? firstItem.Talla : [],
            } as Product;
        });
        setRelatedProducts(mapped);
    }, [allProducts, productId]);

    return {
        allProducts,
        setAllProducts,
        product,
        setProduct,
        selectedSize,
        setSelectedSize,
        cart,
        setCart,
        showCart,
        setShowCart,
        relatedProducts,
        setRelatedProducts,
        isLoading,
        setLoading,
        toast,
        navigateToProduct: (productId: string) => {
            navigate(`/product/${productId}`);
        },
    };
}