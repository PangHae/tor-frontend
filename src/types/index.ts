import PresetType from './preset';
import ProductType from './product';

export type CategoryNProduct = {
  categoryName: string[];
  product: ProductType[];
};

export type { PresetType, ProductType };
