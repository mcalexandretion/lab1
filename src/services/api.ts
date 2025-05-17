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

export const saveConstructedModel = (model: Furniture) =>
  axios.post(`${API_BASE}/constructorModels`, model);

export const deleteConstructedModel = (id: number) =>
  axios.delete(`${API_BASE}/constructorModels/${id}`);
