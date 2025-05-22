import { useState } from 'react';
import FurnitureConstructorWidget from '../components/FurnitureConstructorWidget';
import type { Furniture } from '../types/furniture';

const ConstructorPage: React.FC = () => {

  const [type, setType] = useState<string>('');

  const [model, setModel] = useState<Furniture | null>(null);


  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as Furniture['type'];
    setType(newType);


    if (newType) {
      setModel({
        id: 0,
        name: 'Новая модель',
        type: newType,
        color: 'белый',
        material: 'дерево',
        size: '100x60x75',
        description: '',
        images: [],
        shelves: newType === 'шкаф' ? [] : undefined,
      });

    } else {
      setModel(null);
    }
  };


  const handleReset = () => {
    setType('');
    setModel(null);
  };


  return (
    <div>
      {!type && (
        <select value={type} onChange={handleTypeChange}>
          <option value="">Выберите тип мебели</option>
          <option value="стол">Стол</option>
          <option value="диван">Диван</option>
          <option value="шкаф">Шкаф</option>
          <option value="кресло">Кресло</option>
          <option value="кровать">Кровать</option>
          <option value="стул">Стул</option>
        </select>
      )}

      {type && model && (
        <>
          <FurnitureConstructorWidget model={model} setModel={setModel} />


          <button onClick={handleReset}>
            Сбросить
          </button>


        </>
      )}
    </div>
  );
};

export default ConstructorPage;
