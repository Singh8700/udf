"use client";
import styled from 'styled-components';
import Layout from '../../../components/Layout/Layout';

const LoadingContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #6366f1;
  font-size: 1.2rem;
  font-weight: 500;
`;

export default function Loading() {
  return (
    <Layout>
      <LoadingContainer>
        <LoadingWrapper>
          <LoadingSpinner />
          <LoadingText>Loading product details...</LoadingText>
        </LoadingWrapper>
      </LoadingContainer>
    </Layout>
  );
}
