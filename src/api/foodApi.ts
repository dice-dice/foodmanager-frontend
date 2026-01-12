import apiClient from './axios';
import type { FoodDTO } from '../types';

const FOOD_URL = '/api/food';

export const foodApi = {
  getByUser: async (): Promise<FoodDTO[]> => {
    const response = await apiClient.get<FoodDTO[]>(`${FOOD_URL}/by-user`);
    return response.data;
  },

  getByCategory: async (userId: number, categoryId: number): Promise<FoodDTO[]> => {
    const response = await apiClient.get<FoodDTO[]>(
      `${FOOD_URL}/by-category/${userId}/${categoryId}`
    );
    return response.data;
  },

  create: async (foods: FoodDTO[]): Promise<FoodDTO[]> => {
    const response = await apiClient.post<FoodDTO[]>(`${FOOD_URL}/food-stock`, foods);
    return response.data;
  },

  update: async (foods: FoodDTO[]): Promise<FoodDTO[]> => {
    const response = await apiClient.put<FoodDTO[]>(`${FOOD_URL}/food-update`, foods);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await apiClient.delete<string>(`${FOOD_URL}/food-delete/${id}`);
    return response.data;
  },
};
