"use client"
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCreditCard } from 'react-icons/fi';

const Card = styled(motion.div)`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  img {
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const ProductInfo = styled(motion.div)`
  padding: 1rem;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.8em;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProductPrice = styled(motion.p)`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #6366f1;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    padding: 0.7rem;
  }
`;

const AddToCartButton = styled(Button)`
  background-color: #f3f4f6;
  color: #333;
  
  &:hover {
    background-color: #e5e7eb;
  }
`;

const BuyNowButton = styled(Button)`
  background-color: #6366f1;
  color: white;
  
  &:hover {
    background-color: #4f46e5;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    router.push('/cart');
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <ImageContainer>
        <motion.img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          ₹{product.price}
        </ProductPrice>
        <ButtonContainer>
          <AddToCartButton
            onClick={handleAddToCart}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiShoppingCart /> Add to Cart
          </AddToCartButton>
          <BuyNowButton
            onClick={handleBuyNow}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiCreditCard /> Buy Now
          </BuyNowButton>
        </ButtonContainer>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
