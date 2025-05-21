import { useState, useEffect } from 'react';
import type { Furniture } from '../types/furniture';
import { saveConstructedModel } from '../services/modelService';

interface Props {
  model: Furniture;
  setModel?: (model: Furniture) => void;
}

const FurnitureConstructorWidget = ({ model, setModel }: Props) => {
  const [custom, setCustom] = useState({ ...model });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCustom({ ...model });
  }, [model]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const savedModel = await saveConstructedModel(custom);
      alert('Модель сохранена!');
      if (setModel) setModel(savedModel);
    } catch (error: any) {
      alert(error.message);
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