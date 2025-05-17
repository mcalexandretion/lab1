import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Furniture } from '../types/furniture';
import { fetchFurnitureById, fetchConstructedModelById, saveConstructedModel } from '../services/api';
import FurnitureConstructorWidget from '../components/FurnitureConstructorWidget';

const FurnitureConstructorPage = () => {
  const { id } = useParams();
  const [model, setModel] = useState<Furniture | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadModel = async () => {
      try {
        // Пробуем сначала получить сохранённую модель
        const savedRes = await fetchConstructedModelById(id);
        setModel(savedRes.data);
      } catch {
        // Если нет в сохранённых — грузим оригинал
        try {
          const originalRes = await fetchFurnitureById(Number(id));
          setModel(originalRes.data);
        } catch {
          setModel(null);
        }
      }
    };

    loadModel();
  }, [id]);

  const handleSave = () => {
    if (model) {
      saveConstructedModel(model)
        .then(() => alert('Модель сохранена!'))
        .catch(() => alert('Ошибка при сохранении модели.'));
    }
  };

  if (!model) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Редактирование модели: {model.name}</h2>
      <FurnitureConstructorWidget model={model} setModel={setModel} />
      <button onClick={handleSave} style={{ marginTop: 20 }}>
        Сохранить модель
      </button>
    </div>
  );
};

export default FurnitureConstructorPage;
