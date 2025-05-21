import { useEffect, useState } from 'react';
import { getFurnitureById, getConstructedModelById } from '../services/api';
import FurnitureConstructorWidget from '../components/FurnitureConstructorWidget';
import type { Furniture } from '../types/furniture';

interface Props {
  id: string;
  source: 'original' | 'constructed';
}

const FurnitureConstructorPage = ({ id, source }: Props) => {
  const [model, setModel] = useState<Furniture | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const data =
          source === 'constructed'
            ? await getConstructedModelById(id)
            : await getFurnitureById(id);
        setModel(data);
      } catch (error) {
        console.error('Ошибка при загрузке модели:', error);
      }
    };

    fetchModel();
  }, [id, source]);

  if (!model) return <div>Загрузка модели...</div>;

  return (
    <div>
      <h2>Конструктор мебели</h2>
      <p>Тип: {model.type}</p>
      <FurnitureConstructorWidget model={model} />
    </div>
  );
};

export default FurnitureConstructorPage;
