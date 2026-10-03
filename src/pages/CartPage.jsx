import { useCartStore } from '../store/cartStore';
import CheckoutForm from '../components/CheckoutForm';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { items, removeItem } = useCartStore();

    return (
        <div className="container">
            <h1>Корзина</h1>
            {items.length === 0 ? (
                <div>
                    <p>Ваша корзина пуста.</p>
                    <Link to="/">Вернуться в каталог</Link>
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                        {items.map((item) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '15px', borderRadius: '8px', alignItems: 'center' }}>
                                <span>{item.title} ({item.quantity} шт.)</span>
                                <span>{item.price * item.quantity} $</span>
                                <button onClick={() => removeItem(item.id)} style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Удалить</button>
                            </div>
                        ))}
                    </div>
                    <CheckoutForm />
                </div>
            )}
        </div>
    );
}