import { useEffect, useState } from 'react';
import { fetchFurniture } from '../services/api';
import type { Furniture } from '../types/furniture';
import FurnitureCard from '../components/FurnitureCard';
import FurnitureFilter from '../components/FurnitureFilter';

const CatalogPage = () => {
  const [items, setItems] = useState<Furniture[]>([]);
  const [allItems, setAllItems] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFurniture()
      .then(res => {
        setItems(res.data);
        setAllItems(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Каталог мебели</h1>
      <FurnitureFilter allItems={allItems} onFilter={setItems} />
      {loading ? <p>Загрузка...</p> : (
        <div>
          {items.map(item => (
            <FurnitureCard key={item.id} item={item} />
          ))}
        </div>

      )}
    </div>
  );
};

export default CatalogPage;
