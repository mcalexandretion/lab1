// import type { Furniture } from '../types/furniture';
// import { Link } from 'react-router-dom';

// interface Props {
//   item: Furniture;
// }

// const FurnitureCard = ({ item }: Props) => (
//   <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
//     <h3>{item.name}</h3>
//     <p>Тип: {item.type}</p>
//     <p>Цвет: {item.color}</p>
//     <p>Размер: {item.size}</p>
//     <Link to={`/furniture/${item.id}`}>Подробнее</Link>
//   </div>
// );

// export default FurnitureCard;
import type { Furniture } from '../types/furniture';
import { Link } from 'react-router-dom';

const typeIcons = {
  'стол': '🪑',
  'диван': '🛋️',
  'шкаф': '🚪',
  'кресло': '🪑',
  'кровать': '🛏️',
  'стул': '💺'
};

interface Props {
  item: Furniture;
}

const FurnitureCard = ({ item }: Props) => (
  <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
    <h3>{typeIcons[item.type]} {item.name}</h3>
    <p>Тип: {item.type}</p>
    <p>Цвет: {item.color}</p>
    <p>Размер: {item.size}</p>
    <Link to={`/furniture/${item.id}`}>Подробнее</Link>
  </div>
);

export default FurnitureCard;