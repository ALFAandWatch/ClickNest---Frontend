'use client';

import { useParams } from 'next/navigation';
import productosHelper from '../../../helpers/productos';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const ProductDetails = () => {
   const params = useParams();
   const [product, setProduct] = useState({
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: '.',
      categoryId: 0,
   });
   const [loading, setLoading] = useState(true);

   const { isAuthenticated } = useAuth();
   const { addToCart } = useCart();

   useEffect(() => {
      if (!params.productId) return;

      const productId = Number(params.productId);
      const foundProduct = productosHelper.find((p) => p.id === productId);

      if (foundProduct) {
         setProduct(foundProduct);
      }
      setLoading(false);
   }, [params.productId]);

   if (loading) return <p>Loading product...</p>;
   if (!product) return <p>Product not found.</p>;

   const handleAddToCart = () => {
      if (isAuthenticated) {
         Swal.fire({
            imageUrl: product.image,
            imageWidth: '50%',
            title: '¿Agregar al carrito?',
            inputLabel: '¿Cuántos?',
            input: 'number',
            inputValue: '1',
            reverseButtons: true,
            confirmButtonColor: '#39c9bb',
            confirmButtonText: 'Agregar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
         }).then((result) => {
            if (result.isConfirmed) {
               addToCart({ ...product, quantity: parseInt(result.value) });
            }
         });
      } else {
         Swal.fire({
            icon: 'info',
            text: 'Debes ingresar para poder agregar productos al carrito.',
            confirmButtonColor: '#39c9bb',
            confirmButtonText: 'OK',
         });
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
         <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 m-4 lg:m-0 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2">
               <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg object-contain"
               />
            </div>

            <div className="w-full md:w-1/2">
               <h2 className="text-3xl font-bold text-gray-900">
                  {product.name}
               </h2>
               <p className="text-gray-600 mt-3">{product.description}</p>
               <p className="text-gray-900 font-semibold text-2xl mt-4">
                  ${product.price}
               </p>

               <button
                  className="mt-6 w-full bg-turquoise text-black py-3 rounded-lg font-semibold text-lg"
                  onClick={handleAddToCart}
               >
                  Agregar al Carrito
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;
