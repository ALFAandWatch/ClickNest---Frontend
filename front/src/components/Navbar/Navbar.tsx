'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { logOutUser } from '@/app/lib/userService';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Navbar = () => {
   const { isAuthenticated, setIsAuthenticated } = useAuth();
   const { cart, setCart } = useCart();
   const router = useRouter();

   const handleLogOut = () => {
      logOutUser();
      setCart([]);
      setIsAuthenticated(false);
      router.push('/');
   };

   const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

   return (
      <>
         <div className="w-full bg-black flex flex-row px-3">
            <div className="basis-1/3">
               <Link href="/">
                  <h2 className="text-white align-middle text-4xl font-sans font-bold inline">
                     ClickNest
                  </h2>
                  <Image
                     className="inline p-2 align-middle"
                     src="icons/raven.svg"
                     alt="ClickNest"
                  />
               </Link>
            </div>
            <div className="basis-2/3 flex flex-row justify-end">
               {!isAuthenticated ? (
                  <>
                     <div className="pe-1">
                        <Link href="/login">
                           <button className="bg-black p-2 px-3 my-2 text-turquoise rounded-md font-sans font-light hover:brightness-150 border border-black hover:border hover:border-turquoise transition duration-500 ease-in-out">
                              Ingresar
                           </button>
                        </Link>
                     </div>
                     <div className="px-1">
                        <Link href="/register">
                           <button className="bg-turquoise p-2 px-3 my-2 text-black rounded-md font-sans font-light hover:brightness-150 transition duration-500 ease-in-out">
                              Registrarme
                           </button>
                        </Link>
                     </div>
                  </>
               ) : (
                  <>
                     <div>
                        <ul className="flex flex-row px-2wq">
                           <li>
                              <Link href="/dashboard">
                                 <Image
                                    className="p-2 py-4 hover:brightness-200"
                                    src="icons/bell.svg"
                                    alt="Notificaciones"
                                 />
                              </Link>
                           </li>
                           <li>
                              <Link href="/dashboard">
                                 <Image
                                    className="p-2 py-4 hover:brightness-200"
                                    src="icons/user.svg"
                                    alt="Perfil"
                                 />
                              </Link>
                           </li>
                           <li className="relative">
                              <Link href="/cart">
                                 <Image
                                    className="p-2 py-4 hover:brightness-200"
                                    src="icons/cart.svg"
                                    alt="Carrito"
                                 />
                                 {totalItems > 0 && (
                                    <span className="absolute bottom-8 left-6 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                       {totalItems}
                                    </span>
                                 )}
                              </Link>
                           </li>
                        </ul>
                     </div>
                     <div className="pe-1">
                        <button
                           className="bg-black p-2 px-3 my-2 text-turquoise rounded-md font-sans font-light hover:brightness-150 border border-black hover:border hover:border-turquoise transition duration-500 ease-in-out"
                           onClick={handleLogOut}
                        >
                           Cerrar Sesión
                        </button>
                     </div>
                  </>
               )}
            </div>
         </div>
         <div className="w-full bg-turquoise flex flex-row justify-between px-3 text-sm py-1">
            <Link href="/categories">
               <button className="p-2 px-3 rounded-md bg-black text-turquoise hover:brightness-150 font-light">
                  Todas las Categorías
               </button>
            </Link>
            <Link href="/products/1">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Smartphones
               </button>
            </Link>
            <Link href="/products/2">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-700 ease-in-out font-light font-sans">
                  Laptops
               </button>
            </Link>
            <Link href="/products/3">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Tablets
               </button>
            </Link>
            <Link href="/products/4">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Auriculares
               </button>
            </Link>
            <Link href="/products/5">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Cámaras
               </button>
            </Link>
            <Link href="/products/6">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Impresoras
               </button>
            </Link>
            <Link href="/monitors/7">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Monitores
               </button>
            </Link>
            <Link href="/storage/8">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Mobiliario
               </button>
            </Link>
            <Link href="/accessories/9">
               <button className="p-2 px-3 mx-1 rounded-md h-full border border-turquoise hover:border hover:border-white hover:text-white transition duration-500 ease-in-out font-light font-sans">
                  Accesorios
               </button>
            </Link>
         </div>
      </>
   );
};

export default Navbar;
