import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../entities/product/model/types';
import { Header } from '../widgets/Header/Header';
import { Button } from '../shared/ui/Button/Button';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.thumbnail);
                setLoading(false);

                // Проверяем, есть ли товар в избранном
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                setIsFavorite(favorites.some((fav: Product) => fav.id === data.id));
            })
            .catch((err) => {
                console.error('Ошибка загрузки товара:', err);
                setLoading(false);
            });
    }, [id]);

    const toggleFavorite = () => {
        if (!product) return;
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter((fav: Product) => fav.id !== product.id);
        } else {
            updatedFavorites = [...favorites, product];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    if (loading) {
        return <div className="text-center py-20 text-xl">Загрузка товара...</div>;
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Товар не найден</h2>
                <Button onClick={() => navigate('/')}>Вернуться в каталог</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
                    ← Назад
                </Button>

                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Галерея картинок */}
                    <div className="flex flex-col gap-4">
                        <img
                            src={selectedImage}
                            alt={product.title}
                            className="w-full h-96 object-cover rounded-xl border border-gray-100 shadow-sm"
                        />
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                                        selectedImage === img ? 'border-blue-600 scale-105' : 'border-transparent opacity-70'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Информация о товаре */}
                    <div className="flex flex-col justify-between">
                        <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 block">
                {product.category} {product.brand ? `• ${product.brand}` : ''}
              </span>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <p className="text-gray-600 text-base mb-6 leading-relaxed">{product.description}</p>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                                {product.discountPercentage > 0 && (
                                    <span className="bg-red-100 text-red-600 text-sm font-semibold px-2.5 py-1 rounded-md">
                    -{product.discountPercentage}% скидка
                  </span>
                                )}
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-4">
                                <p>⭐ <b>Рейтинг:</b> {product.rating} / 5</p>
                                <p>📦 <b>В наличии:</b> {product.stock} шт.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant={isFavorite ? 'danger' : 'secondary'}
                                onClick={toggleFavorite}
                                className="flex-1"
                            >
                                {isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};