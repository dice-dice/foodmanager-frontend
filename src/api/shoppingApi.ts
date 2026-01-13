import apiClient from './axios';
import type { FoodDTO } from '../types';

const SHOPPING_URL = '/shopping';

export const shoppingApi = {
  getByUser: async (): Promise<FoodDTO[]> => {
    const response = await apiClient.get<FoodDTO[]>(`${SHOPPING_URL}/by-user`);
    return response.data;
  },

  getByCategory: async (userId: number, categoryId: number): Promise<FoodDTO[]> => {
    const response = await apiClient.get<FoodDTO[]>(
      `${SHOPPING_URL}/by-category/${userId}/${categoryId}`
    );
    return response.data;
  },

  create: async (foods: FoodDTO[]): Promise<FoodDTO[]> => {
    const response = await apiClient.post<FoodDTO[]>(`${SHOPPING_URL}/food-stock`, foods);
    return response.data;
  },

  update: async (foods: FoodDTO[]): Promise<FoodDTO[]> => {
    const response = await apiClient.put<FoodDTO[]>(`${SHOPPING_URL}/food-update`, foods);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await apiClient.delete<string>(`${SHOPPING_URL}/food-delete/${id}`);
    return response.data;
  },
};
