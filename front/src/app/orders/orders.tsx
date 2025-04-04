'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { getOrders } from '../lib/orderService';
import { Product } from '@/types/Product';
import ProductInsideOrder from '@/components/ProductInsideOrder/ProductInsideOrder';
import NoOrdersWarning from '@/components/NoOrdersWarning/NoOrdersWarning';
import { OrderType } from '@/types/OrderType';

const Orders = () => {
   const { orders, setOrders } = useAuth();

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) return;
            getOrders(token, setOrders);
         } catch (error) {
            console.error('Error fetching orders:', error);
         }
      };
      fetchOrders();
   }, [setOrders]);

   return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
         <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-6 lg:mt-0">
            <h2 className="text-3xl font-bold">Mis Pedidos</h2>
            {orders.length > 0 ? (
               <div className="space-y-6 mt-4">
                  {orders.map((order: OrderType) => {
                     const { id, status, date, products } = order;
                     const formattedDate = new Date(date).toLocaleDateString();

                     return (
                        <div
                           key={id}
                           className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                           <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-bold">Orden #{id}</h3>
                              <span
                                 className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    status === 'approved'
                                       ? 'bg-green-100 text-green-700'
                                       : status === 'pending'
                                       ? 'bg-yellow-100 text-yellow-700'
                                       : 'bg-red-100 text-red-700'
                                 }`}
                              >
                                 {status}
                              </span>
                           </div>
                           <p className="text-gray-500 text-sm">
                              Fecha: {formattedDate}
                           </p>

                           <div className="mt-4 space-y-3">
                              {products.map((product: Product) => (
                                 <ProductInsideOrder
                                    key={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                 />
                              ))}
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <NoOrdersWarning />
            )}
         </div>
      </div>
   );
};

export default Orders;
