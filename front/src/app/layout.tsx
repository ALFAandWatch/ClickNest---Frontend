import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
   title: 'ClickNest',
   description: 'Generated by Next.js',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className="overscroll-none">
            <AuthProvider>
               <CartProvider>
                  <Navbar></Navbar>
                  <div className="min-h-screen">{children}</div>
                  <Footer></Footer>
               </CartProvider>
            </AuthProvider>
         </body>
      </html>
   );
}
