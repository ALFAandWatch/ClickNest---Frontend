import { OrderType } from '@/types/OrderType';
import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(userId: number, products: number[]) {
   const token = localStorage.getItem('token');

   if (!token) {
      console.error('Token is missing!');
      return;
   }

   try {
      const response = await axios.post(
         `${API_URL}/orders`,
         { userId, products },
         {
            headers: {
               Authorization: `${token}`,
               'Content-Type': 'application/json',
            },
         }
      );

      return response.data;
   } catch (error: unknown) {
      if (error instanceof AxiosError) {
         console.error(
            'Order creation failed:',
            error.response?.data || error.message
         );
      } else {
         console.error('An unexpected error occurred:', error);
      }
      throw error;
   }
}

export async function getOrders(
   token: string,
   setOrders: (orders: OrderType[]) => void
) {
   const response = await axios.get(`${API_URL}/users/orders`, {
      headers: { Authorization: `${token}` },
   });
   setOrders(response.data);
}
