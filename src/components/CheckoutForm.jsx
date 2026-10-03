import { useState } from 'react';
import { useCreateOrder } from '../hooks/useOrders';
import { useCartStore } from '../store/cartStore';

export default function CheckoutForm() {
    const { mutate: createOrder, isPending } = useCreateOrder();
    const cartItems = useCartStore((state) => state.items);

    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [touched, setTouched] = useState({ name: false, phone: false, address: false });

    const errors = {
        name: !formData.name.trim() ? 'Имя обязательно' : null,
        phone: !formData.phone.trim() ? 'Телефон обязателен' : null,
        address: !formData.address.trim() ? 'Адрес обязателен' : null,
    };

    const isValid = !errors.name && !errors.phone && !errors.address;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid || cartItems.length === 0) return;

        const payload = {
            ...formData,
            items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))
        };

        createOrder(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form" style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd' }}>
            <h3>Оформление заказа</h3>

            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text" name="name" placeholder="Ваше имя"
                    value={formData.name} onChange={handleChange} onBlur={handleBlur}
                />
                {touched.name && errors.name && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.name}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text" name="phone" placeholder="Телефон"
                    value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                />
                {touched.phone && errors.phone && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.phone}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text" name="address" placeholder="Адрес доставки"
                    value={formData.address} onChange={handleChange} onBlur={handleBlur}
                />
                {touched.address && errors.address && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.address}</span>}
            </div>

            <button type="submit" disabled={!isValid || isPending || cartItems.length === 0}>
                {isPending ? 'Отправка...' : 'Оформить заказ'}
            </button>
        </form>
    );
}