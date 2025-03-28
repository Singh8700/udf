"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

const Card = styled(motion.div)`
  width: 350px;
  background: linear-gradient(135deg, rgba(${()=>Math.random() * 100},${()=>Math.random() * 100},${()=>Math.random() * 100},0.5),rgba(${()=>Math.random() * 200},${()=>Math.random() * 200},${()=>Math.random() * 200},0.5));
  color: white;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position:relative;
  z-index:1;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #ffcc70;
  font-weight: bold;
  font-family:'times new roman';
  text-transform: uppercase;
`;

const Tagline = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: #f8f9fa;
  max-width: 90%;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  color: white;
  transition: 0.3s;
  width: 100%;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const ContactPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", }}>
      <Card>
        <Title>Unique Designs Fashion</Title>
        <Tagline>"Your One-Stop Destination for Trendy and Unique Fashion Pieces"</Tagline>
        <ContactItem href="https://wa.me/7053377878" target="_blank">
          <FaWhatsapp size={20} /> WhatsApp
        </ContactItem>
        <ContactItem href="https://instagram.com/rajeshkumar96_" target="_blank">
          <FaInstagram size={20} /> Instagram
        </ContactItem>
        <ContactItem href="https://www.facebook.com/share/16BDTksYYW/" target="_blank">
          <FaFacebook size={20} /> Facebook
        </ContactItem>
        <ContactItem href="mailto:rajeshkumar887053@gmail.com" target="_blank">
          <FaEnvelope size={20} /> Email
        </ContactItem>
      </Card>
    </motion.div>
  );
};

export default ContactPage;
