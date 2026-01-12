// 食材関連の型定義

export interface FoodDTO {
  id?: number;
  name: string;
  quantity: number;
  date: string; // ISO date string (YYYY-MM-DD)
  expirationDate?: string; // ISO date string (YYYY-MM-DD)
  categoryId?: number;
  categoryName?: string;
}

export interface Category {
  id: number;
  name: string;
}
