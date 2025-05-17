import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Furniture } from '../types/furniture';
import { fetchFurnitureById } from '../services/api';

const FurnitureDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [furniture, setFurniture] = useState<Furniture | null>(null);

  useEffect(() => {
    if (id) {
      fetchFurnitureById(Number(id)).then(response => {
        setFurniture(response.data);
      });
    }
  }, [id]);

  if (!furniture) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{furniture.name}</h2>
      <p>Цвет: {furniture.color}</p>
      <p>Размер: {furniture.size}</p>
      <Link to={`/furniture/${furniture.id}/constructor`}>
        <button style={{ marginTop: 20 }}>Открыть в конструкторе</button>
      </Link>
    </div>
  );
};

export default FurnitureDetailPage;
