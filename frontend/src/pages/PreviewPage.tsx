import Preview from '../components/Preview';
import { useParams } from 'react-router-dom';
import { fetchFurnitureById } from '../services/api';
import { useEffect, useState } from 'react';
import type { Furniture } from '../types/furniture';

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<Furniture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFurnitureById(Number(id))
      .then(res => {
        setModel(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!model) return <p>Модель не найдена.</p>;

  return (
    <div>
      <h1>Предпросмотр модели</h1>
      <Preview model={model} />
    </div>
  );
};

export default PreviewPage;
