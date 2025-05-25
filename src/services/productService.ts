import { ProductsApi } from "../interfaces";

export async function fetchProduct(productId: string): Promise<ProductsApi> {
  try {
    const response = await fetch(`https://api-prueba-frontend-production.up.railway.app/api/products/productId/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Producto no encontrado');
    }
    return data[0] as ProductsApi;
  } catch (error) {
    console.error('Error cargando producto:', error);
    throw error;
  }
}

export async function fetchProducts(limit = 5): Promise<ProductsApi[]> {
  try {
    const response = await fetch(`https://api-prueba-frontend-production.up.railway.app/api/products?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Error en datos de productos');
    }
    return data as ProductsApi[];
  } catch (error) {
    console.error('Error cargando productos:', error);
    throw error;
  }
}
