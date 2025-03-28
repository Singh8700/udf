"use client"
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext.jsx';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #6366f1;
  cursor: pointer;
  z-index: 100;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    height: 100vh;
    width: 250px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transition: right 0.3s ease;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(motion.a)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #6366f1;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
`;

const CartIcon = styled(motion.div)`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-size: 1.5rem;
  z-index: 100;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const CartCount = styled(motion.span)`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #6366f1;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  min-width: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    min-width: 18px;
    padding: 0.2rem 0.4rem;
  }
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <Link href="/" passHref>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Unique Designs Fashion
          </Logo>
        </Link>
        <NavLinks isOpen={isMenuOpen}>
          <Link href="/products" passHref>
            <NavLink
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>
          </Link>
          <Link href="/categories" passHref>
            <NavLink
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </NavLink>
          </Link>
        </NavLinks>
        <CartIcon 
          onClick={() => router.push('/cart')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiShoppingCart />
          {totalItems > 0 && (
            <CartCount
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {totalItems}
            </CartCount>
          )}
        </CartIcon>
        <MenuButton
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MenuButton>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
