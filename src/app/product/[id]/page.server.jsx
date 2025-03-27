import { Suspense } from 'react';
import ProductClient from './ProductClient';
import Loading from './loading';

export async function generateStaticParams() {
  const res = await fetch('https://productlist.onrender.com/All_Produts');
  const products = await res.json();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`https://productlist.onrender.com/All_Produts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default async function Page({ params }) {
  const product = await getProduct(params.id);
  return (
    <Suspense fallback={<Loading />}>
      <ProductClient product={product} />
    </Suspense>
  );
}
