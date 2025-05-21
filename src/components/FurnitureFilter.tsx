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

  const uniqueColors = Array.from(new Set(allItems.map(item => item.color)));

  const handleFilter = () => {
    let filtered = allItems;

    if (type) filtered = filtered.filter(f => f.type === type);
    if (color) filtered = filtered.filter(f => f.color === color);
    if (size) filtered = filtered.filter(f => f.size.includes(size));

    onFilter(filtered);
  };

  const handleReset = () => {
    setType('');
    setColor('');
    setSize('');
    onFilter(allItems);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <select value={type} onChange={e => setType(e.target.value)} style={{ marginRight: 10 }}>
        <option value="">Все типы</option>
        <option value="стол">Столы</option>
        <option value="диван">Диваны</option>
        <option value="шкаф">Шкафы</option>
        <option value="кресло">Кресла</option>
        <option value="кровать">Кровати</option>
        <option value="стул">Стулья</option>
      </select>

      <select 
        value={color} 
        onChange={e => setColor(e.target.value)}
        style={{ marginRight: 10 }}
      >
        <option value="">Все цвета</option>
        {uniqueColors.map(color => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>

      <input 
        placeholder="Размер (часть)" 
        value={size} 
        onChange={e => setSize(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <button onClick={handleFilter} style={{ marginRight: 10 }}>Применить фильтры</button>
      <button onClick={handleReset}>Сбросить фильтры</button>
    </div>
  );
};

export default FurnitureFilter;
