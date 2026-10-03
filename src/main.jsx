import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import CatalogPage from "./pages/CatalogPage.jsx";
import CartPage from './pages/CartPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <CatalogPage />,
    },
    {
        path: '/cart',
        element: <CartPage />,
    },
    {
        path: '/orders',
        element: <OrdersPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer position="top-right" autoClose={3000} />
        </QueryClientProvider>
    </React.StrictMode>
);