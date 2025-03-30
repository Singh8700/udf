import AdminClient from './AdminClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Mark page as dynamic
// export const dynamic = 'force-dynamic';

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
  try {
    // Basic auth check - in production, use proper authentication
    const cookieStore = await cookies();
    const isAuthenticated = await cookieStore.get('admin_authenticated');
    
    if (!isAuthenticated) {
      redirect('/admin/login');
    }

    const products = await getProducts();
    return <AdminClient initialProducts={products} />;
  } catch (error) {
    console.error('Error in AdminPage:', error);
    redirect('/admin/login');
  }
}
