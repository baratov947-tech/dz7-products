import type { Product, SortOption } from '../../entities/product/model/types';export const filterProducts = (
    products: Product[],
    searchQuery: string,
    category: string
): Product[] => {
    return products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

        const matchesCategory = category ? product.category === category : true;

        return matchesSearch && matchesCategory;
    });
};
export const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
    const sorted = [...products];

    switch (sortOption) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'title-asc':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted;
    }
};