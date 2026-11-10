import React, { useEffect, useState } from 'react';
import type { Product } from '../entities/product/model/types';
import { Header } from '../widgets/Header/Header';
import { Button } from '../shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(stored);
    }, []);

    const removeItem = (id: number) => {
        const updated = favorites.filter((item) => item.id !== id);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Избранные товары</h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 text-lg">
                        В избранном пока ничего нет. Добавьте товары из каталога!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col justify-between border border-gray-100">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-48 object-cover cursor-pointer"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3
                                        className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 cursor-pointer hover:text-blue-600"
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                        <Button variant="danger" size="sm" onClick={() => removeItem(product.id)}>
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};