'use client';
import {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect,
} from 'react';
import { AuthContextType } from '../types/AuthContextType';
import { AuthenticatedUser } from '@/types/User';
import { OrderType } from '@/types/OrderType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [user, setUser] = useState<AuthenticatedUser>({
      id: 0,
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      orders: [],
   });
   const [orders, setOrders] = useState<OrderType[]>([]);

   useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
   }, []);

   useEffect(() => {
      const handleStorageChange = () => {
         if (
            typeof window !== 'undefined' &&
            performance?.navigation?.type === 1
         ) {
            localStorage.removeItem('token'); // Clear token ONLY on refresh/restart
         }

         const token = localStorage.getItem('token');
         setIsAuthenticated(!!token);
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
   }, []);

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            orders,
            setOrders,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
