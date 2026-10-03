import { useMyOrders } from '../hooks/useOrders';

export default function OrdersPage() {
    const { data: orders, isLoading, isError } = useMyOrders();

    if (isLoading) return <div className="container">Загрузка заказов...</div>;
    if (isError) return <div className="container">Ошибка при загрузке заказов</div>;
    if (!orders || orders.length === 0) return <div className="container">У вас пока нет заказов.</div>;

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2>Мои заказы</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => (
                    <div key={order.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#fff' }}>
                        <h3>Заказ #{order.id}</h3>
                        <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Статус:</strong> {order.status}</p>
                        <p><strong>Итоговая сумма:</strong> {order.totalPrice} $</p>

                        <h4>Товары:</h4>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.productName || item.title} — {item.quantity} шт.
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}