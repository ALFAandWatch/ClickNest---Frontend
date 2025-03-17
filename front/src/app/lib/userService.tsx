import { LoginObject } from '@/types/LoginObject';
import { User } from '@/types/User';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(values: User) {
   try {
      const response = await axios.post(`${API_URL}/users/register`, values);
      if (!response) {
         throw new Error('Error al registrar al usuario!');
      }
      return response.data;
   } catch (error: unknown) {
      if (error instanceof AxiosError) {
         Swal.fire({
            icon: 'error',
            text: 'Error al registrar al ususario.',
            confirmButtonText: 'OK',
         });
      } else {
         console.error('An unexpected error occurred:', error);
      }
      return [];
   }
}

export async function loginUser(values: LoginObject) {
   try {
      const response = await axios.post(`${API_URL}/users/login`, values);
      if (!response) {
         throw new Error('Error al intentar ingresar!');
      }
      localStorage.setItem('token', response.data.token);

      return response.data;
   } catch (error) {
      if (error instanceof AxiosError) {
         Swal.fire({
            icon: 'error',
            title: 'Error al intentar ingresar.',
            confirmButtonText: 'Volver',
         });
      } else {
         console.error('An unexpected error occurred:', error);
      }
      return [];
   }
}

export function logOutUser() {
   localStorage.removeItem('token');
   localStorage.removeItem('cart');

   return;
}
