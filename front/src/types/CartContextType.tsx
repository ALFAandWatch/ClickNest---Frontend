import { ProductWithQuantity } from './ProductWithQuantity';

export type CartContextType = {
   cart: ProductWithQuantity[];
   setCart: React.Dispatch<React.SetStateAction<ProductWithQuantity[]>>;
   addToCart: (item: ProductWithQuantity) => void;
   removeFromCart: (id: number) => void;
};
