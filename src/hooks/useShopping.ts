import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shoppingApi, foodApi } from '../api';
import { isOtherCategory, isDailyCategory } from '../constants';
import type { FoodDTO } from '../types';
import toast from 'react-hot-toast';

const SHOPPING_KEY = ['shopping'];

export function useShopping() {
  return useQuery({
    queryKey: SHOPPING_KEY,
    queryFn: shoppingApi.getByUser,
  });
}

export function useShoppingByCategory(userId: number, categoryId: number) {
  return useQuery({
    queryKey: [...SHOPPING_KEY, 'category', userId, categoryId],
    queryFn: () => shoppingApi.getByCategory(userId, categoryId),
    enabled: !!userId && !!categoryId,
  });
}

export function useCreateShopping() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (foods: FoodDTO[]) => shoppingApi.create(foods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('買い物リストに追加しました');
    },
    onError: () => {
      toast.error('買い物リストへの追加に失敗しました');
    },
  });
}

export function useUpdateShopping() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (foods: FoodDTO[]) => shoppingApi.update(foods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('買い物リストを更新しました');
    },
    onError: () => {
      toast.error('買い物リストの更新に失敗しました');
    },
  });
}

export function useDeleteShopping() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => shoppingApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('買い物リストから削除しました');
    },
    onError: () => {
      toast.error('買い物リストからの削除に失敗しました');
    },
  });
}

export function useMoveToFoods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (food: FoodDTO) => {
      const shoppingId = food.id;
      // Foodsに追加（新規作成なのでidを除外）
      const foodToCreate = { ...food, id: undefined };
      await foodApi.create([foodToCreate]);
      // Shoppingから削除
      if (shoppingId) {
        await shoppingApi.delete(shoppingId);
      }
      return food;
    },
    onSuccess: (food) => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_KEY });
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      let stockName = '食材ストック';
      if (isOtherCategory(food.categoryId)) {
        stockName = 'その他ストック';
      } else if (isDailyCategory(food.categoryId)) {
        stockName = '日用品ストック';
      }
      toast.success(`${stockName}に追加しました`);
    },
    onError: () => {
      toast.error('ストックへの追加に失敗しました');
    },
  });
}
