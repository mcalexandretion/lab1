import { useState, useEffect } from 'react';
import type { Furniture } from '../types/furniture';
import { saveConstructedModel } from '../services/api';

interface Props {
  model: Furniture;
  setModel?: (model: Furniture) => void; // опционально для обновления модели наверх
}

const FurnitureConstructorWidget = ({ model, setModel }: Props) => {
  const [custom, setCustom] = useState({ ...model });
  const [isSaving, setIsSaving] = useState(false);

  // Синхронизируем локальный стейт с внешним model, если он поменялся
  useEffect(() => {
    setCustom({ ...model });
  }, [model]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Если у тебя логика проверки на дубликаты реализована на сервере,
      // и сервер возвращает ошибку или статус, то можно обработать здесь
      await saveConstructedModel(custom);
      alert('Модель сохранена!');
      if (setModel) setModel(custom);
    } catch (error: any) {
      // Если сервер отдает ошибку про дубликат — можно уточнить по коду ошибки
      if (error.response && error.response.status === 409) {
        alert('Такая модель уже существует!');
      } else {
        alert('Ошибка при сохранении');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ border: '1px dashed #999', marginTop: 20, padding: 10 }}>
      <h3>Конструктор мебели</h3>

      <label>Цвет:</label>
      <input
        value={custom.color}
        onChange={e => setCustom({ ...custom, color: e.target.value })}
        disabled={isSaving}
      />

      <label>Размер:</label>
      <input
        value={custom.size}
        onChange={e => setCustom({ ...custom, size: e.target.value })}
        disabled={isSaving}
      />

      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Сохраняем...' : 'Сохранить модель'}
      </button>
    </div>
  );
};

export default FurnitureConstructorWidget;
