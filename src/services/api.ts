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
