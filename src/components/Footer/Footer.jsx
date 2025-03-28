"use client"
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #1a1a1a, #2d2d2d);
  color: #fff;
  padding: 4rem 2rem 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #6366f1, #a855f7);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  padding: 0 2rem;
  margin-bottom:8rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background: #6366f1;
    margin-bottom:5rem;
    @media(max-width:780px){
    margin-bottom:0;
    }
  }
`;

const FooterLink = styled(motion.a)`
  color: #e5e5e5;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;
  &:hover {
    color: #6366f1;
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  font-size:0.6rem;
`;

const SocialIcon = styled(motion.a)`
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #6366f1;
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  position:absolute;
  left:50%;
  bottom:0px;
  transform:translate(-50%,-20%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
  font-size: 0.6rem;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e5e5e5;
  margin-bottom: 0.8rem;

  svg {
    color: #6366f1;
  }
`;

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FooterTitle>About Us</FooterTitle>
          <motion.p variants={itemVariants}>
            Unique Designs Fashion - Your one-stop destination for trendy and unique fashion pieces that define your style.
          </motion.p>
          <SocialLinks>
            <SocialIcon href="https://www.facebook.com/share/16BDTksYYW/" target="_blank" whileHover={{ scale: 1.1 }}>
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://instagram.com/rajeshkumar96_" target="_blank" whileHover={{ scale: 1.1 }}>
              <FaInstagram />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FooterTitle>Quick Links</FooterTitle>
          <Link href="/" passHref>
            <FooterLink variants={itemVariants}>Home</FooterLink>
          </Link>
          <Link href="/products" passHref>
            <FooterLink variants={itemVariants}>Products</FooterLink>
          </Link>
          <Link href="/categories" passHref>
            <FooterLink variants={itemVariants}>Categories</FooterLink>
          </Link>
          <Link href="/cart" passHref>
            <FooterLink variants={itemVariants}>Cart</FooterLink>
          </Link>
          {/* <Link href="/account" passHref>
            <FooterLink variants={itemVariants}>My Account</FooterLink>
          </Link> */}
        </FooterSection>

        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FooterTitle>Contact Us</FooterTitle>
          <ContactInfo variants={itemVariants}>
            <FiMapPin />
            <span>123 Fashion Street, Design City, IN 12345</span>
          </ContactInfo>
          <ContactInfo variants={itemVariants}>
            <FiPhone />
            <a href="tel:+917053377878" style={{ color: 'inherit', textDecoration: 'none' }}>
              +91 7053377878
            </a>
          </ContactInfo>
          <ContactInfo variants={itemVariants}>
            <FiMail />
            <a href="mailto:rajeshkumar887053@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
            rajeshkumar887053@gmail.com
            </a>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {new Date().getFullYear()} Unique Designs Fashion. All rights reserved.
        </motion.p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
