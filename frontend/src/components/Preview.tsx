import type { Furniture } from '../types/furniture';

interface Props {
  model: Furniture;
}

const Preview = ({ model }: Props) => (
  <div style={{ border: '1px solid #000', padding: 10, marginTop: 20 }}>
    <h4>Предпросмотр модели</h4>
    <p>Название: {model.name}</p>
    <p>Тип: {model.type}</p>
    <p>Цвет: {model.color}</p>
    <p>Материал: {model.material}</p>
    <p>Размер: {model.size}</p>
    {model.shelves && model.shelves.length > 0 && (
      <div>
        <h5>Полки:</h5>
        {model.shelves.map((_, index) => (
          <p key={index}>Полка {index + 1}</p>
        ))}
      </div>
    )}
  </div>
);

export default Preview;
