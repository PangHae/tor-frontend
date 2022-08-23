import PresetType from './preset';
import ProductType from './product';
import CartActionType from './cartAction';

export type CategoryNProduct = {
  categoryName: string[];
  product: ProductType[];
};

export type { PresetType, ProductType, CartActionType };
