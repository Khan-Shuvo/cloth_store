import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/shop"
            className="inline-block bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 flex gap-6"
              >
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                      <p className="text-lg font-bold text-neutral-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                      className="text-neutral-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 rounded bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-neutral-900 dark:text-white font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 rounded bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 flex justify-between text-lg font-bold text-neutral-900 dark:text-white">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors mb-4"
              >
                Proceed to Checkout
              </motion.button>

              <Link
                to="/shop"
                className="block text-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
