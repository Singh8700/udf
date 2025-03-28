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

export async function getProduct(id) {
  const res = await fetch(`https://productlist.onrender.com/All_Produts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
