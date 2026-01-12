import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("useCart must be used within CartProvider")
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])


    useEffect(() => {
        const savedCartItem = localStorage.getItem('cartItem')
        if (savedCartItem) {
            setCartItems(JSON.parse(savedCartItem))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, selectedSize, selectedColor) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItem) {
                toast.success('Updated quantity in cart');
                return prev.map((item) =>
                    item.id === product.id &&
                        item.selectedSize === selectedSize &&
                        item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            toast.success('Added to cart');
            return [...prev, { ...product, quantity: 1, selectedSize, selectedColor }];
        });
    };

    const removeFromCart = (productId, selectedSize, selectedColor) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
            )
        );
        toast.success('Removed from cart');
    };
    const updateQuantity = (productId, selectedSize, selectedColor, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, selectedSize, selectedColor);
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast.success('Cart cleared');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    )
}