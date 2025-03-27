"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../../components/Layout/Layout';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { Suspense } from 'react';
import ProductClient from './ProductClient';
import Loading from './loading';

// Function to get all products for static paths
export async function generateStaticParams() {
  const res = await fetch('https://productlist.onrender.com/All_Produts');
  const products = await res.json();
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Function to get single product data
async function getProduct(id) {
  const res = await fetch(`https://productlist.onrender.com/All_Produts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

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
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #6366f1;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
`;

const AddToCartButton = styled(motion.button)`
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 100px;
`;

const DetailValue = styled.span`
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <ProductContainer>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <ProductWrapper>
              <ImageSection>
                <ProductImage src={product.image} alt={product.name} />
              </ImageSection>
              <ProductInfo>
                <div>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>₹{product.price}</ProductPrice>
                </div>
                <ProductDescription>{product.description || 'A premium quality product.'}</ProductDescription>
                <AddToCartButton onClick={handleAddToCart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Add to Cart
                </AddToCartButton>
                <ProductDetails>
                  <DetailRow>
                    <DetailLabel>Category:</DetailLabel>
                    <DetailValue>{product.category}</DetailValue>
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
    </Suspense>
  );
}
