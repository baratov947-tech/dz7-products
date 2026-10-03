import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createOrderRequest, fetchMyOrdersRequest } from '../api/orders';
import { useCartStore } from '../store/cartStore';
import { toast } from 'react-toastify';

export const useCreateOrder = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clearCart = useCartStore((state) => state.clearCart);

    return useMutation({
        mutationFn: (orderData) => createOrderRequest(orderData),
        onSuccess: () => {
            clearCart();
            toast.success('Заказ успешно оформлен!');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            navigate('/orders');
        },
        onError: () => {
            toast.error('Не удалось оформить заказ');
        },
    });
};

export const useMyOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrdersRequest,
    });
};