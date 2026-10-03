const API_URL = 'https://your-api.com/api';

export const createOrderRequest = async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error('Ошибка при оформлении заказа');
    return response.json();
};

export const fetchMyOrdersRequest = async () => {
    const response = await fetch(`${API_URL}/orders/my`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (!response.ok) throw new Error('Ошибка при загрузке заказов');
    return response.json();
};