import axios from 'axios';
import type { Furniture } from '../types/furniture';

const API_BASE = 'http://localhost:3001';

export const fetchFurniture = () =>
  axios.get<Furniture[]>(`${API_BASE}/furniture`);

export const fetchFurnitureById = (id: number) =>
  axios.get<Furniture>(`${API_BASE}/furniture/${id}`);

export const fetchConstructedModels = () =>
  axios.get<Furniture[]>(`${API_BASE}/constructorModels`);

export const fetchConstructedModelById = (id: number | string) =>
  axios.get<Furniture>(`${API_BASE}/constructorModels/${id}`);

// Получаем все сохранённые модели
const getAllConstructedModels = async (): Promise<Furniture[]> => {
  const res = await axios.get<Furniture[]>(`${API_BASE}/constructorModels`);
  return res.data;
};

// Проверяем, есть ли в сохранённых модель с такими же полями
const isDuplicateModel = (model: Furniture, allModels: Furniture[]): boolean => {
  return allModels.some(m =>
    m.name === model.name &&
    m.type === model.type &&
    m.color === model.color &&
    m.size === model.size &&
    m.description === model.description &&
    JSON.stringify(m.images) === JSON.stringify(model.images)
  );
};

// Сохраняем модель с проверкой дубликатов и присвоением нового ID
export const saveConstructedModel = async (model: Furniture) => {
  const allModels = await getAllConstructedModels();

  if (isDuplicateModel(model, allModels)) {
    alert('Такая модель уже существует и не будет сохранена.');
    return;
  }

  // Присваиваем новый ID — максимальный ID + 1 или 1, если моделей нет
  const maxId = allModels.length > 0 ? Math.max(...allModels.map(m => Number(m.id))) : 0;
  const newModel = { ...model, id: (maxId + 1).toString() };

  await axios.post(`${API_BASE}/constructorModels`, newModel);
};

export const deleteConstructedModel = (id: number) =>
  axios.delete(`${API_BASE}/constructorModels/${id}`);

export const getFurnitureById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/furniture/${id}`);
  return res.data;
};

export const getConstructedModelById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/constructorModels/${id}`);
  return res.data;
};
