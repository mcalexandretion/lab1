import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchConstructedModels, deleteConstructedModel } from '../services/api';
import type { Furniture } from '../types/furniture';

const ConstructedModelsPage = () => {
  const [models, setModels] = useState<Furniture[]>([]);

  const loadModels = () => {
    fetchConstructedModels().then((res) => {
      setModels(res.data);
    });
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту модель?')) {
      deleteConstructedModel(id)
        .then(() => {
          alert('Модель успешно удалена');
          // Обновляем список моделей после удаления
          loadModels();
        })
        .catch(() => {
          alert('Ошибка при удалении модели');
        });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Собранные модели</h2>
      {models.length === 0 ? (
        <p>Модели пока не добавлены.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {models.map((model) => (
            <li key={`${model.id}-${model.name}`} style={{ marginBottom: 10 }}>
              <div>
                <strong>{model.name}</strong> — {model.color}, {model.size}
              </div>
              <Link to={`/furniture/${model.id}/constructor`} style={{ marginRight: 10 }}>
                Открыть в конструкторе
              </Link>
              <button onClick={() => handleDelete(model.id)} style={{ color: 'red' }}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConstructedModelsPage;
