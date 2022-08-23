export default interface ProductType {
  presetName?: string;
  productId: number;
  productName: string;
  category: string;
  company: string;
  price: number;
  weight: string;
  score: number;
  imagePath: string;
  checked?: boolean;
  count: number;
}
