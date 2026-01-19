import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from "motion/react";
import { Filter, X } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || 'all',
        size: "all",
        color: "all",
        priceRange: 'all',
        sortBy: 'newest'
    });

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500)
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/product.json');
            const data = await res.json();
            setProductsData(data);
        }
        fetchData();
    }, [])

    // filters 

    useEffect(() => {
        let result = [...productsData];

        // category filter 
        if (filters.category !== 'all') {
            result = result.filter((p) => p.category === filters.category);
        }

        // size filter 

        if (filters.size !== 'all') {
            result = result.filter((p) => p.sizes.includes(filters.size));
        }

        // color filter 
        if (filters.color !== 'all') {
            result = result.filter((p) => p.colors.includes(filters.color));
        }

        // price range filter 
        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            result = result.filter((p) => {
                if (max) {
                    return p.price >= min && p.price <= max;
                }
                return p.price >= min;
            });
        }

        // shorting 
        switch (filters.sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
            default:
                break;
        }

        setFilteredProducts(result);

    }, [filters, productsData]);

    const categories = ['all', 'women', 'men', 'kids'];
    const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL'];
    const colors = ['all', 'black', 'white', 'gray', 'beige', 'blue'];
    const priceRanges = [
        { label: 'All Prices', value: 'all' },
        { label: 'Under $50', value: '0-50' },
        { label: '$50 - $100', value: '50-100' },
        { label: '$100 - $200', value: '100-200' },
        { label: 'Over $200', value: '200' },
    ];

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));

        // update URL params for category 
        if (key === 'category') {
            if (value === 'all') {
                searchParams.delete('category');
            } else {
                searchParams.set('category', value);
            }
            setSearchParams(searchParams);
        }
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            size: 'all',
            color: 'all',
            priceRange: "all",
            sortBy: 'newest'
        });
        setSearchParams({});
    }

    return (
        <div className='min-h-screen bg-white dark:bg-neutral-950 py-12'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* header  */}
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-neutral-900 dark:text-white mb-2 '>Shop All</h1>
                    <p className='text-neutral-600 dark:text-neutral-400'>
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    <aside className='hidden lg:block w-64 shrink-0'>
                        <div className='sticky top-24 space-y-6'>
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                    Filters
                                </h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Category */}
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-white mb-3">Category</h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat}
                                                checked={filters.category === cat}
                                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-white mb-3">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => handleFilterChange('size', size)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${filters.size === size
                                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                                }`}
                                        >
                                            {size === 'all' ? 'All' : size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color */}
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-white mb-3">Color</h3>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleFilterChange('color', color)}
                                            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${filters.color === color
                                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-white mb-3">Price Range</h3>
                                <div className="space-y-2">
                                    {priceRanges.map((range) => (
                                        <label key={range.value} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={range.value}
                                                checked={filters.priceRange === range.value}
                                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                                {range.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1">
                        {/* Top Bar */}
                        <div className="flex justify-between items-center mb-6">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Filters</span>
                            </button>

                            {/* Sort */}
                            <div className="flex items-center space-x-2">
                                <label className="text-sm text-neutral-600 dark:text-neutral-400">Sort by :</label>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border-none outline-none cursor-pointer"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="lg:hidden mb-6 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                        Filters
                                    </h2>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                {/* Same filter controls as desktop */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-neutral-900 dark:text-white mb-3">Category</h3>
                                        <div className="space-y-2">
                                            {categories.map((cat) => (
                                                <label key={cat} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="category-mobile"
                                                        value={cat}
                                                        checked={filters.category === cat}
                                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                                                        {cat}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Products Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <LoadingSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                                    No products found
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="text-neutral-900 dark:text-white hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
