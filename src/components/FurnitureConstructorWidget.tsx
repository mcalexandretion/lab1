import { useState, useEffect } from 'react';
import type { Furniture } from '../types/furniture';
import { saveConstructedModel } from '../services/modelService';
import materials from '../data/materials.json';
import colors from '../data/colors.json';

interface Props {
  model: Furniture;
  setModel?: (model: Furniture) => void;
}

const FurnitureConstructorWidget = ({ model, setModel }: Props) => {
  const [custom, setCustom] = useState<Furniture>({ ...model });
  const [isSaving, setIsSaving] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 100, height: 200, depth: 50 });
  const [shelves, setShelves] = useState<number[]>([]);

  useEffect(() => {
    if (model.size) {
      const [width, depth, height] = model.size.split('x').map(Number);
      setDimensions({ width, height, depth });
    }
    if (model.shelves && model.shelves.length > 0) {
      setShelves(model.shelves);
    } else if (model.type === 'шкаф') {
      setShelves([]);
    }
  }, [model]);

  useEffect(() => {
    setCustom(prev => ({ ...prev, size: `${dimensions.width}x${dimensions.depth}x${dimensions.height}` }));
  }, [dimensions]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const savedModel = await saveConstructedModel({
        ...custom,
        shelves: custom.type === 'шкаф' ? shelves : undefined,
        name: `Модель: ${custom.type}`,
        images: []
      });
      alert('Модель сохранена!');
      if (setModel) setModel(savedModel);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addShelf = () => {
    const newPosition = shelves.length > 0 ? Math.min(shelves[shelves.length - 1] + 30, dimensions.height - 10) : 30;
    setShelves([...shelves, newPosition]);
  };

  const removeShelf = (index: number) => {
    const newShelves = [...shelves];
    newShelves.splice(index, 1);
    setShelves(newShelves);
  };

  const updateShelfPosition = (index: number, position: number) => {
    const newShelves = [...shelves];
    const minPos = index > 0 ? newShelves[index - 1] + 10 : 10;
    const maxPos = index < shelves.length - 1 ? newShelves[index + 1] - 10 : dimensions.height - 10;
    newShelves[index] = Math.max(minPos, Math.min(position, maxPos));
    setShelves(newShelves);
  };

  const renderWardrobePreview = () => (
    <div style={{ width: '200px', height: '300px', position: 'relative', border: '2px solid #333', backgroundColor: '#f5f5f5', margin: '20px auto' }}>
      {shelves.map((position, index) => (
        <div key={index} style={{ position: 'absolute', bottom: `${(position / dimensions.height) * 100}%`, width: '100%', height: '2px', backgroundColor: '#333' }}>
          <span style={{ fontSize: '10px', transform: 'translateY(-10px)', backgroundColor: 'white', padding: '0 3px' }}>{position}см</span>
        </div>
      ))}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', borderLeft: '1px dashed #333', backgroundColor: 'rgba(200, 200, 200, 0.3)' }}></div>
    </div>
  );

  const renderBasicPreview = () => {
    const label = custom.type.charAt(0).toUpperCase() + custom.type.slice(1);
    return (
      <div style={{
        width: `${Math.min(dimensions.width, 200)}px`,
        height: `${Math.min(dimensions.height, 200)}px`,
        backgroundColor: '#eee',
        border: '1px solid #000',
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        {label}
      </div>
    );
  };

  return (
    <div className='container'>
      
      <div className='card_info'>
        
        
          <h3>Конструктор мебели: {custom.type}</h3>
          <div className='row_info'>  <label>Цвет:</label>
          <select value={custom.color} onChange={e => setCustom({ ...custom, color: e.target.value })}>
            {colors.colors.map(color => (<option key={color} value={color}>{color}</option>))}
          </select>
          </div>
         
        <div className='row_info'>
          <label>Материал:</label>
          <select value={custom.material} onChange={e => setCustom({ ...custom, material: e.target.value })}>
            {materials.materials.map(material => (<option key={material} value={material}>{material}</option>))}
          </select>
        </div>

        <div className='row_info'>
          <label>Ширина (см):</label>
          <input type="number" value={dimensions.width} onChange={e => setDimensions({ ...dimensions, width: +e.target.value })} min="30" max="300" />
        </div>

        <div className='row_info'>
          <label>Глубина (см):</label>
          <input type="number" value={dimensions.depth} onChange={e => setDimensions({ ...dimensions, depth: +e.target.value })} min="30" max="200" />
        </div>

        <div className='row_info'>
          <label>Высота (см):</label>
          <input type="number" value={dimensions.height} onChange={e => {
            const newHeight = +e.target.value;
            if (custom.type === 'шкаф' && newHeight < dimensions.height) {
              setShelves(shelves.filter(pos => pos <= newHeight - 10).map(pos => Math.min(pos, newHeight - 10)));
            }
            setDimensions({ ...dimensions, height: newHeight });
          }} min="50" max="250" />
        </div>

        {custom.type === 'шкаф' && (
          <div className="card_info">
            <div className="row_info">   
               <h3>Управление полками</h3>
               <button onClick={addShelf}>Добавить полку</button> 
            </div>
        
            {shelves.map((position, index) => (
              <div key={index} className='row_slider'>
                <span style={{ width: '80px' }}>Полка {index + 1}:</span>
                <input type="range" min="10" max={dimensions.height - 10} value={position} onChange={e => updateShelfPosition(index, +e.target.value)} style={{ flex: 1, margin: '0 10px' }} />
                <span style={{ width: '50px' }}>{position} см</span>
                <button onClick={() => removeShelf(index)}>×</button>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleSave} disabled={isSaving}>{isSaving ? 'Сохранение...' : 'Сохранить модель'}</button>
      </div>

      <div className='card_info'>
        <h3>Предпросмотр</h3>
        {custom.type === 'шкаф' ? renderWardrobePreview() : renderBasicPreview()}

        <div className="info">
          <h4>Параметры:</h4>
          <p>Тип: {custom.type}</p>
          <p>Цвет: {custom.color}</p>
          <p>Материал: {custom.material}</p>
          <p>Размеры: {dimensions.width} × {dimensions.depth} × {dimensions.height} см</p>
          {custom.type === 'шкаф' && shelves.length > 0 && (
            <div>
              <p>Полки:</p>
              <ul>{shelves.map((pos, i) => (<li key={i}>{pos} см</li>))}</ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FurnitureConstructorWidget;