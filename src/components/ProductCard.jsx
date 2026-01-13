import { ShoppingCart } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const ERROR_IMG_SRC = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="

export default function ProductCard({ product }) {

    const [imgError, setImgError] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className='group relative'
        >
            <Link to={`/product/${product.id}`} className='block'>
                <div className='relative aspect-3/4 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-4'>

                    {!imgError ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            onError={() => setImgError(true)}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-150'
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700'>
                            <img
                                src={ERROR_IMG_SRC}
                                alt="Image not Available"
                                className='w-12 h-12 opacity-50'
                            />
                        </div>
                    )}

                    {/* Trending Badge  */}
                    {product.tranding && (
                        <div className=' absolute top-3 right-3'>
                            <span className='bg-neutral-100 dark:bg-white text-white dark:text-neutral-900 text-xs px-3 py-1 rounded-full'>Treanding</span>
                        </div>
                    )}

                    {/* Quick Add Overlay  */}
                    <motion.div
                        className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white text-neutral-900 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-neutral-100 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="text-sm font-medium">Quick Add</span>
                        </motion.button>
                    </motion.div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                        {product.category}
                    </p>

                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                        ${product.price.toFixed(2)}
                    </p>

                    {/* Color Options */}
                    <div className="flex items-center space-x-2 pt-2">
                        {product.colors.slice(0, 3).map((color) => (
                            <div
                                key={color}
                                className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-600"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                        {product.colors.length > 3 && (
                            <span className="text-xs text-neutral-500">
                                +{product.colors.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
