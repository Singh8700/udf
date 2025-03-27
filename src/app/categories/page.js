'use client';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import { useRouter } from 'next/navigation';

const CategoriesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
    z-index: 1;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryName = styled.h2`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  font-size: 1.5rem;
  z-index: 2;
  margin: 0;
`;

const categories = [
  {
    id: 1,
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "t-shirts"
  },
  {
    id: 2,
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "jeans"
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "shoes"
  },
  {
    id: 4,
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    slug: "dresses"
  }
];

export default function Categories() {
  const router = useRouter();

  const handleCategoryClick = (slug) => {
    router.push(`/products?category=${slug}`);
  };

  return (
    <Layout>
      <CategoriesContainer>
        <Title>Browse Categories</Title>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <CategoryImage src={category.image} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategoriesContainer>
    </Layout>
  );
}
