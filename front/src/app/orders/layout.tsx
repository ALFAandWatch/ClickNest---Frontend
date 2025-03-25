'use client';
import Link from 'next/link';
import { logOutUser } from '../lib/userService';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const { setIsAuthenticated } = useAuth();
   const { setCart } = useCart();
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);
   const sidebarRef = useRef<HTMLDivElement>(null);

   const handleLogOut = () => {
      logOutUser();
      setCart([]);
      setIsAuthenticated(false);
      router.push('/');
   };

   // Close the menu when clicking outside
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <div className="min-h-screen flex bg-gray-100 relative">
         {/* Menu button for small screens */}
         <button
            onClick={() => setIsOpen(true)}
            className="absolute top-4 right-4 z-50 lg:hidden p-2 bg-white shadow-md rounded-md mt-1 lg:mt-0"
         >
            <Menu size={24} />
         </button>

         {/* Sidebar */}
         <aside
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full bg-white p-6 shadow-lg transform transition-transform ${
               isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:relative lg:w-64`}
         >
            <h2 className="text-xl font-bold mb-6">Mi Cuenta</h2>
            <nav className="space-y-4">
               <Link href="/dashboard" className="block hover:text-turquoise">
                  Perfil
               </Link>
               <Link href="/orders" className="block hover:text-turquoise">
                  Mis Pedidos
               </Link>
               <Link
                  href="#"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Lista de Deseos
               </Link>
               <Link
                  href="#"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Direcciones
               </Link>
               <Link
                  href="#"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Métodos de Pago
               </Link>
               <Link
                  href="#"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Configuración
               </Link>
               <button
                  onClick={handleLogOut}
                  className="mt-4 text-red-500 font-bold"
               >
                  Cerrar Sesión
               </button>
            </nav>
         </aside>

         {/* Main content */}
         <main className="flex-1 p-6">{children}</main>
      </div>
   );
};

export default DashboardLayout;
