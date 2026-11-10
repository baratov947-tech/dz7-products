import React, { useEffect, useState } from 'react';
import type { Product, SortOption } from '../entities/product/model/types';
import { filterProducts, sortProducts } from '../filter-products/model/filterUtils';
import { Header } from '../widgets/Header/Header';
import { Button } from '../shared/ui/Button/Button';

export const CatalogPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortOption, setSortOption] = useState<SortOption>('title-asc');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=0')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Ошибка загрузки товаров:', err);
                setLoading(false);
            });

        fetch('https://dummyjson.com/products/category-list')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error('Ошибка загрузки категорий:', err));
    }, []);

    const filtered = filterProducts(products, searchQuery, selectedCategory);
    const sortedAndFilteredProducts = sortProducts(filtered, sortOption);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-xl font-medium text-slate-600 animate-pulse">Загрузка каталога...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Каталог товаров</h1>

                {/* Панель поиска, фильтров и сортировки в современном стиле */}
                <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <input
                        type="text"
                        placeholder="Поиск по названию или описанию..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full md:w-1/4 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm cursor-pointer"
                    >
                        <option value="">Все категории</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="w-full md:w-1/4 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm cursor-pointer"
                    >
                        <option value="title-asc">По названию (А-Я)</option>
                        <option value="price-asc">Сначала дешевые</option>
                        <option value="price-desc">Сначала дорогие</option>
                        <option value="rating-desc">По рейтингу</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedAndFilteredProducts.map((product: Product) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="relative overflow-hidden bg-slate-100 h-48">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                  {product.category}
                </span>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                    <span className="text-xl font-extrabold text-slate-900">${product.price}</span>
                                    <Button
                                        size="sm"
                                        onClick={() => window.location.href = `/products/${product.id}`}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-100 transition-all"
                                    >
                                        Подробнее
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedAndFilteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 mt-4">
                        <p className="text-slate-500 text-lg font-medium">Товары не найдены</p>
                        <p className="text-slate-400 text-sm mt-1">Попробуйте изменить параметры поиска или фильтрации</p>
                    </div>
                )}
            </main>
        </div>
    );
};