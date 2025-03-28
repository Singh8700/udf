'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './categories.module.css';

export default function CategoriesClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = ['all', ...new Set(initialProducts.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [initialProducts]);

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    
    try {
      if (category === 'all') {
        setProducts(initialProducts);
      } else {
        const filtered = initialProducts.filter(product => product.category === category);
        setProducts(filtered);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.filterSection}>
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loadingSpinner}>Loading...</div>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              className={styles.productCard}
              onClick={() => handleProductClick(product.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={product.image} alt={product.name} />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p className={styles.price}>₹{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
