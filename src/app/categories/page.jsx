import Layout from '../../components/Layout/Layout';
import CategoriesClient from './CategoriesClient';

// Server component for data fetching
async function getProducts() {
  try {
    const res = await fetch('https://productlist.onrender.com/All_Produts', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Categories() {
  const products = await getProducts();

  return (
    <Layout>
      <CategoriesClient initialProducts={products} />
    </Layout>
  );
}
