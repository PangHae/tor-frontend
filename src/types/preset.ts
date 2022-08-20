import ProductType from './product';

export default interface PresetType {
  presetId: number;
  presetName: string;
  presetContent: string;
  categoryName: string;
  recommend: number;
  producer: string;
  products?: ProductType[];
}
