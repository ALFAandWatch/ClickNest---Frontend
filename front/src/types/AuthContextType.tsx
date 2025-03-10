import { AuthenticatedUser } from './User';
import { OrderType } from './OrderType';

export type AuthContextType = {
   isAuthenticated: boolean;
   setIsAuthenticated: (auth: boolean) => void;
   user: AuthenticatedUser;
   setUser: (user: AuthenticatedUser) => void;
   orders: OrderType[];
   setOrders: (orders: OrderType[]) => void;
};
