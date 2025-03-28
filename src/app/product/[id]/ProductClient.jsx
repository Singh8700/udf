"use client";
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext.jsx';
import styles from './product.module.css';

export default function ProductClient({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className={styles.productContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.productWrapper}>
          <div className={styles.imageSection}>
            <img className={styles.productImage} src={product.image} alt={product.name} />
          </div>
          <div className={styles.productInfo}>
            <div>
              <h1 className={styles.productName}>{product.name}</h1>
              <div className={styles.productPrice}>₹{product.price}</div>
            </div>
            <p className={styles.productDescription}>
              {product.description || 'A premium quality product designed for your needs.'}
            </p>
            <motion.button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
            <div className={styles.productDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Category:</span>
                <span className={styles.detailValue}>{product.category}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Availability:</span>
                <span className={styles.detailValue}>In Stock</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>SKU:</span>
                <span className={styles.detailValue}>{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
