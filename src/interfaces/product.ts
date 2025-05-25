export interface Product {
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
export interface ProductsApi {
    productId: string;
    productName: string;
    brand: string;
    productTitle: string;
    description: string;
    items: ProductItem[];
    Price: number;
    ListPrice: number;
    productReferenceCode: string;
}
export interface ProductItem {
    itemId: string;
    name: string;
    sellers: Seller[];
    images: { imageId: string; imageUrl: string }[];
    Color: string[];
    Talla: string[];
}

export interface Seller {
    sellerId: string;
    sellerName: string;
    commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
    Price: number;
    ListPrice: number;
    PriceWithoutDiscount: number;
    FullSellingPrice: number;
}
