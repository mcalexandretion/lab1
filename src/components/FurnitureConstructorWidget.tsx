import { useState, useEffect } from 'react';
import type { Furniture } from '../types/furniture';
import { saveConstructedModel } from '../services/api';

interface Props {
  model: Furniture;
  setModel?: (model: Furniture) => void; // опционально для обновления модели наверх
}

const FurnitureConstructorWidget = ({ model, setModel }: Props) => {
  const [custom, setCustom] = useState({ ...model });

  // Синхронизируем локальный стейт с внешним model, если он поменялся
  useEffect(() => {
    setCustom({ ...model });
  }, [model]);

  const handleSave = () => {
    saveConstructedModel(custom)
      .then(() => {
        alert('Модель сохранена!');
        if (setModel) setModel(custom);
      })
      .catch(() => alert('Ошибка при сохранении'));
  };

  return (
    <div style={{ border: '1px dashed #999', marginTop: 20, padding: 10 }}>
      <h3>Конструктор мебели</h3>

      <label>Цвет:</label>
      <input
        value={custom.color}
        onChange={e => setCustom({ ...custom, color: e.target.value })}
      />

      <label>Размер:</label>
      <input
        value={custom.size}
        onChange={e => setCustom({ ...custom, size: e.target.value })}
      />

      <button onClick={handleSave}>Сохранить модель</button>
    </div>
  );
};

export default FurnitureConstructorWidget;
