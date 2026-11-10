export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string;
    thumbnail: string;
    images: string[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc';