import type { Furniture } from '../types/furniture';
import { Link } from 'react-router-dom';

interface Props {
  item: Furniture;
}

const FurnitureCard = ({ item }: Props) => (
  <div className="card">
    <div className="card_container">
      <img src={item.images[0]} alt={item.name} />
      <div className="info">
        <h3 >
          {item.name}
        </h3>

        <p>Тип: {item.type}</p>
        {/* <p>Цвет: {item.color}</p>
    <p>Материал: {item.material}</p> */}
        <p>Размер: {item.size}</p>
        <Link to={`/furniture/${item.id}`}>Подробнее</Link>
      </div>
    </div>
  </div>
);

export default FurnitureCard;
