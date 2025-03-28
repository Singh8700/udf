import Layout from '../../../components/Layout/Layout';
import ProductClient from './ProductClient';

// This must be directly in the page file for Next.js static generation
export async function generateStaticParams() {
  try {
    const res = await fetch('https://productlist.onrender.com/All_Produts');
    const products = await res.json();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getProduct(id) {
  const res = await fetch(`https://productlist.onrender.com/All_Produts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <Layout>
        <div className={styles.productContainer}>
          <h1>Product not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductClient product={product} />
    </Layout>
  );
}
