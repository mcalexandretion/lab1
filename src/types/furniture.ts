export interface Furniture {
  id: number;
  name: string;
  type: 'стол' | 'диван' | 'шкаф';
  color: string;
  size: string;
  description: string;
  images: string[];
}
