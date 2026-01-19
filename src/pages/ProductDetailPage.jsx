import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from "motion/react";
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
const ERROR_IMG_SRC = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";


export default function ProductDetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/product.json');
        const data = await res.json();
        setProductsData(data);
      } catch (error) {
        console.log("Faild to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!productsData.length) return;

    const foundProduct = productsData.find(
      (p) => p.id === parseInt(id)
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id, productsData]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          {/* Loading text */}
          <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-neutral-600 dark:text-neutral-400'>Product not found</p>
      </div>
    );
  }

  const reviews = [
    { id: 1, name: 'Sarah M.', rating: 5, comment: 'Amazing quality! Fits perfectly and the fabric is so soft.', date: '2 weeks ago' },
    { id: 2, name: 'John D.', rating: 4, comment: 'Great product. Worth the price. Highly recommend!', date: '1 month ago' },
    { id: 3, name: 'Emma L.', rating: 5, comment: "Best purchase I've made this year. Will buy again!", date: '1 month ago' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800"
          >
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={ERROR_IMG_SRC}
                  alt="Image not available"
                  className="w-20 h-20 opacity-50"
                />
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="border-y border-neutral-200 dark:border-neutral-800 py-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-sm font-medium mb-3 block">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium ${selectedSize === size
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ring-2'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-sm font-medium mb-3 block">Select Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded-full border-2 ${selectedColor === color
                      ? 'border-neutral-900 dark:border-white ring-2'
                      : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <Check className="w-6 h-6 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-b border-neutral-200 dark:border-neutral-800 pb-6"
              >
                <p className="font-semibold">{review.name}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < review.rating
                          ? 'text-yellow-400'
                          : 'text-neutral-300 dark:text-neutral-600'
                        }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-500">{review.date}</p>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
