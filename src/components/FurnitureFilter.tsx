import { useState } from 'react';
import type { Furniture } from '../types/furniture';

interface Props {
  allItems: Furniture[];
  onFilter: (data: Furniture[]) => void;
}

const FurnitureFilter = ({ allItems, onFilter }: Props) => {
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const handleFilter = () => {
    let filtered = allItems;

    if (type) filtered = filtered.filter(f => f.type === type);
    if (color) filtered = filtered.filter(f => f.color.includes(color));
    if (size) filtered = filtered.filter(f => f.size.includes(size));

    onFilter(filtered);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="">Тип</option>
        <option value="стол">Стол</option>
        <option value="диван">Диван</option>
        <option value="шкаф">Шкаф</option>
      </select>

      <input placeholder="Цвет" value={color} onChange={e => setColor(e.target.value)} />
      <input placeholder="Размер" value={size} onChange={e => setSize(e.target.value)} />

      <button onClick={handleFilter}>Применить</button>
    </div>
  );
};

export default FurnitureFilter;
