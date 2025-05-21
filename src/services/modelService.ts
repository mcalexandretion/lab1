import axios from 'axios';
import type { Furniture } from '../types/furniture';

const API_BASE = 'http://localhost:3001';

export const getAllConstructedModels = async (): Promise<Furniture[]> => {
  const res = await axios.get(`${API_BASE}/constructorModels`);
  // Преобразуем строковые ID в числовые, если сервер возвращает строки
  return res.data.map((item: any) => ({
    ...item,
    id: Number(item.id)
  }));
};

export const isDuplicateModel = (model: Furniture, allModels: Furniture[]): boolean => {
  return allModels.some(m =>
    m.name === model.name &&
    m.type === model.type &&
    m.color === model.color &&
    m.size === model.size &&
    m.description === model.description &&
    JSON.stringify(m.images) === JSON.stringify(model.images)
  );
};

export const saveConstructedModel = async (model: Omit<Furniture, 'id'>): Promise<Furniture> => {
  const allModels = await getAllConstructedModels();

  if (isDuplicateModel(model as Furniture, allModels)) {
    throw new Error('Такая модель уже существует и не будет сохранена.');
  }

  const maxId = allModels.length > 0 ? Math.max(...allModels.map(m => m.id)) : 0;
  const newModel: Furniture = { 
    ...model, 
    id: maxId + 1
  };

  // Отправляем на сервер, преобразовав ID в строку, если сервер ожидает строку
  await axios.post(`${API_BASE}/constructorModels`, {
    ...newModel,
    id: newModel.id.toString()
  });
  
  return newModel;
};