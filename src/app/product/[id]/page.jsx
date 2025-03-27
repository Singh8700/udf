'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../../components/Layout/Layout';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f8f8;
  aspect-ratio: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  color: #6366f1;
  font-weight: 600;
`;

const ProductDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
`;

const AddToCartButton = styled(motion.button)`
  background-color: #6366f1;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  width: fit-content;

  &:hover {
    background-color: #4f46e5;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: #6366f1;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ef4444;
  padding: 2rem;
  background: #fee2e2;
  border-radius: 8px;
  margin: 2rem 0;
`;

const ProductDetails = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  width: 150px;
  color: #333;
`;

const DetailValue = styled.span`
  color: #666;
`;

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://productlist.onrender.com/All_Produts');
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        const foundProduct = data.find(p => p.id === params.id);
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        setProduct(foundProduct);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner>Loading product details...</LoadingSpinner>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage>{error}</ErrorMessage>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <ErrorMessage>Product not found</ErrorMessage>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductWrapper>
            <ImageSection>
              <ProductImage src={product.image} alt={product.name} />
            </ImageSection>
            
            <ProductInfo>
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>₹{product.price}</ProductPrice>
              </div>
              
              <ProductDescription>
                {product.description || 'A premium quality product that combines style, comfort, and durability.'}
              </ProductDescription>

              <AddToCartButton
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </AddToCartButton>

              <ProductDetails>
                <DetailRow>
                  <DetailLabel>Category:</DetailLabel>
                  <DetailValue>{product.category || 'Fashion'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Brand:</DetailLabel>
                  <DetailValue>{product.brand || 'Premium Brand'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Availability:</DetailLabel>
                  <DetailValue>In Stock</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>SKU:</DetailLabel>
                  <DetailValue>{product.id}</DetailValue>
                </DetailRow>
              </ProductDetails>
            </ProductInfo>
          </ProductWrapper>
        </motion.div>
      </ProductContainer>
    </Layout>
  );
}
