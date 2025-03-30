
import AdminClient from './AdminClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getProducts() {
  try {
    const res = await fetch('https://productlist.onrender.com/All_Produts', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function AdminPage() {
  // Basic auth check - in production, use proper authentication
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('admin_authenticated');
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  const products = await getProducts();

  return <AdminClient initialProducts={products} />;
}
