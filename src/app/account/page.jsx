'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import { motion } from 'framer-motion';

const AccountContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  padding: 3rem 2rem;
  border-radius: 15px;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: white;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #6366f1;
`;

const UserName = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  color: ${props => props.active ? '#6366f1' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #6366f1;
    transform: scaleX(${props => props.active ? '1' : '0'});
    transition: transform 0.3s ease;
  }
`;

const ContentSection = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const SaveButton = styled.button`
  background-color: #6366f1;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }
`;

const OrderList = styled.div`
  display: grid;
  gap: 1rem;
`;

const OrderItem = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderId = styled.p`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const OrderDate = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const OrderStatus = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background-color: ${props => {
    switch (props.status) {
      case 'delivered': return '#dcfce7';
      case 'processing': return '#fff7ed';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'delivered': return '#166534';
      case 'processing': return '#9a3412';
      case 'cancelled': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

// Sample order data
const orders = [
  { id: 'ORD001', date: '27 Mar 2025', status: 'delivered', amount: '₹2,499' },
  { id: 'ORD002', date: '25 Mar 2025', status: 'processing', amount: '₹1,899' },
  { id: 'ORD003', date: '20 Mar 2025', status: 'cancelled', amount: '₹3,299' },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    address: 'New Delhi, India'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ContentSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormGroup>
              <Label>Full Name</Label>
              <Input type="text" value={userData.name} onChange={() => {}} />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" value={userData.email} onChange={() => {}} />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input type="tel" value={userData.phone} onChange={() => {}} />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input type="text" value={userData.address} onChange={() => {}} />
            </FormGroup>
            <SaveButton>Save Changes</SaveButton>
          </ContentSection>
        );
      case 'orders':
        return (
          <ContentSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OrderList>
              {orders.map(order => (
                <OrderItem key={order.id}>
                  <OrderInfo>
                    <OrderId>{order.id}</OrderId>
                    <OrderDate>{order.date}</OrderDate>
                  </OrderInfo>
                  <OrderStatus status={order.status}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </OrderStatus>
                  <div style={{ marginLeft: '2rem', fontWeight: '600' }}>
                    {order.amount}
                  </div>
                </OrderItem>
              ))}
            </OrderList>
          </ContentSection>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <AccountContainer>
        <ProfileHeader>
          <Avatar>RK</Avatar>
          <UserName>{userData.name}</UserName>
          <UserEmail>{userData.email}</UserEmail>
        </ProfileHeader>

        <TabContainer>
          <Tab
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </Tab>
          <Tab
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </Tab>
        </TabContainer>

        {renderContent()}
      </AccountContainer>
    </Layout>
  );
}