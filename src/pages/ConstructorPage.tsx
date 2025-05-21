import { useState } from 'react';
import FurnitureConstructorWidget from '../components/FurnitureConstructorWidget';
import type { Furniture } from '../types/furniture';
import { saveConstructedModel } from '../services/modelService';

const ConstructorPage: React.FC = () => {
  // Тип выбранной модели (пустая строка — тип не выбран)
  const [type, setType] = useState<string>('');
  // Текущая модель для конструктора
  const [model, setModel] = useState<Furniture | null>(null);

  // Обработка выбора типа
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as Furniture['type'];
    setType(newType);

    // При выборе типа создаём новую модель с этим типом и дефолтными параметрами
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
        shelves: newType === 'шкаф' ? [] : undefined, // если шкаф, то дефолтные полки
      });

    } else {
      setModel(null);
    }
  };

  // Сброс — возвращаемся к выбору типа
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

          <div>
            <button onClick={handleReset} style={{ marginRight: 10 }}>
              Сбросить
            </button>
           
          </div>
        </>
      )}
    </div>
  );
};

export default ConstructorPage;
