import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from "./context/CartContext";
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

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
                <Route path="/shop" element={<h1>shop page</h1>} />
                <Route path="/cart" element={<h1>cart page</h1>} />
                <Route path="/about" element={<h1>about page</h1>} />
                <Route path="/contact" element={<h1>contace page </h1>} />
              </Routes>
            <Footer />
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
