import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, AwardIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

const HomePage = () => {

    const [productsData, setProductsData] = useState([])
    useEffect(() =>{
        const fetchData = async () =>  {
                const res = await fetch('/product.json')
                const data = await res.json()
                setProductsData(data)
        }
        fetchData()
    },[])
  const trendingProducts = productsData.filter((p) => p.trending).slice(0, 4);

  const categories = [
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/shop?category=women',
    },
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/shop?category=men',
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/shop?category=kids',
    },
  ];

  /* ---------------- Hero Image ---------------- */
  const [heroError, setHeroError] = useState(false);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <div className="absolute inset-0">
          {!heroError ? (
            <img
              src="https://images.unsplash.com/photo-1572029731797-58d089aedc98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Hero"
              onError={() => setHeroError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-300 dark:bg-neutral-800">
              <img src={ERROR_IMG_SRC} alt="Hero fallback" className="w-20 h-20 opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              New Arrivals
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 mb-8">
              Discover the latest trends in modern fashion
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-neutral-900 px-8 py-4 rounded-full text-lg font-medium inline-flex items-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const [imgError, setImgError] = useState(false);

              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-lg"
                >
                  <Link to={category.link}>
                    {!imgError ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                        <img src={ERROR_IMG_SRC} alt="Fallback" className="w-14 h-14 opacity-50" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <span className="text-white inline-flex items-center space-x-2">
                        <span>Explore</span>
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
