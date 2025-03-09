import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
   try {
      const response = await axios.get(`${API_URL}/products`);
      if (!response) {
         throw new Error('Error al cargar los productos!');
      }
      return await response.data;
   } catch (error) {
      console.error(error);
      return [];
   }
}
