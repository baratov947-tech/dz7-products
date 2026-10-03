import { useQuery } from '@tanstack/react-query';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

 const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=12');
    if (!response.ok) {
        throw new Error('Ошибка загрузки товаров');
    }
    const data = await response.json();
    return data.products;
};

export default function CatalogPage() {
     const { data: products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

     const addItem = useCartStore((state) => state.addItem);
    const cartItems = useCartStore((state) => state.items);

     const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (isLoading) return <div className="container">Загрузка каталога...</div>;
    if (isError) return <div className="container">Ошибка при загрузке каталога товаров.</div>;

    return (
        <div className="container">
             <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Каталог товаров</h1>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/cart" style={{ textDecoration: 'none', background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>
                        Корзина ({totalCartCount})
                    </Link>
                    <Link to="/orders" style={{ textDecoration: 'none', background: '#e9ecef', color: '#333', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>
                        Мои заказы
                    </Link>
                </div>
            </header>

             <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card" style={{ background: '#fff', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '15px' }} />
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{product.title}</h3>
                        <p className="price" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>{product.price} $</p>

                         <button
                            onClick={() => addItem(product)}
                            style={{
                                marginTop: 'auto',
                                background: '#007bff',
                                color: '#fff',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'background 0.2s'
                            }}
                        >
                            В корзину
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}