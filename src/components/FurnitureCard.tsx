import type { Furniture } from '../types/furniture';
import { Link } from 'react-router-dom';

interface Props {
  item: Furniture;
}

const FurnitureCard = ({ item }: Props) => (
  <div className="card">
    <h3 >
      {item.name}
    </h3>
    <img src={item.images[0]} alt={item.name} />
<div className="info"> 
    <p>Тип: {item.type}</p>
    <p>Цвет: {item.color}</p>
    <p>Материал: {item.material}</p>
    <p>Размер: {item.size}</p>
</div>
    <Link to={`/furniture/${item.id}`}>Подробнее</Link>
  </div>
);

export default FurnitureCard;
