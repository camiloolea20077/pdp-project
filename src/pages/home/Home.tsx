import React, { useEffect } from 'react';
import './Home.scss';
import { CurrencyFormat } from '../../utils';
import { useProducts } from '../products/use-products';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fetchProducts } from '../../services/productService';
import Navbar from '../../components/Navbar/Navbar';
import { Button } from 'primereact/button';
import AddToCartButton from '../../components/AddToCartButton/AddToCartButton';
import useCartStore from '../../components/store/useCartStore';

/**
 * Componente principal de la aplicaci n que muestra una lista de productos.
 *
 * Este componente utiliza el hook `useProducts` para obtener la lista de productos
 * y el estado de carga. Luego, renderiza una lista de tarjetas de productos con
 * su imagen, nombre, marca y precio.
 *
 * Si no hay productos disponibles, se muestra un mensaje.
 *
 * Si hay un error al cargar los productos, se muestra un mensaje de error.
 *
 * @returns Un JSX element que representa el componente principal de la aplicaci n.
 */
const Home: React.FC = () => {
    const addToCart = useCartStore((state) => state.addToCart);
    const { allProducts, setAllProducts, isLoading, navigateToProduct, product, toast, cart, setShowCart, selectedSize } = useProducts();
    useEffect(() => {
        setAllProducts([]);
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
    return (
        <div className="home-container">
            <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Bienvenido a nuestra tienda online</h1>
                    <p>Encuentra los mejores productos para ti</p>
                </div>
            </header>

            <Toast ref={toast} />
            <h1>Productos</h1>

            {isLoading && product && (
                <div className="loading-modal">
                    <ProgressSpinner />
                    <p>Cargando productos...</p>
                </div>
            )}
            <div className="products-list">
                {allProducts.length === 0 ? (
                    <p>No hay productos disponibles.</p>
                ) : (
                    allProducts.map((product) => (
                        <div
                            key={product.productId}
                            className="product-card"
                            onClick={() => navigateToProduct(product.productId)}
                        >
                            <img
                                src={product.items[0]?.images[0]?.imageUrl}
                                alt={product.productName}
                                className="product-image"
                            />
                            <h2>{product.productName}</h2>
                            <p>{product.brand}</p>
                            <p>{CurrencyFormat(product.items[0]?.sellers[0]?.commertialOffer.Price)}</p>
                            <div className="action-buttons">
                                <AddToCartButton onAdd={handleAddToCart} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <section className="testimonials-section">
                <h2>Lo que dicen nuestros clientes</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <img
                            src="https://media.istockphoto.com/id/1332358775/es/foto/joven-pareja-estrechando-la-mano-acuerdo-contrato-de-inversi%C3%B3n-inmobiliaria-acuerdo-de-negocio.jpg?s=612x612&w=0&k=20&c=yjlCRHXAz1_FSL-RbfTMBFE7cPFKUAPdFNSRLvAM-6w=" // Reemplazar por la imagen real del cliente
                            alt="Cliente Satisfecho"
                            className="testimonial-image"
                        />
                        <div className="testimonial-text">
                            <p>"¡Excelente tienda, productos de calidad!"</p>
                            <p>- Cliente Satisfecho</p>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <img
                            src="https://www.hubspot.com/hubfs/media/clientessatisfechos.jpeg" // Reemplazar por la imagen real del cliente
                            alt="Cliente Feliz"
                            className="testimonial-image"
                        />
                        <div className="testimonial-text">
                            <p>"Recomiendo 100% este sitio para tus compras"</p>
                            <p>- Cliente Feliz</p>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <img
                            src="https://media.istockphoto.com/id/1405156781/es/foto/hombre-y-mujer-de-negocios-se-dan-la-mano-como-hola-en-primer-plano-de-la-oficina.jpg?s=612x612&w=0&k=20&c=oUmhZfVVE322fPyvateozczCeR3KBRMU_XqUin9tqd4=" // Reemplazar por la imagen real del cliente
                            alt="Cliente Feliz con el Producto"
                            className="testimonial-image"
                        />
                        <div className="testimonial-text">
                            <p>"Recomiendo 100% este sitio para tus compras de productos"</p>
                            <p>- Cliente Satisfecho</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div>
                    <p>&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
