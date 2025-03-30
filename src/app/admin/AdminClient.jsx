'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './admin.module.css';

export default function AdminClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: ''
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || ''
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`https://productlist.onrender.com/All_Produts/${productId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setProducts(products.filter(p => p.id !== productId));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingProduct 
        ? `https://productlist.onrender.com/All_Produts/${editingProduct.id}`
        : 'https://productlist.onrender.com/All_Produts';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to save product');

      const savedProduct = await res.json();

      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? savedProduct : p));
      } else {
        setProducts([...products, savedProduct]);
      }

      setIsModalOpen(false);
    } catch (error) {
      alert('Error saving product: ' + error.message);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <motion.button
          className={styles.addButton}
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add New Product
        </motion.button>
      </div>

      <div className={styles.productsGrid}>
        {products.map(product => (
          <motion.div
            key={product.id}
            className={styles.productCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img src={product.image} alt={product.name} />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>{product.category}</p>
            </div>
            <div className={styles.actions}>
              <motion.button
                onClick={() => handleEdit(product)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Edit
              </motion.button>
              <motion.button
                onClick={() => handleDelete(product.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles.deleteButton}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Price:</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Category:</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Image URL:</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className={styles.modalActions}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
