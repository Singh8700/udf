'use client';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import ProductCard from '../components/ProductCard/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HomeContainer = styled(motion.div)`
  width: 100vw;
  overflow-x: hidden;
`;

const Hero = styled(motion.section)`
  position: relative;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
  background-image: url('./images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.9);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('./images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.8);
    z-index: -2;
    transform: scale(1.1);
    animation: zoomEffect 20s infinite alternate;
  }

  @keyframes zoomEffect {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1.2);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
    z-index: -1;
  }

  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 900px;
  z-index: 1;
  padding: 2.5rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(${()=>Math.random() * 100},${()=>Math.random() * 100},${()=>Math.random() * 100},0.5),rgba(${()=>Math.random() * 200},${()=>Math.random() * 200},${()=>Math.random() * 200},0.5));
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width:80%;
    padding: 2rem;
    margin: 0 1rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to right, #fff, #e2e2e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const ShopNowButton = styled(motion.button)`
  background: white;
  color: #000;
  border: none;
  padding: 1.2rem 3.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: #000;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const ProductSection = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 8rem;
  padding: 0 2rem;
  scroll-margin-top: 100px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  color: #888;
  font-family:Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: #6366f1;
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  color: #ef4444;
  padding: 2rem;
  background: #fee2e2;
  border-radius: 8px;
  margin: 2rem 0;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const featuredSectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://productlist.onrender.com/All_Produts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleShopNowClick = () => {
    featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <HomeContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Hero variants={itemVariants}>
          <HeroContent variants={itemVariants}>
            <Title
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover Your Style Journey
            </Title>
            <Subtitle
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore our curated collection of trendsetting fashion
            </Subtitle>
            <ShopNowButton
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShopNowClick}
            >
              Shop Now
            </ShopNowButton>
          </HeroContent>
        </Hero>

        <ProductSection
          ref={featuredSectionRef}
          variants={itemVariants}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle variants={itemVariants}>
            Featured Products
          </SectionTitle>
          {loading ? (
            <LoadingSpinner variants={itemVariants}>Loading products...</LoadingSpinner>
          ) : error ? (
            <ErrorMessage variants={itemVariants}>{error}</ErrorMessage>
          ) : (
            <ProductGrid variants={itemVariants}>
              {products.map(product => (
                <Link href={`/product/${product.id}`} key={product.id}>
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  }} />
                </motion.div>
                </Link>
              ))}
            </ProductGrid>
          )}
        </ProductSection>
      </HomeContainer>
    </Layout>
  );
}
