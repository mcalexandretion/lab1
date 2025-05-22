export interface Furniture {
  id: number;
  name: string;
  type: 'стол' | 'диван' | 'шкаф' | 'кресло' | 'кровать' | 'стул';
  color: string;
  material: string;
  size: string;
  description: string;
  images: string[];
  shelves?: number[];
}
