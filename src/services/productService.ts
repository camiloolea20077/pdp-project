export interface Product {
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

export async function fetchProduct(productId: string): Promise<Product> {
  try {
    const response = await fetch(`https://api-prueba-frontend-production.up.railway.app/api/products/productId/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Producto no encontrado');
    }
    return data[0] as Product;
  } catch (error) {
    console.error('Error cargando producto:', error);
    throw error;
  }
}

export async function fetchProducts(limit = 5): Promise<Product[]> {
  try {
    const response = await fetch(`https://api-prueba-frontend-production.up.railway.app/api/products?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Error en datos de productos');
    }
    return data as Product[];
  } catch (error) {
    console.error('Error cargando productos:', error);
    throw error;
  }
}
