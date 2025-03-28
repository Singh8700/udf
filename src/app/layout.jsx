import "./globals.css";
import Navbar from "./navBar/page";
import { CartProvider } from '../context/CartContext.jsx';
// import StyledComponentsRegistry from './registry';

export const metadata = {
  title: "Unique Design Fashion | Trendy & Stylish Clothing Online",
  description: "Explore the latest fashion trends with Unique Design Fashion. Shop stylish, high-quality outfits curated for a modern and elegant look. Free shipping & exclusive deals!",
  keywords: "fashion, trendy clothing, stylish outfits, unique design fashion, online fashion store, latest fashion trends",
  author: "Unique Design Fashion",
  robots: "index, follow",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        
          <CartProvider>
            <Navbar/>
            {children}
          </CartProvider>
       
      </body>
    </html>
  );
}
