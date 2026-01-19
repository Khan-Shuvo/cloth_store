import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from "./context/CartContext";
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-neutral-800 dark:text-white',
            }}
          />
            <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage/>} />
                <Route path="/cart" element={<h1>cart page</h1>} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/product/:id" element={<ProductDetailPage/>}/>
              </Routes>
            <Footer />
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
